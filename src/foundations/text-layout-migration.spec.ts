import { expect } from '@open-wc/testing';
import { XMLEditor } from '@omicronenergy/oscd-editor';

import {
  hasLegacyTextLayout,
  migrateTextLayoutEdits,
} from './text-layout-migration.js';
import { convertSldLayout } from '../converter.js';
import { sldNs } from '../foundations.js';
import { createSCLDoc } from '../test-helpers.js';

const legacyText = `
  <Text>
    <Private type="OpenSCD-SLD-Layout">
      <smth:SLDAttributes smth:lx="3" smth:ly="4" smth:rot="1" smth:x="9"/>
    </Private>
    Note
  </Text>`;

function bayDoc(privateContent: string, text: string): XMLDocument {
  return createSCLDoc(`
    <Substation name="S1">
      <VoltageLevel name="V1">
        <Bay name="B1">
          ${privateContent}
          ${text}
        </Bay>
      </VoltageLevel>
    </Substation>
  `);
}

const ownLayout = `<Private type="OpenSCD-SLD-Layout">
  <smth:SLDAttributes smth:x="2" smth:y="2" smth:w="5" smth:h="5"/>
</Private>`;

describe('text layout migration', () => {
  it('detects a Private inside Text', () => {
    expect(hasLegacyTextLayout(bayDoc(ownLayout, legacyText))).to.be.true;
    expect(hasLegacyTextLayout(bayDoc(ownLayout, '<Text>Note</Text>'))).to.be
      .false;
  });

  it('moves legacy layout into the parent TextLayout', () => {
    const doc = bayDoc(ownLayout, legacyText);
    new XMLEditor().commit(migrateTextLayoutEdits(doc, 'smth'));

    expect(doc.querySelector('Text > Private')).to.equal(null);
    const layout = doc.querySelector('Bay > Private > TextLayout')!;
    expect(layout.getAttributeNS(sldNs, 'lx')).to.equal('3');
    expect(layout.getAttributeNS(sldNs, 'rot')).to.equal('1');
    // attributes that do not apply to Text are not carried over
    expect(layout.getAttributeNS(sldNs, 'x')).to.equal(null);
    expect(hasLegacyTextLayout(doc)).to.be.false;
  });

  it('creates the parent Private when it has none', () => {
    const doc = bayDoc('', legacyText);
    new XMLEditor().commit(migrateTextLayoutEdits(doc, 'smth'));
    expect(
      doc.querySelectorAll('Bay > Private[type="OpenSCD-SLD-Layout"]').length,
    ).to.equal(1);
    expect(doc.querySelector('Bay > Private > TextLayout')).to.exist;
  });

  it('keeps an existing TextLayout and just drops the legacy Private', () => {
    const doc = bayDoc(
      `<Private type="OpenSCD-SLD-Layout">
        <smth:SLDAttributes smth:x="2" smth:y="2"/>
        <smth:TextLayout smth:lx="7" smth:ly="8"/>
      </Private>`,
      legacyText,
    );
    new XMLEditor().commit(migrateTextLayoutEdits(doc, 'smth'));

    expect(doc.querySelector('Text > Private')).to.equal(null);
    const layouts = doc.querySelectorAll('Bay > Private > TextLayout');
    expect(layouts.length).to.equal(1);
    expect(layouts[0].getAttributeNS(sldNs, 'lx')).to.equal('7');
  });

  it('legacy-namespace conversion writes Text layout as TextLayout', () => {
    const doc = new DOMParser().parseFromString(
      `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0">
        <Substation name="S1">
          <Bay name="B1" esld:x="2" esld:y="2" esld:w="3" esld:h="3">
            <Text esld:lx="5" esld:ly="6" esld:weight="500">Note</Text>
          </Bay>
        </Substation>
      </SCL>`,
      'application/xml',
    );
    new XMLEditor().commit(convertSldLayout(doc, 'eosld'));

    expect(doc.querySelector('Text > Private')).to.equal(null);
    expect(doc.querySelector('Text')!.attributes.length).to.equal(0);
    const layout = doc.querySelector('Bay > Private > TextLayout')!;
    expect(layout.getAttributeNS(sldNs, 'lx')).to.equal('5');
    expect(layout.getAttributeNS(sldNs, 'weight')).to.equal('500');
    expect(
      doc.querySelector('Bay > Private > SLDAttributes')!.getAttributeNS(sldNs, 'x'),
    ).to.equal('2');
  });
});
