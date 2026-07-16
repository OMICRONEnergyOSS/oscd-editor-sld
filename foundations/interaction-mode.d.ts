import type { Point } from './geometry.js';
/** The four connectable terminals of an SLD equipment node. */
export type Terminal = 'T1' | 'T2' | 'N1' | 'N2';
/**
 * The single active interaction gesture, modelled as a discriminated union
 * keyed on `mode`. Exactly one variant is active at a time, so illegal
 * combinations (e.g. placing *and* resizing) are unrepresentable. Every active
 * variant carries its subject `element`; mode-specific extras hang off the
 * variant. The `mode` tag of each variant is the single source of truth for
 * "which gesture is active".
 *
 * This is the controller-owned *state*, projected **down** (editor → viewer) so
 * the view can render the in-progress gesture. Its reciprocal is
 * {@link InteractionIntent} (in `events.ts`), the view → editor *intent* to
 * begin a gesture. State vs. intent — same `Interaction` root, opposite
 * directions.
 */
export type InteractionState = {
    mode: 'idle';
} | {
    mode: 'locked';
} | {
    mode: 'placing';
    element: Element;
    offset: Point;
} | {
    mode: 'placingLabel';
    element: Element;
    offset: Point;
} | {
    mode: 'resizingBR';
    element: Element;
} | {
    mode: 'resizingTL';
    element: Element;
} | {
    mode: 'connectingFrom';
    element: Element;
    terminal: Terminal;
    path: Point[];
};
/**
 * Pure constructors for each {@link InteractionState} variant. They compute the next
 * interaction *value* only — no DOM, no events, no promises. Side-effecting
 * orchestration (event dispatch, placement promises, `disabled` guards) stays
 * on the host component, which simply assigns the result.
 *
 * Reserved as a possible future step: if transition guards accumulate (e.g.
 * "only append a point while connecting"), these could be folded into a single
 * `transition(state, action)` reducer. Avoided for now (YAGNI) — the union plus
 * these one-line constructors already give free exclusivity and call-site
 * narrowing without the extra machinery.
 */
export declare const idle: () => InteractionState;
/**
 * The read-only resting state. Like {@link idle} it is not a gesture, but unlike
 * `idle` it exposes **no** interaction affordances at all: ports, resize
 * handles, context menus and click-to-place targets are all suppressed, so a
 * viewer in this mode is a truly static, non-dispatching read-only diagram. It
 * is the viewer's default; the editor never enters it.
 */
export declare const locked: () => InteractionState;
export declare const placing: (element: Element, offset: Point) => InteractionState;
export declare const placingLabel: (element: Element, offset: Point) => InteractionState;
export declare const resizingBR: (element: Element) => InteractionState;
export declare const resizingTL: (element: Element) => InteractionState;
export declare const connectingFrom: (element: Element, terminal: Terminal, path?: Point[]) => InteractionState;
/** The set of gesture-mode tags of {@link InteractionState}. */
export type InteractionMode = InteractionState['mode'];
/**
 * Pure selectors that read an {@link InteractionState} without re-fanning it out
 * into independent fields. They keep the union the single source of truth: the
 * viewer and the drawing artifacts ask these questions of the one `interaction`
 * value, so illegal combinations stay unrepresentable all the way down.
 *
 * - {@link isMode} answers "which gesture is active?" (mode-only).
 * - {@link targetInMode} answers "is *this* element the subject of gesture X?"
 *   (identity checks are mode-specific, hence the mode argument).
 * - {@link connectDetail} exposes the connect-from payload while connecting.
 */
export declare function isMode(state: InteractionState, ...modes: InteractionMode[]): boolean;
export declare function targetInMode(state: InteractionState, ...modes: InteractionMode[]): Element | undefined;
export declare function connectDetail(state: InteractionState): {
    from: Element;
    path: Point[];
    fromTerminal: Terminal;
} | undefined;
