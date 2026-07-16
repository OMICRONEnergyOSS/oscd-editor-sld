import type { Point } from '../../foundations/geometry.js';
import { type ConnectivityNodeContext } from './connectivity-node.js';
import type { SldArtifactDescriptor } from './artifact.js';
export type BusBarContext = ConnectivityNodeContext;
type BusBarRenderState = {
    diagramElementId?: string;
    dimensions: Point;
    position: Point;
};
type BusBarRenderActions = {
    onClick: () => void;
};
export declare const busBarArtifact: SldArtifactDescriptor<BusBarRenderState, BusBarRenderActions, BusBarContext>;
export {};
