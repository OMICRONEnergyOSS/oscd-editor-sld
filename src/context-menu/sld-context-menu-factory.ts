import { type EditV2 } from '@openscd/oscd-api';
import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { getReference, removeIED } from '@openscd/scl-lib';

import {
  createAddTextEdit,
  createRemoveTextEdits,
  createDeleteBusBarEdits,
  createDeleteContainerEdits,
  createFlipElementEdits,
  createGroundTerminalEdits,
} from '../foundations/edits.js';
import {
  connectionStartPoints,
  isBusBar,
} from '../foundations/connectivity.js';
import {
  removeTerminal,
  uniqueName,
} from '../foundations/connectivity-edits.js';
import { singleTerminal } from '../foundations/equipment.js';
import {
  isIedReferenceElement,
  resolveIed,
} from '../foundations/ied.js';
import { createRemoveIedReferenceEdit } from '../foundations/ied-edits.js';
import {
  attributes,
  DEFAULT_LABEL_COLOR,
  getSLDAttributes,
} from '../foundations/sld-attributes.js';
import { updateSLDAttributes } from '../foundations/sld-attribute-edits.js';
import {
  newEditIedEvent,
  newGroundHintEvent,
  newRotateEvent,
  newSclEditDialogEvent,
  newStartInteractionEvent,
} from '../foundations/events.js';

import type { Point } from '../foundations/geometry.js';
import type {
  ContextMenuAction,
  ContextMenuItem,
  MenuItemContext,
} from './sld-context-menu.js';

/**
 * These colours are used in three places:
 * - the show/hide guard,
 * - the persisted write,
 * - the menu item's swatch preview.
 * The swatch therefore always matches exactly what the command writes and what
 * `label.ts` renders (a coloured label draws with the literal `color` attribute:
 * `fill: ${attributes(el).color}`, NOT via a token).
 * They must NOT be swapped for the themeable `--oscd-sld-red`/`--oscd-sld-blue`
 * diagram tokens: those retint the *brand* (VL/bay/terminal) and by design may
 * diverge from these fixed data swatches, which would make the swatch lie about
 * the value it produces.
 */
const SLD_RED = '#BB1326';
const SLD_BLUE = '#12579B';

function flipElement(element: Element, context: MenuItemContext): void {
  context.dispatch(
    newEditEventV2(createFlipElementEdits(element, context.nsp)),
  );
}

function addTextTo(element: Element, context: MenuItemContext): void {
  context.dispatch(newEditEventV2(createAddTextEdit(element, context.nsp)));
}

function groundTerminal(
  equipment: Element,
  name: 'T1' | 'T2' | 'N1' | 'N2',
  context: MenuItemContext,
): void {
  const edits = createGroundTerminalEdits(equipment, name);

  if (!edits) {
    context.dispatch(newGroundHintEvent());
    return;
  }

  context.dispatch(newEditEventV2(edits));
}

function transformerWindingMenuItems(
  winding: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const tapChanger = winding.querySelector('TapChanger');

  const items: ContextMenuItem[] = [
    {
      headline: `Edit${tapChanger ? ' Winding' : ''}`,
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(winding)),
    },
  ];

  if (tapChanger) {
    items.unshift(
      {
        headline: 'Remove Tap Changer',
        icon: 'remove',
        handler: () => context.dispatch(newEditEventV2({ node: tapChanger })),
      },
      {
        headline: 'Edit Tap Changer',
        icon: 'edit',
        handler: () => context.dispatch(newSclEditDialogEvent(tapChanger)),
      },
    );
  } else {
    items.unshift({
      headline: 'Add Tap Changer',
      icon: 'north_east',
      handler: () => {
        const node = context.doc.createElementNS(
          context.doc.documentElement.namespaceURI,
          'TapChanger',
        );
        node.setAttribute('name', 'LTC');
        node.setAttribute('type', 'LTC');
        node.setAttribute('name', uniqueName(node, winding));
        context.dispatch(
          newEditEventV2({
            parent: winding,
            node,
            reference: getReference(winding, 'TapChanger'),
          }),
        );
      },
    });
  }

  const neutralPoints = Array.from(winding.querySelectorAll('NeutralPoint'));

  if (neutralPoints.length > 0) {
    items.unshift({
      headline: 'Detach Neutral Point',
      icon: 'remove_circle_outline',
      handler: () =>
        context.dispatch(
          newEditEventV2(
            neutralPoints.map(neutralPoint => removeTerminal(neutralPoint)),
          ),
        ),
    });
  }

  const terminals = Array.from(winding.querySelectorAll('Terminal'));
  if (terminals.length > 0) {
    items.unshift({
      headline: `Detach Terminal${terminals.length > 1 ? 's' : ''}`,
      icon: 'cancel',
      handler: () =>
        context.dispatch(
          newEditEventV2(terminals.map(terminal => removeTerminal(terminal))),
        ),
    });
  }

  return items;
}

