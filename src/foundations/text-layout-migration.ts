import { getReference } from '@openscd/scl-lib';

import { privType, sldNs } from '../foundations.js';
import { layoutPrivate, textLayout } from './sld-attributes.js';

import type { EditV2 } from '@openscd/oscd-api';

const legacySelector = `Substation Text > Private[type="${privType}"]`;
const textLayoutNames = ['lx', 'ly', 'rot', 'color', 'weight'];

/**
 * Whether the document still stores Text layout in a `Private` inside `Text`,
 * which SCL does not permit. The layout now lives in a `TextLayout` in the
 * parent's own layout `Private`.
 */
export function hasLegacyTextLayout(doc: XMLDocument): boolean {
  return !!doc.querySelector(legacySelector);
}

/**
 * Moves legacy `Text/Private` layout into the parent's `TextLayout`. Where the
 * parent already has a `TextLayout`, the legacy values are discarded.
 */
export function migrateTextLayoutEdits(
  doc: XMLDocument,
  nsp: string,
): EditV2[] {
  const edits: EditV2[] = [];
  const migrated = new Set<Element>();

  doc.querySelectorAll(legacySelector).forEach((legacy) => {
    const parent = legacy.parentElement!.parentElement!;
    edits.push({ node: legacy });

    const source = Array.from(legacy.children).find(
      child =>
        child.localName === 'SLDAttributes' && child.namespaceURI === sldNs,
    );
    const values = textLayoutNames
      .map(name => [name, source?.getAttributeNS(sldNs, name)] as const)
      .filter(([, value]) => !!value);

    if (!values.length || textLayout(parent) || migrated.has(parent)) {
      return;
    }
    migrated.add(parent);

    const layout = doc.createElementNS(sldNs, `${nsp}:TextLayout`);
    values.forEach(([name, value]) =>
      layout.setAttributeNS(sldNs, `${nsp}:${name}`, value!),
    );

    const priv = layoutPrivate(parent);
    if (priv) {
      edits.push({ node: layout, parent: priv, reference: null });
      return;
    }
    const newPriv = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private',
    );
    newPriv.setAttribute('type', privType);
    newPriv.appendChild(layout);
    edits.push({
      node: newPriv,
      parent,
      reference: getReference(parent, 'Private'),
    });
  });

  return edits;
}
