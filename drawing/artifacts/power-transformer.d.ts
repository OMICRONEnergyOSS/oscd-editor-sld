import { type TemplateResult } from 'lit';
import type { Point } from '../../foundations/geometry.js';
import { type Highlight } from './highlight.js';
import { type SldArtifactDescriptor, type SldSharedContext } from './artifact.js';
export type PowerTransformerContext = SldSharedContext & {
    groundTerminal(element: Element, terminal: 'T1' | 'T2' | 'N1' | 'N2'): void;
    highlight: Highlight[];
    mouseX: number;
    mouseY: number;
};
type PowerTransformerRenderState = {
    disabled: boolean;
    highlight: TemplateResult | '';
    placingSelf: boolean;
    position: Point;
    selectable: boolean;
    windings: Element[];
};
type PowerTransformerRenderActions = {
    onAuxClick: (event: MouseEvent) => void;
    onClick: ((event: MouseEvent) => void) | symbol;
};
export declare const powerTransformerArtifact: SldArtifactDescriptor<PowerTransformerRenderState, PowerTransformerRenderActions, PowerTransformerContext>;
export {};
