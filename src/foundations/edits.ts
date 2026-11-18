import { getReference } from '@openscd/scl-lib';

import { busSections, connectivityPath, isBusBar } from './connectivity.js';
import {
  removeNode,
  removeTerminal,
  reparentElement,
} from './connectivity-edits.js';
import { iedReferences, isIedReferenceElement } from './ied.js';
import {
  attributes,
  getSLDAttributes,
  layoutPrivate,
  setSLDAttributes,
  textLayout,
} from './sld-attributes.js';
import { updateSLDAttributes } from './sld-attribute-edits.js';
import { privType, sldNs, uuid, xmlnsNs, hasSldNamespace, defaultSldNsPrefix } from '../foundations.js';

import { isInsert, isSetAttributes } from '@openscd/oscd-api/utils.js';

import type { EditV2, SetAttributes } from '@openscd/oscd-api';
import type { Point } from './geometry.js';
import type { ConnectDetail } from './events.js';

export type TerminalName = 'T1' | 'T2' | 'N1' | 'N2';

function elementInSldNs(element: Element): boolean {
  return (
    element.namespaceURI === sldNs ||
    Array.from(element.attributes).some(attr => attr.namespaceURI === sldNs)
  );
}

function nodeRequiresSldNamespace(node: Node): boolean {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  const element = node as Element;
  return (
    elementInSldNs(element) ||
    Array.from(element.querySelectorAll('*')).some(elementInSldNs)
  );
}

/**
 * Whether applying `edit` would introduce content in the SLD-layout namespace
 * ({@link sldNs}) — i.e. it sets an `attributesNS` entry in that namespace or
 * inserts a node that is (or contains) an element/attribute in it. Removals do
 * not count: SLD content can only be removed from a document that already
 * declares the namespace, so {@link withSldNamespace}'s declaration guard makes
 * the remove cases moot.
 */
export function requiresSldNamespace(edit: EditV2): boolean {
  if (Array.isArray(edit)) {
    return edit.some(requiresSldNamespace);
  }
  if (isSetAttributes(edit)) {
    return !!edit.attributesNS && sldNs in edit.attributesNS;
  }
  if (isInsert(edit)) {
    return nodeRequiresSldNamespace(edit.node);
  }
  return false;
}

/**
 * A tracked edit that declares the SLD-layout namespace ({@link sldNs}) on a
 * document's root element using {@link defaultSldNsPrefix}. Only ever invoked
 * (via {@link withSldNamespace}) on a document that declares no SLD prefix yet,
 * so the default is the correct prefix to introduce. Bundling this into the same
 * commit as the triggering SLD edit keeps it undoable in one step.
 */
export function declareSldNamespaceEdit(doc: XMLDocument): SetAttributes {
  return {
    element: doc.documentElement,
    attributesNS: {
      [xmlnsNs]: { [`xmlns:${defaultSldNsPrefix}`]: sldNs },
    },
  };
}

/**
 * Prepends a {@link declareSldNamespaceEdit} to `edits` iff the document does
 * not yet declare the SLD-layout namespace and `edits` actually introduces
 * SLD content. This is the only writer of the namespace declaration, and it
 * only ever runs as part of a user-triggered edit — never on load. Safe to call
 * around any dispatch: non-SLD edits and already-declared documents pass through
 * unchanged.
 */
export function withSldNamespace(doc: XMLDocument, edits: EditV2): EditV2 {
  if (hasSldNamespace(doc)) {
    return edits;
  }
  if (!requiresSldNamespace(edits)) {
    return edits;
  }
  return [declareSldNamespaceEdit(doc), edits];
}

