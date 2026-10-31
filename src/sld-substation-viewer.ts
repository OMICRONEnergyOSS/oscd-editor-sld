import {
  css,
  html,
  nothing,
  LitElement,
  PropertyValues,
  svg,
  SVGTemplateResult,
} from 'lit';

import { property, query, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import {
  symbols,
} from './drawing/diagram-symbols.js';
import {
  conductingEquipmentArtifact,
} from './drawing/artifacts/conducting-equipment.js';
import { busBarArtifact } from './drawing/artifacts/bus-bar.js';
import {
  iedReferenceArtifact,
} from './drawing/artifacts/ied-reference.js';
import { powerTransformerArtifact } from './drawing/artifacts/power-transformer.js';
import { renderLabel as renderArtifactLabel } from './drawing/artifacts/label.js';
import {
  renderConnectivityNode as renderArtifactConnectivityNode,
  type ConnectivityNodeContext,
} from './drawing/artifacts/connectivity-node.js';
import {
  renderVoltageLevel,
  renderBay,
  type EquipmentContainerContext,
} from './drawing/artifacts/equipment-container.js';
import type {
  ArtifactRenderOptions,
  SldArtifactDescriptor,
  SldSharedContext,
} from './drawing/artifacts/artifact.js';
import type { PowerTransformerContext } from './drawing/artifacts/power-transformer.js';
import type { EquipmentContext } from './drawing/artifacts/conducting-equipment.js';
import type { BusBarContext } from './drawing/artifacts/bus-bar.js';
import {
  connectPreviewElbow,
  extendConnectPointPaths,
} from './foundations/geometry.js';
import { containsRect } from './foundations/element-geometry.js';
import { canPlaceAt } from './foundations/sld-placement.js';
import { connectionStartPoints, isBusBar } from './foundations/connectivity.js';
import {
  attributes,
  getSLDAttributes,
} from './foundations/sld-attributes.js';
import { sldThemeStyles } from './theme.js';
import { DragToClickController } from './drag-to-click.js';
import { singleTerminal } from './foundations/equipment.js';
import {
  iedReferences,
  isIedReferenceElement,
  resolveIed as resolveReferencedIed,
} from './foundations/ied.js';
import {
  newConnectEvent,
  newExtendConnectPointEvent,
  newGroundTerminalEvent,
  newOpenContextMenuEvent,
  newPlaceEvent,
  newPlaceLabelEvent,
} from './foundations/events.js';
import { serializeForExport } from './foundations/export.js';
import { sldPrefix, svgNs, xlinkNs } from './foundations.js';

import type { Point } from './foundations/geometry.js';
import type { InteractionState } from './foundations/interaction-mode.js';
import { connectDetail, isMode } from './foundations/interaction-mode.js';
import type {
  StartConnectDetail,
} from './foundations/events.js';
import type { Style } from './foundations/sld-attributes.js';

function isBay(element: Element) {
  return element.tagName === 'Bay' && !isBusBar(element);
}

const mouseCoordinateProperties: PropertyKey[] = [
  'mouseX',
  'mouseY',
  'mouseX2',
  'mouseY2',
  'mouseX2f',
  'mouseY2f',
];

/** An editor [[`plugin`]] for editing the `Substation` section. */

export class SldSubstationViewer extends ScopedElementsMixin(LitElement) {
  static scopedElements = {};

  // Drag-and-drop for placing, moving, resizing and connecting.
  protected dragToClick = new DragToClickController(this, {
    canStart: event =>
      isMode(this.interaction, 'idle') &&
      !this.disabled &&
      event.composedPath().includes(this.sld),
    isActive: () => !isMode(this.interaction, 'idle', 'locked'),
  });

  @property()
  doc!: XMLDocument;

  @property()
  substation!: Element;

  @property()
  docVersion = -1;

  @property()
  gridSize = 32;

  get nsp(): string {
    return sldPrefix(this.doc);
  }

  @property({ attribute: false })
  interaction: InteractionState = { mode: 'locked' };

  /**
   * The following read-only getters project the single {@link interaction}
   * value into the per-gesture shapes the render layers and drawing artifacts
   * consume. The view stores no interaction state of its own — it derives these
   * from the one `interaction` property supplied by the controller.
   */
  get placing(): Element | undefined {
    return this.interaction.mode === 'placing'
      ? this.interaction.element
      : undefined;
  }

  get placingOffset(): Point {
    return this.interaction.mode === 'placing' ||
      this.interaction.mode === 'placingLabel'
      ? this.interaction.offset
      : [0, 0];
  }

  get placingLabel(): Element | undefined {
    return this.interaction.mode === 'placingLabel'
      ? this.interaction.element
      : undefined;
  }

  get resizingTL(): Element | undefined {
    return this.interaction.mode === 'resizingTL'
      ? this.interaction.element
      : undefined;
  }

  get connecting(): StartConnectDetail | undefined {
    return connectDetail(this.interaction);
  }

  @property()
  showLabels?: boolean;

  @property()
  showIeds?: boolean;

  @property({ type: Boolean }) disabled: boolean = false;

  @property() selectable: string[] = [];

  @property() highlight: { id: string; style: Style }[] = [];

  @state()
  get idle(): boolean {
    return this.interaction.mode === 'idle';
  }

  /**
   * True when `element` is, or is contained by, the element currently being
   * placed. Such an element moves with the cursor as the placing-preview ghost,
   * so the base layers suppress it (the preview paints it instead) and the
   * position helpers apply the live mouse offset to it. This is the one way a
   * base layer's appearance is parameterised by the placing mode.
   */
  private isPartOfPlacingElement(element: Element): boolean {
    return (
      !!this.placing && element.closest(this.placing.localName) === this.placing
    );
  }

  @query('svg#sld')
  sld!: SVGGraphicsElement;

  @state()
  mouseX = 0;

  @state()
  mouseY = 0;

  private iedResolutionCache = new Map<Element, Element | null>();

  protected override willUpdate(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('doc') ||
      changedProperties.has('docVersion') ||
      changedProperties.has('substation')
    ) {
      this.iedResolutionCache.clear();
    }
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>) {
    if (!isMode(this.interaction, 'idle', 'locked')) {
      return true;
    }

    return !Array.from(changedProperties.keys()).every(property =>
      mouseCoordinateProperties.includes(property),
    );
  }

  private resolveIed(referencedIed: Element): Element | null {
    if (!this.iedResolutionCache.has(referencedIed)) {
      this.iedResolutionCache.set(
        referencedIed,
        resolveReferencedIed(referencedIed),
      );
    }

    return this.iedResolutionCache.get(referencedIed) ?? null;
  }

  @state()
  mouseX2 = 0;

  @state()
  mouseY2 = 0;

  @state()
  mouseX2f = 0;

  @state()
  mouseY2f = 0;

  svgCoordinates(clientX: number, clientY: number) {
    const p = new DOMPoint(clientX, clientY);
    const { x, y } = p.matrixTransform(this.sld.getScreenCTM()!.inverse());
    const result = [x, y].map(coord => Math.max(0, coord)) as Point;
    return result;
  }

  gridPosition(event: MouseEvent): Point {
    if (!event.isTrusted && !event.clientX && !event.clientY) {
      return [this.mouseX, this.mouseY];
    }

    const [clientX, clientY] = [event.clientX, event.clientY];
    const [x, y] = this.svgCoordinates(clientX, clientY);
    return [Math.floor(x), Math.floor(y)];
  }

  halfGridPosition(event: MouseEvent): Point {
    if (!event.isTrusted && !event.clientX && !event.clientY) {
      return [this.mouseX2, this.mouseY2];
    }

    const [clientX, clientY] = [event.clientX, event.clientY];
    const [x, y] = this.svgCoordinates(clientX, clientY);
    return [Math.round(x * 2) / 2, Math.round(y * 2) / 2];
  }

  renderedLabelPosition(element: Element, { preview = false } = {}): Point {
    let {
      label: [x, y],
    } = attributes(element);
    const [offsetX, offsetY] =
      isIedReferenceElement(element) &&
      !getSLDAttributes(element, 'x') &&
      preview
        ? [-1, -1]
        : this.placingOffset;
    if (this.isPartOfPlacingElement(element)) {
      const {
        pos: [parentX, parentY],
      } = attributes(this.placing!);
      x += this.mouseX - parentX - offsetX;
      y += this.mouseY - parentY - offsetY;
    }
    if (this.placingLabel === element) {
      x = this.mouseX2 - 0.5 - offsetX;
      y = this.mouseY2 + 0.5 - offsetY;
    }
    if (this.resizingTL === element) {
      const {
        pos: [resX, resY],
        dim: [resW, resH],
      } = attributes(element);
      if (resX === x && resY === y) {
        x += Math.min(this.mouseX, resX + resW - 1) - resX;
        y += Math.min(this.mouseY, resY + resH - 1) - resY;
      }
    }
    return [x, y];
  }

  renderedPosition(element: Element): Point {
    let {
      pos: [x, y],
    } = attributes(element);
    if (this.isPartOfPlacingElement(element)) {
      const {
        pos: [parentX, parentY],
      } = attributes(this.placing!);
      const [offsetX, offsetY] = this.placingOffset;
      x += this.mouseX - parentX - offsetX;
      y += this.mouseY - parentY - offsetY;
    }
    return [x, y];
  }

  /**
   * Returns the substation's diagram as an export-ready SVG string.
   * The viewer alone knows how it constructs the SVG and which nodes are
   * editing chrome, so it owns normalization/serialization; the editor decides
   * what to do with the result (e.g. trigger a file download).
   */
  exportableSvg(): string {
    return serializeForExport(this.sld);
  }

  nearestOpenTerminal(equipment?: Element): 'T1' | 'T2' | undefined {
    if (!equipment) {
      return undefined;
    }
    const topTerminal = equipment.querySelector('Terminal[name="T1"]');
    const bottomTerminal = equipment.querySelector('Terminal:not([name="T1"])');
    const oneSided = singleTerminal.has(equipment.getAttribute('type')!);
    if (topTerminal && bottomTerminal) {
      return undefined;
    }
    if (oneSided && (topTerminal || bottomTerminal)) {
      return undefined;
    }
    if (oneSided) {
      return 'T1';
    }
    if (topTerminal) {
      return 'T2';
    }
    if (bottomTerminal) {
      return 'T1';
    }

    const [mx, my] = [this.mouseX2f, this.mouseY2f];
    const {
      rot,
      pos: [x, y],
    } = attributes(equipment);
    if (rot === 0 && my >= y + 0.5) {
      return 'T2';
    }
    if (rot === 1 && mx < x + 0.5) {
      return 'T2';
    }
    if (rot === 2 && my < y + 0.5) {
      return 'T2';
    }
    if (rot === 3 && mx >= x + 0.5) {
      return 'T2';
    }
    return 'T1';
  }

  groundTerminal(equipment: Element, name: 'T1' | 'T2' | 'N1' | 'N2') {
    this.dispatchEvent(newGroundTerminalEvent(equipment, name));
  }

  requestContextMenu(element: Element, event: MouseEvent): void {
    const [gridX, gridY] = this.gridPosition(event);
    this.dispatchEvent(
      newOpenContextMenuEvent({
        element,
        x: event.clientX,
        y: event.clientY,
        gridX,
        gridY,
      }),
    );
  }

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
  render() {
    const {
      dim: [w, h],
    } = attributes(this.substation);

    // The five base layers (voltage levels, connectivity, power transformers,
    // IEDs, labels) are position-independent: their geometry derives from the
    // document and interaction, never from the live cursor — except in the four
    // modes where a base artifact tracks the mouse (resize preview, connect
    // target highlight/snap, and the label-repositioning preview, which is
    // painted inside the guarded label layer). Memoizing them with `guard` lets
    // the per-move re-renders that keep the placing/connect preview under the
    // cursor skip re-evaluating the whole (potentially thousands of `<g>`) base
    // stack.
    const baseLayerTracksMouse =
      this.interaction.mode === 'resizingBR' ||
      this.interaction.mode === 'resizingTL' ||
      this.interaction.mode === 'connectingFrom' ||
      this.interaction.mode === 'placingLabel';
    const baseLayerKey = [
      this.substation,
      this.docVersion,
      this.interaction,
      this.showLabels,
      this.showIeds,
      this.gridSize,
      this.highlight,
      this.selectable,
      this.disabled,
      // Mouse coordinates only invalidate the base layers in the modes that
      // paint them from the cursor; elsewhere a constant keeps the key stable so
      // guard reuses the memoized layers across cursor moves.
      baseLayerTracksMouse ? this.mouseX : 0,
      baseLayerTracksMouse ? this.mouseY : 0,
      baseLayerTracksMouse ? this.mouseX2 : 0,
      baseLayerTracksMouse ? this.mouseY2 : 0,
      baseLayerTracksMouse ? this.mouseX2f : 0,
      baseLayerTracksMouse ? this.mouseY2f : 0,
    ];

    return html`<section>
      <slot name="header"></slot>
      <svg
        xmlns="${svgNs}"
        xmlns:xlink="${xlinkNs}"
        id="sld"
        viewBox="0 0 ${w} ${h}"
        width="${w * this.gridSize}"
        height="${h * this.gridSize}"
        stroke-width="0.06"
        fill="none"
        @mousemove=${(e: MouseEvent) => {
          if (this.disabled) {
            return;
          }

          const [x, y] = this.svgCoordinates(e.clientX, e.clientY);
          this.mouseX = Math.floor(x);
          this.mouseY = Math.floor(y);
          this.mouseX2 = Math.round(x * 2) / 2;
          this.mouseY2 = Math.round(y * 2) / 2;
          this.mouseX2f = Math.floor(x * 2) / 2;
          this.mouseY2f = Math.floor(y * 2) / 2;
        }}
      >
        <style>
          .handle {
            visibility: hidden;
          }
          :focus {
            outline: none;
          }
          g:hover > .handle {
            opacity: 0.2;
            visibility: visible;
          }
          g:hover > .handle:hover {
            visibility: visible;
            opacity: 0.83;
          }
          g.voltagelevel > rect,
          g.bay > rect {
            shape-rendering: crispEdges;
          }
          svg:not(:hover) .preview {
            visibility: hidden;
          }
          .preview {
            opacity: 0.75;
          }
        </style>
        ${symbols}
        <rect width="100%" height="100%" style="fill: var(--md-sys-color-surface, var(--oscd-base3))" />
        ${this.renderVoltageLevelPlacingTarget()}
        ${guard(baseLayerKey, () => this.renderVoltageLevelLayer())}
        ${this.renderConnectionPreviewLayer()}
        ${this.renderConnectModeEquipmentLayer()}
        ${guard(baseLayerKey, () => [
          this.renderConnectivityLayer(),
          this.renderPowerTransformerLayer(),
          this.renderIedLayer(),
          this.renderLabelLayer(),
        ])}
        ${this.renderPlacingTargetsLayer()}
        ${this.renderPlacingPreview()}
      </svg>
    </section>`;
  }

  renderLabel(element: Element, { preview = false } = {}) {
    return renderArtifactLabel(element, this.sharedContext(), { preview });
  }


  /**
   * The VoltageLevel drop-zone, painted near the BACK of the stack (behind
   * existing voltage levels) — a VL is dropped *behind* the diagram. Mutually
   * exclusive with `renderPlacingTargetsLayer` (only one placing mode at a time).
   */
  private renderVoltageLevelPlacingTarget() {
    if (this.placing?.tagName !== 'VoltageLevel') {
      return nothing;
    }
    return svg`<rect width="100%" height="100%" fill="url(#grid)" />`;
  }

  /**
   * The full-canvas drop-targets for elements that may land anywhere in the
   * substation (PowerTransformer / IED / Label), painted near the FRONT of the
   * stack so they catch clicks over existing elements. All three are mutually
   * exclusive (gated on the active placing mode), so at most one is live.
   */
  private renderPlacingTargetsLayer() {
    const transformerPlacingTarget =
      this.placing?.tagName === 'PowerTransformer'
        ? svg`<rect width="100%" height="100%" fill="url(#grid)" />`
        : nothing;

    const iedPlacingTarget =
      !!this.placing && isIedReferenceElement(this.placing)
        ? svg`<rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            @click=${() => {
              const element = this.placing!;
              const [x, y] = this.renderedPosition(element);
              if (!canPlaceAt(this.substation, element, x, y, 1, 1)) {
                return;
              }

              const parent =
                Array.from(
                  this.substation.querySelectorAll(
                    ':scope > VoltageLevel > Bay',
                  ),
                )
                  .concat(
                    Array.from(
                      this.substation.querySelectorAll(':scope > VoltageLevel'),
                    ),
                  )
                  .find(vlOrBay => containsRect(vlOrBay, x, y, 1, 1)) ||
                this.substation;

              this.dispatchEvent(newPlaceEvent({ x, y, element, parent }));
            }}
          />`
        : nothing;

    const placingLabelTarget = this.placingLabel
      ? svg`<rect width="100%" height="100%" fill="url(#halfgrid)"
      @click=${() => {
        const element = this.placingLabel!;
        const [x, y] = this.renderedLabelPosition(element, { preview: true });
        this.dispatchEvent(newPlaceLabelEvent({ element, x, y }));
      }}
      />`
      : nothing;

    return [transformerPlacingTarget, iedPlacingTarget, placingLabelTarget];
  }

  private renderPlacingPreview() {
    if (!this.placing) {
      return svg``;
    }
    if (this.placing.tagName === 'VoltageLevel') {
      return renderVoltageLevel(this.placing, this.containerContext(), true);
    }
    if (isBay(this.placing)) {
      return renderBay(this.placing, this.containerContext(), true);
    }
    if (this.placing.tagName === 'ConductingEquipment') {
      return this.renderEquipment(this.placing, { preview: true });
    }
    if (isIedReferenceElement(this.placing)) {
      return this.renderIed(this.placing, { preview: true });
    }
    if (this.placing.tagName === 'PowerTransformer') {
      return this.renderPowerTransformer(this.placing, true);
    }
    if (isBusBar(this.placing)) {
      return this.renderBusBar(this.placing);
    }
    return svg``;
  }

  private renderVoltageLevelLayer() {
    return Array.from(this.substation.children)
      .filter(child => child.tagName === 'VoltageLevel')
      .map(vl => svg`${renderVoltageLevel(vl, this.containerContext())}`);
  }

  private renderConnectionPreviewLayer() {
    if (this.connecting?.from.closest('Substation') !== this.substation) {
      return [];
    }

    const { from, path, fromTerminal } = this.connecting;

    const targetEq = Array.from(
      this.substation.querySelectorAll('ConductingEquipment'),
    )
      .filter(eq => eq !== from)
      .find((eq) => {
        const {
          pos: [x, y],
        } = attributes(eq);
        return x === this.mouseX && y === this.mouseY;
      });

    const toTerminal = this.nearestOpenTerminal(targetEq);

    let snap: { near: Point; far: Point } | undefined;
    if (targetEq && toTerminal) {
      const [close, far] = connectionStartPoints(targetEq)[toTerminal];
      snap = { near: close, far };
    }

    const { corner, far, near } = connectPreviewElbow(
      path,
      [this.mouseX2, this.mouseY2],
      snap,
    );

    // The whole preview is one orthogonal polyline: the already-committed
    // waypoints (every point but the provisional last one) continuing through
    // the live elbow lastFixed -> corner -> far -> near.
    const previewPoints: Point[] = [...path.slice(0, -1), corner, far, near];

    const segment = (start: Point, end: Point) =>
      svg`<line x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}"
                stroke-linecap="square" stroke="currentColor" />`;

    // draw a line between each consecutive pair of points
    const lines = previewPoints
      .slice(1)
      .map((point, index) => segment(previewPoints[index], point));

    const dropTarget = svg`<rect width="100%" height="100%" fill="url(#grid)"
      @click=${() => {
        const newPath = extendConnectPointPaths(path, corner, far, near);
        this.dispatchEvent(newExtendConnectPointEvent(newPath));
        if (targetEq && toTerminal) {
          this.dispatchEvent(
            newConnectEvent({
              from,
              fromTerminal,
              path: newPath,
              to: targetEq,
              toTerminal,
            }),
          );
        }
      }} />`;

    return [...lines, dropTarget];
  }

  /**
   * While a connection is being drawn in this substation, every
   * `ConductingEquipment` is suppressed in its container layer (see
   * conducting-equipment.ts) and re-painted here as a flat top overlay in
   * connect mode: terminal connect-indicators on, and click-through enabled so
   * clicks fall through to the connection drop-target beneath.
   */
  private renderConnectModeEquipmentLayer() {
    if (this.connecting?.from.closest('Substation') !== this.substation) {
      return nothing;
    }
    return Array.from(
      this.substation.querySelectorAll('ConductingEquipment'),
    ).map(eq => this.renderEquipment(eq, { connect: true }));
  }

  private renderConnectivityLayer() {
    return Array.from(this.substation.querySelectorAll('ConnectivityNode'))
      .filter(
        node =>
          node.getAttribute('name') !== 'grounded' &&
          !this.isPartOfPlacingElement(node),
      )
      .sort(
        (a, b) =>
          Number(isBusBar(a.parentElement!)) -
          Number(isBusBar(b.parentElement!)),
      )
      .map(cNode => this.renderConnectivityNode(cNode));
  }

  private renderPowerTransformerLayer() {
    return Array.from(
      this.substation.querySelectorAll(':scope > PowerTransformer'),
    ).map(transformer => this.renderPowerTransformer(transformer));
  }

  private renderIedLayer() {
    return iedReferences(this.substation)
      .filter(
        referencedIed =>
          referencedIed.parentElement?.tagName === 'Private' &&
          !['Bay', 'VoltageLevel'].includes(
            referencedIed.parentElement!.parentElement!.tagName,
          ) &&
          !this.isPartOfPlacingElement(referencedIed),
      )
      .map(ied => this.renderIed(ied));
  }

  private renderLabelLayer() {
    return Array.from(
      this.substation.querySelectorAll(
        'VoltageLevel, Bay, ConductingEquipment, PowerTransformer, Text',
      ),
    )
      .concat(
        Array.from(
          this.substation.querySelectorAll(
            'Private[type="OpenSCD-SLD-Layout"]',
          ) ?? [],
        ).flatMap(privateLayout => iedReferences(privateLayout)),
      )
      .filter(e => !this.isPartOfPlacingElement(e))
      .map(element => this.renderLabel(element));
  }

  private containerContext(): EquipmentContainerContext {
    return {
      ...this.sharedContext(),
      highlight: this.highlight,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      svgCoordinates: (clientX, clientY) =>
        this.svgCoordinates(clientX, clientY),
      renderEquipment: equipment => this.renderEquipment(equipment),
      renderPowerTransformer: equipment =>
        this.renderPowerTransformer(equipment),
      renderIed: (referencedIed, options) =>
        this.renderIed(referencedIed, options),
      renderConnectivityNode: cNode => this.renderConnectivityNode(cNode),
    };
  }

  renderPowerTransformer(
    transformer: Element,
    preview = false,
  ): SVGTemplateResult {
    return this.renderArtifact(
      powerTransformerArtifact,
      transformer,
      this.powerTransformerContext(),
      { preview },
    );
  }

  private sharedContext(): SldSharedContext {
    return {
      disabled: this.disabled,
      dispatch: event => this.dispatchEvent(event),
      gridPosition: event => this.gridPosition(event),
      halfGridPosition: event => this.halfGridPosition(event),
      interaction: this.interaction,
      requestContextMenu: (element, event) =>
        this.requestContextMenu(element, event),
      resolveIed: referencedIed => this.resolveIed(referencedIed),
      renderedLabelPosition: (element, options) =>
        this.renderedLabelPosition(element, options),
      renderedPosition: element => this.renderedPosition(element),
      selectable: this.selectable,
      substation: this.substation,
      view: {
        showLabels: this.showLabels,
        showIeds: this.showIeds,
      },
    };
  }

  private equipmentContext(): EquipmentContext {
    return {
      ...this.sharedContext(),
      groundTerminal: (element, terminal) =>
        this.groundTerminal(element, terminal),
      highlight: this.highlight,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      nearestOpenTerminal: equipment => this.nearestOpenTerminal(equipment),
    };
  }

  private busBarContext(): BusBarContext {
    return this.connectivityNodeContext();
  }

  private powerTransformerContext(): PowerTransformerContext {
    return {
      ...this.sharedContext(),
      groundTerminal: (element, terminal) =>
        this.groundTerminal(element, terminal),
      highlight: this.highlight,
      mouseX: this.mouseX,
      mouseY: this.mouseY,
    };
  }

  private renderArtifact<TState, TActions, TContext extends SldSharedContext>(
    descriptor: SldArtifactDescriptor<TState, TActions, TContext>,
    element: Element,
    context: TContext,
    options: ArtifactRenderOptions = {},
  ): SVGTemplateResult {
    const state = descriptor.state(element, context, options);
    if (!state) {
      return svg``;
    }

    return descriptor.render(
      element,
      state,
      descriptor.actions(element, context, state),
      context,
      options,
    );
  }

  renderEquipment(
    equipment: Element,
    options: { preview?: boolean; connect?: boolean } = {},
  ): SVGTemplateResult {
    return this.renderArtifact(
      conductingEquipmentArtifact,
      equipment,
      this.equipmentContext(),
      options,
    );
  }

  renderIed(
    referencedIed: Element,
    { preview = false } = {},
  ): SVGTemplateResult {
    return this.renderArtifact(
      iedReferenceArtifact,
      referencedIed,
      this.sharedContext(),
      { preview },
    );
  }

  renderBusBar(busBar: Element) {
    return this.renderArtifact(
      busBarArtifact,
      busBar,
      this.busBarContext(),
    );
  }

  private connectivityNodeContext(): ConnectivityNodeContext {
    return {
      ...this.sharedContext(),
      mouseX: this.mouseX,
      mouseY: this.mouseY,
      mouseX2: this.mouseX2,
      mouseY2: this.mouseY2,
    };
  }

  renderConnectivityNode(cNode: Element) {
    return renderArtifactConnectivityNode(
      cNode,
      this.connectivityNodeContext(),
    );
  }

  static styles = [
    sldThemeStyles,
    css`
    :host {
      display: block;
    }

    /*
     * Contain the intrinsically-sized svg (width = w × gridSize) within this
     * host. This is dormant in the plugin — nothing there constrains the
     * viewer's width (the host lays out at 'width: fit-content'), so the section
     * grows to the svg's native size and never scrolls; the shell owns the
     * scroll/zoom viewport. It only activates for a *constrained* standalone
     * consumer (e.g. a fixed-width card), where it scrolls instead of spilling.
     * See the fit-to-container workstream for scale-to-fit (vs. scroll).
     */
    section {
      overflow: auto;
    }

    #sld {
      color: var(--md-sys-color-on-surface, var(--oscd-base03));
    }

    .disabled:not(.selectable) {
      pointer-events: none;
      opacity: 0.2;
    }

    .disabled.selectable > text {
      pointer-events: all;
    }

    * {
      user-select: none;
    }
  `,
  ];
}
