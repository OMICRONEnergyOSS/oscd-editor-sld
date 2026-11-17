import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import type { EditV2, SetAttributes } from '@openscd/oscd-api';

import { OscdSclDialogs } from '@omicronenergy/oscd-scl-dialogs/oscd-scl-dialogs.js';
import { OscdSnackbar } from '@omicronenergy/oscd-ui/snackbar/OscdSnackbar.js';

import { SldSubstationViewer } from './sld-substation-viewer.js';
import { SldSubstationHeader } from './sld-substation-header.js';
import { SldResizeSubstationDialog } from './sld-resize-substation-dialog.js';
import { SldContextMenu } from './context-menu/sld-context-menu.js';
import { SldCoordinateTooltip } from './sld-coordinate-tooltip.js';
import { attributes, getSLDAttributes } from './foundations/sld-attributes.js';
import {
  busBarVertexEdits,
  createConnectEdits,
  createGroundTerminalEdits,
  createPlaceLabelEdit,
  createResizeEdits,
  createResizeTLEdits,
  createRotateEdits,
  disconnectExternalEdits,
  rewireTerminalEdits,
  shiftDescendantEdits,
  shiftElementEdits,
  shiftTextEdits,
  wrapIedReferenceEdits,
} from './foundations/edits.js';
import {
  iedReferences,
  isIedReferenceElement,
  resolveIed,
} from './foundations/ied.js';
import { reparentElement, sldNs, sldPrefix } from './foundations.js';
import { downloadSvg } from './foundations/export.js';
import { copyElementForPlacement } from './foundations/placement-clone.js';

import type {
  ConnectDetail,
  ConnectEvent,
  ExtendConnectPointEvent,
  EditIedDetail,
  EditSclDetail,
  GroundTerminalEvent,
  OpenContextMenuEvent,
  PlaceEvent,
  PlaceLabelEvent,
  ResizeEvent,
  ResizeTLEvent,
  StartEvent,
  SubstationCommandEvent,
  InteractionIntent,
  StartInteractionEvent,
} from './foundations/events.js';
import { newInActionEvent } from './foundations/events.js';
import type { Point } from './foundations/geometry.js';
import * as interactions from './foundations/interaction-mode.js';
import type { InteractionState } from './foundations/interaction-mode.js';
import type { Style } from './foundations/sld-attributes.js';
import type { SubstationResizeValidator } from './sld-resize-substation-dialog.js';

export type PlacementResult = {
  element: Element;
  parent: Element;
  x: number;
  y: number;
};

export type { SubstationResizeValidator } from './sld-resize-substation-dialog.js';