export function createGroundTerminalEdits(
  equipment: Element,
  name: TerminalName,
): EditV2[] | null {
  const neutralPoint = name.startsWith('N');
  const bay = equipment.closest('Bay');
  if (!bay) {
    return null;
  }

  const edits: EditV2[] = [];
  let grounded = bay.querySelector(
    ':scope > ConnectivityNode[name="grounded"]',
  );
  let pathName = grounded?.getAttribute('pathName');
  if (!pathName) {
    pathName = connectivityPath(bay, 'grounded');
    grounded = equipment.ownerDocument.createElementNS(
      equipment.ownerDocument.documentElement.namespaceURI,
      'ConnectivityNode',
    );
    grounded.setAttribute('name', 'grounded');
    grounded.setAttribute('pathName', pathName);
    edits.push({
      parent: bay,
      node: grounded,
      reference: getReference(bay, 'ConnectivityNode'),
    });
  }

  const tagName = neutralPoint ? 'NeutralPoint' : 'Terminal';
  const terminal = equipment.ownerDocument.createElementNS(
    equipment.ownerDocument.documentElement.namespaceURI,
    tagName,
  );
  terminal.setAttribute('name', name);
  terminal.setAttribute('cNodeName', 'grounded');

  const substationName = bay.closest('Substation')!.getAttribute('name');
  if (substationName) {
    terminal.setAttribute('substationName', substationName);
  }

  const voltageLevelName = bay.closest('VoltageLevel')!.getAttribute('name');
  if (voltageLevelName) {
    terminal.setAttribute('voltageLevelName', voltageLevelName);
  }

  const bayName = bay.getAttribute('name');
  if (bayName) {
    terminal.setAttribute('bayName', bayName);
  }

  terminal.setAttribute('connectivityNode', pathName);
  edits.push({
    parent: equipment,
    node: terminal,
    reference: getReference(equipment, tagName),
  });

  return edits;
}

export function createFlipElementEdits(
  element: Element,
  nsp: string,
): EditV2[] {
  const { flip, kind } = attributes(element);
  const edits: EditV2[] = [
    updateSLDAttributes(element, nsp, {
      flip: flip ? null : 'true',
    }),
  ];

  if (element.tagName === 'PowerTransformer') {
    const winding = element.querySelector('TransformerWinding')!;
    Array.from(winding.querySelectorAll('Terminal')).forEach(terminal =>
      edits.push(...removeTerminal(terminal)),
    );
    if (kind === 'earthing') {
      Array.from(winding.querySelectorAll('NeutralPoint')).forEach(np =>
        edits.push(...removeTerminal(np)),
      );
    }
  }

  return edits;
}

export function createAddTextEdit(element: Element, nsp: string): EditV2[] {
  const {
    pos: [x, y],
  } = attributes(element);
  const doc = element.ownerDocument;
  const text = doc.createElementNS(doc.documentElement.namespaceURI, 'Text');
  const values = {
    lx: x.toString(),
    ly: (y < 2 ? y + 1 : y - 1).toString(),
  };
  const edits: EditV2[] = [
    { node: text, parent: element, reference: getReference(element, 'Text') },
  ];

  const existing = textLayout(element);
  if (existing) {
    edits.push(updateTextLayoutEdit(existing, nsp, values));
    return edits;
  }

  const layout = doc.createElementNS(sldNs, `${nsp}:TextLayout`);
  Object.entries(values).forEach(([key, value]) =>
    layout.setAttributeNS(sldNs, `${nsp}:${key}`, value),
  );
  const priv = layoutPrivate(element);
  if (priv) {
    edits.push({ node: layout, parent: priv, reference: null });
  } else {
    const newPriv = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private',
    );
    newPriv.setAttribute('type', privType);
    newPriv.appendChild(layout);
    edits.push({
      node: newPriv,
      parent: element,
      reference: getReference(element, 'Private'),
    });
  }

  return edits;
}

function updateTextLayoutEdit(
  layout: Element,
  nsp: string,
  values: Record<string, string>,
): EditV2 {
  return {
    element: layout,
    attributesNS: {
      [sldNs]: Object.fromEntries(
        Object.entries(values).map(([key, value]) => [`${nsp}:${key}`, value]),
      ),
    },
  };
}

/**
 * Removes a `Text` together with its `TextLayout`, which is stored in the
 * parent's layout `Private` rather than in the `Text` itself. A layout
 * `Private` left empty by this is removed as well.
 */
export function createRemoveTextEdits(text: Element): EditV2[] {
  const parent = text.parentElement;
  const layout = parent ? textLayout(parent) : null;
  if (!layout) {
    return [{ node: text }];
  }
  const priv = layout.parentElement!;
  return [
    { node: text },
    { node: priv.children.length === 1 ? priv : layout },
  ];
}

export function createDeleteBusBarEdits(busBar: Element): EditV2[] {
  const node = busBar.querySelector('ConnectivityNode')!;
  return [...removeNode(node), { node: busBar }];
}

