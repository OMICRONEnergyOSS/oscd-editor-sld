import { LitElement } from 'lit';
import { OscdFab } from '@omicronenergy/oscd-ui/fab/OscdFab.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdListItem } from '@omicronenergy/oscd-ui/list/OscdListItem.js';
import { OscdMenu } from '@omicronenergy/oscd-ui/menu/OscdMenu.js';
import { OscdMenuItem } from '@omicronenergy/oscd-ui/menu/OscdMenuItem.js';
declare const SldIedMenu_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
/**
 * A FAB that opens a menu listing IEDs available for placement on the SLD.
 * Shows three sections: unmatched references (deletable), available (unused)
 * IEDs, and already-used IEDs (repositionable).
 */
export declare class SldIedMenu extends SldIedMenu_base {
    static styles: import("lit").CSSResult[];
    static scopedElements: {
        'oscd-fab': typeof OscdFab;
        'oscd-icon': typeof OscdIcon;
        'oscd-list-item': typeof OscdListItem;
        'oscd-menu': typeof OscdMenu;
        'oscd-menu-item': typeof OscdMenuItem;
    };
    doc: XMLDocument;
    docVersion: number;
    get nsp(): string;
    private menuOpen;
    private menu?;
    private cachedModel?;
    private get model();
    private createModel;
    private insertOrGetIedReference;
    private closeMenu;
    private handleDeleteUnmatched;
    private handleSelectIed;
    updated(): void;
    private renderUnmatchedSection;
    private renderAvailableSection;
    private renderUsedSection;
    private renderOpenMenuContent;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
