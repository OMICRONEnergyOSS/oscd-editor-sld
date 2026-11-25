import { getReference, identity } from '@openscd/scl-lib';
import { createElement } from '@openscd/scl-lib/dist/foundation/utils.js';

import { privType, sldNs } from './foundations.js';
import { layoutPrivate } from './foundations/sld-attributes.js';

import type { EditV2, SetAttributes } from '@openscd/oscd-api';

const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';
const newNs = 'https://openscd.org/SCL/SSD/SLD/v0';

const oldPrefix = 'esld';

// SLDv1 element layout attributes migrated here, not the complete SLDv1 format.
const legacyLayoutAttributeNames = [
  'x',
  'y',
  'w',
  'h',
  'rot',
  'lx',
  'ly',
  'kind',
  'flip',
  'color',
  'weight',
  'uuid',
];

const coordinateNames = ['x', 'y', 'w', 'h', 'lx', 'ly'];

const nulledAttributes = {
  [`${oldPrefix}:x`]: null,
  [`${oldPrefix}:y`]: null,
  [`${oldPrefix}:w`]: null,
  [`${oldPrefix}:h`]: null,
  [`${oldPrefix}:lx`]: null,
  [`${oldPrefix}:ly`]: null,
  [`${oldPrefix}:rot`]: null,
  [`${oldPrefix}:flip`]: null,
  [`${oldPrefix}:color`]: null,
  [`${oldPrefix}:weight`]: null,
  [`${oldPrefix}:kind`]: null,
  [`${oldPrefix}:uuid`]: null,
};

function attributes(element: Element): (string | null)[] {
  return legacyLayoutAttributeNames.map(name => element.getAttributeNS(oldNs, name));
}

// Plans one conversion before edits are applied. Substation coordinates and
// IED references can both need the same Private, even when it does not exist yet.
function conversionContext() {
  const edits: EditV2[] = [];
  const privates = new Map<Element, Element>();
  const layouts = new Map<Element, Map<string, Element>>();

  // Returns the Private; if new, adds its Insert to edits before child inserts.
  function privateFor(parent: Element): Element {
    const planned = privates.get(parent);
    if (planned) {
      return planned;
    }

    const existing = layoutPrivate(parent);
    if (existing) {
      privates.set(parent, existing);
      return existing;
    }

    const created = createElement(parent.ownerDocument, 'Private', {
      type: privType,
    });
    privates.set(parent, created);
    edits.push({
      parent,
      node: created,
      reference: getReference(parent, created.tagName),
    });
    return created;
  }

  function addToPrivate(parent: Element, node: Element): void {
    edits.push({ parent: privateFor(parent), node, reference: null });
  }

  // Returns the layout child; if new, adds its Insert to edits.
  function layoutFor(parent: Element, name: string, nsd: string): Element {
    const priv = privateFor(parent);
    let children = layouts.get(priv);
    if (!children) {
      children = new Map();
      layouts.set(priv, children);
    }
    const planned = children.get(name);
    if (planned) {
      return planned;
    }
    const existing = Array.from(priv.children).find(
      child => child.localName === name && child.namespaceURI === sldNs,
    );
    const layout = existing ?? parent.ownerDocument.createElementNS(
      sldNs,
      `${nsd}:${name}`,
    );
    children.set(name, layout);
    if (!existing) {
      edits.push({ parent: priv, node: layout, reference: null });
    }
    return layout;
  }

  return { edits, addToPrivate, layoutFor };
}

type ConversionContext = ReturnType<typeof conversionContext>;

function addVertexes(
  parentSection: Element,
  vertex: Element,
  nsd: string,
): void {
  const newVertex = vertex.ownerDocument!.createElementNS(
    newNs,
    `${nsd}:Vertex`,
  );
  parentSection.appendChild(newVertex);

  const x = vertex.getAttributeNS(oldNs, 'x');
  const y = vertex.getAttributeNS(oldNs, 'y');
  const uuid = vertex.getAttributeNS(oldNs, 'uuid');
  if (x) {
    newVertex.setAttributeNS(newNs, `${nsd}:x`, x);
  }
  if (y) {
    newVertex.setAttributeNS(newNs, `${nsd}:y`, y);
  }
  if (uuid) {
    newVertex.setAttributeNS(newNs, `${nsd}:uuid`, uuid);
  }
}

function copySection(section: Element, nsd: string): Element {
  const newSection = section.ownerDocument!.createElementNS(
    newNs,
    `${nsd}:Section`,
  );

  const bus = section.getAttribute('bus');
  if (bus) {
    newSection.setAttributeNS(newNs, `${nsd}:bus`, bus);
  }

  const vertices = Array.from(section.querySelectorAll(':scope > Vertex'));
  vertices.forEach(vertex => addVertexes(newSection, vertex, nsd));
  return newSection;
}

function copyConnNodePrivate(
  context: ConversionContext,
  connNode: Element,
  nsd: string,
): void {
  const oldPrivate = connNode.querySelector(
    ':scope > Private[type="Transpower-SLD-Vertices"]',
  );

  if (!oldPrivate) {
    return;
  }

  oldPrivate
    .querySelectorAll(':scope > Section')
    .forEach(section =>
      context.addToPrivate(connNode, copySection(section, nsd)),
    );

  context.edits.push({ node: oldPrivate });
}

