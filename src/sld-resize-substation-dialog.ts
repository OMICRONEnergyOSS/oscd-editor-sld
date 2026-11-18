import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';

import { canResizeTo } from './foundations/sld-placement.js';
import { attributes } from './foundations/sld-attributes.js';
import { newResizeEvent } from './foundations/events.js';

export type SubstationResizeValidator = (
  substation: Element,
  width: number,
  height: number,
  dimension: 'width' | 'height',
) => string | undefined;

/** Whole number ≥ 1, or NaN for empty, fractional, non-finite or \< 1 input. */
function parseDimension(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === '') {
    return NaN;
  }
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 ? n : NaN;
}

/**
 * A self-contained dialog for resizing a `Substation`. Owned by the editor
 * controller (`SldEditor`) so there is exactly one instance regardless of how
 * many substations are rendered.
 *
 * Contract: input = the target `substation`; output = a single `oscd-sld-resize`
 * event carrying the validated width/height. The controller builds and
 * dispatches the resulting `EditV2`, so the resize edit flows through the same
 * path as drag-resize.
 */
export class SldResizeSubstationDialog extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'oscd-text-button': OscdTextButton,
    'oscd-filled-button': OscdFilledButton,
    'oscd-dialog': OscdDialog,
    'oscd-outlined-text-field': OscdOutlinedTextField,
  };

  @property()
  substation?: Element;

  @property({ attribute: false })
  validateSubstationResize?: SubstationResizeValidator;

  @query('oscd-dialog')
  private dialog!: OscdDialog;

  @query('#substationWidth')
  private widthTextField!: OscdOutlinedTextField;

  @query('#substationHeight')
  private heightTextField!: OscdOutlinedTextField;

  async show(substation: Element) {
    this.substation = substation;
    this.requestUpdate(); // SCL doc may have changed, safest to update.
    await this.updateComplete;
    this.resetFields();
    this.dialog.open = true;
  }

  private validateAll(): boolean {
    // No short-circuit: revalidate both so neither keeps a stale error.
    const widthOk = this.validate(this.widthTextField);
    const heightOk = this.validate(this.heightTextField);
    return widthOk && heightOk;
  }

  private confirm() {
    if (!this.substation || !this.validateAll()) {
      return;
    }

    const {
      dim: [oldW, oldH],
    } = attributes(this.substation);
    const newW = parseDimension(this.widthTextField.value);
    const newH = parseDimension(this.heightTextField.value);
    this.closeDialog();

    if (newW === oldW && newH === oldH) {
      return;
    }
    this.dispatchEvent(
      newResizeEvent({ element: this.substation, w: newW, h: newH }),
    );
  }

  /**
   * Feeds the substation-bounds rule into the field's standard constraint
   * validation via `setCustomValidity`, then `reportValidity()` to surface (or
   * clear) the inline error — Material suppresses the native popup. Each field
   * is checked against the other dimension's committed value so the error is
   * attributed to the dimension the user undersized. The host's
   * `validateSubstationResize` callback, by contrast, receives both proposed
   * dimensions and takes precedence over that built-in check. Returns the field
   * validity.
   */
  private validate(field: OscdOutlinedTextField): boolean {
    if (!this.substation) {
      return true;
    }

    const width = parseDimension(this.widthTextField.value);
    const height = parseDimension(this.heightTextField.value);
    const value = field === this.widthTextField ? width : height;

    if (Number.isNaN(value)) {
      field.setCustomValidity('Enter a whole number of at least 1');
      return field.reportValidity();
    }

    // The other field may be invalid mid-edit; skip the host callback until both parse.
    const message =
      Number.isNaN(width) || Number.isNaN(height)
        ? undefined
        : this.runHostValidator(
          width,
          height,
          field === this.widthTextField ? 'width' : 'height',
        );
    const {
      dim: [oldW, oldH],
    } = attributes(this.substation);
    const fits =
      field === this.widthTextField
        ? canResizeTo(this.substation, this.substation, value, oldH)
        : canResizeTo(this.substation, this.substation, oldW, value);
    field.setCustomValidity(
      message || (fits ? '' : 'Too small to contain the substation’s voltage levels'),
    );
    return field.reportValidity();
  }

  /**
   * Calls the host's validator. A throwing callback must not break the dialog,
   * so the error is logged and treated as "no custom message" (fail open): the
   * built-in validation still applies.
   */
  private runHostValidator(
    width: number,
    height: number,
    dimension: 'width' | 'height',
  ): string | undefined {
    try {
      return this.validateSubstationResize?.(
        this.substation!,
        width,
        height,
        dimension,
      );
    } catch (error) {
      console.error('validateSubstationResize threw', error);
      return undefined;
    }
  }

  private resetFields() {
    for (const field of [this.widthTextField, this.heightTextField]) {
      field.reset();
      field.setCustomValidity('');
    }
  }

  private closeDialog() {
    this.dialog.open = false;
  }

  render() {
    if (!this.substation) {
      return html`<oscd-dialog></oscd-dialog>`;
    }
    const {
      dim: [w, h],
    } = attributes(this.substation);
    return html`<oscd-dialog @cancel=${this.closeDialog}>
      <div slot="headline">Resize ${this.substation.getAttribute('name')}</div>
      <form
        slot="content"
        style="display: flex; flex-direction: column; gap: 12px;"
      >
        <oscd-outlined-text-field
          id="substationWidth"
          type="number"
          min="1"
          step="1"
          label="Width"
          value="${w}"
          supporting-text="Must stay large enough to contain all voltage levels"
          dialogInitialFocus
          @input=${() => this.validateAll()}
        ></oscd-outlined-text-field>
        <oscd-outlined-text-field
          id="substationHeight"
          type="number"
          min="1"
          step="1"
          label="Height"
          value="${h}"
          supporting-text="Must stay large enough to contain all voltage levels"
          @input=${() => this.validateAll()}
        ></oscd-outlined-text-field>
      </form>
      <div slot="actions">
        <oscd-text-button @click=${this.closeDialog}
          >Cancel</oscd-text-button
        >
        <oscd-filled-button @click=${() => this.confirm()}
          >Resize</oscd-filled-button
        >
      </div>
    </oscd-dialog>`;
  }
}
