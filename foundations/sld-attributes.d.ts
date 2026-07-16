import type { Point } from './geometry.js';
export type Style = {
    fill?: string;
    fillOpacity?: number | string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeOpacity?: number | string;
    rx?: string | number;
};
declare const transformerKinds: readonly ["default", "auto", "earthing"];
/**
 * Fallback colour for a label with no persisted `color` SLDAttribute. This is a
 * document-data default (the value a label is treated as having when unset), not
 * a themable render token — kept a concrete literal so it round-trips through the
 * SCL unchanged. Shared with the context menu's "Reset Color" no-op check.
 */
export declare const DEFAULT_LABEL_COLOR = "#000";
export type TransformerKind = (typeof transformerKinds)[number];
export declare function isTransformerKind(kind: string | null): kind is TransformerKind;
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
export declare function xmlBoolean(value?: string | null): boolean;
export declare function sldAttributes(element: Element, nsPrefix?: string): Element | null;
export declare function setSLDAttributes(element: Element, nsPrefix: string, values: Record<string, string>): void;
export declare function getSLDAttributes(element: Element, key: string): string | null;
export declare function attributes(element: Element): Attrs;
export {};