/**
 * Second-generation migration for legacy linked IED layout.
 *
 * This path migrates `OpenSCD-Linked-IEDs` entries (with `IEDName`) into
 * `Private[type="OpenSCD-SLD-Layout"]` containers under the Substation section,
 * using `Reference` elements with nested `SLDAttributes`.
 */
function migrateOldIEDNames(
  context: ConversionContext,
  substation: Element,
  nsd: string,
): void {
  const oldIedPrivates = Array.from(
    substation.querySelectorAll(':scope Private[type="OpenSCD-Linked-IEDs"]'),
  );

  oldIedPrivates.forEach((oldIedPrivate) => {
    const oldIedNames = Array.from(
      oldIedPrivate.querySelectorAll(':scope > *'),
    ).filter(
      el =>
        el.localName === 'IEDName' &&
        (el.getAttributeNS(oldNs, 'x') !== null ||
          el.getAttributeNS(oldNs, 'y') !== null ||
          el.getAttributeNS(oldNs, 'lx') !== null ||
          el.getAttributeNS(oldNs, 'ly') !== null),
    );

    if (oldIedNames.length === 0) {
      return;
    }

    oldIedNames.forEach((oldIed) => {
      const name = oldIed.getAttributeNS(oldNs, 'name');
      const x = oldIed.getAttributeNS(oldNs, 'x');
      const y = oldIed.getAttributeNS(oldNs, 'y');
      const lx = oldIed.getAttributeNS(oldNs, 'lx');
      const ly = oldIed.getAttributeNS(oldNs, 'ly');

      const iedReference = oldIed.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:Reference`,
      );
      const sldAttributes = oldIed.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:SLDAttributes`,
      );

      const sclIed = name
        ? oldIed.ownerDocument!.querySelector(`:root > IED[name="${name}"]`)
        : null;
      if (sclIed) {
        iedReference.setAttributeNS(
          newNs,
          `${nsd}:id`,
          String(identity(sclIed)),
        );
      } else if (name) {
        iedReference.setAttributeNS(newNs, `${nsd}:id`, `IED[${name}]`);
      }
      iedReference.setAttributeNS(newNs, `${nsd}:type`, 'IED');

      if (x) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
      }
      if (y) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
      }
      if (lx) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
      }
      if (ly) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);
      }

      iedReference.appendChild(sldAttributes);

      context.addToPrivate(oldIedPrivate.parentElement!, iedReference);
    });

    context.edits.push({ node: oldIedPrivate });
  });
}

/**
 * Legacy migration for IED coordinates that were written directly on `IED`.
 *
 * In this earliest format, layout coordinates lived on the IED itself
 * (`esld:x`, `esld:y`, `esld:lx`, `esld:ly`), which was problematic because many
 * IED manufacturer tools did not retain these non-Private layout attributes.
 * This migration moves those coordinates into Substation layout Private data by
 * creating `Reference` + nested `SLDAttributes` and clearing the old IED attrs.
 */
function migrateLegacyIedCoordinates(
  context: ConversionContext,
  doc: XMLDocument,
  nsd: string,
): void {
  const substation = doc.querySelector(':root > Substation');
  if (!substation) {
    return;
  }

  const oldLinkedIedNames = new Set(
    Array.from(
      substation.querySelectorAll(
        ':scope Private[type="OpenSCD-Linked-IEDs"] > IEDName',
      ),
    )
      .map(iedName => iedName.getAttributeNS(oldNs, 'name'))
      .filter((name): name is string => !!name),
  );

  const legacyIeds = Array.from(doc.querySelectorAll(':root > IED')).filter(
    ied =>
      ied.getAttributeNS(oldNs, 'x') !== null ||
      ied.getAttributeNS(oldNs, 'y') !== null ||
      ied.getAttributeNS(oldNs, 'lx') !== null ||
      ied.getAttributeNS(oldNs, 'ly') !== null,
  );

  if (legacyIeds.length === 0) {
    return;
  }

  legacyIeds.forEach((ied) => {
    const iedName = ied.getAttribute('name');
    const x = ied.getAttributeNS(oldNs, 'x');
    const y = ied.getAttributeNS(oldNs, 'y');
    const lx = ied.getAttributeNS(oldNs, 'lx');
    const ly = ied.getAttributeNS(oldNs, 'ly');

    const referencedByOldIedName = !!iedName && oldLinkedIedNames.has(iedName);

    /* Only migrate IEDs which aren't already linked by IEDName elements. 
    Previously without a migration tool, files exist with both coordinates. */
    if (!referencedByOldIedName) {
      const iedReference = ied.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:Reference`,
      );
      iedReference.setAttributeNS(newNs, `${nsd}:id`, String(identity(ied)));
      iedReference.setAttributeNS(newNs, `${nsd}:type`, 'IED');

      const sldAttributes = ied.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:SLDAttributes`,
      );
      if (x) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
      }
      if (y) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
      }
      if (lx) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
      }
      if (ly) {
        sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);
      }

      iedReference.appendChild(sldAttributes);

      context.addToPrivate(substation, iedReference);
    }

    const resetIedLegacyCoordinates: SetAttributes = {
      element: ied,
      attributes: {},
      attributesNS: {
        [`${oldNs}`]: {
          [`${oldPrefix}:x`]: null,
          [`${oldPrefix}:y`]: null,
          [`${oldPrefix}:lx`]: null,
          [`${oldPrefix}:ly`]: null,
        },
      },
    };
    context.edits.push(resetIedLegacyCoordinates);
  });
}

