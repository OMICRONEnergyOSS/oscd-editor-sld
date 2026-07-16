import { LitElement } from 'lit';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdFab } from '@omicronenergy/oscd-ui/fab/OscdFab.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdSldIcon } from '../oscd-sld-icon.js';
import { SldIedImporter } from './sld-ied-importer.js';
import { SldIedMenu } from './sld-ied-menu.js';
import type { TemplateResult } from 'lit';
export type ToggleDetail = {
    showLabels: boolean;
    showIeds: boolean;
};
declare const SldToolbar_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types.js").ScopedElementsHost> & import("@open-wc/scoped-elements/types.js").ScopedElementsHostConstructor;
/**
 * Toolbar component for the SLD editor plugin.
 * Renders contextual FAB groups based on document state and dispatches
 * placement/toggle events upward.
 */
export declare class SldToolbar extends SldToolbar_base {
    static scopedElements: {
        'oscd-dialog': typeof OscdDialog;
        'oscd-fab': typeof OscdFab;
        'oscd-icon': typeof OscdIcon;
        'oscd-icon-button': typeof OscdIconButton;
        'oscd-sld-icon': typeof OscdSldIcon;
        'oscd-text-button': typeof OscdTextButton;
        'sld-ied-importer': typeof SldIedImporter;
        'sld-ied-menu': typeof SldIedMenu;
    };
    private aboutDialog?;
    doc: XMLDocument;
    docVersion: number;
    get nsp(): string;
    templateElements: Record<string, Element>;
    inAction: boolean;
    gridSize: number;
    private _showIeds;
    private _showLabels;
    get showIeds(): boolean;
    set showIeds(val: boolean);
    private dispatchViewChange;
    private get hasSubstation();
    private get hasVoltageLevel();
    private get hasBay();
    private get hasIeds();
    private get hasVisualContent();
    private startPlacing;
    private createTransformerElement;
    private renderEquipmentFabs;
    private renderStructuralFabs;
    private renderVoltageLevelFab;
    private renderIedTools;
    private insertSubstation;
    private renderSubstationFab;
    private renderTransformerFabs;
    private renderViewControls;
    private renderActionButton;
    private renderAboutDialog;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};
