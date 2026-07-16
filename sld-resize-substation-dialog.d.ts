import { LitElement } from 'lit';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';
declare const SldResizeSubstationDialog_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
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
export declare class SldResizeSubstationDialog extends SldResizeSubstationDialog_base {
    static scopedElements: {
        'oscd-text-button': typeof OscdTextButton;
        'oscd-filled-button': typeof OscdFilledButton;
        'oscd-dialog': typeof OscdDialog;
        'oscd-outlined-text-field': typeof OscdOutlinedTextField;
    };
    substation?: Element;
    private dialog;
    private widthTextField;
    private heightTextField;
    show(substation: Element): Promise<void>;
    private confirm;
    /**
     * Feeds the substation-bounds rule into the field's standard constraint
     * validation via `setCustomValidity`, then `reportValidity()` to surface (or
     * clear) the inline error — Material suppresses the native popup. Each field
     * is checked against the other dimension's committed value so the error is
     * attributed to the dimension the user undersized. Returns the field validity.
     */
    private validate;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
