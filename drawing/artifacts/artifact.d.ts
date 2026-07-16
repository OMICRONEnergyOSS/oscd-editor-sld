import type { SVGTemplateResult } from 'lit';
import type { Point } from '../../foundations/geometry.js';
import type { InteractionState } from '../../foundations/interaction-mode.js';
export type ArtifactRenderOptions = {
    connect?: boolean;
    preview?: boolean;
};
/**
 * Editor services and state shared by every artifact descriptor. Anything used
 * by a single artifact must NOT live here — it belongs in that artifact's own
 * context type, which extends this base.
 */
export type SldSharedContext = {
    disabled: boolean;
    dispatch(event: Event): void;
    gridPosition(event: MouseEvent): Point;
    halfGridPosition(event: MouseEvent): Point;
    interaction: InteractionState;
    requestContextMenu(element: Element, event: MouseEvent): void;
    resolveIed(referencedIed: Element): Element | null;
    renderedLabelPosition(element: Element, options?: {
        preview?: boolean;
    }): Point;
    renderedPosition(element: Element): Point;
    selectable: string[];
    substation: Element;
    view: {
        showLabels?: boolean;
        showIeds?: boolean;
    };
};
export type SldArtifactDescriptor<TState, TActions, TContext extends SldSharedContext = SldSharedContext> = {
    actions(element: Element, context: TContext, state: TState): TActions;
    matches(element: Element): boolean;
    render(element: Element, state: TState, actions: TActions, context: TContext, options?: ArtifactRenderOptions): SVGTemplateResult;
    state(element: Element, context: TContext, options?: ArtifactRenderOptions): TState | undefined;
};
