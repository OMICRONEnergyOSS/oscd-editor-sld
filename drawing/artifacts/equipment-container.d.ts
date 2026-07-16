import { nothing, type SVGTemplateResult, type TemplateResult } from 'lit';
import type { Point } from '../../foundations/geometry.js';
import { type Highlight } from './highlight.js';
import { type SldSharedContext } from './artifact.js';
export type EquipmentContainerContext = SldSharedContext & {
    highlight: Highlight[];
    mouseX: number;
    mouseY: number;
    svgCoordinates(clientX: number, clientY: number): Point;
    renderEquipment(equipment: Element): SVGTemplateResult;
    renderPowerTransformer(equipment: Element): SVGTemplateResult;
    renderIed(referencedIed: Element, options?: {
        preview?: boolean;
    }): SVGTemplateResult;
    renderConnectivityNode(cNode: Element): SVGTemplateResult | typeof nothing;
};
/** Renders a `VoltageLevel` and, nested inside it, each of its (non-busbar) bays. */
export declare function renderVoltageLevel(voltageLevel: Element, context: EquipmentContainerContext, preview?: boolean): TemplateResult<2>;
/** Renders a `Bay` and its equipment. Bays do not nest, so they hold no child containers. */
export declare function renderBay(bay: Element, context: EquipmentContainerContext, preview?: boolean): TemplateResult<2>;
