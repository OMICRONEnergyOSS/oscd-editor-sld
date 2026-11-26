import { expect } from '@open-wc/testing';

import { downloadSvg, serializeForExport } from './export.js';
import { renderLabel } from '../drawing/artifacts/label.js';
import {
  makeArtifactContext,
  renderToSvg,
} from '../drawing/artifacts/test-context.js';
import { sldFixture } from '../test-helpers.js';

describe('export', () => {
  describe('serializeForExport', () => {
    it('serializes without modifying the original SVG', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
      rect.setAttribute('width', '10');
      rect.setAttribute('height', '10');
      svg.appendChild(rect);

      const originalChildCount = svg.childElementCount;
      const serialized = serializeForExport(svg);

      expect(svg.childElementCount).to.equal(originalChildCount);
      expect(svg.querySelector('rect')).to.not.be.null;
      expect(serialized).to.contain('rect');
    });

    it('removes handle elements from the export', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const handle = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      handle.classList.add('handle');
      svg.appendChild(handle);
      const content = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svg.appendChild(content);

      const serialized = serializeForExport(svg);

      // The original is not mutated; the export clone drops the handle.
      expect(svg.querySelector('.handle')).to.not.be.null;
      expect(serialized).to.not.contain('handle');
    });

    it('removes preview elements from the export', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const preview = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      preview.classList.add('preview');
      svg.appendChild(preview);

      const serialized = serializeForExport(svg);

      expect(svg.querySelector('.preview')).to.not.be.null;
      expect(serialized).to.not.contain('preview');
    });

    it('removes port elements from the export', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const port = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      port.classList.add('port');
      svg.appendChild(port);

      const serialized = serializeForExport(svg);

      expect(svg.querySelector('.port')).to.not.be.null;
      expect(serialized).to.not.contain('port');
    });

    it('removes label container elements from the export', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const labelContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      labelContainer.classList.add('label');
      labelContainer.classList.add('container');
      svg.appendChild(labelContainer);

      const serialized = serializeForExport(svg);

      expect(svg.querySelector('.label.container')).to.not.be.null;
      expect(serialized).to.not.contain('container');
    });

    it('removes outline rect from voltagelevel/bay groups', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const vlGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      vlGroup.classList.add('voltagelevel');
      const outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      vlGroup.appendChild(outline);
      const content = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      vlGroup.appendChild(content);
      svg.appendChild(vlGroup);

      const serialized = serializeForExport(svg);

      // original not mutated; frame stripped only from the export clone
      expect(vlGroup.querySelector('rect')).to.not.be.null;
      expect(serialized).to.contain('line');
      expect(serialized).to.not.contain('rect');
    });

    it('forces a monochrome black-on-white palette regardless of theme', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.setProperty('--oscd-sld-terminal-color', 'rgb(187, 19, 38)');
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.style.fill = 'var(--oscd-sld-terminal-color)';
      svg.appendChild(rect);
      document.body.appendChild(svg);

      const exported = serializeForExport(svg);
      svg.remove();

      expect(exported).to.contain('<style');
      expect(exported).to.contain('--md-sys-color-surface: white');
      expect(exported).to.contain('--md-sys-color-on-surface: black');
      expect(exported).to.contain('--oscd-sld-terminal-color: black');
      // markup keeps its var() reference; the pinned :root resolves it black
      expect(exported).to.contain('var(--oscd-sld-terminal-color)');
    });

    it('preserves real multiline label text and positioning in the export', () => {
      const doc = sldFixture({
        children: `
          <ConductingEquipment name="QA1" type="CBR">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="3" smth:y="3"/>
            </Private>
            <Text>  North

South  </Text>
          </ConductingEquipment>`,
      });
      const text = doc.querySelector('Text')!;
      const context = makeArtifactContext({
        substation: doc.querySelector('Substation')!,
        renderedLabelPosition: () => [4, 5],
      });
      const rendered = renderToSvg(renderLabel(text, context));
      const renderedTspans = Array.from(
        rendered.querySelectorAll('text > tspan'),
      );
      const exported = new DOMParser().parseFromString(
        serializeForExport(rendered),
        'image/svg+xml',
      );
      const tspans = Array.from(exported.querySelectorAll('text > tspan'));

      expect(tspans).to.have.length(3);
      expect(tspans.map(tspan => tspan.textContent)).to.deep.equal(
        renderedTspans.map(tspan => tspan.textContent),
      );
      expect(tspans.map(tspan => tspan.textContent?.trim())).to.deep.equal([
        'North',
        '.',
        'South',
      ]);
      expect(tspans.map(tspan => tspan.getAttribute('x'))).to.deep.equal([
        '4.1',
        '4.1',
        '4.1',
      ]);
      expect(tspans[0].hasAttribute('dy')).to.be.false;
      expect(tspans[1].getAttribute('dy')).to.equal('1.19em');
      expect(tspans[1].getAttribute('visibility')).to.equal('hidden');
    });
  });

  describe('downloadSvg', () => {
    it('packages the content as an application/xml blob and triggers a download', () => {
      let captured: Blob | undefined;
      const originalCreate = URL.createObjectURL;
      URL.createObjectURL = (blob: Blob) => {
        captured = blob;
        return 'blob:test';
      };

      try {
        downloadSvg('<svg></svg>', 'test.svg');
      } finally {
        URL.createObjectURL = originalCreate;
      }

      expect(captured).to.not.be.undefined;
      expect(captured!.type).to.equal('application/xml');
    });
  });
});
