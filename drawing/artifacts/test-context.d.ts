import { nothing, svg } from 'lit';
import type { EquipmentContext } from './conducting-equipment.js';
import type { PowerTransformerContext } from './power-transformer.js';
import type { BusBarContext } from './bus-bar.js';
import type { EquipmentContainerContext } from './equipment-container.js';
/**
 * A spy context satisfying every artifact context type. Dispatched events,
 * grounded terminals, opened context menus, and child renders are recorded for
 * assertions.
 */
export type SpyArtifactContext = EquipmentContext & PowerTransformerContext & BusBarContext & EquipmentContainerContext & {
    dispatched: Event[];
    grounded: {
        element: Element;
        terminal: string;
    }[];
    renderedChildren: Element[];
};
/**
 * Build a spy artifact context with neutral defaults (idle, enabled, nothing
 * placing). Pass `overrides` to set specific fields for a test. `renderedPosition`
 * and `renderedLabelPosition` default to the element's stored SLD coordinates.
 */
export declare function makeArtifactContext(overrides?: Partial<SpyArtifactContext>): SpyArtifactContext;
/** Render an artifact's `SVGTemplateResult` into a detached `<svg>` host. */
export declare function renderToSvg(template: ReturnType<typeof svg> | typeof nothing): SVGSVGElement;
