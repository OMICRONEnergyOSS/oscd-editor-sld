import { LitElement, html, css, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { property, query, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { getReference, identity } from '@openscd/scl-lib';

import type { EditV2 } from '@openscd/oscd-api';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdFab } from '@omicronenergy/oscd-ui/fab/OscdFab.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { OscdList } from '@omicronenergy/oscd-ui/list/OscdList.js';
import { OscdListItem } from '@omicronenergy/oscd-ui/list/OscdListItem.js';
import { OscdMenu } from '@omicronenergy/oscd-ui/menu/OscdMenu.js';
import { OscdMenuItem } from '@omicronenergy/oscd-ui/menu/OscdMenuItem.js';
import { SldEditor } from './sld-editor.js';

import { bayIcon, equipmentIcon, ptrIcon, voltageLevelIcon } from './icons.js';
import {
  eqTypes,
  getSLDAttributes,
  iedReferences,
  isBusBar,
  makeBusBar,
  resolveIed,
  setSLDAttributes,
  sldNs,
  xmlnsNs,
} from './util.js';
import { convertSldLayout, hasOldNamespace } from './converter.js';

const aboutContent = await fetch(new URL('about.html', import.meta.url)).then(
  res => res.text(),
);

export default class OscdEditorSld extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'oscd-text-button': OscdTextButton,
    'oscd-dialog': OscdDialog,
    'oscd-fab': OscdFab,
    'oscd-icon': OscdIcon,
    'oscd-icon-button': OscdIconButton,
    'oscd-list': OscdList,
    'oscd-list-item': OscdListItem,
    'oscd-menu': OscdMenu,
    'oscd-menu-item': OscdMenuItem,
    'sld-editor': SldEditor,
  };

  @property({ type: Object })
  doc!: XMLDocument;

  @property({ type: Number })
  docVersion: number = -1;

  @state()
  gridSize = 32;

  @state()
  nsp = 'eosld';

  @state()
  templateElements: Record<string, Element> = {};

  @state()
  inAction: boolean = false;

  @state()
  get showLabels(): boolean {
    if (this.labelToggle) return this.labelToggle.selected;
    return true;
  }

  @state()
  @state()
  private _showIeds = true;

  get showIeds(): boolean {
    return this._showIeds;
  }

  @query('#labels') labelToggle?: OscdIconButton;

  @query('#about') about?: OscdDialog;

  @query('#iedMenu') iedMenu?: OscdMenu;

  @query('sld-editor') sldEditor?: SldEditor;

  @query('#bayTypicalFileInput') bayTypicalFileInput?: HTMLInputElement;

  zoomIn() {
    this.gridSize += 3;
  }

  zoomOut() {
    this.gridSize -= 3;
    if (this.gridSize < 2) this.gridSize = 2;
  }

  startPlacing(element: Element | undefined) {
    this.reset();
    this.sldEditor?.startPlacing(element);
  }

  reset() {
    this.inAction = false;
    this.sldEditor?.resetWithOffset();
  }

  handleKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') this.reset();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (this.iedMenu)
      this.iedMenu.anchorElement = this.iedMenu
        .previousElementSibling as HTMLElement;
    if (!changedProperties.has('doc')) return;
    const sldNsPrefix = this.doc.documentElement.lookupPrefix(sldNs);
    if (sldNsPrefix) this.nsp = sldNsPrefix;
    else
      this.doc.documentElement.setAttributeNS(
        xmlnsNs,
        `xmlns:${this.nsp}`,
        sldNs,
      );

    [
      'Substation',
      'VoltageLevel',
      'Bay',
      'ConductingEquipment',
      'PowerTransformer',
      'TransformerWinding',
    ].forEach(tag => {
      this.templateElements[tag] = this.doc.createElementNS(
        this.doc.documentElement.namespaceURI,
        tag,
      );
    });
    this.templateElements.BusBar = makeBusBar(this.doc, this.nsp);
  }

  convertSldAttributes() {
    const convertEdits = convertSldLayout(this.doc, this.nsp);
    this.dispatchEvent(newEditEventV2(convertEdits));
  }

  /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
  async importBayTypical(event: Event): Promise<void> {
    const file = (<HTMLInputElement | null>event.target)?.files?.item(0);
    if (!file) return;

    const fileBlob = await file.text();

    const bayTypicalDoc = new DOMParser().parseFromString(
      fileBlob,
      'application/xml',
    );

    const convertEdits = convertSldLayout(bayTypicalDoc, this.nsp);
    this.dispatchEvent(newEditEventV2(convertEdits));

    const bayTypical = bayTypicalDoc.querySelector('Bay');

    if (bayTypical && this.sldEditor) {
      this.sldEditor.startPlacingBayTypical(bayTypical);
    }
  }

  render() {
    if (!this.doc) return html`<p>Please open an SCL document</p>`;
    if (hasOldNamespace(this.doc))
      return html`<oscd-text-button
        @click="${() => this.convertSldAttributes()}"
        >Convert SLD Layout</oscd-text-button
      >`;

    const ieds = Array.from(this.doc.querySelectorAll(':root > IED'));
    const iedRefs = Array.from(
      this.doc.querySelectorAll(':root > Substation'),
    ).flatMap(sub => iedReferences(sub));

    const refForIed = (ied: Element) =>
      iedRefs.find(ref => ref.getAttributeNS(sldNs, 'id') === identity(ied));

    const unusedIeds = ieds.filter(ied => !refForIed(ied));

    const unusedIedRefs = iedRefs.filter(iedRef => !resolveIed(iedRef));

    const usedIedRefs = Array.from(ieds)
      .sort((a, b) => {
        const aName = a.getAttribute('name') ?? '';
        const bName = b.getAttribute('name') ?? '';

        const aRef = refForIed(a);
        const aIsUsed = !!aRef && !!getSLDAttributes(aRef, 'x');

        const bRef = refForIed(b);
        const bIsUsed = !!bRef && !!getSLDAttributes(bRef, 'x');

        if (aIsUsed !== bIsUsed) return aIsUsed ? -1 : 1;

        return aName.localeCompare(bName, undefined, {
          sensitivity: 'base',
        });
      })
      .filter(ied => !!getSLDAttributes(refForIed(ied) ?? ied, 'x'));

    return html`<main>
      <nav>
        ${
          Array.from(
            this.doc.querySelectorAll(
              ':root > Substation > VoltageLevel > Bay',
            ),
          ).find(bay => !isBusBar(bay))
            ? eqTypes
                .map(
                  eqType =>
                    html`<oscd-fab
                      size="small"
                      aria-label="Add ${eqType}"
                      title="Add ${eqType}"
                      @click=${() => {
                        const element =
                          this.templateElements.ConductingEquipment!.cloneNode() as Element;
                        element.setAttribute('type', eqType);
                        this.startPlacing(element);
                      }}
                      >${equipmentIcon(eqType)}</oscd-fab
                    >`,
                )
                .concat()
            : nothing
        }${
          this.doc.querySelector(':root > Substation > VoltageLevel')
            ? html`<oscd-fab
                  size="small"
                  @click=${() => {
                    const element = this.templateElements.BusBar!.cloneNode(
                      true,
                    ) as Element;
                    this.startPlacing(element);
                  }}
                  aria-label="Add Bus Bar"
                  title="Add Bus Bar"
                  ><oscd-icon slot="icon">horizontal_rule</oscd-icon> </oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Bay"
                  title="Add Bay"
                  @click=${() => {
                    const element =
                      this.templateElements.Bay!.cloneNode() as Element;
                    this.startPlacing(element);
                  }}
                  style="--md-fab-container-color: #12579B; --md-fab-icon-color: white;"
                >
                  ${bayIcon}
                </oscd-fab>`
            : nothing
        }${
          Array.from(this.doc.documentElement.children).find(
            c => c.tagName === 'Substation',
          )
            ? html`<oscd-fab
                  size="small"
                  aria-label="Add VoltageLevel"
                  title="Add VoltageLevel"
                  @click=${() => {
                    const element =
                      this.templateElements.VoltageLevel!.cloneNode() as Element;
                    this.startPlacing(element);
                  }}
                  style="--md-fab-container-color: #F5E214;"
                >
                  ${voltageLevelIcon}
                </oscd-fab>
                <oscd-fab
                  size="small"
                  aria-label="Import Bay Typical"
                  title="Import Bay Typical"
                  @click=${(evt: Event) => {
                    evt.stopImmediatePropagation();
                    this.bayTypicalFileInput?.click();
                  }}
                  ><oscd-icon slot="icon">upload_file</oscd-icon>
                  <input
                    id="bayTypicalFileInput"
                    type="file"
                    @change="${this.importBayTypical}"
                  />
                </oscd-fab>
                ${ieds.length > 0 || unusedIeds.length > 0
                  ? html`<oscd-fab
                        size="small"
                        aria-label="Add IED"
                        title="Add IED"
                        @click=${() => {
                          this._showIeds = true;
                          if (this.iedMenu) this.iedMenu.open = true;
                        }}
                        ><oscd-icon slot="icon"
                          >developer_board</oscd-icon
                        ></oscd-fab
                      >
                      <oscd-menu positioning="fixed" id="iedMenu">
                        ${unusedIedRefs.length > 0
                          ? html`<oscd-menu-item
                              data-name="Delete Unmatched"
                              style="color: #BB1326;"
                              @click=${() => {
                                const edits: EditV2[] = [];
                                iedRefs
                                  .filter(
                                    referencedIed => !resolveIed(referencedIed),
                                  )
                                  .forEach(unusedReferencedIed => {
                                    const parent =
                                      unusedReferencedIed.parentElement;
                                    if (
                                      parent?.tagName === 'Private' &&
                                      parent.getAttribute('type') ===
                                        'OpenSCD-SLD-Layout' &&
                                      parent.childElementCount === 1
                                    )
                                      edits.push({ node: parent });
                                    else
                                      edits.push({ node: unusedReferencedIed });
                                  });

                                this.dispatchEvent(newEditEventV2(edits));
                                if (this.iedMenu) this.iedMenu.open = false;
                              }}
                            >
                              <oscd-icon slot="start">delete</oscd-icon>
                              <div slot="headline">
                                Remove reference to ${unusedIedRefs.length}
                                missing
                                IED${unusedIedRefs.length > 1 ? 's' : ''} from
                                the SLD
                              </div>
                            </oscd-menu-item>`
                          : nothing}
                        ${unusedIeds.length > 0
                          ? html`<oscd-list-item type="text">
                                <div slot="headline">
                                  <strong>Available IEDs</strong>
                                </div>
                              </oscd-list-item>
                              ${unusedIeds.map(
                                ied =>
                                  html`<oscd-menu-item
                                    data-name="${ied.getAttribute('name')!}"
                                    @click=${() => {
                                      const element = this.insertOrGetIed(
                                        ied,
                                        this.doc,
                                      );
                                      if (this.iedMenu)
                                        this.iedMenu.open = false;
                                      this.startPlacing(element);
                                    }}
                                  >
                                    <div slot="headline">
                                      ${ied.getAttribute('name')!}
                                    </div>
                                    <div slot="supporting-text">
                                      ${[
                                        ied.getAttribute('manufacturer'),
                                        ied.getAttribute('type'),
                                        ied.getAttribute('desc'),
                                      ]
                                        .filter(a => !!a)
                                        .join(' - ')}
                                    </div>
                                  </oscd-menu-item>`,
                              )}`
                          : nothing}
                        ${usedIedRefs.length > 0
                          ? html`<oscd-list-item type="text">
                                <div slot="headline">
                                  <strong>Used IEDs</strong>
                                </div>
                              </oscd-list-item>
                              ${usedIedRefs.map(
                                ied =>
                                  html`<oscd-menu-item
                                    data-name="${ied.getAttribute('name')!}"
                                    @click=${() => {
                                      const foundIed = ieds.find(
                                        item =>
                                          item.getAttribute('name') ===
                                          ied.getAttribute('name'),
                                      );
                                      if (!foundIed) return;
                                      const element = this.insertOrGetIed(
                                        foundIed,
                                        this.doc,
                                      );
                                      if (this.iedMenu)
                                        this.iedMenu.open = false;
                                      this.startPlacing(element);
                                    }}
                                  >
                                    <div slot="headline">
                                      ${ied.getAttribute('name')!}
                                    </div>
                                    <div slot="supporting-text">
                                      ${[
                                        ied.getAttribute('manufacturer'),
                                        ied.getAttribute('type'),
                                        ied.getAttribute('desc'),
                                      ]
                                        .filter(a => !!a)
                                        .join(' - ')}
                                    </div>
                                    <oscd-icon slot="end">pin_drop</oscd-icon>
                                  </oscd-menu-item>`,
                              )}`
                          : nothing}
                      </oscd-menu>`
                  : nothing}`
            : nothing
        }<oscd-fab
          size="small"
          @click=${() => this.insertSubstation()}
          aria-label="Add Substation"
          style="--md-fab-container-color: #BB1326; --md-fab-icon-color: white;"
          title="Add Substation"
        ><oscd-icon slot="icon">margin</oscd-icon>
        </oscd-fab
        >${
          Array.from(this.doc.documentElement.children).find(
            c => c.tagName === 'Substation',
          )
            ? html`<oscd-fab
                  size="small"
                  aria-label="Add Single Winding Auto Transformer"
                  title="Add Single Winding Auto Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    setSLDAttributes(element, this.nsp, {
                      kind: 'auto',
                      rot: '3',
                    });
                    const winding =
                      this.templateElements.TransformerWinding!.cloneNode() as Element;
                    winding.setAttribute('type', 'PTW');
                    winding.setAttribute('name', 'W1');
                    element.appendChild(winding);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(1, { kind: 'auto' })}</oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Two Winding Auto Transformer"
                  title="Add Two Winding Auto Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    setSLDAttributes(element, this.nsp, { kind: 'auto' });
                    const windings = [];
                    for (let i = 1; i <= 2; i += 1) {
                      const winding =
                        this.templateElements.TransformerWinding!.cloneNode() as Element;
                      winding.setAttribute('type', 'PTW');
                      winding.setAttribute('name', `W${i}`);
                      windings.push(winding);
                    }
                    element.append(...windings);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(2, { kind: 'auto' })}</oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Two Winding Transformer"
                  title="Add Two Winding Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    const windings = [];
                    for (let i = 1; i <= 2; i += 1) {
                      const winding =
                        this.templateElements.TransformerWinding!.cloneNode() as Element;
                      winding.setAttribute('type', 'PTW');
                      winding.setAttribute('name', `W${i}`);
                      windings.push(winding);
                    }
                    element.append(...windings);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(2)}</oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Three Winding Transformer"
                  title="Add Three Winding Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    const windings = [];
                    for (let i = 1; i <= 3; i += 1) {
                      const winding =
                        this.templateElements.TransformerWinding!.cloneNode() as Element;
                      winding.setAttribute('type', 'PTW');
                      winding.setAttribute('name', `W${i}`);
                      windings.push(winding);
                    }
                    element.append(...windings);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(3)}</oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Single Winding Earthing Transformer"
                  title="Add Single Winding Earthing Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    setSLDAttributes(element, this.nsp, { kind: 'earthing' });
                    const winding =
                      this.templateElements.TransformerWinding!.cloneNode() as Element;
                    winding.setAttribute('type', 'PTW');
                    winding.setAttribute('name', 'W1');
                    element.appendChild(winding);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(1, { kind: 'earthing' })}</oscd-fab
                ><oscd-fab
                  size="small"
                  aria-label="Add Two Winding Earthing Transformer"
                  title="Add Two Winding Earthing Transformer"
                  @click=${() => {
                    const element =
                      this.templateElements.PowerTransformer!.cloneNode() as Element;
                    element.setAttribute('type', 'PTR');
                    setSLDAttributes(element, this.nsp, { kind: 'earthing' });
                    const windings = [];
                    for (let i = 1; i <= 2; i += 1) {
                      const winding =
                        this.templateElements.TransformerWinding!.cloneNode() as Element;
                      winding.setAttribute('type', 'PTW');
                      winding.setAttribute('name', `W${i}`);
                      windings.push(winding);
                    }
                    element.append(...windings);
                    this.startPlacing(element);
                  }}
                  >${ptrIcon(2, { kind: 'earthing' })}</oscd-fab
                >`
            : nothing
        }${
          this.doc.querySelector('VoltageLevel, PowerTransformer')
            ? html`<oscd-icon-button
                id="labels"
                aria-label="Toggle Labels"
                title="Toggle Labels"
                toggle
                selected
                @click=${() => this.requestUpdate()}
              >
                <oscd-icon slot="selected">font_download</oscd-icon>
                <oscd-icon>font_download_off</oscd-icon>
              </oscd-icon-button>`
            : nothing
        }${
          (ieds.length > 0 || unusedIeds.length > 0) &&
          this.doc.querySelector(':root > Substation')
            ? html`<oscd-icon-button
                id="ieds"
                aria-label="Toggle IEDs"
                title="Toggle IEDs"
                toggle
                ?selected=${this._showIeds}
                @click=${() => {
                  this._showIeds = !this._showIeds;
                  if (this.iedMenu) this.requestUpdate();
                }}
              >
                <oscd-icon slot="selected">developer_board</oscd-icon>
                <oscd-icon>developer_board_off</oscd-icon>
              </oscd-icon-button>`
            : nothing
        }${
          this.doc.querySelector('Substation')
            ? html`<oscd-icon-button
                  aria-label="Zoom In"
                  title="Zoom In (${Math.round(
                    (100 * (this.gridSize + 3)) / 32,
                  )}%)"
                  @click=${() => this.zoomIn()}
                >
                  <oscd-icon>zoom_in</oscd-icon> </oscd-icon-button
                ><oscd-icon-button
                  aria-label="Zoom Out"
                  ?disabled=${this.gridSize < 4}
                  title="Zoom Out (${Math.round(
                    (100 * (this.gridSize - 3)) / 32,
                  )}%)"
                  @click=${() => this.zoomOut()}
                >
                  <oscd-icon>zoom_out</oscd-icon>
                </oscd-icon-button>`
            : nothing
        }
        </oscd-icon-button
        >${
          this.inAction
            ? html`<oscd-icon-button
                aria-label="Cancel"
                title="Cancel"
                @click=${() => this.reset()}
              >
                <oscd-icon>close</oscd-icon>
              </oscd-icon-button>`
            : html`<oscd-icon-button
                aria-label="About"
                title="About"
                @click=${() => {
                  if (this.about) this.about.open = true;
                }}
              >
                <oscd-icon>info</oscd-icon>
              </oscd-icon-button>`
        }
      </nav>
      <sld-editor 
        .doc="${this.doc}"
        .docVersion=${this.docVersion}
        .gridSize=${this.gridSize}
        .showLabels=${this.showLabels}
        .showIeds=${this.showIeds}
        @sld-editor-in-action=${({ detail }: CustomEvent) => {
          this.inAction = detail;
        }}
      >
      </sld-editor>
    </main>
    ${html`<oscd-dialog id="about">
      <div slot="headline">About</div>
      <div slot="content">${unsafeHTML(aboutContent)}</div>
      <div slot="actions">
        <oscd-text-button
          @click=${() => {
            if (this.about) this.about.open = false;
          }}
          >close</oscd-text-button
        >
      </div>
    </oscd-dialog>`}`;
  }

  insertOrGetIed(ied: Element, doc: XMLDocument): Element {
    const referencedIed = iedReferences(doc).find(
      ref => ref.getAttributeNS(sldNs, 'id') === identity(ied),
    );

    if (referencedIed) return referencedIed;

    const newIedReference = doc.createElementNS(sldNs, `${this.nsp}:Reference`);
    newIedReference.setAttributeNS(
      sldNs,
      `${this.nsp}:id`,
      String(identity(ied)),
    );
    newIedReference.setAttributeNS(sldNs, `${this.nsp}:type`, 'IED');

    return newIedReference;
  }

  insertSubstation() {
    const parent = this.doc.documentElement;
    const node = this.doc.createElementNS(
      this.doc.documentElement.namespaceURI,
      'Substation',
    );
    const reference = getReference(parent, 'Substation');
    let index = 1;
    while (this.doc.querySelector(`:root > Substation[name="S${index}"]`))
      index += 1;
    node.setAttribute('name', `S${index}`);
    setSLDAttributes(node, this.nsp, { w: '50', h: '25' });
    this.dispatchEvent(newEditEventV2({ parent, node, reference }));
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
    }

    main {
      padding: 16px;
      width: fit-content;
    }

    div {
      margin-top: 12px;
    }

    nav {
      user-select: none;
      position: sticky;
      left: 16px;
      width: fit-content;
      max-width: calc(100cqi - 32px);
      background: #fffd;
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
      color: rgb(0, 0, 0 / 0.83);
    }
    oscd-icon-button[disabled] {
      opacity: 0.38;
    }
    oscd-fab {
      --md-fab-container-color: #fff;
      --md-fab-icon-color: rgb(0, 0, 0 / 0.83);
      --md-fab-small-container-shape: 50%;
    }
  `;
}
