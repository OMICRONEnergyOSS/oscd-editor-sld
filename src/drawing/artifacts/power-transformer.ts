import { nothing, svg, type SVGTemplateResult, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { zigZag2WTransform, zigZagPath } from '../diagram-symbols.js';
import { containsRect } from '../../foundations/element-geometry.js';
import { attributes } from '../../foundations/sld-attributes.js';
import { transformerWindingMeasures } from '../../foundations/transformer.js';
import {
  newPlaceEvent,
  newRotateEvent,
  newSelectEvent,
  newStartInteractionEvent,
} from '../../foundations/events.js';

import type { Point } from '../../foundations/geometry.js';
import {
  getHighlightStyle,
  isSelectable,
  isToBeHighlighted,
  type Highlight,
} from './highlight.js';
import {
  type ArtifactRenderOptions,
  type SldArtifactDescriptor,
  type SldSharedContext,
} from './artifact.js';
import { renderLabel } from './label.js';
import { isMode, targetInMode } from '../../foundations/interaction-mode.js';

export type PowerTransformerContext = SldSharedContext & {
  groundTerminal(
    element: Element,
    terminal: 'T1' | 'T2' | 'N1' | 'N2',
  ): void;
  highlight: Highlight[];
  mouseX: number;
  mouseY: number;
};

type PowerTransformerRenderState = {
  disabled: boolean;
  highlight: TemplateResult | '';
  placingSelf: boolean;
  position: Point;
  selectable: boolean;
  windings: Element[];
};

type PowerTransformerRenderActions = {
  onAuxClick: (event: MouseEvent) => void;
  onClick: ((event: MouseEvent) => void) | symbol;
};

function preventDefault(e: MouseEvent) {
  if (e.button === 1) {
    e.preventDefault();
  }
}

function transformerHighlight(
  transformer: Element,
  highlight: Highlight[],
): TemplateResult {
  const style = getHighlightStyle(transformer, highlight);

  const {
    pos: [x, y],
  } = attributes(transformer);
  const nmWindings = transformer.querySelectorAll('TransformerWinding').length;
  if (nmWindings === 3) {
    return svg`<rect x="${x - 0.8}" y="${
      y - 0.3
    }" width="2.6" height="2.6" style="${style}" pointer-events="none" />`;
  }
  if (nmWindings === 2) {
    return svg`<rect x="${x - 0.3}" y="${
      y - 0.3
    }" width="1.6" height="2.6" style="${style}" pointer-events="none" />`;
  }
  return svg`<rect x="${x - 0.3}" y="${
    y - 0.3
  }" width="1.6" height="1.6" style="${style}" pointer-events="none" />`;
}

function renderTransformerWinding(
  winding: Element,
  context: PowerTransformerContext,
): TemplateResult<2> {
  const {
    size,
    center: [cx, cy],
    terminals,
    grounded,
    arc,
    zigZagTransform,
  } = transformerWindingMeasures(
    winding,
    context.renderedPosition(winding.parentElement!),
    attributes(winding.parentElement!),
    zigZag2WTransform,
  );
  const ports: TemplateResult<2>[] = [];
  Object.entries(grounded).forEach(([_, [[x1, y1], [x2, y2]]]) => {
    ports.push(
      svg`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="0.06" marker-start="url(#grounded)" />`,
    );
  });
  const groundable = winding.closest('Bay');
  const placingTarget = targetInMode(context.interaction, 'placing');
  if (
    !(
      isMode(
        context.interaction,
        'connectingFrom',
        'resizingBR',
        'resizingTL',
        'placingLabel',
      ) ||
      (placingTarget &&
        placingTarget !== winding.closest('PowerTransformer')) ||
      context.disabled
    )
  ) {
    Object.entries(terminals).forEach(([name, point]) => {
      if (!point) {
        return;
      }
      const [x, y] = point;
      const x1 = Number.isInteger(x * 2) ? x : x + 1;
      const y1 = Number.isInteger(y * 2) ? y : y + 1;
      const terminal = name.startsWith('T');
      const fill = terminal
        ? 'var(--oscd-sld-terminal-color)'
        : 'var(--oscd-sld-neutral-terminal-color)';
      ports.push(svg`<circle class="port" cx="${x}" cy="${y}" r="0.2" opacity="0.4"
            @contextmenu=${(e: MouseEvent) => {
              if (terminal) {
                return;
              }
              e.preventDefault();
              e.stopImmediatePropagation();
              if (!isMode(context.interaction, 'idle')) {
                return;
              }
              context.groundTerminal(winding, name as 'T1' | 'T2' | 'N1' | 'N2');
            }}
            @click=${(e: MouseEvent) => {
              e.stopImmediatePropagation();
              if (!isMode(context.interaction, 'idle')) {
                return;
              }
              context.dispatch(
                newStartInteractionEvent({
                  mode: 'connecting',
                  from: winding,
                  fromTerminal: name as 'T1' | 'T2' | 'N1' | 'N2',
                  path: [
                    [x, y],
                    [x1, y1],
                  ],
                }),
              );
            }}
            style="fill: ${fill}; stroke: ${groundable && !terminal ? 'var(--oscd-sld-groundable-terminal-color)' : 'none'}" />`);
    });
  }
  let longArrow = false;
  let arcPath = svg``;
  const { flip, rot } = attributes(winding.parentElement!);
  if (arc) {
    const {
      from: [xf, yf],
      fromCtl: [xfc, yfc],
      to: [xt, yt],
      toCtl: [xtc, ytc],
    } = arc;
    if (!flip && yfc < yf) {
      longArrow = true;
    }
    if (flip && xfc > xf) {
      longArrow = true;
    }
    arcPath = svg`<path d="M ${xf} ${yf} C ${xfc} ${yfc}, ${xtc} ${ytc}, ${xt} ${yt}" stroke="currentColor" stroke-width="0.06" />`;
  }
  const tapChanger = winding.querySelector('TapChanger');
  const ltcArrow = tapChanger
    ? svg`<line x1="${cx - 0.8}" y1="${cy + 0.8}" x2="${cx + 0.8}" y2="${
      cy - (longArrow ? 1 : 0.8)
    }"
            stroke="currentColor" stroke-width="0.06" marker-end="url(#arrow)" />`
    : nothing;
  const zigZag =
    zigZagTransform === undefined
      ? nothing
      : svg`<g stroke="currentColor" stroke-linecap="round"
              transform="rotate(${rot * 90} ${cx} ${cy})
              translate(${cx - 1.5} ${cy - 1.5})
              ${zigZagTransform}">${zigZagPath}</g>`;

  return svg`<g class="winding"
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        if (!isMode(context.interaction, 'idle')) {
          return;
        }
        context.requestContextMenu(winding, e);
      }}
  ><circle cx="${cx}" cy="${cy}" r="${size}" stroke="currentColor" stroke-width="0.06" />${arcPath}${zigZag}${ltcArrow}${ports}</g>`;
}

function powerTransformerState(
  transformer: Element,
  context: PowerTransformerContext,
  { preview = false }: ArtifactRenderOptions = {},
): PowerTransformerRenderState | undefined {
  if (targetInMode(context.interaction, 'placing') === transformer && !preview) {
    return undefined;
  }

  return {
    disabled: context.disabled,
    highlight: isToBeHighlighted(transformer, context.highlight)
      ? transformerHighlight(transformer, context.highlight)
      : '',
    placingSelf: targetInMode(context.interaction, 'placing') === transformer,
    position: context.renderedPosition(transformer),
    selectable: isSelectable(transformer, context.selectable),
    windings: Array.from(transformer.children).filter(
      c => c.tagName === 'TransformerWinding',
    ),
  };
}

function powerTransformerActions(
  transformer: Element,
  context: PowerTransformerContext,
  state: PowerTransformerRenderState,
): PowerTransformerRenderActions {
  const [x, y] = state.position;

  let handleClick: (e: MouseEvent) => void;
  if (targetInMode(context.interaction, 'placing') === transformer) {
    handleClick = (e: MouseEvent) => {
      if (targetInMode(context.interaction, 'placing') === transformer) {
        const parent =
          Array.from(
            context.substation.querySelectorAll(':scope > VoltageLevel > Bay'),
          )
            .concat(
              Array.from(
                context.substation.querySelectorAll(':scope > VoltageLevel'),
              ),
            )
            .find(vl => containsRect(vl, x, y, 1, 1)) || context.substation;
        context.dispatch(
          newPlaceEvent({
            element: transformer,
            parent,
            x,
            y,
          }),
        );
      }

      if (!isMode(context.interaction, 'idle')) {
        return;
      }

      const [mouseX, mouseY] = context.gridPosition(e);
      const offset: Point = [mouseX - x, mouseY - y];
      context.dispatch(
        newStartInteractionEvent({
          mode: 'placing',
          element: transformer,
          copy: e.shiftKey,
          offset,
        }),
      );
    };
  } else if (context.disabled && state.selectable) {
    handleClick = () => context.dispatch(newSelectEvent(transformer));
  } else if (context.disabled || !isMode(context.interaction, 'idle')) {
    handleClick = () => {};
  } else {
    handleClick = (e: MouseEvent) => {
      const [mouseX, mouseY] = context.gridPosition(e);
      const offset: Point = [mouseX - x, mouseY - y];
      context.dispatch(
        newStartInteractionEvent({
          mode: 'placing',
          element: transformer,
          copy: e.shiftKey,
          offset,
        }),
      );
    };
  }

  return {
    onAuxClick: (e: MouseEvent) => {
      if (e.button === 1) {
        context.dispatch(newRotateEvent(transformer));
        e.preventDefault();
      }
    },
    onClick: handleClick,
  };
}

function renderPowerTransformer(
  transformer: Element,
  state: PowerTransformerRenderState,
  actions: PowerTransformerRenderActions,
  context: PowerTransformerContext,
  { preview = false }: ArtifactRenderOptions = {},
): SVGTemplateResult {
  const clickTarget = state.placingSelf
    ? svg`<rect width="1" height="1" fill="none"
          x="${context.mouseX}" y="${context.mouseY}" />`
    : nothing;

  return svg`${state.highlight}<g class="${classMap({
    transformer: true,
    preview,
    disabled: state.disabled,
    selectable: state.selectable,
  })}"
      pointer-events="all"
      @mousedown=${preventDefault}
      @auxclick=${actions.onAuxClick}
      @click=${actions.onClick}>
      ${state.windings.map(w => renderTransformerWinding(w, context))}
      ${clickTarget}
    </g>
    <g class="preview">${
      preview
        ? [
          renderLabel(transformer, context, { preview }),
          ...Array.from(transformer.querySelectorAll('Text')).map(text =>
            renderLabel(text, context, { preview }),
          ),
        ]
        : nothing
    }</g>`;
}

export const powerTransformerArtifact: SldArtifactDescriptor<
  PowerTransformerRenderState,
  PowerTransformerRenderActions,
  PowerTransformerContext
> = {
  actions: powerTransformerActions,
  matches: element => element.tagName === 'PowerTransformer',
  render: renderPowerTransformer,
  state: powerTransformerState,
};