function transformerMenuItems(
  transformer: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const text = transformer.querySelector(':scope > Text');
  const {
    pos: [x, y],
  } = attributes(transformer);
  const offset: Point = [context.gridX - x, context.gridY - y];
  const items: ContextMenuItem[] = [
    {
      headline: 'Rotate',
      icon: 'rotate_90_degrees_cw',
      handler: () => context.dispatch(newRotateEvent(transformer)),
    },
    {
      headline: 'Copy',
      icon: 'copy_all',
      handler: () =>
        context.dispatch(
          newStartInteractionEvent({
            mode: 'placing',
            element: transformer,
            copy: true,
            offset,
          }),
        ),
    },
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placing', element: transformer, offset })),
    },
    {
      headline: 'Move Label',
      icon: 'text_rotation_none',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: transformer })),
    },
    text
      ? {
        headline: 'Delete Text',
        icon: 'format_strikethrough',
        handler: () => context.dispatch(newEditEventV2(createRemoveTextEdits(text))),
      }
      : {
        headline: 'Add Text',
        icon: 'title',
        handler: () => addTextTo(transformer, context),
      },
    {
      headline: 'Edit',
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(transformer)),
    },
    {
      headline: 'Delete',
      icon: 'delete',
      handler: () => {
        const edits: EditV2[] = [];
        Array.from(
          transformer.querySelectorAll('Terminal, NeutralPoint'),
        ).forEach(terminal => edits.push(...removeTerminal(terminal)));
        edits.push({ node: transformer });
        context.dispatch(newEditEventV2(edits));
      },
    },
  ];

  const kind = getSLDAttributes(transformer, 'kind');
  const windingCount =
    transformer.querySelectorAll('TransformerWinding').length;

  if (kind === 'auto' || (kind === 'earthing' && windingCount === 2)) {
    items.unshift({
      headline: 'Mirror',
      icon: 'flip',
      handler: () => flipElement(transformer, context),
    });
  }

  return items;
}

function equipmentMenuItems(
  equipment: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const textElement = equipment.querySelector(':scope > Text');
  const items: ContextMenuItem[] = [
    {
      headline: 'Mirror',
      icon: 'flip',
      handler: () => flipElement(equipment, context),
    },
    {
      headline: 'Rotate',
      icon: 'rotate_90_degrees_cw',
      handler: () => context.dispatch(newRotateEvent(equipment)),
    },
    {
      headline: 'Copy',
      icon: 'copy_all',
      handler: () =>
        context.dispatch(
          newStartInteractionEvent({
            mode: 'placing',
            element: equipment,
            copy: true,
          }),
        ),
    },
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placing', element: equipment })),
    },
    {
      headline: 'Move Label',
      icon: 'text_rotation_none',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: equipment })),
    },
    textElement
      ? {
        headline: 'Remove Text',
        icon: 'format_strikethrough',
        handler: () =>
          context.dispatch(newEditEventV2(createRemoveTextEdits(textElement))),
      }
      : {
        headline: 'Add Text',
        icon: 'title',
        handler: () => addTextTo(equipment, context),
      },
    {
      headline: 'Edit',
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(equipment)),
    },
    {
      headline: 'Delete',
      icon: 'delete',
      handler: () => {
        const edits: EditV2[] = [];
        Array.from(equipment.querySelectorAll('Terminal')).forEach(terminal =>
          edits.push(...removeTerminal(terminal)),
        );
        edits.push({ node: equipment });
        context.dispatch(newEditEventV2(edits));
      },
    },
  ];

  const { rot } = attributes(equipment);
  const icons = {
    connect: ['north', 'east', 'south', 'west'],
    ground: ['expand_less', 'chevron_right', 'expand_more', 'chevron_left'],
    disconnect: [
      'arrow_drop_up',
      'arrow_right',
      'arrow_drop_down',
      'arrow_left',
    ],
  };
  const texts = {
    connect: ['Connect top', 'Connect right', 'Connect bottom', 'Connect left'],
    ground: ['Ground top', 'Ground right', 'Ground bottom', 'Ground left'],
    disconnect: ['Detach top', 'Detach right', 'Detach bottom', 'Detach left'],
  };
  const iconName = (kind: 'connect' | 'ground' | 'disconnect', top: boolean) =>
    icons[kind][top ? rot % 4 : (rot + 2) % 4];
  const textLabel = (kind: 'connect' | 'ground' | 'disconnect', top: boolean) =>
    texts[kind][top ? rot % 4 : (rot + 2) % 4];
  const menuAction = (
    kind: 'connect' | 'ground' | 'disconnect',
    top: boolean,
    handler: () => void,
  ): ContextMenuAction => ({
    headline: textLabel(kind, top),
    icon: iconName(kind, top),
    handler,
  });

  const topTerminal = equipment.querySelector('Terminal[name="T1"]');
  const bottomTerminal = equipment.querySelector('Terminal:not([name="T1"])');

  if (bottomTerminal) {
    items.unshift(
      menuAction('disconnect', false, () =>
        context.dispatch(newEditEventV2(removeTerminal(bottomTerminal))),
      ),
    );
  } else if (!singleTerminal.has(equipment.getAttribute('type')!)) {
    items.unshift(
      menuAction('connect', false, () =>
        context.dispatch(
          newStartInteractionEvent({
            mode: 'connecting',
            from: equipment,
            fromTerminal: 'T2',
            path: connectionStartPoints(equipment).T2,
          }),
        ),
      ),
      menuAction('ground', false, () =>
        groundTerminal(equipment, 'T2', context),
      ),
    );
  }

  if (topTerminal) {
    items.unshift(
      menuAction('disconnect', true, () =>
        context.dispatch(newEditEventV2(removeTerminal(topTerminal))),
      ),
    );
  } else {
    items.unshift(
      menuAction('connect', true, () =>
        context.dispatch(
          newStartInteractionEvent({
            mode: 'connecting',
            from: equipment,
            fromTerminal: 'T1',
            path: connectionStartPoints(equipment).T1,
          }),
        ),
      ),
      menuAction('ground', true, () =>
        groundTerminal(equipment, 'T1', context),
      ),
    );
  }

  return items;
}