export function createDeleteContainerEdits(container: Element): EditV2[] {
  const edits: EditV2[] = [];

  Array.from(container.getElementsByTagName('ConnectivityNode')).forEach(
    (cNode) => {
      if (
        Array.from(
          container.ownerDocument.querySelectorAll(
            `[connectivityNode="${cNode.getAttribute('pathName')}"]`,
          ),
        ).find(terminal => terminal.closest(container.tagName) !== container)
      ) {
        edits.push(...removeNode(cNode));
      }
    },
  );

  Array.from(container.querySelectorAll('Terminal, NeutralPoint')).forEach(
    (terminal) => {
      const cNode = container.ownerDocument.querySelector(
        `ConnectivityNode[pathName="${terminal.getAttribute(
          'connectivityNode',
        )}"]`,
      );
      if (cNode && cNode.closest(container.tagName) !== container) {
        edits.push(...removeNode(cNode));
      }
    },
  );

  edits.push({ node: container });

  return edits;
}

export function createRotateEdits(element: Element, nsp: string): EditV2[] {
  const { rot } = attributes(element);
  const edits: EditV2[] = [
    updateSLDAttributes(element, nsp, {
      rot: ((rot + 1) % 4).toString(),
    }),
  ];
  if (
    element.tagName === 'ConductingEquipment' ||
    element.tagName === 'PowerTransformer'
  ) {
    Array.from(element.querySelectorAll('Terminal, NeutralPoint'))
      .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
      .forEach(terminal => edits.push(...removeTerminal(terminal)));
  }
  return edits;
}

export function createPlaceLabelEdit(
  element: Element,
  nsp: string,
  x: number,
  y: number,
): EditV2 {
  return updateSLDAttributes(element, nsp, {
    lx: x.toString(),
    ly: y.toString(),
  });
}

export function createResizeEdits(
  element: Element,
  nsp: string,
  w: number,
  h: number,
): EditV2 {
  return updateSLDAttributes(element, nsp, {
    w: w.toString(),
    h: h.toString(),
  });
}

export function createResizeTLEdits(
  element: Element,
  nsp: string,
  x: number,
  y: number,
  w: number,
  h: number,
): EditV2 {
  const {
    pos: [oldX, oldY],
    label: [oldLX, oldLY],
  } = attributes(element);
  let lx = oldLX;
  let ly = oldLY;
  if (lx === oldX && ly === oldY) {
    lx += x - oldX;
    ly += y - oldY;
  }

  return updateSLDAttributes(element, nsp, {
    x: x.toString(),
    y: y.toString(),
    w: w.toString(),
    h: h.toString(),
    lx: lx.toString(),
    ly: ly.toString(),
  });
}

export function cutSectionAt(
  section: Element,
  index: number,
  [x, y]: Point,
  nsPrefix: string,
): EditV2[] {
  const parent = section.parentElement!;
  const edits = [] as EditV2[];
  const vertices = Array.from(section.getElementsByTagNameNS(sldNs, 'Vertex'));
  const vertexAtXY = vertices.find(
    ve =>
      getSLDAttributes(ve, 'x') === x.toString() &&
      getSLDAttributes(ve, 'y') === y.toString(),
  );

  if (
    vertexAtXY === vertices[0] ||
    vertexAtXY === vertices[vertices.length - 1]
  ) {
    return [];
  }

  const newSection = section.cloneNode(true) as Element;
  Array.from(newSection.getElementsByTagNameNS(sldNs, 'Vertex'))
    .slice(0, index + 1)
    .forEach(vertex => vertex.remove());
  const v = vertices[index].cloneNode() as Element;
  setSLDAttributes(v, nsPrefix, { x: x.toString(), y: y.toString() });
  v.removeAttributeNS(sldNs, 'uuid');
  newSection.prepend(v);
  edits.push({
    node: newSection,
    parent,
    reference: section.nextElementSibling,
  });

  vertices.slice(index + 1).forEach(vertex => edits.push({ node: vertex }));

  if (!vertexAtXY) {
    const v2 = v.cloneNode();
    edits.push({ node: v2, parent: section, reference: null });
  }

  return edits;
}

