import type { EditV2, SetAttributes } from '@openscd/oscd-api';
import type { Point } from './geometry.js';
import type { ConnectDetail } from './events.js';
export type TerminalName = 'T1' | 'T2' | 'N1' | 'N2';
/**
 * Whether applying `edit` would introduce content in the SLD-layout namespace
 * ({@link sldNs}) — i.e. it sets an `attributesNS` entry in that namespace or
 * inserts a node that is (or contains) an element/attribute in it. Removals do
 * not count: SLD content can only be removed from a document that already
 * declares the namespace, so {@link withSldNamespace}'s declaration guard makes
 * the remove cases moot.
 */
export declare function requiresSldNamespace(edit: EditV2): boolean;
/**
 * A tracked edit that declares the SLD-layout namespace ({@link sldNs}) on a
 * document's root element using {@link defaultSldNsPrefix}. Only ever invoked
 * (via {@link withSldNamespace}) on a document that declares no SLD prefix yet,
 * so the default is the correct prefix to introduce. Bundling this into the same
 * commit as the triggering SLD edit keeps it undoable in one step.
 */
export declare function declareSldNamespaceEdit(doc: XMLDocument): SetAttributes;
/**
 * Prepends a {@link declareSldNamespaceEdit} to `edits` iff the document does
 * not yet declare the SLD-layout namespace and `edits` actually introduces
 * SLD content. This is the only writer of the namespace declaration, and it
 * only ever runs as part of a user-triggered edit — never on load. Safe to call
 * around any dispatch: non-SLD edits and already-declared documents pass through
 * unchanged.
 */
export declare function withSldNamespace(doc: XMLDocument, edits: EditV2): EditV2;
export declare function createGroundTerminalEdits(equipment: Element, name: TerminalName): EditV2[] | null;
export declare function createFlipElementEdits(element: Element, nsp: string): EditV2[];
export declare function createAddTextEdit(element: Element, nsp: string): EditV2;
export declare function createDeleteBusBarEdits(busBar: Element): EditV2[];
export declare function createDeleteContainerEdits(container: Element): EditV2[];
export declare function createRotateEdits(element: Element, nsp: string): EditV2[];
export declare function createPlaceLabelEdit(element: Element, nsp: string, x: number, y: number): EditV2;
export declare function createResizeEdits(element: Element, nsp: string, w: number, h: number): EditV2;
export declare function createResizeTLEdits(element: Element, nsp: string, x: number, y: number, w: number, h: number): EditV2;
export declare function cutSectionAt(section: Element, index: number, [x, y]: Point, nsPrefix: string): EditV2[];
export declare function createConnectEdits({ from, fromTerminal, to, toTerminal, path }: ConnectDetail, doc: XMLDocument, nsp: string): EditV2[];
export declare function shiftElementEdits(element: Element, x: number, y: number, nsp: string): EditV2[];
export declare function shiftTextEdits(element: Element, dx: number, dy: number, nsp: string): EditV2[];
export declare function shiftDescendantEdits(element: Element, dx: number, dy: number, nsp: string): EditV2[];
export declare function rewireTerminalEdits(element: Element, parent: Element, doc: XMLDocument): EditV2[];
export declare function disconnectExternalEdits(element: Element, doc: XMLDocument): EditV2[];
export declare function busBarVertexEdits(element: Element, x: number, y: number, nsp: string): EditV2[];
export declare function wrapIedReferenceEdits(element: Element, parent: Element, doc: XMLDocument): EditV2[];
