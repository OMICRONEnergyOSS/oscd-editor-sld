import type { EditV2 } from '@openscd/oscd-api';
/**
 * Whether the document still stores Text layout in a `Private` inside `Text`,
 * which SCL does not permit. The layout now lives in a `TextLayout` in the
 * parent's own layout `Private`.
 */
export declare function hasLegacyTextLayout(doc: XMLDocument): boolean;
/**
 * Moves legacy `Text/Private` layout into the parent's `TextLayout`. Where the
 * parent already has a `TextLayout`, the legacy values are discarded.
 */
export declare function migrateTextLayoutEdits(doc: XMLDocument, nsp: string): EditV2[];
