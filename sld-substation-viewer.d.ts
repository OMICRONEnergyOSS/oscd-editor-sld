import { nothing, LitElement, PropertyValues, SVGTemplateResult } from 'lit';
import type { Point } from './foundations/geometry.js';
import type { InteractionState } from './foundations/interaction-mode.js';
import type { StartConnectDetail } from './foundations/events.js';
import type { Style } from './foundations/sld-attributes.js';
declare const SldSubstationViewer_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
/** An editor [[`plugin`]] for editing the `Substation` section. */
export declare class SldSubstationViewer extends SldSubstationViewer_base {
    static scopedElements: {};
    doc: XMLDocument;
    substation: Element;
    docVersion: number;
    gridSize: number;
    get nsp(): string;
    interaction: InteractionState;
    /**
     * The following read-only getters project the single {@link interaction}
     * value into the per-gesture shapes the render layers and drawing artifacts
     * consume. The view stores no interaction state of its own — it derives these
     * from the one `interaction` property supplied by the controller.
     */
    get placing(): Element | undefined;
    get placingOffset(): Point;
    get placingLabel(): Element | undefined;
    get resizingTL(): Element | undefined;
    get connecting(): StartConnectDetail | undefined;
    showLabels?: boolean;
    showIeds?: boolean;
    disabled: boolean;
    selectable: string[];
    highlight: {
        id: string;
        style: Style;
    }[];
    get idle(): boolean;
    /**
     * True when `element` is, or is contained by, the element currently being
     * placed. Such an element moves with the cursor as the placing-preview ghost,
     * so the base layers suppress it (the preview paints it instead) and the
     * position helpers apply the live mouse offset to it. This is the one way a
     * base layer's appearance is parameterised by the placing mode.
     */
    private isPartOfPlacingElement;
    sld: SVGGraphicsElement;
    mouseX: number;
    mouseY: number;
    private iedResolutionCache;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected shouldUpdate(changedProperties: PropertyValues<this>): boolean;
    private resolveIed;
    mouseX2: number;
    mouseY2: number;
    mouseX2f: number;
    mouseY2f: number;
    svgCoordinates(clientX: number, clientY: number): Point;
    gridPosition(event: MouseEvent): Point;
    halfGridPosition(event: MouseEvent): Point;
    renderedLabelPosition(element: Element, { preview }?: {
        preview?: boolean | undefined;
    }): Point;
    renderedPosition(element: Element): Point;
    /**
     * Returns the substation's diagram as an export-ready SVG string.
     * The viewer alone knows how it constructs the SVG and which nodes are
     * editing chrome, so it owns normalization/serialization; the editor decides
     * what to do with the result (e.g. trigger a file download).
     */
    exportableSvg(): string;
    nearestOpenTerminal(equipment?: Element): 'T1' | 'T2' | undefined;
    groundTerminal(equipment: Element, name: 'T1' | 'T2' | 'N1' | 'N2'): void;
    requestContextMenu(element: Element, event: MouseEvent): void;
    /**
     * Composes the substation SVG as one z-ordered stack of layers (paint order =
     * z-order; last drawn wins). Each layer is one of two kinds by *presence*:
     *
     * - **base layers** — always in the stack: `renderVoltageLevelLayer`,
     *   `renderConnectivityLayer`, `renderPowerTransformerLayer`, `renderIedLayer`,
     *   `renderLabelLayer`.
     * - **mode layers** — present only during one interaction mode, each gated on
     *   the relevant field/payload: `renderVoltageLevelPlacingTarget` (placing a
     *   VoltageLevel), `renderConnectionPreviewLayer` +
     *   `renderConnectModeEquipmentLayer` (connecting), `renderPlacingTargetsLayer`
     *   + `renderPlacingPreview` (placing).
     *
     * Mode layers are NOT a top tier — they are interleaved at fixed z-positions
     * (the VL placing target paints at the back; the connection preview in the
     * middle), so the call order here must not change. Base-layer *appearance* may
     * still vary by mode via `isPartOfPlacingElement` (the placed element is
     * suppressed here and re-painted as the preview ghost).
     */
    render(): import("lit-html").TemplateResult<1>;
    renderLabel(element: Element, { preview }?: {
        preview?: boolean | undefined;
    }): SVGTemplateResult | typeof nothing;
    /**
     * The VoltageLevel drop-zone, painted near the BACK of the stack (behind
     * existing voltage levels) — a VL is dropped *behind* the diagram. Mutually
     * exclusive with `renderPlacingTargetsLayer` (only one placing mode at a time).
     */
    private renderVoltageLevelPlacingTarget;
    /**
     * The full-canvas drop-targets for elements that may land anywhere in the
     * substation (PowerTransformer / IED / Label), painted near the FRONT of the
     * stack so they catch clicks over existing elements. All three are mutually
     * exclusive (gated on the active placing mode), so at most one is live.
     */
    private renderPlacingTargetsLayer;
    private renderPlacingPreview;
    private renderVoltageLevelLayer;
    private renderConnectionPreviewLayer;
    /**
     * While a connection is being drawn in this substation, every
     * `ConductingEquipment` is suppressed in its container layer (see
     * conducting-equipment.ts) and re-painted here as a flat top overlay in
     * connect mode: terminal connect-indicators on, and click-through enabled so
     * clicks fall through to the connection drop-target beneath.
     */
    private renderConnectModeEquipmentLayer;
    private renderConnectivityLayer;
    private renderPowerTransformerLayer;
    private renderIedLayer;
    private renderLabelLayer;
    private containerContext;
    renderPowerTransformer(transformer: Element, preview?: boolean): SVGTemplateResult;
    private sharedContext;
    private equipmentContext;
    private busBarContext;
    private powerTransformerContext;
    private renderArtifact;
    renderEquipment(equipment: Element, options?: {
        preview?: boolean;
        connect?: boolean;
    }): SVGTemplateResult;
    renderIed(referencedIed: Element, { preview }?: {
        preview?: boolean | undefined;
    }): SVGTemplateResult;
    renderBusBar(busBar: Element): SVGTemplateResult;
    private connectivityNodeContext;
    renderConnectivityNode(cNode: Element): SVGTemplateResult | typeof nothing;
    static styles: import("lit").CSSResult[];
}
export {};
