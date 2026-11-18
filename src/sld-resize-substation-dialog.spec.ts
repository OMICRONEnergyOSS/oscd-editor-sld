import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';

import type { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';
import type { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import type { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import type { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { spy, stub } from 'sinon';

import { SldResizeSubstationDialog } from './sld-resize-substation-dialog.js';
import type { ResizeEvent } from './foundations/events.js';
import { setSLDAttributes, sldPrefix } from './foundations.js';
import { sldFixture } from './test-helpers.js';

customElements.define(
  'sld-resize-substation-dialog',
  SldResizeSubstationDialog,
);

describe('sld-resize-substation-dialog', () => {
  let element: SldResizeSubstationDialog;
  let substation: Element;

  beforeEach(async () => {
    const doc = sldFixture({ vl: { x: 1, y: 1, w: 48, h: 23 } });
    substation = doc.querySelector('Substation')!;
    element = await fixture(
      html`<sld-resize-substation-dialog></sld-resize-substation-dialog>`,
    );
  });

  function clickCancel() {
    element.shadowRoot!.querySelector<OscdTextButton>(
      'div[slot="actions"] > oscd-text-button',
    )!.click();
  }

  function dialog() {
    return element.shadowRoot!.querySelector<OscdDialog>('oscd-dialog')!;
  }

  function widthField(): OscdOutlinedTextField {
    return element.shadowRoot!.querySelector<OscdOutlinedTextField>(
      '#substationWidth',
    )!;
  }

  function heightField(): OscdOutlinedTextField {
    return element.shadowRoot!.querySelector<OscdOutlinedTextField>(
      '#substationHeight',
    )!;
  }

  function input(field: OscdOutlinedTextField, value: string) {
    field.value = value;
    field.dispatchEvent(new Event('input'));
  }

  function clickResize() {
    element.shadowRoot!.querySelector<OscdFilledButton>(
      'div[slot="actions"] > oscd-filled-button',
    )!.click();
  }

  it('opens populated with the current substation dimensions', async () => {
    await element.show(substation);

    expect(element).to.have.property('substation', substation);
    expect(widthField().value).to.equal('50');
    expect(heightField().value).to.equal('25');
  });

  it('emits an oscd-sld-resize event with the new dimensions', async () => {
    await element.show(substation);

    let detail: ResizeEvent['detail'] | undefined;
    element.addEventListener('oscd-sld-resize', (event) => {
      detail = (event as ResizeEvent).detail;
    });

    widthField().value = '60';
    heightField().value = '30';
    clickResize();

    expect(detail).to.deep.equal({ element: substation, w: 60, h: 30 });
  });

  it('does not emit an event when dimensions are unchanged', async () => {
    await element.show(substation);

    let dispatched = false;
    element.addEventListener('oscd-sld-resize', () => {
      dispatched = true;
    });

    widthField().value = '50';
    heightField().value = '25';
    clickResize();

    expect(dispatched).to.be.false;
  });

  it('forbids undersizing the substation below its voltage levels', async () => {
    await element.show(substation);

    let dispatched = false;
    element.addEventListener('oscd-sld-resize', () => {
      dispatched = true;
    });

    widthField().value = '30';
    heightField().value = '20';
    clickResize();

    expect(dispatched).to.be.false;
  });

  it('marks undersized fields invalid with helper text', async () => {
    await element.show(substation);

    widthField().value = '30';
    heightField().value = '20';
    clickResize();
    await element.updateComplete;

    expect(widthField().validity.valid).to.be.false;
    expect(widthField().validationMessage).to.contain('voltage levels');
    expect(heightField().validity.valid).to.be.false;
    expect(heightField().validationMessage).to.contain('voltage levels');
  });

  it('clears the validation error as soon as the value is corrected', async () => {
    await element.show(substation);

    widthField().value = '30';
    clickResize();
    expect(widthField().validity.valid).to.be.false;

    widthField().value = '60';
    widthField().dispatchEvent(new Event('input'));

    expect(widthField().validity.valid).to.be.true;
    expect(widthField().validationMessage).to.equal('');
  });

  describe('custom resize validation', () => {
    it('displays the returned message and prevents resizing even when voltage levels fit', async () => {
      await element.show(substation);
      element.validateSubstationResize = () => 'Too small to contain Functions';
      let dispatched = false;
      element.addEventListener('oscd-sld-resize', () => {
        dispatched = true;
      });
      widthField().value = '60';
      heightField().value = '30';
      for (const field of [widthField(), heightField()]) {
        field.dispatchEvent(new Event('input'));
        expect(field.validationMessage).to.equal('Too small to contain Functions');
        expect(field.validity.valid).to.be.false;
      }
      clickResize();
      expect(dispatched).to.be.false;
    });

    it('gives the custom message precedence over the built-in message', async () => {
      await element.show(substation);
      element.validateSubstationResize = () => 'Custom resize constraint';
      widthField().value = '10';
      widthField().dispatchEvent(new Event('input'));
      expect(widthField().validationMessage).to.equal('Custom resize constraint');
    });

    it('clears the custom message when the callback accepts corrected input', async () => {
      await element.show(substation);
      element.validateSubstationResize = (_target, width) =>
        width < 60 ? 'Width must be at least 60' : '';
      widthField().value = '55';
      widthField().dispatchEvent(new Event('input'));
      expect(widthField().validationMessage).to.equal('Width must be at least 60');
      widthField().value = '60';
      widthField().dispatchEvent(new Event('input'));
      expect(widthField().validationMessage).to.equal('');
      expect(widthField().validity.valid).to.be.true;
    });

    it('retains the built-in error when the callback returns an empty message', async () => {
      await element.show(substation);
      element.validateSubstationResize = () => '';
      widthField().value = '10';
      widthField().dispatchEvent(new Event('input'));
      expect(widthField().validationMessage).to.contain('voltage levels');
    });
    it('passes the substation, both parsed dimensions and the edited field to the callback', async () => {
      await element.show(substation);
      const validator = spy();
      element.validateSubstationResize = validator;

      input(widthField(), '60');
      input(heightField(), '30');

      const argsFor = (dim: string) =>
        validator
          .getCalls()
          .map(c => c.args)
          .filter(a => a[3] === dim)
          .pop();
      expect(argsFor('width')).to.deep.equal([substation, 60, 30, 'width']);
      expect(argsFor('height')).to.deep.equal([substation, 60, 30, 'height']);
    });

    it('falls back to built-in validation when the callback returns undefined', async () => {
      await element.show(substation);
      element.validateSubstationResize = () => undefined;

      input(widthField(), '10');
      expect(widthField().validationMessage).to.contain('voltage levels');

      input(widthField(), '60');
      expect(widthField().validity.valid).to.be.true;
    });

    it('falls back to built-in validation when the callback throws', async () => {
      await element.show(substation);
      const errorStub = stub(console, 'error');
      element.validateSubstationResize = () => {
        throw new Error('host bug');
      };

      try {
        input(widthField(), '10');
        expect(widthField().validationMessage).to.contain('voltage levels');

        input(widthField(), '60');
        expect(widthField().validity.valid).to.be.true;
        expect(errorStub.called).to.be.true;
      } finally {
        errorStub.restore();
      }
    });

    it('revalidates both fields when either changes', async () => {
      await element.show(substation);
      // Rule depends on both dimensions: width must be >= height.
      element.validateSubstationResize = (_s, w, h) =>
        w < h ? 'Width must be at least height' : undefined;

      input(widthField(), '50');
      input(heightField(), '60');
      expect(widthField().validationMessage).to.equal(
        'Width must be at least height',
      );

      // Fixing the other field clears the stale error on the untouched one.
      input(heightField(), '40');
      expect(widthField().validity.valid).to.be.true;
      expect(widthField().validationMessage).to.equal('');
    });

    it('rejects empty, fractional and non-positive input without calling the callback', async () => {
      await element.show(substation);
      const validator = spy();
      element.validateSubstationResize = validator;
      let dispatched = false;
      element.addEventListener('oscd-sld-resize', () => {
        dispatched = true;
      });

      for (const bad of ['', '42.5', '0', '-3']) {
        input(widthField(), bad);
        expect(widthField().validity.valid, `"${bad}"`).to.be.false;
        clickResize();
      }

      expect(validator.called).to.be.false;
      expect(dispatched).to.be.false;
    });

    it('treats exponent notation as the number it denotes', async () => {
      await element.show(substation);
      const validator = spy();
      element.validateSubstationResize = validator;
      let detail: ResizeEvent['detail'] | undefined;
      element.addEventListener('oscd-sld-resize', (e) => {
        detail = (e as ResizeEvent).detail;
      });

      input(widthField(), '1e2'); // parseInt would read this as 1
      clickResize();

      expect(validator.lastCall.args[1]).to.equal(100);
      expect(detail?.w).to.equal(100);
    });
  });

  describe('cancelling', () => {
    it('closes without emitting a resize event when cancelled', async () => {
      await element.show(substation);
      let dispatched = false;
      element.addEventListener('oscd-sld-resize', () => {
        dispatched = true;
      });
      input(widthField(), '70');

      clickCancel();

      expect(dialog().open).to.be.false;
      expect(dispatched).to.be.false;
    });

    it('reopens with the current dimensions and no stale errors', async () => {
      await element.show(substation);
      input(widthField(), '30'); // undersized, so invalid

      clickCancel();
      await element.show(substation);

      expect(widthField().value).to.equal('50');
      expect(widthField().validity.valid).to.be.true;
      expect(widthField().validationMessage).to.equal('');
    });

    it('reopens with the new dimensions after the substation was resized elsewhere', async () => {
      await element.show(substation);
      input(widthField(), '70'); // dirty the field
      clickCancel();

      setSLDAttributes(substation, sldPrefix(substation.ownerDocument), {
        w: '64',
        h: '32',
      });
      await element.show(substation);

      expect(widthField().value).to.equal('64');
    });
  });
});
