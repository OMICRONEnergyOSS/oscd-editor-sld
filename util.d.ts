import { EditV2 } from '@omicronenergy/oscd-api';
export declare const privType = "Transpower-SLD-Vertices";
export declare const sldNs = "https://transpower.co.nz/SCL/SSD/SLD/v0";
export declare const xmlnsNs = "http://www.w3.org/2000/xmlns/";
export declare const svgNs = "http://www.w3.org/2000/svg";
export declare const xlinkNs = "http://www.w3.org/1999/xlink";
export declare const eqTypes: readonly ["CAB", "CAP", "CBR", "CTR", "DIS", "GEN", "IFL", "LIN", "MOT", "REA", "RES", "SAR", "SMC", "VTR"];
export type EqType = (typeof eqTypes)[number];
export declare function isEqType(str: string): str is EqType;
export declare const ringedEqTypes: Set<string>;
export declare function uuid(): string;
export type Point = [number, number];
export type Attrs = {
    pos: Point;
    dim: Point;
    label: Point;
    flip: boolean;
    rot: 0 | 1 | 2 | 3;
    bus: boolean;
};
export declare function xmlBoolean(value?: string | null): boolean;
export declare function isBusBar(element: Element): boolean;
export declare function attributes(element: Element): Attrs;
export declare function elementPath(element: Element, ...rest: string[]): string;
export declare function removeNode(node: Element): EditV2[];
export declare function reparentElement(element: Element, parent: Element): EditV2[];
export declare function removeTerminal(terminal: Element): EditV2[];
export declare function connectionStartPoints(equipment: Element): {
    top: {
        close: Point;
        far: Point;
    };
    bottom: {
        close: Point;
        far: Point;
    };
};
export type ResizeDetail = {
    w: number;
    h: number;
    element: Element;
};
export type ResizeEvent = CustomEvent<ResizeDetail>;
export declare function newResizeEvent(detail: ResizeDetail): ResizeEvent;
export type PlaceLabelDetail = {
    x: number;
    y: number;
    element: Element;
};
export type PlaceDetail = {
    x: number;
    y: number;
    element: Element;
    parent: Element;
};
export type PlaceEvent = CustomEvent<PlaceDetail>;
export declare function newPlaceEvent(detail: PlaceDetail): PlaceEvent;
export type PlaceLabelEvent = CustomEvent<PlaceLabelDetail>;
export declare function newPlaceLabelEvent(detail: PlaceLabelDetail): PlaceLabelEvent;
export type ConnectDetail = {
    equipment: Element;
    path: Point[];
    terminal: 'top' | 'bottom';
    connectTo: Element;
    toTerminal?: 'top' | 'bottom';
};
export type ConnectEvent = CustomEvent<ConnectDetail>;
export declare function newConnectEvent(detail: ConnectDetail): ConnectEvent;
export type StartEvent = CustomEvent<Element>;
export declare function newRotateEvent(detail: Element): StartEvent;
export declare function newStartResizeEvent(detail: Element): StartEvent;
export declare function newStartPlaceEvent(detail: Element): StartEvent;
export declare function newStartPlaceLabelEvent(detail: Element): StartEvent;
export type StartConnectDetail = {
    equipment: Element;
    terminal: 'top' | 'bottom';
};
export type StartConnectEvent = CustomEvent<StartConnectDetail>;
export declare function newStartConnectEvent(detail: StartConnectDetail): StartConnectEvent;
declare global {
    interface ElementEventMap {
        ['oscd-sld-resize']: ResizeEvent;
        ['oscd-sld-place']: PlaceEvent;
        ['oscd-sld-place-label']: PlaceLabelEvent;
        ['oscd-sld-connect']: ConnectEvent;
        ['oscd-sld-rotate']: StartEvent;
        ['oscd-sld-start-resize']: StartEvent;
        ['oscd-sld-start-place']: StartEvent;
        ['oscd-sld-start-place-label']: StartEvent;
        ['oscd-sld-start-connect']: StartConnectEvent;
    }
}
