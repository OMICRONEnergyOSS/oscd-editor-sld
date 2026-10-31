import { LitElement, html, nothing, css } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { getReference } from '@openscd/scl-lib';

import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdFab } from '@omicronenergy/oscd-ui/fab/OscdFab.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';

import { OscdSldIcon } from '../oscd-sld-icon.js';
import { isBusBar } from '../foundations/connectivity.js';
import { eqTypes } from '../foundations/equipment.js';
import { setSLDAttributes } from '../foundations/sld-attributes.js';
import { newStartInteractionEvent } from '../foundations/events.js';
import { sldThemeStyles } from '../theme.js';
import { sldPrefix } from '../foundations.js';
import { DragToClickController } from '../drag-to-click.js';

import { SldIedImporter } from './sld-ied-importer.js';
import { SldIedMenu } from './sld-ied-menu.js';

import type { TemplateResult } from 'lit';

const aboutContent = await fetch(new URL('../about.html', import.meta.url)).then(
  res => res.text(),
);

// --- Toolbar action configuration types ---

type TransformerConfig = {
  windings: 1 | 2 | 3;
  kind?: 'auto' | 'earthing';
  label: string;
};

const transformerConfigs: TransformerConfig[] = [
  { windings: 1, kind: 'auto', label: 'Single Winding Auto Transformer' },
  { windings: 2, kind: 'auto', label: 'Two Winding Auto Transformer' },
  { windings: 2, label: 'Two Winding Transformer' },
  { windings: 3, label: 'Three Winding Transformer' },
  { windings: 1, kind: 'earthing', label: 'Single Winding Earthing Transformer' },
  { windings: 2, kind: 'earthing', label: 'Two Winding Earthing Transformer' },
];

function transformerIconName({ windings, kind }: TransformerConfig): string {
  return kind ? `sld_ptr_${windings}_${kind}` : `sld_ptr_${windings}`;
}

// --- Event for toggling visibility ---

export type ToggleDetail = { showLabels: boolean; showIeds: boolean };

/**
 * Toolbar component for the SLD editor plugin.
 * Renders contextual FAB groups based on document state and dispatches
 * placement/toggle events upward.
 */
