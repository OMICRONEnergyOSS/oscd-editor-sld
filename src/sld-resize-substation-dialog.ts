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
) => string | void;

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
    await this.updateComplete;
    this.dialog.open = true;
  }

  private confirm() {
    if (!this.substation) {
      return;
    }
    // Surface validity through the standard constraint-validation API; if
    // either field is invalid, report it and keep the dialog open.
    const widthOk = this.validate(this.widthTextField);
    const heightOk = this.validate(this.heightTextField);
    if (!widthOk || !heightOk) {
      return;
    }

    const {
      dim: [oldW, oldH],
    } = attributes(this.substation);
    const [newW, newH] = [this.widthTextField, this.heightTextField].map(ui =>
      parseInt(ui.value ?? '1', 10),
    );
    this.dialog.open = false;
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
   * attributed to the dimension the user undersized. Returns the field validity.
   */
  private validate(field: OscdOutlinedTextField): boolean {
    if (!this.substation) {
      return true;
    }
    const message = this.validateSubstationResize?.(
      this.substation,
      Number(this.widthTextField.value),
      Number(this.heightTextField.value),
      field === this.widthTextField ? 'width' : 'height',
    );
    const {
      dim: [oldW, oldH],
    } = attributes(this.substation);
    const value = parseInt(field.value ?? '', 10);
    const fits =
      field === this.widthTextField
        ? canResizeTo(this.substation, this.substation, value, oldH)
        : canResizeTo(this.substation, this.substation, oldW, value);
    field.setCustomValidity(
      message || (fits ? '' : 'Too small to contain the substation’s voltage levels'),
    );
    return field.reportValidity();
  }

  private cancel() {
    this.dialog.open = false;
    this.widthTextField.reset();
    this.heightTextField.reset();
  }

  render() {
    if (!this.substation) {
      return html`<oscd-dialog></oscd-dialog>`;
    }
    const {
      dim: [w, h],
    } = attributes(this.substation);
    return html`<oscd-dialog @cancel=${this.cancel}>
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
          @input=${() => this.validate(this.widthTextField)}
        ></oscd-outlined-text-field>
        <oscd-outlined-text-field
          id="substationHeight"
          type="number"
          min="1"
          step="1"
          label="Height"
          value="${h}"
          supporting-text="Must stay large enough to contain all voltage levels"
          @input=${() => this.validate(this.heightTextField)}
        ></oscd-outlined-text-field>
      </form>
      <div slot="actions">
        <oscd-text-button @click=${this.cancel}
          >Cancel</oscd-text-button
        >
        <oscd-filled-button @click=${() => this.confirm()}
          >Resize</oscd-filled-button
        >
      </div>
    </oscd-dialog>`;
  }
}
