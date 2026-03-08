import { EditV2, SetAttributes } from '@openscd/oscd-api';
import { getReference, identity } from '@openscd/scl-lib';
import { createElement } from '@openscd/scl-lib/dist/foundation/utils.js';

const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';
const newNs = 'https://openscd.org/SCL/SSD/SLD/v0';

const oldPrefix = 'esld';

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
  return [
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
  ].map(name => element.getAttributeNS(oldNs, name));
}

function addVertexes(
  parentSection: Element,
  vertex: Element,
  nsd: string
): void {
  const newVertex = vertex.ownerDocument!.createElementNS(
    newNs,
    `${nsd}:Vertex`
  );
  parentSection.appendChild(newVertex);

  const x = vertex.getAttributeNS(oldNs, 'x');
  const y = vertex.getAttributeNS(oldNs, 'y');
  const uuid = vertex.getAttributeNS(oldNs, 'uuid');
  if (x) newVertex.setAttributeNS(newNs, `${nsd}:x`, x);
  if (y) newVertex.setAttributeNS(newNs, `${nsd}:y`, y);
  if (uuid) newVertex.setAttributeNS(newNs, `${nsd}:uuid`, uuid);
}

function copySection(newPrivate: Element, section: Element, nsd: string): void {
  const newSection = section.ownerDocument!.createElementNS(
    newNs,
    `${nsd}:Section`
  );
  newPrivate.appendChild(newSection);

  const bus = section.getAttribute('bus');
  if (bus) newSection.setAttributeNS(newNs, `${nsd}:bus`, bus);

  const vertices = Array.from(section.querySelectorAll(':scope > Vertex'));
  vertices.forEach(vertex => addVertexes(newSection, vertex, nsd));
}

function copyConnNodePrivate(connNode: Element, nsd: string): EditV2[] {
  const oldPrivate = connNode.querySelector(
    ':scope > Private[type="Transpower-SLD-Vertices"]'
  );

  if (!oldPrivate) return [];

  const newPrivate = createElement(connNode.ownerDocument!, 'Private', {
    type: 'OpenSCD-SLD-Layout',
  });
  oldPrivate
    .querySelectorAll(':scope > Section')
    .forEach(section => copySection(newPrivate, section, nsd));

  const removeOldPrivate: EditV2 = {
    node: oldPrivate!,
  };

  const insertPrivate: EditV2 = {
    parent: connNode,
    node: newPrivate,
    reference: getReference(connNode, newPrivate.tagName),
  };

  return [insertPrivate, removeOldPrivate];
}

/**
 * Second-generation migration for legacy linked IED layout.
 *
 * This path migrates `OpenSCD-Linked-IEDs` entries (with `IEDName`) into
 * `Private[type="OpenSCD-SLD-Layout"]` containers under the Substation section,
 * using `Reference` elements with nested `SLDAttributes`.
 */
