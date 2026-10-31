import { fixture, expect } from '@open-wc/testing';
import { html, LitElement } from 'lit';

import { DragToClickController, isInSldCanvas } from './drag-to-click.js';

let active = false;
let canStart = true;
let startsGesture = true;

class DragHost extends LitElement {
  controller = new DragToClickController(this, {
    canStart: () => canStart,
    isActive: () => active,
  });

  render() {
    return html`<button id="start">start</button>
      <svg id="sld"><rect id="target" width="10" height="10" /></svg>`;
  }
}
customElements.define('drag-to-click-host', DragHost);

function pointer(type: string, target: EventTarget, x: number, y: number) {
  target.dispatchEvent(
    new PointerEvent(type, {
      clientX: x,
      clientY: y,
      button: 0,
      isPrimary: true,
      bubbles: true,
      composed: true,
    }),
  );
}

describe('drag-to-click', () => {
  let host: DragHost;
  let start: HTMLElement;
  let target: Element;
  let clicks: { target: EventTarget; x: number; y: number }[];

  beforeEach(async () => {
    active = false;
    canStart = true;
    startsGesture = true;
    host = await fixture<DragHost>(html`<drag-to-click-host></drag-to-click-host>`);
    start = host.shadowRoot!.querySelector('#start')!;
    target = host.shadowRoot!.querySelector('#target')!;
    clicks = [];
    host.shadowRoot!.addEventListener('click', (e) => {
      clicks.push({
        target: e.composedPath()[0],
        x: (e as MouseEvent).clientX,
        y: (e as MouseEvent).clientY,
      });
      active = startsGesture;
    });
  });

  it('replays no clicks for a press without movement', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointerup', start, 10, 10);

    expect(clicks).to.be.empty;
  });

  it('ignores movement below the drag threshold', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 12, 11);

    expect(clicks).to.be.empty;
  });

  it('starts on the pressed element once the threshold is passed', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);
    pointer('pointermove', window, 40, 10);

    expect(clicks).to.deep.equal([{ target: start, x: 10, y: 10 }]);
  });

  it('commits on the element under the pointer at release', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);
    pointer('pointerup', target, 50, 60);

    expect(clicks).to.deep.equal([
      { target: start, x: 10, y: 10 },
      { target: target, x: 50, y: 60 },
    ]);
  });

  it('does not commit when no gesture was started', () => {
    startsGesture = false;
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);
    clicks.length = 0;
    pointer('pointerup', target, 50, 60);

    expect(clicks).to.be.empty;
  });

  it('does not commit outside a substation canvas', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);
    pointer('pointerup', start, 50, 60);

    expect(clicks).to.have.length(1);
  });

  it('swallows the browser click that follows a drag', () => {
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);
    pointer('pointerup', target, 50, 60);
    clicks.length = 0;

    target.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true }),
    );

    expect(clicks).to.be.empty;
  });

  it('ignores presses the host refuses', () => {
    canStart = false;
    pointer('pointerdown', start, 10, 10);
    pointer('pointermove', window, 30, 10);

    expect(clicks).to.be.empty;
  });

  it('ignores non-primary buttons', () => {
    start.dispatchEvent(
      new PointerEvent('pointerdown', {
        button: 1,
        isPrimary: true,
        clientX: 10,
        clientY: 10,
        bubbles: true,
        composed: true,
      }),
    );
    pointer('pointermove', window, 30, 10);

    expect(clicks).to.be.empty;
  });

  it('stops tracking once the host disconnects', () => {
    pointer('pointerdown', start, 10, 10);
    host.remove();
    pointer('pointermove', window, 30, 10);

    expect(clicks).to.be.empty;
  });

  it('recognises a substation canvas in an event path', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'sld';

    expect(isInSldCanvas([document.body, svg])).to.be.true;
    expect(isInSldCanvas([document.body])).to.be.false;
  });
});
