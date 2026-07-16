/**
 * Element-aware geometry helpers.
 *
 * These bridge SCL Elements to the pure rectangle math in geometry.ts by
 * reading spatial attributes from elements and delegating to contains/overlaps.
 */
export declare function containsRect(element: Element, x0: number, y0: number, w0: number, h0: number): boolean;
export declare function overlapsRect(element: Element, x0: number, y0: number, w0: number, h0: number): boolean;
