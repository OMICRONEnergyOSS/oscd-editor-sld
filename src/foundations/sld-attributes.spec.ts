import { expect } from '@open-wc/testing';

import {
  attributes,
  getSLDAttributes,
  setSLDAttributes,
  xmlBoolean,
  isTransformerKind,
} from './sld-attributes.js';
import { sldNs } from '../foundations.js';
import { createSCLDoc } from '../test-helpers.js';

function substationWithSLD(attrs: string): Element {
  const doc = createSCLDoc(`
    <Substation name="S1">
      <Private type="OpenSCD-SLD-Layout">
        <smth:SLDAttributes ${attrs}/>
      </Private>
    </Substation>
  `);
  return doc.querySelector('Substation')!;
}

describe('sld-attributes', () => {
  describe('xmlBoolean', () => {
    it('returns true for "true"', () => {
      expect(xmlBoolean('true')).to.be.true;
    });

    it('returns true for "1"', () => {
      expect(xmlBoolean('1')).to.be.true;
    });

    it('returns true for " true " (trimmed)', () => {
      expect(xmlBoolean(' true ')).to.be.true;
    });

    it('returns false for "false"', () => {
      expect(xmlBoolean('false')).to.be.false;
    });

    it('returns false for null', () => {
      expect(xmlBoolean(null)).to.be.false;
    });

    it('returns false for undefined', () => {
      expect(xmlBoolean(undefined)).to.be.false;
    });

    it('returns false for "0"', () => {
      expect(xmlBoolean('0')).to.be.false;
    });

    it('returns false for empty string', () => {
      expect(xmlBoolean('')).to.be.false;
    });
  });

  describe('isTransformerKind', () => {
    it('returns true for "default"', () => {
      expect(isTransformerKind('default')).to.be.true;
    });

    it('returns true for "auto"', () => {
      expect(isTransformerKind('auto')).to.be.true;
    });

    it('returns true for "earthing"', () => {
      expect(isTransformerKind('earthing')).to.be.true;
    });

    it('returns false for null', () => {
      expect(isTransformerKind(null)).to.be.false;
    });

    it('returns false for invalid string', () => {
      expect(isTransformerKind('unknown')).to.be.false;
    });

    it('returns false for empty string', () => {
      expect(isTransformerKind('')).to.be.false;
    });
  });

  describe('getSLDAttributes', () => {
    it('reads an attribute from a standard element', () => {
      const el = substationWithSLD(`smth:w="50" smth:h="25"`);
      expect(getSLDAttributes(el, 'w')).to.equal('50');
      expect(getSLDAttributes(el, 'h')).to.equal('25');
    });

    it('returns null for missing attribute', () => {
      const el = substationWithSLD(`smth:w="50"`);
      expect(getSLDAttributes(el, 'rot')).to.be.null;
    });

    it('reads from Section elements directly', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:Section smth:bus="true"/>
          </Private>
        </Substation>
      `);
      const section = doc.getElementsByTagNameNS(sldNs, 'Section')[0];
      expect(getSLDAttributes(section, 'bus')).to.equal('true');
    });

    it('reads from Vertex elements directly', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:Section>
              <smth:Vertex smth:x="3" smth:y="4"/>
            </smth:Section>
          </Private>
        </Substation>
      `);
      const vertex = doc.getElementsByTagNameNS(sldNs, 'Vertex')[0];
      expect(getSLDAttributes(vertex, 'x')).to.equal('3');
      expect(getSLDAttributes(vertex, 'y')).to.equal('4');
    });
  });

  describe('setSLDAttributes', () => {
    it('sets attributes on standard elements via SLDAttributes child', () => {
      const el = substationWithSLD(`smth:w="50" smth:h="25"`);
      setSLDAttributes(el, 'smth', { x: '10', y: '20' });
      expect(getSLDAttributes(el, 'x')).to.equal('10');
      expect(getSLDAttributes(el, 'y')).to.equal('20');
    });

    it('creates SLDAttributes element if it does not exist', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
        </Substation>
      `);
      const el = doc.querySelector('Substation')!;
      setSLDAttributes(el, 'smth', { w: '30' });
      expect(getSLDAttributes(el, 'w')).to.equal('30');
    });

    it('sets attributes directly on Section elements', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:Section/>
          </Private>
        </Substation>
      `);
      const section = doc.getElementsByTagNameNS(sldNs, 'Section')[0];
      setSLDAttributes(section, 'smth', { bus: 'true' });
      expect(getSLDAttributes(section, 'bus')).to.equal('true');
    });

    it('sets attributes directly on Vertex elements', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:Section>
              <smth:Vertex/>
            </smth:Section>
          </Private>
        </Substation>
      `);
      const vertex = doc.getElementsByTagNameNS(sldNs, 'Vertex')[0];
      setSLDAttributes(vertex, 'smth', { x: '5', y: '6' });
      expect(getSLDAttributes(vertex, 'x')).to.equal('5');
      expect(getSLDAttributes(vertex, 'y')).to.equal('6');
    });
  });

  describe('attributes', () => {
    it('parses all SLD attributes from an element', () => {
      const el = substationWithSLD(
        `smth:x="5" smth:y="3" smth:w="10" smth:h="8" smth:lx="1" smth:ly="2" smth:rot="2" smth:flip="true" smth:bus="true" smth:weight="500" smth:color="#f00" smth:kind="auto"`,
      );
      const attrs = attributes(el);
      expect(attrs.pos).to.deep.equal([5, 3]);
      expect(attrs.dim).to.deep.equal([10, 8]);
      expect(attrs.label).to.deep.equal([1, 2]);
      expect(attrs.rot).to.equal(2);
      expect(attrs.flip).to.be.true;
      expect(attrs.bus).to.be.true;
      expect(attrs.weight).to.equal(500);
      expect(attrs.color).to.equal('#f00');
      expect(attrs.kind).to.equal('auto');
    });

    it('provides defaults for missing attributes', () => {
      const el = substationWithSLD('');
      const attrs = attributes(el);
      expect(attrs.pos).to.deep.equal([0, 0]);
      expect(attrs.dim).to.deep.equal([1, 1]);
      expect(attrs.label).to.deep.equal([0, 0]);
      expect(attrs.rot).to.equal(0);
      expect(attrs.flip).to.be.false;
      expect(attrs.bus).to.be.false;
      expect(attrs.weight).to.equal(300);
      expect(attrs.color).to.equal('#000');
      expect(attrs.kind).to.equal('default');
    });

    it('clamps negative positions to 0', () => {
      const el = substationWithSLD(`smth:x="-5" smth:y="-3"`);
      const attrs = attributes(el);
      expect(attrs.pos).to.deep.equal([0, 0]);
    });

    it('clamps dimensions to minimum 1', () => {
      const el = substationWithSLD(`smth:w="0" smth:h="-1"`);
      const attrs = attributes(el);
      expect(attrs.dim).to.deep.equal([1, 1]);
    });

    it('normalizes rotation to 0-3 range', () => {
      const el1 = substationWithSLD(`smth:rot="5"`);
      expect(attributes(el1).rot).to.equal(1);

      const el2 = substationWithSLD(`smth:rot="-1"`);
      expect(attributes(el2).rot).to.equal(3);
    });

    it('defaults kind to "default" for invalid values', () => {
      const el = substationWithSLD(`smth:kind="bogus"`);
      expect(attributes(el).kind).to.equal('default');
    });
  });

  describe('Text layout', () => {
    const textDoc = (inner: string) =>
      createSCLDoc(`
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:SLDAttributes smth:w="5" smth:h="5"/>
            ${inner}
          </Private>
          <Text>Note</Text>
        </Substation>
      `);

    it('reads a Text layout from the parent TextLayout', () => {
      const doc = textDoc(
        '<smth:TextLayout smth:lx="3" smth:ly="4" smth:rot="1" smth:weight="500" smth:color="#F00"/>',
      );
      const attrs = attributes(doc.querySelector('Text')!);
      expect(attrs.label).to.deep.equal([3, 4]);
      expect(attrs.rot).to.equal(1);
      expect(attrs.weight).to.equal(500);
      expect(attrs.color).to.equal('#F00');
    });

    it('writes a Text layout to the parent TextLayout, not into Text', () => {
      const doc = textDoc('');
      const text = doc.querySelector('Text')!;
      setSLDAttributes(text, 'smth', { lx: '2' });
      expect(text.querySelector('Private')).to.equal(null);
      expect(
        doc
          .querySelector('Substation > Private > TextLayout')!
          .getAttributeNS(sldNs, 'lx'),
      ).to.equal('2');
    });

    it('ignores a legacy Private inside Text', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <Text>
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:lx="9" smth:ly="9"/>
            </Private>
          </Text>
        </Substation>
      `);
      expect(attributes(doc.querySelector('Text')!).label).to.deep.equal([0, 0]);
    });
  });
});
