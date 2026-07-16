import type { Point } from './geometry.js';
/** Returns the SLD sections in an element that are marked as busbar geometry. */
export declare function busSections(element: Element): Element[];
/** Checks whether a Bay element is represented as an SLD busbar. */
export declare function isBusBar(element: Element): boolean;
/** Creates the template Bay structure used by the palette for new busbars. */
export declare function makeBusBar(doc: XMLDocument, nsp: string): Element;
/** Builds the slash-separated SCL connectivity path for an element and optional child path parts. */
export declare function connectivityPath(element: Element, ...rest: string[]): string;
/** Calculates rendered anchor points for starting T1 and T2 connections from equipment. */
export declare function connectionStartPoints(equipment: Element): {
    T1: [Point, Point];
    T2: [Point, Point];
};
