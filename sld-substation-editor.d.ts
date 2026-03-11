import { nothing, LitElement, PropertyValues, TemplateResult, SVGTemplateResult } from 'lit';
import { Ref } from 'lit/directives/ref.js';
import { Button } from '@material/mwc-button';
import { Dialog } from '@material/mwc-dialog';
import { Icon } from '@material/mwc-icon';
import { IconButton } from '@material/mwc-icon-button';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import { Snackbar } from '@material/mwc-snackbar';
import { TextField } from '@material/mwc-textfield';
import { OscdSclDialogs } from '@omicronenergy/oscd-scl-dialogs/oscd-scl-dialogs.js';
import { Point, Style } from './util.js';
type MenuItem = {
    handler?: () => void;
    content: TemplateResult;
};
declare const SldSubstationEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
/** An editor [[`plugin`]] for editing the `Substation` section. */
export declare class SldSubstationEditor extends SldSubstationEditor_base {
    static scopedElements: {
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
        'mwc-icon': typeof Icon;
        'mwc-icon-button': typeof IconButton;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-snackbar': typeof Snackbar;
        'mwc-textfield': typeof TextField;
        'oscd-scl-dialogs': typeof OscdSclDialogs;
    };
    doc: XMLDocument;
    substation: Element;
    docVersion: number;
    gridSize: number;
    nsp: string;
    resizingBR?: Element;
    resizingTL?: Element;
    placing?: Element;
    placingOffset: Point;
    placingLabel?: Element;
    connecting?: {
        from: Element;
        path: Point[];
        fromTerminal: 'T1' | 'T2' | 'N1' | 'N2';
    };
    showLabels?: boolean;
    showIeds?: boolean;
    disabled: boolean;
    selectable: string[];
    highlight: {
        id: string;
        style: Style;
    }[];
    get idle(): boolean;
    resizeSubstationUI: Dialog;
    substationWidthUI: TextField;
    substationHeightUI: TextField;
    sld: SVGGraphicsElement;
    groundHint: Snackbar;
    sclDialogs: OscdSclDialogs;
    mouseX: number;
    mouseY: number;
    private iedResolutionCache;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    private resolvedIed;
    mouseX2: number;
    mouseY2: number;
    mouseX2f: number;
    mouseY2f: number;
    menu?: {
        element: Element;
        top: number;
        left: number;
    };
    coordinatesRef: Ref<HTMLElement>;
    positionCoordinates(e: MouseEvent): void;
    openMenu(element: Element, e: MouseEvent): void;
    svgCoordinates(clientX: number, clientY: number): Point;
    canPlaceAt(element: Element, x: number, y: number, w: number, h: number): boolean;
    canResizeTo(element: Element, w: number, h: number): boolean;
    canResizeToTL(element: Element, x: number, y: number, w: number, h: number): boolean;
    renderedLabelPosition(element: Element, { preview }?: {
        preview?: boolean | undefined;
    }): Point;
    renderedPosition(element: Element): Point;
    handleKeydown: ({ key }: KeyboardEvent) => void;
    handleClick: (e: MouseEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    saveSVG(): void;
    nearestOpenTerminal(equipment?: Element): 'T1' | 'T2' | undefined;
    groundTerminal(equipment: Element, name: 'T1' | 'T2' | 'N1' | 'N2'): void;
    flipElement(element: Element): void;
    addTextTo(element: Element): void;
    transformerWindingMenuItems(winding: Element): MenuItem[];
    transformerMenuItems(transformer: Element): MenuItem[];
    equipmentMenuItems(equipment: Element): MenuItem[];
    iedMenuItems(referencedIed: Element): MenuItem[];
    private openIedEditDialog;
    busBarMenuItems(busBar: Element): MenuItem[];
    containerMenuItems(bayOrVL: Element): MenuItem[];
    textMenuItems(text: Element): MenuItem[];
    renderMenu(): TemplateResult<1>;
    render(): TemplateResult<1>;
    renderLabel(element: Element, { preview }?: {
        preview?: boolean | undefined;
    }): TemplateResult<2> | typeof nothing;
    renderContainer(bayOrVL: Element, preview?: boolean): TemplateResult<2>;
    windingMeasures(winding: Element): {
        center: Point;
        size: number;
        terminals: Partial<Record<'T1' | 'T2' | 'N1' | 'N2', Point>>;
        grounded: Partial<Record<'N1' | 'N2', [Point, Point]>>;
        arc?: {
            from: Point;
            fromCtl: Point;
            to: Point;
            toCtl: Point;
        };
        zigZagTransform?: string;
    };
    renderTransformerWinding(winding: Element): TemplateResult<2>;
    renderPowerTransformer(transformer: Element, preview?: boolean): TemplateResult<2>;
    renderEquipment(equipment: Element, { preview, connect }?: {
        preview?: boolean | undefined;
        connect?: boolean | undefined;
    }): TemplateResult<2>;
    renderIed(referencedIed: Element, { preview }?: {
        preview?: boolean | undefined;
    }): SVGTemplateResult;
    renderBusBar(busBar: Element): TemplateResult<2>;
    renderConnectivityNode(cNode: Element): TemplateResult<2> | typeof nothing;
    static styles: import("lit").CSSResult;
}
export {};