export function createConnectEdits(
  { from, fromTerminal, to, toTerminal, path }: ConnectDetail,
  doc: XMLDocument,
  nsp: string,
): EditV2[] {
  if (
    from.tagName === 'TransformerWinding' &&
    to.tagName === 'TransformerWinding'
  ) {
    return [];
  }
  const edits = [] as EditV2[];
  let cNode: Element;
  let connectivityNode: string;
  let cNodeName: string;
  let priv: Element;
  if (to.tagName !== 'ConnectivityNode') {
    cNode = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'ConnectivityNode',
    );
    cNode.setAttribute('name', 'L1');
    const bay = from.closest('Bay') || to.closest('Bay')!;
    edits.push(...reparentElement(cNode, bay));
    connectivityNode = (
      edits.find(
        e => 'attributes' in e && 'pathName' in e.attributes!,
      ) as SetAttributes
    ).attributes!.pathName as string;
    cNodeName =
      ((
        edits.find(
          e => 'attributes' in e && 'name' in e.attributes!,
        ) as SetAttributes
      )?.attributes!.name as string | undefined) ??
      cNode.getAttribute('name')!;
    priv = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private',
    );
    priv.setAttribute('type', privType);
    edits.push({
      parent: cNode,
      node: priv,
      reference: getReference(cNode, 'Private'),
    });
  } else {
    cNode = to;
    connectivityNode = cNode.getAttribute('pathName')!;
    cNodeName = cNode.getAttribute('name')!;
    priv = cNode.querySelector(`Private[type="${privType}"]`)!;
  }
  const section = doc.createElementNS(sldNs, `${nsp}:Section`);
  edits.push({ parent: priv!, node: section, reference: null });
  const fromTermUUID = uuid();
  const toTermUUID = uuid();
  path.forEach(([x, y], i) => {
    const vertex = doc.createElementNS(sldNs, `${nsp}:Vertex`);
    setSLDAttributes(vertex, nsp, { x: x.toString(), y: y.toString() });
    if (i === 0) {
      setSLDAttributes(vertex, nsp, { uuid: fromTermUUID });
    } else if (i === path.length - 1 && to.tagName !== 'ConnectivityNode') {
      setSLDAttributes(vertex, nsp, { uuid: toTermUUID });
    }
    edits.push({ parent: section, node: vertex, reference: null });
  });
  if (to.tagName === 'ConnectivityNode') {
    const [x, y] = path[path.length - 1];
    Array.from(priv.getElementsByTagNameNS(sldNs, 'Section')).find((s) => {
      const sectionPath = Array.from(
        s.getElementsByTagNameNS(sldNs, 'Vertex'),
      ).map(v => attributes(v).pos);
      for (let i = 0; i < sectionPath.length - 1; i += 1) {
        const [x0, y0] = sectionPath[i];
        const [x1, y1] = sectionPath[i + 1];
        if (
          (y0 === y &&
            y === y1 &&
            ((x0 < x && x < x1) || (x1 < x && x < x0))) ||
          (x0 === x &&
            x === x1 &&
            ((y0 < y && y < y1) || (y1 < y && y < y0))) ||
          (y0 === y && x0 === x)
        ) {
          edits.push(cutSectionAt(s, i, [x, y], nsp));
          return true;
        }
      }
      return false;
    });
  }
  const [substationName, voltageLevelName, bayName] = connectivityNode.split(
    '/',
    3,
  );
  const fromTagName = fromTerminal.startsWith('T')
    ? 'Terminal'
    : 'NeutralPoint';
  const fromTermElement = doc.createElementNS(
    doc.documentElement.namespaceURI,
    fromTagName,
  );
  setSLDAttributes(fromTermElement, nsp, { uuid: fromTermUUID });
  fromTermElement.setAttribute('name', fromTerminal);
  fromTermElement.setAttribute('connectivityNode', connectivityNode);
  fromTermElement.setAttribute('substationName', substationName);
  fromTermElement.setAttribute('voltageLevelName', voltageLevelName);
  fromTermElement.setAttribute('bayName', bayName);
  fromTermElement.setAttribute('cNodeName', cNodeName);
  edits.push({
    node: fromTermElement,
    parent: from,
    reference: getReference(from, fromTagName),
  });
  if (to.tagName === 'ConductingEquipment') {
    const toTagName = toTerminal!.startsWith('T')
      ? 'Terminal'
      : 'NeutralPoint';
    const toTermElement = doc.createElementNS(
      doc.documentElement.namespaceURI,
      toTagName,
    );
    setSLDAttributes(toTermElement, nsp, { uuid: toTermUUID });
    toTermElement.setAttribute('name', toTerminal!);
    toTermElement.setAttribute('connectivityNode', connectivityNode);
    toTermElement.setAttribute('substationName', substationName);
    toTermElement.setAttribute('voltageLevelName', voltageLevelName);
    toTermElement.setAttribute('bayName', bayName);
    toTermElement.setAttribute('cNodeName', cNodeName);
    edits.push({
      node: toTermElement,
      parent: to,
      reference: getReference(to, toTagName),
    });
  }
  return edits;
}

