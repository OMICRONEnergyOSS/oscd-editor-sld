import { LitElement } from 'lit';
import { OscdFab } from '@omicronenergy/oscd-ui/fab/OscdFab.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
export type StartPlacingTypicalDetail = {
    bayTypical: Element;
    ieds: Element[];
};
export type StartPlacingTypicalEvent = CustomEvent<StartPlacingTypicalDetail>;
declare const SldIedImporter_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
/**
 * A FAB that opens a file picker for importing a Bay typical SCL file.
 * Parses the file, converts SLD layout attributes, and dispatches events
 * for the edit and the placement.
 */
export declare class SldIedImporter extends SldIedImporter_base {
    static scopedElements: {
        'oscd-fab': typeof OscdFab;
        'oscd-icon': typeof OscdIcon;
    };
    nsp: string;
    private fileInput?;
    private handleFileChange;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