function noLayoutAttributes(element: Element): boolean {
  return attributes(element).some(attr => attr !== null);
}

const textLayoutNames = ['lx', 'ly', 'rot', 'color', 'weight'];

function copyLayoutAttributes(
  context: ConversionContext,
  target: Element,
  element: Element,
  nsd: string,
  only?: string[],
): void {
  const values = attributes(element);
  const updates: Record<string, string> = {};
  legacyLayoutAttributeNames.forEach((name, i) => {
    if (
      values[i] &&
      (!only || only.includes(name)) &&
      !target.hasAttributeNS(newNs, name)
    ) {
      updates[`${nsd}:${name}`] = values[i]!;
    }
  });
  if (Object.keys(updates).length > 0) {
    context.edits.push({
      element: target,
      attributesNS: { [newNs]: updates },
    });
  }
}

function resetOldAttributes(element: Element): SetAttributes {
  return {
    element,
    attributes: {},
    attributesNS: {
      [`${oldNs}`]: nulledAttributes,
    },
  };
}

function pushToPrivate(
  context: ConversionContext,
  element: Element,
  nsd: string,
): void {
  // The SCL Text element cannot hold a Private, so its layout is stored as a
  // TextLayout in the parent's Private.
  const text = element.querySelector(':scope > Text');
  const hasOwnLayout = noLayoutAttributes(element);
  const hasTextLayout = !!text && noLayoutAttributes(text);
  if (!hasOwnLayout && !hasTextLayout) {
    return;
  }

  if (hasOwnLayout) {
    context.edits.push(resetOldAttributes(element));
  }
  if (hasTextLayout) {
    context.edits.push(resetOldAttributes(text!));
  }

  if (hasOwnLayout) {
    copyLayoutAttributes(
      context,
      context.layoutFor(element, 'SLDAttributes', nsd),
      element,
      nsd,
    );
  }
  if (hasTextLayout) {
    copyLayoutAttributes(
      context,
      context.layoutFor(element, 'TextLayout', nsd),
      text!,
      nsd,
      textLayoutNames,
    );
  }
}

function replaceNamespace(doc: XMLDocument, nsd: string): EditV2[] {
  const scl = doc.querySelector(':root');

  const removeOldXmlNS: EditV2 = {
    element: scl!,
    attributes: {
      'xmlns:esld': null,
    },
    attributesNS: {},
  };

  const setNewXmlNS: EditV2 = {
    element: scl!,
    attributes: {
      [`xmlns:${nsd}`]: newNs,
    },
    attributesNS: {},
  };

  return [removeOldXmlNS, setNewXmlNS];
}

export function convertSldLayout(doc: XMLDocument, nsd: string): EditV2 {
  const context = conversionContext();
  const processElements = doc.querySelectorAll(
    ':root > Substation, :root > Substation :not(Section, Vertex, Text)',
  );
  processElements.forEach(el => pushToPrivate(context, el, nsd));

  const connNodes = doc.querySelectorAll(':root > Substation ConnectivityNode');
  connNodes.forEach(connNode => copyConnNodePrivate(context, connNode, nsd));

  const substations = doc.querySelectorAll(':root > Substation');
  substations.forEach(substation => migrateOldIEDNames(context, substation, nsd));
  migrateLegacyIedCoordinates(context, doc, nsd);

  return [...context.edits, ...replaceNamespace(doc, nsd)];
}

export function hasPrivateLayout(doc: XMLDocument): boolean {
  const privates = doc.querySelectorAll(
    `:root > Substation Private[type="${privType}"]`,
  );
  for (const priv of Array.from(privates)) {
    const layout = Array.from(
      priv.querySelectorAll('SLDAttributes, TextLayout, Vertex'),
    );
    for (const element of layout) {
      if (
        element.namespaceURI === sldNs &&
        coordinateNames.some(name => element.hasAttributeNS(sldNs, name))
      ) {
        return true;
      }
    }
  }
  return false;
}

export function hasLegacyLayout(doc: XMLDocument): boolean {
  const elements = doc.querySelectorAll(':root > Substation, :root > Substation *');
  if (elements.length === 0) {
    return false;
  }
  if (Array.from(elements).some(element =>
    coordinateNames.some(name => element.hasAttributeNS(oldNs, name)),
  )) {
    return true;
  }
  return Array.from(doc.querySelectorAll(':root > IED')).some(ied =>
    ['x', 'y', 'lx', 'ly'].some(name => ied.hasAttributeNS(oldNs, name)),
  );
}
