import { LitElement, type TemplateResult } from 'lit';
import { OscdDivider } from '@omicronenergy/oscd-ui/divider/OscdDivider.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdListItem } from '@omicronenergy/oscd-ui/list/OscdListItem.js';
import { OscdMenu } from '@omicronenergy/oscd-ui/menu/OscdMenu.js';
import { OscdMenuItem } from '@omicronenergy/oscd-ui/menu/OscdMenuItem.js';
import { OscdSldIcon } from '../oscd-sld-icon.js';
export type ContextMenuAction = {
    type?: 'action';
    handler: () => void;
    headline: string;
    icon: string;
    style?: string;
};
export type ContextMenuDivider = {
    type: 'divider';
};
export type ContextMenuHeader = {
    type: 'header';
    element: Element;
};
export type ContextMenuItem = ContextMenuAction | ContextMenuDivider | ContextMenuHeader;
export type MenuContext = {
    element: Element;
    x: number;
    y: number;
    gridX: number;
    gridY: number;
};
export type MenuItemContext = MenuContext & {
    doc: XMLDocument;
    nsp: string;
    dispatch: (event: Event) => void;
};
declare const SldContextMenu_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
export declare class SldContextMenu extends SldContextMenu_base {
    static scopedElements: {
        'oscd-divider': typeof OscdDivider;
        'oscd-icon': typeof OscdIcon;
        'oscd-list-item': typeof OscdListItem;
        'oscd-menu': typeof OscdMenu;
        'oscd-menu-item': typeof OscdMenuItem;
        'oscd-sld-icon': typeof OscdSldIcon;
    };
    doc: XMLDocument;
    nsp: string;
    private context?;
    private anchor;
    menu: OscdMenu;
    open(context: MenuContext): void;
    private handleClosed;
    private buildItems;
    private renderAction;
    private renderMenuItem;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult[];
}
export {};