export class SldEditor extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'sld-substation-viewer': SldSubstationViewer,
    'sld-substation-header': SldSubstationHeader,
    'sld-resize-substation-dialog': SldResizeSubstationDialog,
    'sld-context-menu': SldContextMenu,
    'sld-coordinate-tooltip': SldCoordinateTooltip,
    'oscd-scl-dialogs': OscdSclDialogs,
    'oscd-snackbar': OscdSnackbar,
  };

  @query('oscd-scl-dialogs')
  sclDialogs!: OscdSclDialogs;

  @query('sld-resize-substation-dialog')
  resizeDialog!: SldResizeSubstationDialog;

  @query('sld-context-menu')
  contextMenu!: SldContextMenu;

  @query('oscd-snackbar')
  snackbar!: OscdSnackbar;

  @property({ type: Object }) doc!: XMLDocument;

  @property({ type: Number })
  get docVersion(): number {
    return this._docVersion;
  }

  set docVersion(value: number) {
    const i = this.interaction;
    if (
      i.mode === 'connectingFrom' ||
      (i.mode === 'resizingBR' && !i.element.parentElement) ||
      (i.mode === 'placingLabel' && !i.element.parentElement)
    ) {
      this.interaction = interactions.idle();
    }
    this._docVersion = value;
  }

  @state()
  private _docVersion = 0;

  @property({ type: Boolean }) disabled = false;

  @property({ type: Array }) selectable: string[] = [];

  @property({ type: Array }) highlight: { id: string; style: Style }[] = [];

  @property({ type: Boolean })
  showIeds?: boolean;

  @property({ attribute: false })
  validateSubstationResize?: SubstationResizeValidator;

  @state() gridSize = 32;

  get nsp(): string {
    return sldPrefix(this.doc);
  }

  @state() interaction: InteractionState = interactions.idle();

  @state() showLabels: boolean = true;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('oscd-sld-edit-scl', this.handleEditScl);
    this.addEventListener('oscd-sld-edit-ied', this.handleEditIed);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeydown);
    this.removeEventListener('oscd-sld-edit-scl', this.handleEditScl);
    this.removeEventListener('oscd-sld-edit-ied', this.handleEditIed);
  }

  /**
   * The two genuine consequences of an interaction transition, driven reactively
   * off the `interaction` `@state` rather than hand-orchestrated at every
   * assignment site: (1) resolve a still-pending placement promise when leaving
   * `placing` (a successful place opts out by clearing `_resolvePlacement`
   * first); (2) emit the derived `oscd-sld-in-action` boolean, but only when
   * the active/idle state actually flips — no more start-then-reset flap.
   */
  updated(changed: Map<PropertyKey, unknown>) {
    if (!changed.has('interaction')) {
      return;
    }
    const previous = changed.get('interaction') as InteractionState | undefined;

    if (previous?.mode === 'placing' && this.interaction.mode !== 'placing') {
      this._resolvePlacement?.(undefined);
      this._resolvePlacement = undefined;
    }

    const wasActive = !!previous && previous.mode !== 'idle';
    const isActive = this.interaction.mode !== 'idle';
    if (wasActive !== isActive) {
      this.dispatchEvent(newInActionEvent(isActive));
    }
  }

  private handleKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.cancelInteraction();
    }
  };

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
  handleStartInteraction(
    intent: InteractionIntent,
  ): Promise<PlacementResult | undefined> | void {
    switch (intent.mode) {
      case 'placing':
        return this.startPlacing(
          intent.copy
            ? copyElementForPlacement(intent.element, this.nsp)
            : intent.element,
          intent.offset,
        );
      case 'placingLabel':
        this.interaction = interactions.placingLabel(
          intent.element,
          intent.offset ?? [0, 0],
        );
        break;
      case 'resizingBR':
        this.interaction = interactions.resizingBR(intent.element);
        break;
      case 'resizingTL':
        this.interaction = interactions.resizingTL(intent.element);
        break;
      case 'connecting':
        this.interaction = interactions.connectingFrom(
          intent.from,
          intent.fromTerminal,
          intent.path,
        );
        break;
    }
    return undefined;
  }

  handlePlace(element: Element, parent: Element, x: number, y: number) {
    const {
      pos: [oldX, oldY],
    } = attributes(element);
    const dx = x - oldX;
    const dy = y - oldY;

    const edits: EditV2[] = [];

    if (element.parentElement !== parent && !isIedReferenceElement(element)) {
      edits.push(...reparentElement(element, parent));
    }

    edits.push(...shiftElementEdits(element, x, y, this.nsp));
    edits.push(...shiftTextEdits(element, dx, dy, this.nsp));
    edits.push(...shiftDescendantEdits(element, dx, dy, this.nsp));
    edits.push(...rewireTerminalEdits(element, parent, this.doc));
    edits.push(...disconnectExternalEdits(element, this.doc));
    edits.push(...busBarVertexEdits(element, x, y, this.nsp));
    edits.push(...wrapIedReferenceEdits(element, parent, this.doc));

    this.dispatchEvent(newEditEventV2(edits));

    const resolve = this._resolvePlacement;
    this._resolvePlacement = undefined;

    if (this.isNewBayOrVL(element)) {
      this.interaction = interactions.resizingBR(element);
    } else {
      this.interaction = interactions.idle();
    }

    resolve?.({ element, parent, x, y });
  }

  handlePlaceLabel(element: Element, x: number, y: number) {
    this.dispatchEvent(
      newEditEventV2(createPlaceLabelEdit(element, this.nsp, x, y)),
    );
    this.interaction = interactions.idle();
  }

  handleResize(element: Element, w: number, h: number) {
    this.dispatchEvent(newEditEventV2(createResizeEdits(element, this.nsp, w, h)));
    this.interaction = interactions.idle();
  }

  handleResizeTL(element: Element, x: number, y: number, w: number, h: number) {
    this.dispatchEvent(
      newEditEventV2(createResizeTLEdits(element, this.nsp, x, y, w, h)),
    );
    this.interaction = interactions.idle();
  }

  handleRotate(element: Element) {
    this.dispatchEvent(newEditEventV2(createRotateEdits(element, this.nsp)));
  }

  handleConnect(detail: ConnectDetail) {
    const edits = createConnectEdits(detail, this.doc, this.nsp);
    if (edits.length) {
      this.dispatchEvent(newEditEventV2(edits));
    }
    this.interaction = interactions.idle();
  }

  /**
   * Grow the in-progress connection path. The view reports the next path
   * (computed from the click + live cursor) and the controller — the single
   * owner of the interaction state — reassigns `interaction` immutably so Lit
   * reactivity is automatic and the value is never mutated behind its back.
   */
  handleExtendConnectPoint(path: Point[]) {
    if (this.interaction.mode !== 'connectingFrom') {
      return;
    }
    this.interaction = interactions.connectingFrom(
      this.interaction.element,
      this.interaction.terminal,
      path,
    );
  }

  private handleGroundTerminal = (event: GroundTerminalEvent) => {
    const { equipment, terminal } = event.detail;
    const edits = createGroundTerminalEdits(equipment, terminal);
    if (!edits) {
      this.handleGroundHint();
      return;
    }

    this.dispatchEvent(newEditEventV2(edits));
  };

  private handleGroundHint() {
    this.snackbar.show({
      message: 'Only transformers within a bay may be grounded directly.',
      variant: 'warning',
    });
  }

  handleSubstationResize(substation: Element) {
    this.resizeDialog.show(substation);
  }

  handleSubstationDelete(substation: Element) {
    this.dispatchEvent(newEditEventV2({ node: substation }));
  }

  handleSubstationExport(event: SubstationCommandEvent) {
    downloadSvg(
      (event.currentTarget as SldSubstationViewer).exportableSvg(),
      `${event.detail.getAttribute('name')}.svg`,
    );
  }

  private handleOpenContextMenu = (event: OpenContextMenuEvent) => {
    this.contextMenu.open(event.detail);
  };

  private handleEditScl = (event: Event) => {
    const detail = (event as CustomEvent<EditSclDetail>).detail;
    return this.editScl(detail.element);
  };

  private handleEditIed = async (event: Event) => {
    const { element: sclIed } = (event as CustomEvent<EditIedDetail>).detail;
    const edits = await this.sclDialogs.edit({ element: sclIed });

    const iedReference = iedReferences(this.doc).find(
      iedRef => resolveIed(iedRef) === sclIed,
    );
    if (!iedReference) {
      this.dispatchEvent(
        newEditEventV2([edits], {
          title: 'Update IED',
          squash: false,
        }),
      );
      return;
    }

    const iedNameEdit = [...edits.flat()].find(
      edit =>
        'element' in edit &&
        edit.element.tagName === 'IED' &&
        'attributes' in edit &&
        !!edit.attributes &&
        'name' in edit.attributes,
    ) as SetAttributes;
    if (!iedNameEdit) {
      return;
    }

    const newIedName = iedNameEdit.attributes!.name!;

    const iedReferenceEdit: SetAttributes = {
      element: iedReference,
      attributesNS: {
        [sldNs]: {
          [`${this.nsp}:id`]: newIedName,
        },
      },
    };

    this.dispatchEvent(
      newEditEventV2([edits, iedReferenceEdit], {
        title: 'Update IED from dialog',
        squash: false,
      }),
    );
  };

  /**
   * Resolves a coordinate surface to its SCL `Substation`. A surface is the root
   * `svg#sld` of a substation viewer; its shadow host is the viewer, which
   * carries the substation. Passed to the single coordinate tooltip so it can
   * identify which substation the cursor is over without the editor tracking
   * pointer movement itself.
   */
  private substationOf = (surface: Element): Element | undefined => {
    if (!(surface instanceof SVGSVGElement) || surface.id !== 'sld') {
      return undefined;
    }
    const root = surface.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : undefined;
    return host instanceof SldSubstationViewer ? host.substation : undefined;
  };

  private _resolvePlacement?: (result: PlacementResult | undefined) => void;

  /**
   * Begin placing `element`, returning a promise that resolves with the
   * placement result (or `undefined` if the placement is cancelled or
   * superseded). This is the one interaction wrapper that survives — it exists
   * solely to own the placement promise; every other mode is entered by
   * assigning `this.interaction` directly.
   */
  startPlacing(
    element: Element | undefined,
    offset: Point = [0, 0],
  ): Promise<PlacementResult | undefined> {
    if (this.disabled) {
      return Promise.resolve(undefined);
    }

    // A new placement supersedes any pending one (mode stays `placing`, so the
    // leave-`placing` handler in `updated()` would not catch it).
    this._resolvePlacement?.(undefined);
    this._resolvePlacement = undefined;

    this.interaction = element
      ? interactions.placing(element, offset)
      : interactions.idle();

    return new Promise((resolve) => {
      this._resolvePlacement = resolve;
    });
  }

  /**
   * Abort the current interaction, returning the editor to its idle resting
   * state. The host's toolbar cancel affordance requests this rather than
   * assigning `interaction` directly, keeping the editor the sole owner of its
   * interaction state.
   */
  cancelInteraction() {
    this.interaction = interactions.idle();
  }

  private async editScl(element: Element) {
    const edits = await this.sclDialogs.edit({ element });

    this.dispatchEvent(newEditEventV2(edits));
  }

  isNewBayOrVL(element: Element) : boolean {
    return ['Bay', 'VoltageLevel'].includes(element.tagName) &&
      (!getSLDAttributes(element, 'w') || !getSLDAttributes(element, 'h'));

  }

  render() {
    return html`${Array.from(
      this.doc.querySelectorAll(':root > Substation'),
    ).map(
      substation =>
        html`<sld-substation-viewer
            .doc=${this.doc}
            .docVersion=${this.docVersion}
            .substation=${substation}
            .gridSize=${this.gridSize}
            .interaction=${this.interaction}
            .showLabels=${this.showLabels}
            .showIeds=${this.showIeds}
            .disabled=${this.disabled}
            .selectable=${this.selectable}
            .highlight=${this.highlight}
            @oscd-sld-substation-export=${(event: SubstationCommandEvent) =>
              this.handleSubstationExport(event)}
            @oscd-sld-start-interaction=${({
              detail,
            }: StartInteractionEvent) => this.handleStartInteraction(detail)}
            @oscd-sld-ground-terminal=${(event: GroundTerminalEvent) => {
              this.handleGroundTerminal(event);
            }}
            @oscd-sld-ground-hint=${() => {
              this.handleGroundHint();
            }}
            @oscd-sld-open-context-menu=${(event: OpenContextMenuEvent) => {
              this.handleOpenContextMenu(event);
            }}
            @oscd-sld-resize=${({ detail: { element, w, h } }: ResizeEvent) => {
              this.handleResize(element, w, h);
            }}
            @oscd-sld-resize-tl=${({
              detail: { element, x, y, w, h },
            }: ResizeTLEvent) => {
              this.handleResizeTL(element, x, y, w, h);
            }}
            @oscd-sld-place=${({
              detail: { element, parent, x, y },
            }: PlaceEvent) => this.handlePlace(element, parent, x, y)}
            @oscd-sld-place-label=${({
              detail: { element, x, y },
            }: PlaceLabelEvent) => {
              this.handlePlaceLabel(element, x, y);
            }}
            @oscd-sld-connect=${({ detail }: ConnectEvent) =>
              this.handleConnect(detail)}
            @oscd-sld-extend-connect-point=${({
              detail,
            }: ExtendConnectPointEvent) => this.handleExtendConnectPoint(detail.path)}
            @oscd-sld-rotate=${({ detail }: StartEvent) =>
              this.handleRotate(detail)}
          >
            <sld-substation-header
              slot="header"
              .substation=${substation}
              ?disabled=${this.disabled}
              @oscd-sld-substation-resize=${({
                detail,
              }: SubstationCommandEvent) => this.handleSubstationResize(detail)}
              @oscd-sld-substation-delete=${({
                detail,
              }: SubstationCommandEvent) => this.handleSubstationDelete(detail)}
            ></sld-substation-header>
          </sld-substation-viewer>`,
    )}
    <sld-coordinate-tooltip
      .interaction=${this.interaction}
      .substationOf=${this.substationOf}
    ></sld-coordinate-tooltip>
    <sld-resize-substation-dialog
      .validateSubstationResize=${this.validateSubstationResize}
      @oscd-sld-resize=${({ detail: { element, w, h } }: ResizeEvent) => {
        this.handleResize(element, w, h);
      }}
    ></sld-resize-substation-dialog>
    <sld-context-menu
      .doc=${this.doc}
      .nsp=${this.nsp}
      @oscd-sld-start-interaction=${({ detail }: StartInteractionEvent) =>
        this.handleStartInteraction(detail)}
      @oscd-sld-rotate=${({ detail }: StartEvent) =>
        this.handleRotate(detail)}
      @oscd-sld-ground-hint=${() => {
        this.handleGroundHint();
      }}
    ></sld-context-menu>
    <oscd-snackbar></oscd-snackbar>
    <oscd-scl-dialogs></oscd-scl-dialogs>`;
  }
}