export function shiftElementEdits(
  element: Element,
  x: number,
  y: number,
  nsp: string,
): EditV2[] {
  const {
    pos: [oldX, oldY],
    label: [oldLX, oldLY],
    rot,
  } = attributes(element);

  const dx = x - oldX;
  const dy = y - oldY;

  if (element.localName === 'Vertex') {
    return [];
  }

  let lx = oldLX;
  let ly = oldLY;
  if (
    element.tagName === 'ConductingEquipment' &&
    !getSLDAttributes(element, 'lx') &&
    rot % 2 === 0
  ) {
    lx += 1;
    ly += 1;
  }
  if (
    element.tagName === 'PowerTransformer' &&
    !getSLDAttributes(element, 'lx')
  ) {
    if (rot < 2) {
      lx += 1.5;
    } else {
      lx -= 2;
      ly += 2;
    }
  }
  if (isIedReferenceElement(element) && !getSLDAttributes(element, 'lx')) {
    lx += 1;
    ly += 1;
  }

  return [
    updateSLDAttributes(element, nsp, {
      x: x.toString(),
      y: y.toString(),
      lx: (lx + dx).toString(),
      ly: (ly + dy).toString(),
    }),
  ];
}

export function shiftTextEdits(
  element: Element,
  dx: number,
  dy: number,
  nsp: string,
): EditV2[] {
  // Each parent has one TextLayout, so shift once per parent, not per Text.
  const seen = new Set<Element | null>();
  return Array.from(element.querySelectorAll('Text'))
    .filter(text => !seen.has(text.parentElement) && seen.add(text.parentElement))
    .map((text) => {
      const {
        label: [textLX, textLY],
      } = attributes(text);
      return updateSLDAttributes(text, nsp, {
        lx: (textLX + dx).toString(),
        ly: (textLY + dy).toString(),
      });
    });
}

export function shiftDescendantEdits(
  element: Element,
  dx: number,
  dy: number,
  nsp: string,
): EditV2[] {
  return Array.from(
    element.querySelectorAll(
      'Bay, ConductingEquipment, PowerTransformer, Vertex',
    ),
  )
    .concat(iedReferences(element))
    .map((descendant) => {
      const {
        pos: [descX, descY],
        label: [descLX, descLY],
      } = attributes(descendant);
      const newAttributes: {
        x: string;
        y: string;
        lx?: string;
        ly?: string;
      } = {
        x: (descX + dx).toString(),
        y: (descY + dy).toString(),
      };
      if (descendant.localName !== 'Vertex') {
        newAttributes.lx = (descLX + dx).toString();
        newAttributes.ly = (descLY + dy).toString();
      }
      return updateSLDAttributes(descendant, nsp, newAttributes);
    });
}

