import { nothing, type SVGTemplateResult } from 'lit';
import type { SldSharedContext } from './artifact.js';
export type ConnectivityNodeContext = SldSharedContext & {
    mouseX: number;
    mouseY: number;
    mouseX2: number;
    mouseY2: number;
};
export declare function renderConnectivityNode(cNode: Element, context: ConnectivityNodeContext): SVGTemplateResult | typeof nothing;
