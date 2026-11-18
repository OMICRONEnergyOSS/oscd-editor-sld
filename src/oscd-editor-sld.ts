import { LitElement, html, css } from 'lit';

import { property, query, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import type { EditEventV2 } from '@openscd/oscd-api';
import { insertIed } from '@openscd/scl-lib';

import { SldEditor } from './sld-editor.js';

import { makeBusBar } from './foundations/connectivity.js';
import { withSldNamespace } from './foundations/edits.js';
import { sldPrefix } from './foundations.js';
import { convertSldLayout, hasOldNamespace } from './converter.js';
import {
  hasLegacyTextLayout,
  migrateTextLayoutEdits,
} from './foundations/text-layout-migration.js';

import { SldToolbar } from './toolbar/sld-toolbar.js';
import { sldThemeStyles } from './theme.js';
import SldMigrationNotice from './sld-migration-notice.js';

import type {
  InActionEvent,
  StartInteractionEvent,
} from './foundations/events.js';

export default class OscdEditorSld extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'sld-editor': SldEditor,
    'sld-toolbar': SldToolbar,
    'sld-migration-notice': SldMigrationNotice,
  };

  @property({ type: Object })
  doc!: XMLDocument;

  @property({ type: Number })
  docVersion: number = -1;

  @state()
  gridSize = 32;

  get nsp(): string {
    return sldPrefix(this.doc);
  }

  @state()
  templateElements: Record<string, Element> = {};

  @state()
  inAction: boolean = false;

  @state()
  private _showLabels = true;

  get showLabels(): boolean {
    return this._showLabels;
  }

  @state()
  private _showIeds = true;

  get showIeds(): boolean {
    return this._showIeds;
  }

  @query('sld-editor') sldEditor?: SldEditor;

  zoomIn() {
    this.gridSize += 3;
  }

  zoomOut() {
    this.gridSize -= 3;
    if (this.gridSize < 2) {
      this.gridSize = 2;
    }
  }

  async startBayTypicalPlacing({
    bayTypical,
    ieds,
  }: {
    bayTypical: Element;
    ieds: Element[];
  }) {
    const result = await this.sldEditor?.handleStartInteraction({
      mode: 'placing',
      element: bayTypical,
    });
    if (result) {
      const scl = this.doc.querySelector('SCL')!;
      ieds.forEach((ied) => {
        this.dispatchEvent(
          newEditEventV2(withSldNamespace(this.doc, insertIed(scl, ied))),
        );
      });
    }
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('doc')) {
      return;
    }

    [
      'Substation',
      'VoltageLevel',
      'Bay',
      'ConductingEquipment',
      'PowerTransformer',
      'TransformerWinding',
    ].forEach((tag) => {
      this.templateElements[tag] = this.doc.createElementNS(
        this.doc.documentElement.namespaceURI,
        tag,
      );
    });
    this.templateElements.BusBar = makeBusBar(this.doc, this.nsp);
  }

  convertSldAttributes() {
    const convertEdits = convertSldLayout(this.doc, this.nsp);
    this.dispatchEvent(newEditEventV2(withSldNamespace(this.doc, convertEdits)));
  }

  migrateTextLayout() {
    const edits = migrateTextLayoutEdits(this.doc, this.nsp);
    this.dispatchEvent(
      newEditEventV2(withSldNamespace(this.doc, edits), {
        title: 'Migrate SLD text layout',
      }),
    );
  }

  /**
   * Intercepts `oscd-edit-v2` events bubbling up from the editor and toolbar and,
   * when the edit writes SLD-layout content to a document that does not yet
   * declare the namespace, re-emits it with the declaration prepended (one
   * undoable commit). Re-dispatching on the root — an ancestor of both children
   * — means the replacement never re-enters this listener, so no loop guard is
   * needed. This is the single place that enforces the namespace for child
   * edits; the root's own edits (insertIed, convertSldAttributes) apply it
   * directly at their dispatch sites.
   */
  private normalizeEditsWithSldNS = (event: EditEventV2) => {
    const edit = withSldNamespace(this.doc, event.detail.edit);
    if (edit === event.detail.edit) {
      return;
    }
    event.stopPropagation();
    this.dispatchEvent(
      newEditEventV2(edit, {
        title: event.detail.title,
        squash: event.detail.squash,
      }),
    );
  };

  private handleInAction(active: boolean) {
    this.inAction = active;
  }

  render() {
    if (!this.doc) {
      return html`<p>Please open an SCL document</p>`;
    }
    if (hasOldNamespace(this.doc)) {
      return html`<sld-migration-notice
        @sld-convert=${() => this.convertSldAttributes()}
      ></sld-migration-notice>`;
    }

    if (hasLegacyTextLayout(this.doc)) {
      return html`<sld-migration-notice
        kind="text-layout"
        @sld-convert=${() => this.migrateTextLayout()}
      ></sld-migration-notice>`;
    }

    return html`<main>
      <sld-toolbar
        .doc=${this.doc}
        .docVersion=${this.docVersion}
        .templateElements=${this.templateElements}
        .inAction=${this.inAction}
        .gridSize=${this.gridSize}
        @oscd-edit-v2=${this.normalizeEditsWithSldNS}
        @oscd-sld-start-interaction=${({ detail }: StartInteractionEvent) => {
          this.sldEditor?.handleStartInteraction(detail);
        }}
        @start-placing-typical=${({ detail }: CustomEvent) => {
          this.startBayTypicalPlacing(detail);
        }}
        @view-change=${({
          detail,
        }: CustomEvent<{ showLabels: boolean; showIeds: boolean }>) => {
          this._showLabels = detail.showLabels;
          this._showIeds = detail.showIeds;
        }}
        @zoom=${({
          detail,
        }: CustomEvent<{ direction: 'in' | 'out' }>) => {
          if (detail.direction === 'in') {
            this.zoomIn();
          } else {
            this.zoomOut();
          }
        }}
        @cancel=${() => this.sldEditor?.cancelInteraction()}
      ></sld-toolbar>
      <sld-editor
        .doc="${this.doc}"
        .docVersion=${this.docVersion}
        .gridSize=${this.gridSize}
        .showLabels=${this.showLabels}
        .showIeds=${this.showIeds}
        @oscd-edit-v2=${this.normalizeEditsWithSldNS}
        @oscd-sld-in-action=${({ detail }: InActionEvent) => {
          this.handleInAction(detail);
        }}
      >
      </sld-editor>
    </main>`;
  }

  static styles = [
    sldThemeStyles,
    css`
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
  `,
  ];
}
