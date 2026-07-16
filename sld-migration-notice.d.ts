import { LitElement } from 'lit';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
declare const SldMigrationNotice_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
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
export default class SldMigrationNotice extends SldMigrationNotice_base {
    static scopedElements: {
        'oscd-icon': typeof OscdIcon;
        'oscd-filled-button': typeof OscdFilledButton;
    };
    private converting;
    private handleConvert;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};
