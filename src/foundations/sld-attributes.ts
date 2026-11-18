import { getReference } from '@openscd/scl-lib';

import { isIedReferenceElement } from './ied.js';
import { privType, sldNs } from '../foundations.js';

import type { Point } from './geometry.js';

export type Style = {
  fill?: string;
  fillOpacity?: number | string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeOpacity?: number | string;
  rx?: string | number;
};

const transformerKinds = ['default', 'auto', 'earthing'] as const;

/**
 * Fallback colour for a label with no persisted `color` SLDAttribute. This is a
 * document-data default (the value a label is treated as having when unset), not
 * a themable render token — kept a concrete literal so it round-trips through the
 * SCL unchanged. Shared with the context menu's "Reset Color" no-op check.
 */
export const DEFAULT_LABEL_COLOR = '#000';

export type TransformerKind = (typeof transformerKinds)[number];

export function isTransformerKind(
  kind: string | null,
): kind is TransformerKind {
  return transformerKinds.includes(kind as TransformerKind);
}

export type Attrs = {
  pos: Point;
  dim: Point;
  label: Point;
  flip: boolean;
  rot: 0 | 1 | 2 | 3;
  bus: boolean;
  weight: number;
  color: string;
  kind: TransformerKind;
};

export function xmlBoolean(value?: string | null) {
  return ['true', '1'].includes(value?.trim() ?? 'false');
}

/** Finds the parent's `Private[@type="OpenSCD-SLD-Layout"]`, if any. */
export function layoutPrivate(parent: Element): Element | null {
  return (
    Array.from(parent.children).find(
      child =>
        child.localName === 'Private' &&
        child.getAttribute('type') === privType,
    ) ?? null
  );
}

/**
 * Finds (or, given a prefix, creates) the `TextLayout` that describes the
 * single direct `Text` child of `parent`. It lives in the parent's layout
 * `Private`, as SCL does not permit a `Private` inside `Text`.
 */
export function textLayout(parent: Element, nsPrefix?: string): Element | null {
  const priv = layoutPrivate(parent);
  const existing = priv
    ? Array.from(priv.children).find(
      child =>
        child.localName === 'TextLayout' && child.namespaceURI === sldNs,
    ) ?? null
    : null;
  if (existing || !nsPrefix) {
    return existing;
  }

  const doc = parent.ownerDocument;
  const privEl =
    priv ?? doc.createElementNS(doc.documentElement.namespaceURI, 'Private');
  if (!priv) {
    privEl.setAttribute('type', privType);
    parent.insertBefore(privEl, getReference(parent, 'Private'));
  }
  const layout = doc.createElementNS(sldNs, `${nsPrefix}:TextLayout`);
  privEl.appendChild(layout);
  return layout;
}

export function sldAttributes(
  element: Element,
  nsPrefix?: string,
): Element | null {
  if (element.localName === 'Text') {
    return element.parentElement
      ? textLayout(element.parentElement, nsPrefix)
      : null;
  }

  if (isIedReferenceElement(element)) {
    const referenceSldAttrs = Array.from(element.children).find(
      child =>
        child.localName === 'SLDAttributes' && child.namespaceURI === sldNs,
    );
    if (referenceSldAttrs) {
      return referenceSldAttrs;
    }
    if (!nsPrefix) {
      return null;
    }

    const sldAttrs = element.ownerDocument.createElementNS(
      sldNs,
      `${nsPrefix}:SLDAttributes`,
    );
    element.appendChild(sldAttrs);
    return sldAttrs;
  }

  const priv = Array.from(element.children).find(
    child =>
      child.localName === 'Private' &&
      child.getAttribute('type') === privType,
  );
  const sldAttrs = priv
    ? Array.from(priv.children).find(
      child =>
        child.localName === 'SLDAttributes' && child.namespaceURI === sldNs,
    ) ?? null
    : null;

  if (sldAttrs) {
    return sldAttrs;
  }
  if (!nsPrefix) {
    return null;
  }

  const doc = element.ownerDocument;
  const privEl =
    priv ?? doc.createElementNS(doc.documentElement.namespaceURI, 'Private');

  if (!priv) {
    privEl.setAttribute('type', privType);
    element.insertBefore(privEl, getReference(element, 'Private'));
  }

  const sldAttrsNew = doc.createElementNS(sldNs, `${nsPrefix}:SLDAttributes`);
  privEl.insertBefore(sldAttrsNew, null);

  return sldAttrsNew;
}

export function setSLDAttributes(
  element: Element,
  nsPrefix: string,
  values: Record<string, string>,
): void {
  const isSectionOrVertex = ['Section', 'Vertex'].includes(element.localName);

  if (isSectionOrVertex) {
    Object.entries(values).forEach(([key, value]) => {
      element.setAttributeNS(sldNs, `${nsPrefix}:${key}`, value);
    });
  } else {
    Object.entries(values).forEach(([key, value]) =>
      sldAttributes(element, nsPrefix)?.setAttributeNS(
        sldNs,
        `${nsPrefix}:${key}`,
        value,
      ),
    );
  }
}

export function getSLDAttributes(element: Element, key: string): string | null {
  const isSectionOrVertex = ['Section', 'Vertex'].includes(element.localName);
  if (isSectionOrVertex) {
    return element.getAttributeNS(sldNs, key);
  }

  return sldAttributes(element)?.getAttributeNS(sldNs, key) ?? null;
}

export function attributes(element: Element): Attrs {
  // Resolve the SLD-attribute source node once. `getSLDAttributes` would
  // otherwise re-run the (children-scanning) `sldAttributes` lookup for each of
  // the ~12 keys read below — a measurable cost when rendering thousands of
  // elements. Semantics match `getSLDAttributes`: Section/Vertex carry the
  // attributes directly, every other element via its SLDAttributes private.
  const isSectionOrVertex = ['Section', 'Vertex'].includes(element.localName);
  const source = isSectionOrVertex ? element : sldAttributes(element);
  const read = (key: string): string | null =>
    source?.getAttributeNS(sldNs, key) ?? null;

  const [x, y, w, h, rotVal, labelX, labelY] = [
    'x',
    'y',
    'w',
    'h',
    'rot',
    'lx',
    'ly',
  ].map(name => parseFloat(read(name) ?? '0'));
  const weight = parseInt(read('weight') ?? '300', 10);
  const pos = [x, y].map(d => Math.max(0, d)) as Point;
  const dim = [w, h].map(d => Math.max(1, d)) as Point;
  const label = [labelX, labelY].map(d => Math.max(0, d)) as Point;

  const bus = xmlBoolean(read('bus'));
  const flip = xmlBoolean(read('flip'));
  const kindVal = read('kind');
  const kind = isTransformerKind(kindVal) ? kindVal : 'default';
  const color = read('color') || DEFAULT_LABEL_COLOR;

  const rot = (((rotVal % 4) + 4) % 4) as 0 | 1 | 2 | 3;

  return { pos, dim, label, flip, rot, bus, weight, color, kind };
}
