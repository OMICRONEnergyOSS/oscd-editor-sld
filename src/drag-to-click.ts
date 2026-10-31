import type { ReactiveController, ReactiveControllerHost } from 'lit';

const DRAG_THRESHOLD_PX = 4;

export interface DragToClickOptions {
  /** Whether a press may begin a drag; true only for presses that start a click-move-click gesture. */
  canStart: (event: MouseEvent) => boolean;
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
 * clicks the gesture needs: the first once the mouse has moved past a small
 * threshold (on the pressed element), the second on release (on whatever is
 * under the cursor). Existing click handlers do all the work, so a plain click
 * and click-move-click keep working unchanged.
 *
 * Mouse events only: touch emits none while scrolling or panning, so the
 * browser keeps those gestures.
 */
export class DragToClickController implements ReactiveController {
  private press?: { event: MouseEvent; target: EventTarget; dragging: boolean };

  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private options: DragToClickOptions,
  ) {
    host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('mousedown', this.onDown);
  }

  hostDisconnected() {
    this.host.removeEventListener('mousedown', this.onDown);
    this.end();
  }

  private onDown = (event: MouseEvent) => {
    if (event.button !== 0 || !this.options.canStart(event)) {
      return;
    }
    this.end();
    this.press = { event, target: event.composedPath()[0], dragging: false };
    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('mouseup', this.onUp);
    window.addEventListener('selectstart', this.preventSelection);
  };

  private onMove = (event: MouseEvent) => {
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

  private onUp = (event: MouseEvent) => {
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
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseup', this.onUp);
    window.removeEventListener('selectstart', this.preventSelection);
  };
}
