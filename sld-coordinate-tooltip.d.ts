import { LitElement } from 'lit';
import type { InteractionState } from './foundations/interaction-mode.js';
/**
 * Placement/resize coordinate read-out, painted as a fixed-position DOM overlay
 * that follows the cursor. A single instance serves every substation.
 *
 * The component owns its own high-frequency state: on each pointer move it finds
 * the substation coordinate surface under the cursor (via `substationOf`),
 * converts the cursor position into that surface's grid coordinates through the
 * surface's CTM, and recomputes its text. Only the low-frequency interaction
 * state (what is being placed/resized) is fed in as the single `interaction`
 * property, so a moving cursor re-renders nothing but this component.
 */
export declare class SldCoordinateTooltip extends LitElement {
    /**
     * The controller-owned interaction gesture, projected down from the editor.
     * The tooltip reads it directly rather than receiving fanned-out slices, so
     * illegal gesture combinations stay unrepresentable.
     */
    interaction: InteractionState;
    /**
     * Resolves a coordinate surface element to the SCL `Substation` it renders,
     * or `undefined` if the element is not a substation surface. The editor owns
     * this mapping because it knows the viewer DOM structure; the tooltip stays
     * agnostic of it.
     */
    substationOf?: (surface: Element) => Element | undefined;
    private readout;
    private coordinates?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private track;
    private deriveReadout;
    private surfaceUnder;
    private gridCoordinates;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
