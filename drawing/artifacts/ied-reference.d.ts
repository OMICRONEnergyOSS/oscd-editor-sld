import type { Point } from '../../foundations/geometry.js';
import { type SldArtifactDescriptor } from './artifact.js';
type IedReferenceRenderState = {
    clickthrough: boolean;
    diagramElementId?: string;
    disabled: boolean;
    iedName: string | null;
    placingSelf: boolean;
    position: Point;
    selectable: boolean;
};
type IedReferenceRenderActions = {
    onClick: (event: MouseEvent) => void;
    onContextMenu: (event: MouseEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
};
export declare const iedReferenceArtifact: SldArtifactDescriptor<IedReferenceRenderState, IedReferenceRenderActions>;
export {};