export class SldToolbar extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'oscd-dialog': OscdDialog,
    'oscd-fab': OscdFab,
    'oscd-icon': OscdIcon,
    'oscd-icon-button': OscdIconButton,
    'oscd-sld-icon': OscdSldIcon,
    'oscd-text-button': OscdTextButton,
    'sld-ied-importer': SldIedImporter,
    'sld-ied-menu': SldIedMenu,
  };

  @query('#about') private aboutDialog?: OscdDialog;

  // Dragging an add-FAB onto the canvas places the element where it is dropped.
  private dragToClick = new DragToClickController(this, {
    canStart: event =>
      !this.inAction &&
      event
        .composedPath()
        .some(node => node instanceof Element && node.hasAttribute('data-places')),
    isActive: () => this.inAction,
  });

  @property({ type: Object })
  doc!: XMLDocument;

  @property({ type: Number })
  docVersion: number = -1;

  get nsp(): string {
    return sldPrefix(this.doc);
  }

  @property({ type: Object })
  templateElements: Record<string, Element> = {};

  @property({ type: Boolean })
  inAction = false;

  @property({ type: Number })
  gridSize = 32;

  @state()
  private _showIeds = true;

  @state()
  private _showLabels = true;

  get showIeds(): boolean {
    return this._showIeds;
  }

  set showIeds(val: boolean) {
    this._showIeds = val;
  }

  private dispatchViewChange() {
    this.dispatchEvent(
      new CustomEvent('view-change', {
        bubbles: true,
        composed: true,
        detail: { showLabels: this._showLabels, showIeds: this._showIeds },
      }),
    );
  }

  // --- Helpers ---

  private get hasSubstation(): boolean {
    return !!Array.from(this.doc.documentElement.children).find(
      c => c.tagName === 'Substation',
    );
  }

  private get hasVoltageLevel(): boolean {
    return !!this.doc.querySelector(':root > Substation > VoltageLevel');
  }

  private get hasBay(): boolean {
    return !!Array.from(
      this.doc.querySelectorAll(':root > Substation > VoltageLevel > Bay'),
    ).find(bay => !isBusBar(bay));
  }

  private get hasIeds(): boolean {
    return this.doc.querySelectorAll(':root > IED').length > 0;
  }

  private get hasVisualContent(): boolean {
    return !!this.doc.querySelector('VoltageLevel, PowerTransformer');
  }

  private startPlacing(element: Element) {
    this.dispatchEvent(
      newStartInteractionEvent({ mode: 'placing', element }),
    );
  }

  // --- Template builders for FAB groups ---

  private createTransformerElement(config: TransformerConfig): Element {
    const element =
      this.templateElements.PowerTransformer!.cloneNode() as Element;
    element.setAttribute('type', 'PTR');

    if (config.kind) {
      const attrs: Record<string, string> = { kind: config.kind };
      if (config.windings === 1 && config.kind === 'auto') {
        attrs.rot = '3';
      }
      setSLDAttributes(element, this.nsp, attrs);
    }

    for (let i = 1; i <= config.windings; i += 1) {
      const winding =
        this.templateElements.TransformerWinding!.cloneNode() as Element;
      winding.setAttribute('type', 'PTW');
      winding.setAttribute('name', `W${i}`);
      element.appendChild(winding);
    }

    return element;
  }

  private renderEquipmentFabs() {
    if (!this.hasBay) {
      return nothing;
    }

    return eqTypes.map(
      eqType =>
        html`<oscd-fab
          size="small"
          aria-label="Add ${eqType}"
          title="Add ${eqType}"
          data-places
          @click=${() => {
            const element =
              this.templateElements.ConductingEquipment!.cloneNode() as Element;
            element.setAttribute('type', eqType);
            this.startPlacing(element);
          }}
          ><oscd-sld-icon slot="icon">sld_equipment_${eqType}</oscd-sld-icon></oscd-fab
        >`,
    );
  }

  private renderStructuralFabs() {
    if (!this.hasVoltageLevel) {
      return nothing;
    }

    return html`<oscd-fab
        size="small"
        @click=${() => {
          const element = this.templateElements.BusBar!.cloneNode(
            true,
          ) as Element;
          this.startPlacing(element);
        }}
        aria-label="Add Bus Bar"
        title="Add Bus Bar"
        data-places
        ><oscd-icon slot="icon">horizontal_rule</oscd-icon> </oscd-fab
      ><oscd-fab
        size="small"
        aria-label="Add Bay"
        title="Add Bay"
        data-places
        @click=${() => {
          const element =
            this.templateElements.Bay!.cloneNode() as Element;
          this.startPlacing(element);
        }}
        style="--md-fab-container-color: var(--oscd-sld-icon-bay-background-color); --md-fab-icon-color: var(--oscd-sld-icon-bay-foreground-color);"
      >
        <oscd-sld-icon slot="icon">sld_bay</oscd-sld-icon>
      </oscd-fab>`;
  }

  private renderVoltageLevelFab() {
    if (!this.hasSubstation) {
      return nothing;
    }

    return html`<oscd-fab
      size="small"
      aria-label="Add VoltageLevel"
      title="Add VoltageLevel"
      data-places
      @click=${() => {
        const element =
          this.templateElements.VoltageLevel!.cloneNode() as Element;
        this.startPlacing(element);
      }}
      style="--md-fab-container-color: var(--oscd-sld-icon-voltage-level-background-color); --md-fab-icon-color: var(--oscd-sld-icon-voltage-level-foreground-color);"
    >
      <oscd-sld-icon slot="icon">sld_voltage_level</oscd-sld-icon>
    </oscd-fab>`;
  }

  private renderIedTools(): TemplateResult | typeof nothing {
    if (!this.hasSubstation) {
      return nothing;
    }

    return html`<sld-ied-importer .nsp=${this.nsp}></sld-ied-importer>
      ${this.hasIeds
        ? html`<sld-ied-menu .doc=${this.doc} .docVersion=${this.docVersion}></sld-ied-menu>`
        : nothing}`;
  }

  private insertSubstation() {
    const parent = this.doc.documentElement;
    const node = this.doc.createElementNS(
      this.doc.documentElement.namespaceURI,
      'Substation',
    );
    const reference = getReference(parent, 'Substation');
    let index = 1;
    while (this.doc.querySelector(`:root > Substation[name="S${index}"]`)) {
      index += 1;
    }
    node.setAttribute('name', `S${index}`);
    setSLDAttributes(node, this.nsp, { w: '50', h: '25' });
    this.dispatchEvent(newEditEventV2({ parent, node, reference }));
  }

  private renderSubstationFab() {
    return html`<oscd-fab
      size="small"
      @click=${() => this.insertSubstation()}
      aria-label="Add Substation"
      style="--md-fab-container-color: var(--oscd-sld-icon-substation-background-color); --md-fab-icon-color: var(--oscd-sld-icon-substation-foreground-color);"
      title="Add Substation"
      ><oscd-icon slot="icon">margin</oscd-icon>
    </oscd-fab>`;
  }

  private renderTransformerFabs() {
    if (!this.hasSubstation) {
      return nothing;
    }

    return transformerConfigs.map(
      config =>
        html`<oscd-fab
          size="small"
          aria-label="Add ${config.label}"
          title="Add ${config.label}"
          data-places
          @click=${() => {
            const element = this.createTransformerElement(config);
            this.startPlacing(element);
          }}
          ><oscd-sld-icon slot="icon">${transformerIconName(config)}</oscd-sld-icon></oscd-fab
        >`,
    );
  }

  private renderViewControls() {
    const toggles = [];

    if (this.hasVisualContent) {
      toggles.push(html`<oscd-icon-button
        id="labels"
        aria-label="Toggle Labels"
        title="Toggle Labels"
        toggle
        selected
        @click=${() => {
          this._showLabels = !this._showLabels;
          this.dispatchViewChange();
        }}
      >
        <oscd-icon slot="selected">font_download</oscd-icon>
        <oscd-icon>font_download_off</oscd-icon>
      </oscd-icon-button>`);
    }

    if (this.hasIeds && this.hasSubstation) {
      toggles.push(html`<oscd-icon-button
        id="ieds"
        aria-label="Toggle IEDs"
        title="Toggle IEDs"
        toggle
        ?selected=${this._showIeds}
        @click=${() => {
          this._showIeds = !this._showIeds;
          this.dispatchViewChange();
        }}
      >
        <oscd-icon slot="selected">developer_board</oscd-icon>
        <oscd-icon>developer_board_off</oscd-icon>
      </oscd-icon-button>`);
    }

    if (this.doc.querySelector('Substation')) {
      toggles.push(html`<oscd-icon-button
          aria-label="Zoom In"
          title="Zoom In (${Math.round((100 * (this.gridSize + 3)) / 32)}%)"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('zoom', {
                bubbles: true,
                composed: true,
                detail: { direction: 'in' },
              }),
            )}
        >
          <oscd-icon>zoom_in</oscd-icon> </oscd-icon-button
        ><oscd-icon-button
          aria-label="Zoom Out"
          ?disabled=${this.gridSize < 4}
          title="Zoom Out (${Math.round((100 * (this.gridSize - 3)) / 32)}%)"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('zoom', {
                bubbles: true,
                composed: true,
                detail: { direction: 'out' },
              }),
            )}
        >
          <oscd-icon>zoom_out</oscd-icon>
        </oscd-icon-button>`);
    }

    return toggles;
  }

  private renderActionButton() {
    if (this.inAction) {
      return html`<oscd-icon-button
        aria-label="Cancel"
        title="Cancel"
        @click=${() =>
          this.dispatchEvent(
            new CustomEvent('cancel', {
              bubbles: true,
              composed: true,
            }),
          )}
      >
        <oscd-icon>close</oscd-icon>
      </oscd-icon-button>`;
    }
    return html`<oscd-icon-button
      aria-label="About"
      title="About"
      @click=${() => {
        if (this.aboutDialog) {
          this.aboutDialog.open = true;
        }
      }}
    >
      <oscd-icon>info</oscd-icon>
    </oscd-icon-button>`;
  }

  private renderAboutDialog() {
    return html`<oscd-dialog id="about">
      <div slot="headline">About</div>
      <div slot="content">${unsafeHTML(aboutContent)}</div>
      <div slot="actions">
        <oscd-text-button
          @click=${() => {
            if (this.aboutDialog) {
              this.aboutDialog.open = false;
            }
          }}
          >close</oscd-text-button
        >
      </div>
    </oscd-dialog>`;
  }

  render() {
    return html`<nav>
      ${this.renderEquipmentFabs()} ${this.renderStructuralFabs()}
      ${this.renderVoltageLevelFab()} ${this.renderIedTools()}
      ${this.renderSubstationFab()} ${this.renderTransformerFabs()}
      ${this.renderViewControls()} ${this.renderActionButton()}
    </nav>
    ${this.renderAboutDialog()}`;
  }

  static styles = [
    sldThemeStyles,
    css`
    * {
      --md-fab-small-container-shape: 50%;
    }

    nav {
      user-select: none;
      position: sticky;
      left: 16px;
      width: fit-content;
      max-width: calc(100cqi - 32px);
      background: var(--oscd-sld-toolbar-background-color);
      border-radius: 24px;
      z-index: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 4px;
      row-gap: 8px;
      padding: 4px;
    }

    oscd-icon-button {
      color: var(--md-sys-color-on-surface, var(--oscd-base00));
    }
    oscd-icon-button[disabled] {
      opacity: 0.38;
    }
    oscd-fab {
      /* one tonal step lighter than the nav surface so FABs read as raised
         even in dark mode, where shadows recede (shell maps every
         surface-container tier to base3, so reference the base ladder) */
      --md-fab-container-color: var(--oscd-base2);
      --md-fab-icon-color: var(--md-sys-color-on-surface, var(--oscd-base00));
    }
  `,
  ];
}