export function rewireTerminalEdits(
  element: Element,
  parent: Element,
  doc: XMLDocument,
): EditV2[] {
  if (
    element.tagName !== 'ConductingEquipment' &&
    element.tagName !== 'PowerTransformer'
  ) {
    return [];
  }

  const edits: EditV2[] = [];

  Array.from(element.querySelectorAll('Terminal, NeutralPoint'))
    .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
    .forEach(terminal => edits.push(...removeTerminal(terminal)));

  const groundedTerminals = Array.from(
    element.querySelectorAll('Terminal, NeutralPoint'),
  ).filter(terminal => terminal.getAttribute('cNodeName') === 'grounded');

  if (groundedTerminals.length > 0) {
    const bayName = parent.closest('Bay')?.getAttribute('name');
    if (!bayName) {
      groundedTerminals.forEach(terminal =>
        edits.push(...removeTerminal(terminal)),
      );
    }

    let newCNode = parent.querySelector(
      `ConnectivityNode[name="grounded"]`,
    );

    if (!newCNode) {
      newCNode = doc.createElementNS(
        doc.documentElement.namespaceURI,
        'ConnectivityNode',
      );
      newCNode.setAttribute('name', 'grounded');
      newCNode.setAttribute(
        'pathName',
        connectivityPath(parent, 'grounded'),
      );

      edits.push({
        node: newCNode,
        parent,
        reference: getReference(parent, 'ConnectivityNode'),
      });
    }

    const voltageLevelName = parent
      .closest('VoltageLevel')
      ?.getAttribute('name');
    const substationName = parent
      .closest('Substation')!
      .getAttribute('name')!;
    const connectivityNode = newCNode!.getAttribute('pathName');

    groundedTerminals.forEach((terminal) => {
      edits.push({
        element: terminal,
        attributes: {
          connectivityNode,
          bayName,
          voltageLevelName,
          substationName,
        },
      });
    });
  }

  return edits;
}

export function disconnectExternalEdits(
  element: Element,
  doc: XMLDocument,
): EditV2[] {
  if (
    element.tagName === 'ConductingEquipment' ||
    element.tagName === 'PowerTransformer'
  ) {
    return [];
  }
  if (element.getRootNode() !== doc) {
    return [];
  }

  const edits: EditV2[] = [];

  Array.from(element.getElementsByTagName('ConnectivityNode')).forEach(
    (cNode) => {
      if (
        Array.from(
          doc.querySelectorAll(
            `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"],
                 NeutralPoint[connectivityNode="${cNode.getAttribute(
          'pathName',
        )}"]`,
          ),
        ).find(terminal => terminal.closest(element.tagName) !== element)
      ) {
        edits.push(...removeNode(cNode));
      }
    },
  );

  Array.from(element.querySelectorAll('Terminal, NeutralPoint')).forEach(
    (terminal) => {
      const cNode = doc.querySelector(
        `ConnectivityNode[pathName="${terminal.getAttribute(
          'connectivityNode',
        )}"]`,
      );
      if (cNode && cNode.closest(element.tagName) !== element) {
        edits.push(...removeNode(cNode));
      }
    },
  );

  return edits;
}

export function busBarVertexEdits(
  element: Element,
  x: number,
  y: number,
  nsp: string,
): EditV2[] {
  if (element.localName !== 'Vertex') {
    return [];
  }

  const bay = element.closest('Bay')!;
  const sections = busSections(bay);
  const section = sections[0];
  const vertex = section.querySelector('Vertex')!;
  const lastSection = sections[sections.length - 1];
  const lastVertex = lastSection.querySelector('Vertex:last-of-type')!;
  const {
    pos: [x1, y1],
  } = attributes(vertex);
  const w = x - x1 + 1;
  const h = y - y1 + 1;

  if (!isBusBar(bay)) {
    return [];
  }

  return [
    ...removeNode(section.closest('ConnectivityNode')!),
    updateSLDAttributes(lastVertex, nsp, {
      x: x.toString(),
      y: y.toString(),
    }),
    updateSLDAttributes(bay, nsp, {
      w: w.toString(),
      h: h.toString(),
    }),
  ];
}

export function wrapIedReferenceEdits(
  element: Element,
  parent: Element,
  doc: XMLDocument,
): EditV2[] {
  if (!isIedReferenceElement(element)) {
    return [];
  }

  const edits: EditV2[] = [];
  const oldParent = element.parentElement;

  let privateElement = parent.querySelector(
    ':scope > Private[type="OpenSCD-SLD-Layout"]',
  );
  if (!privateElement) {
    privateElement = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private',
    );
    privateElement.setAttribute('type', 'OpenSCD-SLD-Layout');
    edits.push({
      parent,
      node: privateElement,
      reference: getReference(parent, 'Private'),
    });
  }

  if (element.parentElement !== privateElement) {
    edits.push({
      parent: privateElement,
      node: element,
      reference: getReference(privateElement, element.localName),
    });
  }

  if (
    oldParent?.tagName === 'Private' &&
    oldParent.getAttribute('type') === 'OpenSCD-SLD-Layout' &&
    oldParent.childElementCount === 1 &&
    oldParent !== privateElement
  ) {
    edits.push({ node: oldParent });
  }

  return edits;
}

