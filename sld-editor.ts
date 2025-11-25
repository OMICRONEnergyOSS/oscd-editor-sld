import { html, LitElement } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators.js';
import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { EditV2, SetAttributes } from '@openscd/oscd-api';
import { getReference } from '@openscd/oscd-scl';

import './sld-substation-editor.js';

import {
  attributes,
  busSections,
  ConnectDetail,
  ConnectEvent,
  elementPath,
  getSLDAttributes,
  isBusBar,
  PlaceEvent,
  PlaceLabelEvent,
  Point,
  privType,
  removeNode,
  removeTerminal,
  reparentElement,
  ResizeEvent,
  ResizeTLEvent,
  setSLDAttributes,
  sldNs,
  StartConnectDetail,
  StartConnectEvent,
  StartEvent,
  StartPlaceEvent,
  updateSLDAttributes,
  uuid,
  xmlnsNs,
} from './util.js';

function cutSectionAt(
  section: Element,
  index: number,
  [x, y]: Point,
  nsPrefix: string
): EditV2[] {
  const parent = section.parentElement!;
  const edits = [] as EditV2[];
  const vertices = Array.from(section.getElementsByTagNameNS(sldNs, 'Vertex'));
  const vertexAtXY = vertices.find(
    ve =>
      getSLDAttributes(ve, 'x') === x.toString() &&
      getSLDAttributes(ve, 'y') === y.toString()
  );

  if (
    vertexAtXY === vertices[0] ||
    vertexAtXY === vertices[vertices.length - 1]
  )
    return [];

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

@customElement('sld-editor')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SldEditor extends LitElement {
  @property() doc!: XMLDocument;

  @property()
  get docVersion(): number {
    return this._docVersion;
  }

  set docVersion(value: number) {
    this.connecting = undefined;
    if (!this.resizingBR?.parentElement) this.resizingBR = undefined;
    if (!this.placingLabel?.parentElement) this.placingLabel = undefined;
    this._docVersion = value;
  }

  @state()
  private _docVersion = -1;

  @state() gridSize = 32;

  @state() nsp = 'esldoscd';

  @state() resizingBR?: Element;

  @state() resizingTL?: Element;

  @state() placing?: Element;

  @state() placingOffset: Point = [0, 0];

  @state() placingLabel?: Element;

  @state() showLabels: boolean = true;

  @state()
  connecting?: {
    from: Element;
    path: Point[];
    fromTerminal: 'T1' | 'T2' | 'N1' | 'N2';
  };

  handleKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') this.reset();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties: Map<string, any>) {
    if (!changedProperties.has('doc')) return;
    const sldNsPrefix = this.doc.documentElement.lookupPrefix(sldNs);
    if (sldNsPrefix) this.nsp = sldNsPrefix;
    else
      this.doc.documentElement.setAttributeNS(
        xmlnsNs,
        `xmlns:${this.nsp}`,
        sldNs
      );

  }

  reset() {
    this.resizingBR = undefined;
    this.resizingTL = undefined;
    this.placing = undefined;
    this.placingLabel = undefined;
    this.connecting = undefined;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: false }));
  }

  resetWithOffset() {
    this.placingOffset = [0, 0];
    this.reset();
  }

  startResizingBottomRight(element: Element | undefined) {
    this.reset();
    this.resizingBR = element;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: true }));
  }

  startResizingTopLeft(element: Element | undefined) {
    this.reset();
    this.resizingTL = element;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: true }));
  }

  startPlacing(element: Element | undefined, offset: Point = [0, 0]) {
    this.reset();
    this.placing = element;
    this.placingOffset = offset;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: true }));
  }

  startPlacingLabel(element: Element | undefined, offset: Point = [0, 0]) {
    this.reset();
    this.placingLabel = element;
    this.placingOffset = offset;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: true }));
  }

  startConnecting(detail: StartConnectDetail) {
    this.reset();
    this.connecting = detail;
    this.dispatchEvent(new CustomEvent('sld-editor-in-action', { detail: true }));
  }

  rotateElement(element: Element) {
    const { rot } = attributes(element);
    const edits = [
      updateSLDAttributes(element, this.nsp, {
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
    this.dispatchEvent(newEditEventV2(edits));
  }

  placeLabel(element: Element, x: number, y: number) {
    const editV2 = updateSLDAttributes(element, this.nsp, {
      lx: x.toString(),
      ly: y.toString(),
    });
    this.dispatchEvent(newEditEventV2(editV2));
    this.reset();
  }

  placeElement(element: Element, parent: Element, x: number, y: number) {
    const edits: EditV2[] = [];
    if (element.parentElement !== parent) {
      edits.push(...reparentElement(element, parent));
    }

    const {
      pos: [oldX, oldY],
      label: [oldLX, oldLY],
      rot,
    } = attributes(element);

    const dx = x - oldX;
    const dy = y - oldY;

    if (element.localName !== 'Vertex') {
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
        if (rot < 2) lx += 1.5;
        else {
          lx -= 2;
          ly += 2;
        }
      }
      edits.push(
        updateSLDAttributes(element, this.nsp, {
          x: x.toString(),
          y: y.toString(),
          lx: (lx + dx).toString(),
          ly: (ly + dy).toString(),
        })
      );
    }

    Array.from(element.querySelectorAll('Text')).forEach(text => {
      const {
        label: [textLX, textLY],
      } = attributes(text);

      const newAttr = {
        lx: (textLX + dx).toString(),
        ly: (textLY + dy).toString(),
      };
      edits.push(updateSLDAttributes(text, this.nsp, newAttr));
    });

    Array.from(
      element.querySelectorAll(
        'Bay, ConductingEquipment, PowerTransformer, Vertex'
      )
    ).forEach(descendant => {
      const {
        pos: [descX, descY],
        label: [descLX, descLY],
      } = attributes(descendant);
      const newAttributes: { x: string; y: string; lx?: string; ly?: string } =
      {
        x: (descX + dx).toString(),
        y: (descY + dy).toString(),
      };
      if (descendant.localName !== 'Vertex') {
        newAttributes.lx = (descLX + dx).toString();
        newAttributes.ly = (descLY + dy).toString();
      }
      edits.push(updateSLDAttributes(descendant, this.nsp, newAttributes));
    });

    if (
      element.tagName === 'ConductingEquipment' ||
      element.tagName === 'PowerTransformer'
    ) {
      Array.from(element.querySelectorAll('Terminal, NeutralPoint'))
        .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
        .forEach(terminal => edits.push(...removeTerminal(terminal)));

      const groundedTerminals = Array.from(
        element.querySelectorAll('Terminal, NeutralPoint')
      ).filter(terminal => terminal.getAttribute('cNodeName') === 'grounded');

      if (groundedTerminals.length > 0) {
        const bayName = parent.closest('Bay')?.getAttribute('name');
        if (!bayName)
          groundedTerminals.forEach(terminal =>
            edits.push(...removeTerminal(terminal))
          );

        let newCNode = parent.querySelector(
          `ConnectivityNode[name="grounded"]`
        );

        if (!newCNode) {
          newCNode = this.doc.createElementNS(
            this.doc.documentElement.namespaceURI,
            'ConnectivityNode'
          );
          newCNode.setAttribute('name', 'grounded');
          newCNode.setAttribute('pathName', elementPath(parent, 'grounded'));

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

        groundedTerminals.forEach(terminal => {
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
    } else if (element.getRootNode() === this.doc) {
      Array.from(element.getElementsByTagName('ConnectivityNode')).forEach(
        cNode => {
          if (
            Array.from(
              this.doc.querySelectorAll(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"],
                     NeutralPoint[connectivityNode="${cNode.getAttribute(
                  'pathName'
                )}"]`
              )
            ).find(terminal => terminal.closest(element.tagName) !== element)
          )
            edits.push(...removeNode(cNode));
        }
      );
      Array.from(element.querySelectorAll('Terminal, NeutralPoint')).forEach(
        terminal => {
          const cNode = this.doc.querySelector(
            `ConnectivityNode[pathName="${terminal.getAttribute(
              'connectivityNode'
            )}"]`
          );
          if (cNode && cNode.closest(element.tagName) !== element)
            edits.push(...removeNode(cNode));
        }
      );
    }

    if (element.localName === 'Vertex') {
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
      if (isBusBar(bay)) {
        edits.push(...removeNode(section.closest('ConnectivityNode')!));
        edits.push(
          updateSLDAttributes(lastVertex, this.nsp, {
            x: x.toString(),
            y: y.toString(),
          })
        );
        edits.push(
          updateSLDAttributes(bay, this.nsp, {
            w: w.toString(),
            h: h.toString(),
          })
        );
      }
    }

    this.dispatchEvent(newEditEventV2(edits));
    if (
      ['Bay', 'VoltageLevel'].includes(element.tagName) &&
      (!getSLDAttributes(element, 'w') || !getSLDAttributes(element, 'h'))
    )
      this.startResizingBottomRight(element);
    else this.reset();
  }

  connectEquipment({
    from,
    fromTerminal,
    to,
    toTerminal,
    path,
  }: ConnectDetail) {
    if (
      from.tagName === 'TransformerWinding' &&
      to.tagName === 'TransformerWinding'
    )
      return;
    const edits = [] as EditV2[];
    let cNode: Element;
    let connectivityNode: string;
    let cNodeName: string;
    let priv: Element;
    if (to.tagName !== 'ConnectivityNode') {
      cNode = this.doc.createElementNS(
        this.doc.documentElement.namespaceURI,
        'ConnectivityNode'
      );
      cNode.setAttribute('name', 'L1');
      const bay = from.closest('Bay') || to.closest('Bay')!;
      edits.push(...reparentElement(cNode, bay));
      connectivityNode = (
        edits.find(
          e => 'attributes' in e && 'pathName' in e.attributes!
        ) as SetAttributes
      ).attributes!.pathName as string;
      cNodeName =
        ((
          edits.find(
            e => 'attributes' in e && 'name' in e.attributes!
          ) as SetAttributes
        )?.attributes!.name as string | undefined) ??
        cNode.getAttribute('name')!;
      priv = this.doc.createElementNS(
        this.doc.documentElement.namespaceURI,
        'Private'
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
    const section = this.doc.createElementNS(sldNs, `${this.nsp}:Section`);
    edits.push({ parent: priv!, node: section, reference: null });
    const fromTermUUID = uuid();
    const toTermUUID = uuid();
    path.forEach(([x, y], i) => {
      const vertex = this.doc.createElementNS(sldNs, `${this.nsp}:Vertex`);
      setSLDAttributes(vertex, this.nsp, { x: x.toString(), y: y.toString() });
      if (i === 0) setSLDAttributes(vertex, this.nsp, { uuid: fromTermUUID });
      else if (i === path.length - 1 && to.tagName !== 'ConnectivityNode')
        setSLDAttributes(vertex, this.nsp, { uuid: toTermUUID });
      edits.push({ parent: section, node: vertex, reference: null });
    });
    if (to.tagName === 'ConnectivityNode') {
      const [x, y] = path[path.length - 1];
      Array.from(priv.getElementsByTagNameNS(sldNs, 'Section')).find(s => {
        const sectionPath = Array.from(
          s.getElementsByTagNameNS(sldNs, 'Vertex')
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
            edits.push(cutSectionAt(s, i, [x, y], this.nsp));
            return true;
          }
        }
        return false;
      });
    }
    const [substationName, voltageLevelName, bayName] = connectivityNode.split(
      '/',
      3
    );
    const fromTagName = fromTerminal.startsWith('T')
      ? 'Terminal'
      : 'NeutralPoint';
    const fromTermElement = this.doc.createElementNS(
      this.doc.documentElement.namespaceURI,
      fromTagName
    );
    setSLDAttributes(fromTermElement, this.nsp, { uuid: fromTermUUID });
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
      const toTermElement = this.doc.createElementNS(
        this.doc.documentElement.namespaceURI,
        toTagName
      );
      setSLDAttributes(toTermElement, this.nsp, { uuid: toTermUUID });
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
    this.reset();
    this.dispatchEvent(newEditEventV2(edits));
  }

  render(): unknown {
    return html`${Array.from(
      this.doc.querySelectorAll(':root > Substation')
    ).map(
      subs =>
        html`<sld-substation-editor
          .doc=${this.doc}
          .docVersion=${this.docVersion}
          .substation=${subs}
          .gridSize=${this.gridSize}
          .resizingBR=${this.resizingBR}
          .resizingTL=${this.resizingTL}
          .placing=${this.placing}
          .placingOffset=${this.placingOffset}
          .placingLabel=${this.placingLabel}
          .connecting=${this.connecting}
          .showLabels=${this.showLabels}
          @oscd-sld-start-resize-br=${({ detail }: StartEvent) => {
            this.startResizingBottomRight(detail);
          }}
          @oscd-sld-start-resize-tl=${({ detail }: StartEvent) => {
            this.startResizingTopLeft(detail);
          }}
          @oscd-sld-start-place=${({
            detail: { element, offset },
          }: StartPlaceEvent) => {
            this.startPlacing(element, offset);
          }}
          @oscd-sld-start-place-label=${({
            detail: { element, offset },
          }: StartPlaceEvent) => {
            this.startPlacingLabel(element, offset);
          }}
          @oscd-sld-start-connect=${({ detail }: StartConnectEvent) => {
            this.startConnecting(detail);
          }}
          @oscd-sld-resize=${({ detail: { element, w, h } }: ResizeEvent) => {
            const resize = updateSLDAttributes(element, this.nsp, {
              w: w.toString(),
              h: h.toString(),
            });
            this.dispatchEvent(newEditEventV2(resize));
            this.reset();
          }}
          @oscd-sld-resize-tl=${({
            detail: { element, x, y, w, h },
          }: ResizeTLEvent) => {
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

            const resize = updateSLDAttributes(element, this.nsp, {
              x: x.toString(),
              y: y.toString(),
              w: w.toString(),
              h: h.toString(),
              lx: lx.toString(),
              ly: ly.toString(),
            });

            this.dispatchEvent(newEditEventV2(resize));
            this.reset();
          }}
          @oscd-sld-place=${({
            detail: { element, parent, x, y },
          }: PlaceEvent) => this.placeElement(element, parent, x, y)}
          @oscd-sld-place-label=${({
            detail: { element, x, y },
          }: PlaceLabelEvent) => this.placeLabel(element, x, y)}
          @oscd-sld-connect=${({ detail }: ConnectEvent) =>
            this.connectEquipment(detail)}
          @oscd-sld-rotate=${({ detail }: StartEvent) =>
            this.rotateElement(detail)}
        ></sld-substation-editor>`
    )}`;
  }
}
