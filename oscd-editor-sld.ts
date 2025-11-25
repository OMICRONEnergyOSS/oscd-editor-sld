import { LitElement, html, css, nothing } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { property, query, state } from 'lit/decorators.js';

import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { getReference } from '@openscd/oscd-scl';

import type { Dialog } from '@material/mwc-dialog';
import type { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import '@material/mwc-button';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-icon';

import './sld-editor.js';
import type { SldEditor } from './sld-editor.js';

import { bayIcon, equipmentIcon, ptrIcon, voltageLevelIcon } from './icons.js';
import {
  eqTypes,
  isBusBar,
  privType,
  setSLDAttributes,
  sldNs,
  xmlnsNs,
} from './util.js';

const aboutContent = await fetch(new URL('about.html', import.meta.url)).then(
  res => res.text()
);

function makeBusBar(doc: XMLDocument, nsp: string) {
  const busBar = doc.createElementNS(doc.documentElement.namespaceURI, 'Bay');
  busBar.setAttribute('name', 'BB1');
  setSLDAttributes(busBar, nsp, { w: '2' });
  const cNode = doc.createElementNS(
    doc.documentElement.namespaceURI,
    'ConnectivityNode'
  );
  cNode.setAttribute('name', 'L');
  const priv = doc.createElementNS(doc.documentElement.namespaceURI, 'Private');
  priv.setAttribute('type', privType);
  const section = doc.createElementNS(sldNs, `${nsp}:Section`);
  setSLDAttributes(section, nsp, { bus: 'true' });
  const v1 = doc.createElementNS(sldNs, `${nsp}:Vertex`);
  setSLDAttributes(v1, nsp, { x: '0.5', y: '0.5' });
  section.appendChild(v1);
  const v2 = doc.createElementNS(sldNs, `${nsp}:Vertex`);
  setSLDAttributes(v2, nsp, { x: '1.5', y: '0.5' });
  section.appendChild(v2);
  priv.appendChild(section);
  cNode.appendChild(priv);
  busBar.appendChild(cNode);
  return busBar;
}

export default class OscdEditorSld extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
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
    if (this.labelToggle) return this.labelToggle.on;
    return true;
  }

  @query('#labels') labelToggle?: IconButtonToggle;

  @query('#about') about?: Dialog;

  @query('sld-editor') sldEditor?: SldEditor;

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

  updated(changedProperties: Map<string, any>) {
    if (!changedProperties.has('doc')) return;
    const sldNsPrefix = this.doc.documentElement.lookupPrefix(sldNs);
    if (sldNsPrefix) this.nsp = sldNsPrefix;
    else
      this.doc.documentElement.setAttributeNS(
        xmlnsNs,
        `xmlns:${this.nsp}`,
        sldNs
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
        tag
      );
    });
    this.templateElements.BusBar = makeBusBar(this.doc, this.nsp);
  }

  render() {
    if (!this.doc) return html`<p>Please open an SCL document</p>`;
    return html`<main>
      <nav>
        ${Array.from(
      this.doc.querySelectorAll(':root > Substation > VoltageLevel > Bay')
    ).find(bay => !isBusBar(bay))
        ? eqTypes
          .map(
            eqType => html`<mwc-fab
                    mini
                    label="Add ${eqType}"
                    title="Add ${eqType}"
                    @click=${() => {
                const element =
                  this.templateElements.ConductingEquipment!.cloneNode() as Element;
                element.setAttribute('type', eqType);
                this.startPlacing(element);
              }}
                    >${equipmentIcon(eqType)}</mwc-fab
                  >`
          )
          .concat()
        : nothing
      }${this.doc.querySelector(':root > Substation > VoltageLevel')
        ? html`<mwc-fab
              mini
              icon="horizontal_rule"
              @click=${() => {
            const element = this.templateElements.BusBar!.cloneNode(
              true
            ) as Element;
            this.startPlacing(element);
          }}
              label="Add Bus Bar"
              title="Add Bus Bar"
            >
            </mwc-fab
            ><mwc-fab
              mini
              label="Add Bay"
              title="Add Bay"
              @click=${() => {
            const element =
              this.templateElements.Bay!.cloneNode() as Element;
            this.startPlacing(element);
          }}
              style="--mdc-theme-secondary: #12579B; --mdc-theme-on-secondary: white;"
            >
              ${bayIcon}
            </mwc-fab>`
        : nothing
      }${Array.from(this.doc.documentElement.children).find(
        c => c.tagName === 'Substation'
      )
        ? html`<mwc-fab
            mini
            label="Add VoltageLevel"
            title="Add VoltageLevel"
            @click=${() => {
            const element =
              this.templateElements.VoltageLevel!.cloneNode() as Element;
            this.startPlacing(element);
          }}
            style="--mdc-theme-secondary: #F5E214;"
          >
            ${voltageLevelIcon}
          </mwc-fab>`
        : nothing
      }<mwc-fab
          mini
          icon="margin"
          @click=${() => this.insertSubstation()}
          label="Add Substation"
          style="--mdc-theme-secondary: #BB1326; --mdc-theme-on-secondary: white;"
          title="Add Substation"
        >
        </mwc-fab
        >${Array.from(this.doc.documentElement.children).find(
        c => c.tagName === 'Substation'
      )
        ? html`<mwc-fab
                  mini
                  label="Add Single Winding Auto Transformer"
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
                  >${ptrIcon(1, { kind: 'auto' })}</mwc-fab
                ><mwc-fab
                  mini
                  label="Add Two Winding Auto Transformer"
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
                  >${ptrIcon(2, { kind: 'auto' })}</mwc-fab
                ><mwc-fab
                  mini
                  label="Add Two Winding Transformer"
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
                  >${ptrIcon(2)}</mwc-fab
                ><mwc-fab
                  mini
                  label="Add Three Winding Transformer"
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
                  >${ptrIcon(3)}</mwc-fab
                ><mwc-fab
                  mini
                  label="Add Single Winding Earthing Transformer"
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
                  >${ptrIcon(1, { kind: 'earthing' })}</mwc-fab
                ><mwc-fab
                  mini
                  label="Add Two Winding Earthing Transformer"
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
                  >${ptrIcon(2, { kind: 'earthing' })}</mwc-fab
                >`
        : nothing
      }${this.doc.querySelector('VoltageLevel, PowerTransformer')
        ? html`<mwc-icon-button-toggle
            id="labels"
            label="Toggle Labels"
            title="Toggle Labels"
            on
            onIcon="font_download"
            offIcon="font_download_off"
            @click=${() => this.requestUpdate()}
          ></mwc-icon-button-toggle>`
        : nothing
      }${this.doc.querySelector('Substation')
        ? html`<mwc-icon-button
              icon="zoom_in"
              label="Zoom In"
              title="Zoom In (${Math.round((100 * (this.gridSize + 3)) / 32)}%)"
              @click=${() => this.zoomIn()}
            >
            </mwc-icon-button
            ><mwc-icon-button
              icon="zoom_out"
              label="Zoom Out"
              ?disabled=${this.gridSize < 4}
              title="Zoom Out (${Math.round(
          (100 * (this.gridSize - 3)) / 32
        )}%)"
              @click=${() => this.zoomOut()}
            ></mwc-icon-button>`
        : nothing
      }
        </mwc-icon-button
        >${this.inAction
        ? html`<mwc-icon-button
                icon="close"
                label="Cancel"
                title="Cancel"
                @click=${() => this.reset()}
              ></mwc-icon-button>`
        : html`<mwc-icon-button
                icon="info"
                label="About"
                title="About"
                @click=${() => this.about?.show()}
              ></mwc-icon-button>`
      }
      </nav>
      <sld-editor 
        .doc="${this.doc}"
        .docVersion=${this.docVersion}
        .gridSize=${this.gridSize}
        .showLabels=${this.showLabels}
        @sld-editor-in-action=${({ detail }: CustomEvent) => { this.inAction = detail; }}
      >
      </sld-editor>
    </main>
    ${staticHtml`<mwc-dialog id="about" heading="About">
        <div>${unsafeStatic(aboutContent)}</div>
        <mwc-button dialogAction="close" slot="primaryAction">
          close
        </mwc-button>
      </mwc-dialog>`}`;
  }

  insertSubstation() {
    const parent = this.doc.documentElement;
    const node = this.doc.createElementNS(
      this.doc.documentElement.namespaceURI,
      'Substation'
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
      top: 68px;
      left: 16px;
      width: fit-content;
      max-width: calc(100vw - 32px);
      background: #fffd;
      border-radius: 24px;
      z-index: 1;
    }

    mwc-icon-button,
    mwc-icon-button-toggle {
      --mdc-theme-text-disabled-on-light: #aaa;
      color: rgb(0, 0, 0 / 0.83);
    }
    mwc-fab {
      --mdc-theme-secondary: #fff;
      --mdc-theme-on-secondary: rgb(0, 0, 0 / 0.83);
    }
  `;
}
