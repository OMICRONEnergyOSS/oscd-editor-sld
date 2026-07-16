import type { Point } from './geometry.js';
export type ResizeDetail = {
    w: number;
    h: number;
    element: Element;
};
export type ResizeEvent = CustomEvent<ResizeDetail>;
export declare function newResizeEvent(detail: ResizeDetail): ResizeEvent;
export type ResizeTLDetail = {
    x: number;
    y: number;
    w: number;
    h: number;
    element: Element;
};
export type ResizeTLEvent = CustomEvent<ResizeTLDetail>;
export declare function newResizeTLEvent(detail: ResizeTLDetail): ResizeTLEvent;
export type PlaceLabelDetail = {
    x: number;
    y: number;
    element: Element;
};
export type PlaceDetail = {
    x: number;
    y: number;
    element: Element;
    parent: Element;
};
export type PlaceEvent = CustomEvent<PlaceDetail>;
export declare function newPlaceEvent(detail: PlaceDetail): PlaceEvent;
export type PlaceLabelEvent = CustomEvent<PlaceLabelDetail>;
export declare function newPlaceLabelEvent(detail: PlaceLabelDetail): PlaceLabelEvent;
export type ConnectDetail = {
    from: Element;
    path: Point[];
    fromTerminal: 'T1' | 'T2' | 'N1' | 'N2';
    to: Element;
    toTerminal?: 'T1' | 'T2' | 'N1' | 'N2';
};
export type ConnectEvent = CustomEvent<ConnectDetail>;
export declare function newConnectEvent(detail: ConnectDetail): ConnectEvent;
export type ExtendConnectPointDetail = {
    path: Point[];
};
export type ExtendConnectPointEvent = CustomEvent<ExtendConnectPointDetail>;
export declare function newExtendConnectPointEvent(path: Point[]): ExtendConnectPointEvent;
export type StartEvent = CustomEvent<Element>;
export declare function newRotateEvent(detail: Element): StartEvent;
export type StartConnectDetail = {
    from: Element;
    fromTerminal: 'T1' | 'T2' | 'N1' | 'N2';
    path: Point[];
};
/**
 * Upward (view → controller) *intent* to begin a new interaction — the
 * reciprocal of the controller-owned {@link InteractionState} (in
 * `interaction-mode.ts`). Deliberately a *distinct* type: `InteractionState`
 * flows controller → view (current state, includes `idle`), while
 * `InteractionIntent` flows view → controller (a request to enter a mode, so
 * only the begin-transitions). Same `Interaction` root, opposite directions —
 * state vs. intent. The five variants are discriminated by `mode`, mirroring
 * the active `InteractionState` modes.
 */
export type InteractionIntent = {
    mode: 'placing';
    element: Element;
    offset?: Point;
    /**
       * When true, the editor treats `element` as a copy *source* and clones it
       * (fresh UUIDs, pruned connectivity) before placement. The view decides
       * *that* a copy should happen (e.g. shift-click); constructing the clone
       * is the editor's concern.
       */
    copy?: boolean;
} | {
    mode: 'placingLabel';
    element: Element;
    offset?: Point;
} | {
    mode: 'resizingBR';
    element: Element;
} | {
    mode: 'resizingTL';
    element: Element;
} | ({
    mode: 'connecting';
} & StartConnectDetail);
export type StartInteractionEvent = CustomEvent<InteractionIntent>;
export declare function newStartInteractionEvent(detail: InteractionIntent): StartInteractionEvent;
export type SelectDetail = {
    element: Element;
};
export type SelectEvent = CustomEvent<SelectDetail>;
export declare function newSelectEvent(element: Element): SelectEvent;
export type EditSclDetail = {
    element: Element;
};
export type EditSclEvent = CustomEvent<EditSclDetail>;
export declare function newSclEditDialogEvent(element: Element): EditSclEvent;
export type GroundTerminalDetail = {
    equipment: Element;
    terminal: 'T1' | 'T2' | 'N1' | 'N2';
};
export type GroundTerminalEvent = CustomEvent<GroundTerminalDetail>;
export declare function newGroundTerminalEvent(equipment: Element, terminal: 'T1' | 'T2' | 'N1' | 'N2'): GroundTerminalEvent;
export type OpenContextMenuDetail = {
    element: Element;
    x: number;
    y: number;
    gridX: number;
    gridY: number;
};
export type OpenContextMenuEvent = CustomEvent<OpenContextMenuDetail>;
export declare function newOpenContextMenuEvent(detail: OpenContextMenuDetail): OpenContextMenuEvent;
export type EditIedDetail = {
    element: Element;
};
export type EditIedEvent = CustomEvent<EditIedDetail>;
export declare function newEditIedEvent(element: Element): EditIedEvent;
/**
 * Substation-chrome commands requested from the header affordances. Each
 * carries the substation it targets, so the editor can act without relying on a
 * render-time closure. `resize` opens the resize *dialog* — distinct from the
 * gesture-completion `oscd-sld-resize`, which commits a drag.
 */
export type SubstationCommandEvent = CustomEvent<Element>;
export declare function newSubstationResizeEvent(substation: Element): SubstationCommandEvent;
export declare function newSubstationDeleteEvent(substation: Element): SubstationCommandEvent;
export declare function newSubstationExportEvent(substation: Element): SubstationCommandEvent;
export type GroundHintEvent = CustomEvent<undefined>;
export declare function newGroundHintEvent(): GroundHintEvent;
export type InActionEvent = CustomEvent<boolean>;
export declare function newInActionEvent(active: boolean): InActionEvent;
declare global {
    interface ElementEventMap {
        ['oscd-sld-resize']: ResizeEvent;
        ['oscd-sld-resize-tl']: ResizeTLEvent;
        ['oscd-sld-place']: PlaceEvent;
        ['oscd-sld-place-label']: PlaceLabelEvent;
        ['oscd-sld-connect']: ConnectEvent;
        ['oscd-sld-extend-connect-point']: ExtendConnectPointEvent;
        ['oscd-sld-rotate']: StartEvent;
        ['oscd-sld-start-interaction']: StartInteractionEvent;
        ['oscd-sld-selected']: SelectEvent;
        ['oscd-sld-edit-scl']: EditSclEvent;
        ['oscd-sld-edit-ied']: EditIedEvent;
        ['oscd-sld-ground-terminal']: GroundTerminalEvent;
        ['oscd-sld-open-context-menu']: OpenContextMenuEvent;
        ['oscd-sld-substation-resize']: SubstationCommandEvent;
        ['oscd-sld-substation-delete']: SubstationCommandEvent;
        ['oscd-sld-substation-export']: SubstationCommandEvent;
        ['oscd-sld-ground-hint']: GroundHintEvent;
        ['oscd-sld-in-action']: InActionEvent;
    }
}
