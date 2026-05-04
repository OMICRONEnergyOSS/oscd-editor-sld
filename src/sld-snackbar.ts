import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Minimal snackbar component for temporary toast notifications.
 * API-compatible subset of mwc-snackbar: supports `labelText`, `.show()`, and auto-dismiss.
 * Intended as a local stopgap until oscd-ui provides a notification component.
 */
export class SldSnackbar extends LitElement {
  @property({ type: String }) labelText = '';

  @property({ type: Number }) timeoutMs = 5000;

  @property({ type: Boolean, reflect: true }) open = false;

  private hideTimeout: ReturnType<typeof setTimeout> | undefined;

  show(): void {
    this.open = true;
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeoutMs);
  }

  close(): void {
    this.open = false;
    clearTimeout(this.hideTimeout);
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
      transition:
        transform 200ms ease,
        opacity 200ms ease;
      z-index: 9999;
      pointer-events: none;
    }

    :host([open]) {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .surface {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 0 16px;
      border-radius: 4px;
      background: #333;
      color: #fff;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
    }
  `;

  render() {
    return html`<div class="surface">${this.labelText}</div>`;
  }
}
