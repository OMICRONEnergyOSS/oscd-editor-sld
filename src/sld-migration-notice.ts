import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';

import { sldThemeStyles } from './theme.js';

/**
 * The full-screen notice shown when the open document still stores its SLD
 * layout in the legacy attribute format. It explains why the layout must be
 * migrated and offers a single, one-way conversion.
 *
 * This is a purely presentational component: it owns the copy, styling and the
 * disabled "Converting…" busy state, but nothing about the document or the
 * conversion itself. Pressing the button emits a `sld-convert` event; the host
 * owns `doc`/`nsp` and performs the actual (synchronous) conversion, then
 * unmounts this notice once the document no longer uses the old namespace.
 */
export default class SldMigrationNotice extends ScopedElementsMixin(
  LitElement,
) {
  static scopedElements = {
    'oscd-icon': OscdIcon,
    'oscd-filled-button': OscdFilledButton,
  };

  /**
   * `namespace` is the legacy attribute-based layout format; `text-layout` is
   * layout stored in a `Private` inside `Text`, which SCL does not permit.
   */
  @property({ type: String })
  kind: 'namespace' | 'text-layout' = 'namespace';

  @state()
  private converting = false;

  private async handleConvert(): Promise<void> {
    if (this.converting) {
      return;
    }
    this.converting = true;
    // Converting a large document blocks the main thread for a noticeable
    // moment. Yield until the disabled "Converting…" button has actually
    // painted (two frames — the first schedules the paint, the second runs
    // after it) before asking the host to run the synchronous conversion, so
    // the user gets immediate feedback instead of a frozen, unresponsive
    // button.
    await this.updateComplete;
    await new Promise(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve(null))),
    );
    try {
      this.dispatchEvent(
        new CustomEvent('sld-convert', { bubbles: true, composed: true }),
      );
    } finally {
      this.converting = false;
    }
  }

  private renderTextLayoutNotice() {
    return html`<div
      class="migration"
      role="region"
      aria-label="SLD text layout update required"
    >
      <oscd-icon class="migration-icon">shield</oscd-icon>
      <h2>SLD text layout update required</h2>
      <p class="migration-lead">
        This file stores the position and formatting of some text labels inside
        the <code>Text</code> elements themselves. The SCL schema does not allow
        that, so it can make the file invalid. To keep working on this diagram
        here, the label layout must be moved to the parent element's SLD layout
        data. Only <em>where</em> the layout is stored changes; your text and
        electrical model are untouched. You can undo the change.
      </p>
      <oscd-filled-button
        class="migration-action"
        ?disabled=${this.converting}
        @click="${() => this.handleConvert()}"
        >${this.converting
          ? 'Updating…'
          : 'Update Text Layout'}</oscd-filled-button
      >
    </div>`;
  }

  render() {
    if (this.kind === 'text-layout') {
      return this.renderTextLayoutNotice();
    }
    return html`<div
      class="migration"
      role="region"
      aria-label="SLD layout conversion required"
    >
      <oscd-icon class="migration-icon">shield</oscd-icon>
      <h2>SLD layout conversion required</h2>
      <p class="migration-lead">
        To reduce the risk of other tools inadvertently dropping your SLD data
        from the file, this plugin has changed how it stores SLD layout — and it
        no longer supports the older format this file currently uses. To keep
        working on this diagram here, you'll first need to convert it. The
        conversion is safe, but it is <strong>one&#8209;way</strong>: once
        converted, the file can no longer be opened by older versions of the SLD
        plugin.
      </p>
      <details class="migration-details">
        <summary>Why is this happening?</summary>
        <div class="migration-details-body">
          <p>
            Earlier versions of the SLD editor stored layout by adding custom
            attributes directly to your existing SCL elements. This was fully
            IEC&nbsp;61850 compliant, but other tools that don't recognise those
            attributes can silently strip them out — losing all of your
            diagram's layout in the process.
          </p>
          <p>
            To protect against that, the plugin now stores all SLD layout data
            inside <code>&lt;Private type="OpenSCD-SLD-Layout"&gt;</code>
            sections within the SCL elements. IEC&nbsp;61850 requires conformant
            tools to preserve <code>Private</code> data, so your layout stays
            safe wherever the file travels.
          </p>
          <p>
            Only <em>where</em> the layout is stored changes — never your
            substation's electrical model. Because this is a one&#8209;way
            conversion, other OpenSCD distributions or older SLD plugins that
            still expect the previous format may no longer display this diagram.
          </p>
        </div>
      </details>
      <oscd-filled-button
        class="migration-action"
        ?disabled=${this.converting}
        @click="${() => this.handleConvert()}"
        >${this.converting
          ? 'Converting…'
          : 'Convert SLD Layout'}</oscd-filled-button
      >
    </div>`;
  }

  static styles = [
    sldThemeStyles,
    css`
      :host {
        display: block;
      }

      .migration {
        box-sizing: border-box;
        max-width: 32rem;
        margin: 0 auto;
        padding: 64px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
        color: var(--md-sys-color-on-surface, var(--oscd-base00));
      }

      .migration-icon {
        --md-icon-size: 40px;
        color: var(--md-sys-color-primary, var(--oscd-primary));
      }

      .migration h2 {
        margin: 0;
        font: 500 1.375rem/1.75rem Roboto, sans-serif;
      }

      .migration-lead {
        margin: 0;
        font: 400 0.95rem/1.5rem Roboto, sans-serif;
        color: var(--md-sys-color-on-surface-variant, var(--oscd-base00));
      }

      .migration-details {
        width: 100%;
        text-align: left;
        margin-top: 4px;
      }

      .migration-details summary {
        cursor: pointer;
        text-align: center;
        font: 500 0.875rem/1.25rem Roboto, sans-serif;
        color: var(--md-sys-color-primary, var(--oscd-primary));
        list-style-position: inside;
      }

      .migration-details summary:focus-visible {
        outline: 2px solid var(--md-sys-color-primary, var(--oscd-primary));
        outline-offset: 2px;
        border-radius: 4px;
      }

      .migration-details-body {
        margin-top: 8px;
      }

      .migration-details-body p {
        margin: 0 0 8px;
        font: 400 0.875rem/1.4rem Roboto, sans-serif;
        color: var(--md-sys-color-on-surface-variant, var(--oscd-base00));
      }

      .migration code {
        font-family: 'Roboto Mono', ui-monospace, monospace;
        font-size: 0.85em;
        color: var(--md-sys-color-on-surface, var(--oscd-base00));
        white-space: nowrap;
      }

      .migration-action {
        margin-top: 8px;
      }
    `,
  ];
}
