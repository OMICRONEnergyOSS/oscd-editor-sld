import type { Point } from '../../foundations/geometry.js';
import { type Highlight } from './highlight.js';
import { type SldArtifactDescriptor, type SldSharedContext } from './artifact.js';
export type EquipmentContext = SldSharedContext & {
    groundTerminal(element: Element, terminal: 'T1' | 'T2'): void;
    highlight: Highlight[];
    mouseX: number;
    mouseY: number;
    nearestOpenTerminal(equipment?: Element): 'T1' | 'T2' | undefined;
};
export type EquipmentRenderState = {
    bottomGrounded: boolean;
    canShowBottomPort: boolean;
    canShowTopPort: boolean;
    clickthrough: boolean;
    diagramElementId?: string;
    disabled: boolean;
    highlightedStyle?: string;
    placingSelf: boolean;
    portPointerEventsDisabled: boolean;
    position: Point;
    selectable: boolean;
    showBottomConnectIndicator: boolean;
    showTopConnectIndicator: boolean;
    topGrounded: boolean;
};
export type EquipmentRenderActions = {
    onAuxClick: (event: MouseEvent) => void;
    onClick: (event: MouseEvent) => void;
    onContextMenu: (event: MouseEvent) => void;
    onGroundBottom: (event: MouseEvent) => void;
    onGroundTop: (event: MouseEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onStartBottomConnect: () => void;
    onStartTopConnect: () => void;
};
export declare const conductingEquipmentArtifact: SldArtifactDescriptor<EquipmentRenderState, EquipmentRenderActions, EquipmentContext>;
