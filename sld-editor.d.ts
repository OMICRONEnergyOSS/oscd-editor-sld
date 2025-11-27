import { LitElement } from 'lit';
import './sld-substation-editor.js';
import { ConnectDetail, Point, StartConnectDetail } from './util.js';
export declare class SldEditor extends LitElement {
    doc: XMLDocument;
    get docVersion(): number;
    set docVersion(value: number);
    private _docVersion;
    gridSize: number;
    nsp: string;
    resizingBR?: Element;
    resizingTL?: Element;
    placing?: Element;
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
    render(): unknown;
}
