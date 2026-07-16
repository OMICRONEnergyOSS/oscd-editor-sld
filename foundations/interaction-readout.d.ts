import type { InteractionState } from './interaction-mode.js';
/**
 * The semantic read-out for the active interaction gesture: the label to show
 * (`text`), whether the gesture would be illegal (`invalid`), and whether there
 * is anything to show at all (`hidden`). It is a pure view-model — no DOM, no
 * tooltip — so any surface (tooltip, status bar, test) can render it.
 */
export type InteractionReadout = {
    text: string;
    invalid: boolean;
    hidden: boolean;
};
/**
 * Projects the current interaction gesture onto its {@link InteractionReadout}.
 * It reads the {@link InteractionState} union directly and branches on its
 * `mode`, so the caller cannot supply an illegal mix of gestures (e.g. placing
 * *and* resizing). Only the three coordinate-bearing modes produce visible text
 * — placement emits coordinates, resize emits dimensions; every other mode,
 * including `placingLabel` and `connectingFrom`, is hidden.
 */
export declare function interactionReadout({ substation, interaction, mouseX, mouseY, }: {
    substation: Element;
    interaction: InteractionState;
    mouseX: number;
    mouseY: number;
}): InteractionReadout;
