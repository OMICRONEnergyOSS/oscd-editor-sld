export declare const privType = "OpenSCD-SLD-Layout";
export declare const sldNs = "https://openscd.org/SCL/SSD/SLD/v0";
/**
 * Fallback prefix for the SLD-layout namespace ({@link sldNs}), used only when a
 * document does not already declare one. Components detect the document's actual
 * prefix at runtime (`lookupPrefix(sldNs)`) and fall back to this shared default,
 * so every component stamps the *same* prefix and view-built edits stay
 * consistent with controller-built ones.
 */
export declare const defaultSldNsPrefix = "eosld";
export declare const xmlnsNs = "http://www.w3.org/2000/xmlns/";
export declare const svgNs = "http://www.w3.org/2000/svg";
export declare const xlinkNs = "http://www.w3.org/1999/xlink";
export declare const sclNs = "http://www.iec.ch/61850/2003/SCL";
/**
 * Reads the prefix a document uses for the SLD-layout namespace ({@link sldNs}),
 * falling back to {@link defaultSldNsPrefix} when the document declares none.
 *
 * `nsp` has no independent existence: it is a pure projection of the document.
 * Deriving it on demand (rather than storing and threading a copy) guarantees
 * every component stamps the *same* prefix, so view-built edits stay consistent
 * with controller-built ones. `lookupPrefix` only inspects the root element's
 * `xmlns:*` declarations, so this is O(1) in document size.
 */
export declare function sldPrefix(doc: XMLDocument | undefined): string;
/**
 * Whether `doc` already declares the SLD-layout namespace ({@link sldNs}) on its
 * root element. Unlike {@link sldPrefix} (which always returns a usable prefix,
 * falling back to {@link defaultSldNsPrefix}), this is a true predicate — use it
 * to decide whether the declaration still needs to be written. O(1) in document
 * size.
 */
export declare function hasSldNamespace(doc: XMLDocument | undefined): boolean;
export { eqTypes, isEqType, ringedEqTypes, singleTerminal, } from './foundations/equipment.js';
export { isTransformerKind } from './foundations/sld-attributes.js';
export { attributes, getSLDAttributes, setSLDAttributes, xmlBoolean, } from './foundations/sld-attributes.js';
export { updateSLDAttributes } from './foundations/sld-attribute-edits.js';
export { busSections, connectionStartPoints, connectivityPath, isBusBar, makeBusBar, } from './foundations/connectivity.js';
export { removeNode, removeTerminal, reparentElement, uniqueName, } from './foundations/connectivity-edits.js';
export { iedReferences, isIedReferenceElement, resolveIed, } from './foundations/ied.js';
export type { EqType } from './foundations/equipment.js';
export type { TransformerKind, Attrs, Style } from './foundations/sld-attributes.js';
export type { Point } from './foundations/geometry.js';
export { newConnectEvent, newPlaceEvent, newPlaceLabelEvent, newResizeEvent, newResizeTLEvent, newRotateEvent, newSelectEvent, newStartInteractionEvent, } from './foundations/events.js';
export type { ConnectDetail, ConnectEvent, InteractionIntent, PlaceDetail, PlaceEvent, PlaceLabelDetail, PlaceLabelEvent, ResizeDetail, ResizeEvent, ResizeTLDetail, ResizeTLEvent, SelectDetail, SelectEvent, StartConnectDetail, StartEvent, StartInteractionEvent, } from './foundations/events.js';
export declare function uuid(): string;
