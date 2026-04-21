import { LitElement } from 'lit';
import { SldSubstationEditor } from './sld-substation-editor.js';
import { ConnectDetail, Point, StartConnectDetail, Style } from './util.js';
declare const SldEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export declare class SldEditor extends SldEditor_base {
    static scopedElements: {
        'sld-substation-editor': typeof SldSubstationEditor;
    };
    doc: XMLDocument;
    get docVersion(): number;
    set docVersion(value: number);
    private _docVersion;
    disabled: boolean;
    selectable: string[];
    highlight: {
        id: string;
        style: Style;
    }[];
    showIeds?: boolean;
    startPlacingBayTypical: (element: Element) => void;
    gridSize: number;
    nsp: string;
    resizingBR?: Element;
    resizingTL?: Element;
    placing?: Element;
    placingBayTypical?: Element;
    placingOffset: Point;
    placingLabel?: Element;
    showLabels: boolean;
    connecting?: {
        from: Element;
        path: Point[];
        fromTerminal: 'T1' | 'T2' | 'N1' | 'N2';
    };
    handleKeydown: ({ key }: KeyboardEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string, any>): void;
    reset(): void;
    resetWithOffset(): void;
    startResizingBottomRight(element: Element | undefined): void;
    startResizingTopLeft(element: Element | undefined): void;
    startPlacing(element: Element | undefined, offset?: Point): void;
    startPlacingLabel(element: Element | undefined, offset?: Point): void;
    startConnecting(detail: StartConnectDetail): void;
    rotateElement(element: Element): void;
    placeLabel(element: Element, x: number, y: number): void;
    placeElement(element: Element, parent: Element, x: number, y: number): void;
    connectEquipment({ from, fromTerminal, to, toTerminal, path, }: ConnectDetail): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
