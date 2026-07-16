import { LitElement } from 'lit';
import { OscdSclDialogs } from '@omicronenergy/oscd-scl-dialogs/oscd-scl-dialogs.js';
import { OscdSnackbar } from '@omicronenergy/oscd-ui/snackbar/OscdSnackbar.js';
import { SldSubstationViewer } from './sld-substation-viewer.js';
import { SldSubstationHeader } from './sld-substation-header.js';
import { SldResizeSubstationDialog } from './sld-resize-substation-dialog.js';
import { SldContextMenu } from './context-menu/sld-context-menu.js';
import { SldCoordinateTooltip } from './sld-coordinate-tooltip.js';
import type { ConnectDetail, SubstationCommandEvent, InteractionIntent } from './foundations/events.js';
import type { Point } from './foundations/geometry.js';
import type { InteractionState } from './foundations/interaction-mode.js';
import type { Style } from './foundations/sld-attributes.js';
export type PlacementResult = {
    element: Element;
    parent: Element;
    x: number;
    y: number;
};
declare const SldEditor_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
export declare class SldEditor extends SldEditor_base {
    static scopedElements: {
        'sld-substation-viewer': typeof SldSubstationViewer;
        'sld-substation-header': typeof SldSubstationHeader;
        'sld-resize-substation-dialog': typeof SldResizeSubstationDialog;
        'sld-context-menu': typeof SldContextMenu;
        'sld-coordinate-tooltip': typeof SldCoordinateTooltip;
        'oscd-scl-dialogs': typeof OscdSclDialogs;
        'oscd-snackbar': typeof OscdSnackbar;
    };
    sclDialogs: OscdSclDialogs;
    resizeDialog: SldResizeSubstationDialog;
    contextMenu: SldContextMenu;
    snackbar: OscdSnackbar;
    doc: XMLDocument;
    get docVersion(): number;
    set docVersion(value: number);
    private _docVersion;
    disabled: boolean;
    selectable: string[];
    highlight: {
        id: string;
        style: Style;
    }[];
    showIeds?: boolean;
    gridSize: number;
    get nsp(): string;
    interaction: InteractionState;
    showLabels: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * The two genuine consequences of an interaction transition, driven reactively
     * off the `interaction` `@state` rather than hand-orchestrated at every
     * assignment site: (1) resolve a still-pending placement promise when leaving
     * `placing` (a successful place opts out by clearing `_resolvePlacement`
     * first); (2) emit the derived `oscd-sld-in-action` boolean, but only when
     * the active/idle state actually flips — no more start-then-reset flap.
     */
    updated(changed: Map<PropertyKey, unknown>): void;
    private handleKeydown;
    /**
     * The single public entry for interaction *intents* — from the editor's own
     * views (via bubbling `oscd-sld-start-interaction`) and, bridged by the host,
     * from the sibling toolbar. Keeping every begin-transition behind this one
     * method (rather than letting callers assign `interaction` or call
     * `startPlacing` directly) makes the editor the sole owner of its interaction
     * state. Returns the placement promise for the `placing` case so a caller
     * orchestrating a follow-up (e.g. the host inserting IEDs after a bay-typical
     * placement) can await the result; other modes return `void`.
     */
    handleStartInteraction(intent: InteractionIntent): Promise<PlacementResult | undefined> | void;
    handlePlace(element: Element, parent: Element, x: number, y: number): void;
    handlePlaceLabel(element: Element, x: number, y: number): void;
    handleResize(element: Element, w: number, h: number): void;
    handleResizeTL(element: Element, x: number, y: number, w: number, h: number): void;
    handleRotate(element: Element): void;
    handleConnect(detail: ConnectDetail): void;
    /**
     * Grow the in-progress connection path. The view reports the next path
     * (computed from the click + live cursor) and the controller — the single
     * owner of the interaction state — reassigns `interaction` immutably so Lit
     * reactivity is automatic and the value is never mutated behind its back.
     */
    handleExtendConnectPoint(path: Point[]): void;
    private handleGroundTerminal;
    private handleGroundHint;
    handleSubstationResize(substation: Element): void;
    handleSubstationDelete(substation: Element): void;
    handleSubstationExport(event: SubstationCommandEvent): void;
    private handleOpenContextMenu;
    private handleEditScl;
    private handleEditIed;
    /**
     * Resolves a coordinate surface to its SCL `Substation`. A surface is the root
     * `svg#sld` of a substation viewer; its shadow host is the viewer, which
     * carries the substation. Passed to the single coordinate tooltip so it can
     * identify which substation the cursor is over without the editor tracking
     * pointer movement itself.
     */
    private substationOf;
    private _resolvePlacement?;
    /**
     * Begin placing `element`, returning a promise that resolves with the
     * placement result (or `undefined` if the placement is cancelled or
     * superseded). This is the one interaction wrapper that survives — it exists
     * solely to own the placement promise; every other mode is entered by
     * assigning `this.interaction` directly.
     */
    startPlacing(element: Element | undefined, offset?: Point): Promise<PlacementResult | undefined>;
    /**
     * Abort the current interaction, returning the editor to its idle resting
     * state. The host's toolbar cancel affordance requests this rather than
     * assigning `interaction` directly, keeping the editor the sole owner of its
     * interaction state.
     */
    cancelInteraction(): void;
    private editScl;
    isNewBayOrVL(element: Element): boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
