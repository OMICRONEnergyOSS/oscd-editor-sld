import type { Style } from '../../foundations/sld-attributes.js';
export type Highlight = {
    id: string;
    style: Style;
};
export declare function isSelectable(element: Element, selectable: string[]): boolean;
export declare function isToBeHighlighted(element: Element, highlight: Highlight[]): boolean;
export declare function getHighlightStyle(element: Element, highlight: Highlight[]): string;