function iedMenuItems(
  referencedIed: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const sclIed = resolveIed(referencedIed);
  const items: ContextMenuItem[] = [
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placing', element: referencedIed })),
    },
    {
      headline: 'Move Label',
      icon: 'text_rotation_none',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: referencedIed })),
    },
  ];

  if (sclIed) {
    items.push(
      {
        headline: 'Edit',
        icon: 'edit',
        handler: () => context.dispatch(newEditIedEvent(sclIed)),
      },
      {
        headline: 'Delete IED',
        icon: 'delete',
        style:
          '--md-menu-item-label-text-color: var(--md-sys-color-error, var(--oscd-error)); --md-menu-item-leading-icon-color: var(--md-sys-color-error, var(--oscd-error));',
        handler: () => {
          const edits: EditV2[] = [createRemoveIedReferenceEdit(referencedIed)];
          edits.push(...removeIED({ node: sclIed }));
          context.dispatch(
            newEditEventV2(edits, { title: 'Deleted IED', squash: false }),
          );
        },
      },
    );
  }

  items.push({
    headline: 'Remove from SLD',
    icon: 'location_off',
    handler: () => {
      context.dispatch(
        newEditEventV2(createRemoveIedReferenceEdit(referencedIed), {
          title: 'Removed from SLD',
          squash: false,
        }),
      );
    },
  });

  return items;
}

function busBarMenuItems(
  busBar: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const text = busBar.querySelector(':scope > Text');
  const {
    pos: [x, y],
  } = attributes(busBar);
  const offset: Point = [context.gridX - x, context.gridY - y];

  return [
    {
      headline: 'Resize',
      icon: 'sld_resize',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'resizingBR', element: busBar })),
    },
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placing', element: busBar, offset })),
    },
    {
      headline: 'Move Label',
      icon: 'text_rotation_none',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: busBar })),
    },
    text
      ? {
        headline: 'Remove Text',
        icon: 'format_strikethrough',
        handler: () => context.dispatch(newEditEventV2(createRemoveTextEdits(text))),
      }
      : {
        headline: 'Add Text',
        icon: 'title',
        handler: () => addTextTo(busBar, context),
      },
    {
      headline: 'Edit',
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(busBar)),
    },
    {
      headline: 'Delete',
      icon: 'delete',
      handler: () =>
        context.dispatch(newEditEventV2(createDeleteBusBarEdits(busBar))),
    },
  ];
}

function containerMenuItems(
  bayOrVL: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const text = bayOrVL.querySelector(':scope > Text');
  const {
    pos: [x, y],
  } = attributes(bayOrVL);
  const offset: Point = [context.gridX - x, context.gridY - y];

  return [
    {
      headline: 'Resize',
      icon: 'sld_resize',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'resizingBR', element: bayOrVL })),
    },
    {
      headline: 'Copy',
      icon: 'copy_all',
      handler: () =>
        context.dispatch(
          newStartInteractionEvent({
            mode: 'placing',
            element: bayOrVL,
            copy: true,
            offset,
          }),
        ),
    },
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placing', element: bayOrVL, offset })),
    },
    {
      headline: 'Move Label',
      icon: 'text_rotation_none',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: bayOrVL })),
    },
    text
      ? {
        headline: 'Remove Text',
        icon: 'format_strikethrough',
        handler: () => context.dispatch(newEditEventV2(createRemoveTextEdits(text))),
      }
      : {
        headline: 'Add Text',
        icon: 'title',
        handler: () => addTextTo(bayOrVL, context),
      },
    {
      headline: 'Edit',
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(bayOrVL)),
    },
    {
      headline: 'Delete',
      icon: 'delete',
      handler: () =>
        context.dispatch(newEditEventV2(createDeleteContainerEdits(bayOrVL))),
    },
  ];
}