function migrateOldIEDNames(substation: Element, nsd: string): EditV2[] {
  const oldIedPrivates = Array.from(
    substation.querySelectorAll(':scope Private[type="OpenSCD-Linked-IEDs"]')
  );

  if (!oldIedPrivates) return [];

  const edits: EditV2[] = [];

  oldIedPrivates.forEach(oldIedPrivate => {
    const sldPrivateWithIEDs = createElement(
      oldIedPrivate.ownerDocument!,
      'Private',
      {
        type: 'OpenSCD-SLD-Layout',
      }
    );

    const oldIedNames = Array.from(
      oldIedPrivate.querySelectorAll(':scope > *')
    ).filter(
      el =>
        el.localName === 'IEDName' &&
        (el.getAttributeNS(oldNs, 'x') !== null ||
          el.getAttributeNS(oldNs, 'y') !== null ||
          el.getAttributeNS(oldNs, 'lx') !== null ||
          el.getAttributeNS(oldNs, 'ly') !== null)
    );

    if (oldIedNames.length === 0) return;

    oldIedNames.forEach(oldIed => {
      const name = oldIed.getAttributeNS(oldNs, 'name');
      const x = oldIed.getAttributeNS(oldNs, 'x');
      const y = oldIed.getAttributeNS(oldNs, 'y');
      const lx = oldIed.getAttributeNS(oldNs, 'lx');
      const ly = oldIed.getAttributeNS(oldNs, 'ly');

      const newIed = oldIed.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:Reference`
      );
      const sldAttributes = oldIed.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:SLDAttributes`
      );

      const sclIed = name
        ? oldIed.ownerDocument!.querySelector(`:root > IED[name="${name}"]`)
        : null;
      if (sclIed)
        newIed.setAttributeNS(newNs, `${nsd}:id`, String(identity(sclIed)));
      else if (name) newIed.setAttributeNS(newNs, `${nsd}:id`, `IED[${name}]`);
      newIed.setAttributeNS(newNs, `${nsd}:type`, 'IED');

      if (x) sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
      if (y) sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
      if (lx) sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
      if (ly) sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);

      newIed.appendChild(sldAttributes);

      sldPrivateWithIEDs.appendChild(newIed);
    });

    const insertNewIeds: EditV2 = {
      parent: oldIedPrivate.parentElement!,
      node: sldPrivateWithIEDs,
      reference: getReference(oldIedPrivate, sldPrivateWithIEDs.tagName),
    };

    const removeOldIeds: EditV2 = { node: oldIedPrivate };
    edits.push(insertNewIeds, removeOldIeds);
  });

  return edits;
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
function migrateLegacyIedCoordinates(doc: XMLDocument, nsd: string): EditV2[] {
  const substation = doc.querySelector(':root > Substation');
  if (!substation) return [];

  const iedNamesWithLegacyLinks = new Set(
    Array.from(
      substation.querySelectorAll(
        ':scope Private[type="OpenSCD-Linked-IEDs"] > IEDName'
      )
    )
      .map(iedName => iedName.getAttributeNS(oldNs, 'name'))
      .filter((name): name is string => !!name)
  );

  const legacyIeds = Array.from(doc.querySelectorAll(':root > IED')).filter(
    ied =>
      ied.getAttributeNS(oldNs, 'x') !== null ||
      ied.getAttributeNS(oldNs, 'y') !== null ||
      ied.getAttributeNS(oldNs, 'lx') !== null ||
      ied.getAttributeNS(oldNs, 'ly') !== null
  );

  if (legacyIeds.length === 0) return [];

  const edits: EditV2[] = [];
  let targetPrivate = substation.querySelector(
    ':scope > Private[type="OpenSCD-SLD-Layout"]'
  );

  if (!targetPrivate) {
    targetPrivate = createElement(substation.ownerDocument!, 'Private', {
      type: 'OpenSCD-SLD-Layout',
    });

    const insertPrivate: EditV2 = {
      parent: substation,
      node: targetPrivate,
      reference: getReference(substation, targetPrivate.tagName),
    };
    edits.push(insertPrivate);
  }

  legacyIeds.forEach(ied => {
    const iedName = ied.getAttribute('name');
    const x = ied.getAttributeNS(oldNs, 'x');
    const y = ied.getAttributeNS(oldNs, 'y');
    const lx = ied.getAttributeNS(oldNs, 'lx');
    const ly = ied.getAttributeNS(oldNs, 'ly');

    const linkedByLegacyIedName =
      !!iedName && iedNamesWithLegacyLinks.has(iedName);

    if (!linkedByLegacyIedName) {
      const iedReference = ied.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:Reference`
      );
      iedReference.setAttributeNS(newNs, `${nsd}:id`, String(identity(ied)));
      iedReference.setAttributeNS(newNs, `${nsd}:type`, 'IED');

      const sldAttributes = ied.ownerDocument!.createElementNS(
        newNs,
        `${nsd}:SLDAttributes`
      );
      if (x) sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
      if (y) sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
      if (lx) sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
      if (ly) sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);

      iedReference.appendChild(sldAttributes);

      const insertIedReference: EditV2 = {
        parent: targetPrivate!,
        node: iedReference,
        reference: getReference(targetPrivate!, iedReference.tagName),
      };
      edits.push(insertIedReference);
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
    edits.push(resetIedLegacyCoordinates);
  });

  return edits;
}

function noLayoutAttributes(element: Element): boolean {
  return attributes(element).some(attr => attr !== null);
}

function pushToPrivate(element: Element, nsd: string): EditV2 {
  if (!noLayoutAttributes(element)) return [];

  const resetOldAttributes: SetAttributes = {
    element,
    attributes: {},
    attributesNS: {
      [`${oldNs}`]: nulledAttributes,
    },
  };

  const sldPrivate = createElement(element.ownerDocument!, 'Private', {
    type: 'OpenSCD-SLD-Layout',
  });
  const sldAttributes = element.ownerDocument!.createElementNS(
    newNs,
    `${nsd}:SLDAttributes`
  );
  sldPrivate.insertBefore(sldAttributes, null);

  const [x, y, w, h, rot, lx, ly, kind, flip, color, weight, uuid] =
    attributes(element);
  if (x) sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
  if (y) sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
  if (w) sldAttributes.setAttributeNS(newNs, `${nsd}:w`, w);
  if (h) sldAttributes.setAttributeNS(newNs, `${nsd}:h`, h);
  if (rot) sldAttributes.setAttributeNS(newNs, `${nsd}:rot`, rot);
  if (lx) sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
  if (ly) sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);
  if (kind) sldAttributes.setAttributeNS(newNs, `${nsd}:kind`, kind);
  if (flip) sldAttributes.setAttributeNS(newNs, `${nsd}:flip`, flip);
  if (color) sldAttributes.setAttributeNS(newNs, `${nsd}:color`, color);
  if (weight) sldAttributes.setAttributeNS(newNs, `${nsd}:weight`, weight);
  if (uuid) sldAttributes.setAttributeNS(newNs, `${nsd}:uuid`, uuid);

  const insertPrivate: EditV2 = {
    parent: element,
    node: sldPrivate,
    reference: getReference(element, sldPrivate.tagName),
  };

  return [resetOldAttributes, insertPrivate];
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
  const processElements = doc.querySelectorAll(
    ':root > Substation, :root > Substation :not(Section, Vertex)'
  );
  const privateEdits: EditV2[] = Array.from(processElements).flatMap(el =>
    pushToPrivate(el, nsd)
  );

  const connNodes = doc.querySelectorAll(':root > Substation ConnectivityNode');
  const sectionCopy = Array.from(connNodes).flatMap(connNode =>
    copyConnNodePrivate(connNode, nsd)
  );

  const substations = doc.querySelectorAll(':root > Substation');
  const iedMigration = Array.from(substations).flatMap(substation =>
    migrateOldIEDNames(substation, nsd)
  );

  const legacyIedCoordinateMigration = migrateLegacyIedCoordinates(doc, nsd);

  const namespaceEdits = replaceNamespace(doc, nsd);

  return [
    ...privateEdits,
    ...sectionCopy,
    ...iedMigration,
    ...legacyIedCoordinateMigration,
    ...namespaceEdits,
  ];
}

export function hasOldNamespace(doc: XMLDocument): boolean {
  return !!doc.documentElement.lookupPrefix(oldNs);
}
