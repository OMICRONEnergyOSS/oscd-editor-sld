import { LitElement } from 'lit';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
declare const SldSubstationHeader_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
/**
 * Editor-owned chrome for a single substation: its name plus the
 * Edit / Resize / Delete / Export commands. Rendered by `SldEditor` and slotted
 * into `SldSubstationViewer`'s `header` slot so the viewer stays free of
 * editing concerns. Reports intent only — the editor decides what each command
 * means (Export is delegated back to the viewer, which owns the SVG).
 */
export declare class SldSubstationHeader extends SldSubstationHeader_base {
    static scopedElements: {
        'oscd-icon': typeof OscdIcon;
        'oscd-icon-button': typeof OscdIconButton;
    };
    substation: Element;
    disabled: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};
