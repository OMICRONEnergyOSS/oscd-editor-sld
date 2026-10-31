import type { ReactiveController, ReactiveControllerHost } from 'lit';

const DRAG_THRESHOLD_PX = 4;

export interface DragToClickOptions {
  /** Whether a press may begin a drag; true only for presses that start a click-move-click gesture. */
  canStart: (event: PointerEvent) => boolean;
  /** Whether the click that began the drag actually started a gesture. */
  isActive: () => boolean;
}

/** True when `path` runs through a substation canvas, where drops are accepted. */
export function isInSldCanvas(path: EventTarget[]): boolean {
  return path.some(node => node instanceof SVGSVGElement && node.id === 'sld');
}

function clickAt(target: EventTarget, source: MouseEvent) {
  target.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
      view: window,
      button: 0,
      clientX: source.clientX,
      clientY: source.clientY,
      screenX: source.screenX,
      screenY: source.screenY,
      shiftKey: source.shiftKey,
      ctrlKey: source.ctrlKey,
      altKey: source.altKey,
      metaKey: source.metaKey,
    }),
  );
}

/** The browser's own click after a drag would re-trigger a start or commit handler. */
function swallowNextClick() {
  const swallow = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  window.addEventListener('click', swallow, { capture: true, once: true });
  setTimeout(() => window.removeEventListener('click', swallow, true), 0);
}

/**
 * Lets press-drag-release stand in for click-move-click by replaying the two
 * clicks the gesture needs: the first once the pointer has moved past a small
 * threshold (on the pressed element), the second on release (on whatever is
 * under the pointer). Existing click handlers do all the work, so a plain click
 * and click-move-click keep working unchanged.
 */
export class DragToClickController implements ReactiveController {
  private press?: { event: PointerEvent; target: EventTarget; dragging: boolean };

  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private options: DragToClickOptions,
  ) {
    host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('pointerdown', this.onDown);
  }

  hostDisconnected() {
    this.host.removeEventListener('pointerdown', this.onDown);
    this.end();
  }

  private onDown = (event: PointerEvent) => {
    if (event.button !== 0 || !event.isPrimary || !this.options.canStart(event)) {
      return;
    }
    this.end();
    this.press = { event, target: event.composedPath()[0], dragging: false };
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
    window.addEventListener('pointercancel', this.end);
    window.addEventListener('selectstart', this.preventSelection);
  };

  private onMove = (event: PointerEvent) => {
    const { press } = this;
    if (!press || press.dragging) {
      return;
    }
    const { clientX, clientY } = press.event;
    if (Math.hypot(event.clientX - clientX, event.clientY - clientY) < DRAG_THRESHOLD_PX) {
      return;
    }
    press.dragging = true;
    clickAt(press.target, press.event);
  };

  private onUp = (event: PointerEvent) => {
    const dragged = this.press?.dragging;
    this.end();
    if (!dragged) {
      return;
    }
    const path = event.composedPath();
    if (this.options.isActive() && isInSldCanvas(path)) {
      clickAt(path[0], event);
    }
    swallowNextClick();
  };

  private preventSelection = (event: Event) => event.preventDefault();

  private end = () => {
    this.press = undefined;
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    window.removeEventListener('pointercancel', this.end);
    window.removeEventListener('selectstart', this.preventSelection);
  };
}