function textMenuItems(
  text: Element,
  context: MenuItemContext,
): ContextMenuItem[] {
  const { weight, color } = attributes(text);
  const items: ContextMenuItem[] = [
    {
      headline: 'Rotate',
      icon: 'rotate_90_degrees_cw',
      handler: () => context.dispatch(newRotateEvent(text)),
    },
    {
      headline: 'Move',
      icon: 'sld_move',
      handler: () => context.dispatch(newStartInteractionEvent({ mode: 'placingLabel', element: text })),
    },
    {
      headline: 'Edit',
      icon: 'edit',
      handler: () => context.dispatch(newSclEditDialogEvent(text)),
    },
    {
      headline: 'Delete',
      icon: 'delete',
      handler: () => context.dispatch(newEditEventV2(createRemoveTextEdits(text))),
    },
  ];

  if (weight !== 500) {
    items.unshift({
      headline: 'Bold',
      icon: 'format_bold',
      handler: () => {
        const makeBold = updateSLDAttributes(text, context.nsp, {
          weight: '500',
        });
        context.dispatch(newEditEventV2(makeBold));
      },
    });
  }

  if (weight !== 300) {
    items.unshift({
      headline: 'Remove Formatting',
      icon: 'format_clear',
      handler: () => {
        const removeFormat = updateSLDAttributes(text, context.nsp, {
          weight: null,
        });
        context.dispatch(newEditEventV2(removeFormat));
      },
    });
  }

  if (color.toUpperCase() !== SLD_RED) {
    items.unshift({
      headline: 'Red',
      icon: 'format_color_text',
      style: `--md-menu-item-label-text-color: ${SLD_RED}; --md-menu-item-leading-icon-color: ${SLD_RED};`,
      handler: () => {
        const colorRed = updateSLDAttributes(text, context.nsp, {
          color: SLD_RED,
        });
        context.dispatch(newEditEventV2(colorRed));
      },
    });
  }

  if (color.toUpperCase() !== SLD_BLUE) {
    items.unshift({
      headline: 'Blue',
      icon: 'format_color_text',
      style: `--md-menu-item-label-text-color: ${SLD_BLUE}; --md-menu-item-leading-icon-color: ${SLD_BLUE};`,
      handler: () => {
        const colorBlue = updateSLDAttributes(text, context.nsp, {
          color: SLD_BLUE,
        });
        context.dispatch(newEditEventV2(colorBlue));
      },
    });
  }

  if (color !== DEFAULT_LABEL_COLOR) {
    items.unshift({
      headline: 'Reset Color',
      icon: 'format_color_reset',
      handler: () => {
        const colorReset = updateSLDAttributes(text, context.nsp, {
          color: null,
        });
        context.dispatch(newEditEventV2(colorReset));
      },
    });
  }

  return items;
}

export function createContextMenuItems(
  context: MenuItemContext,
): ContextMenuItem[] {
  const { element } = context;
  const items: ContextMenuItem[] = [{ type: 'header', element: context.element}, { type: 'divider' }];

  if (element.tagName === 'ConductingEquipment') {
    items.push(...equipmentMenuItems(element, context));
  } else if (element.tagName === 'PowerTransformer') {
    items.push(...transformerMenuItems(element, context));
  } else if (element.tagName === 'Bay' && isBusBar(element)) {
    items.push(...busBarMenuItems(element, context));
  } else if (element.tagName === 'Bay' || element.tagName === 'VoltageLevel') {
    items.push(...containerMenuItems(element, context));
  } else if (element.tagName === 'TransformerWinding') {
    items.push(...transformerWindingMenuItems(element, context));
    const transformer = element.parentElement!;
    items.push(
      { type: 'divider' },
      { type: 'header', element: transformer },
      { type: 'divider' },
    );
    items.push(...transformerMenuItems(transformer, context));
  } else if (isIedReferenceElement(element)) {
    items.push(...iedMenuItems(element, context));
  } else if (element.tagName === 'Text') {
    items.push(...textMenuItems(element, context));
    items.push(
      { type: 'divider' },
      { type: 'header', element: element.parentElement! },
    );
  }

  return items;
}
