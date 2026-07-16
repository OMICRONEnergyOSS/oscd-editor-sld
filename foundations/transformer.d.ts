import type { Point } from './geometry.js';
import type { Attrs } from './sld-attributes.js';
export type TransformerTerminalName = 'T1' | 'T2' | 'N1' | 'N2';
export type TransformerWindingMeasures = {
    center: Point;
    size: number;
    terminals: Partial<Record<TransformerTerminalName, Point>>;
    grounded: Partial<Record<'N1' | 'N2', [Point, Point]>>;
    arc?: {
        from: Point;
        fromCtl: Point;
        to: Point;
        toCtl: Point;
    };
    zigZagTransform?: string;
};
export declare function transformerWindingMeasures(winding: Element, transformerPosition: Point, { rot, kind, flip }: Pick<Attrs, 'rot' | 'kind' | 'flip'>, twoWindingEarthingZigZagTransform: string): TransformerWindingMeasures;
