/* eslint-disable no-unused-expressions */
import { html } from 'lit';
import { fixture, expect, aTimeout } from '@open-wc/testing';

import type { Button } from '@material/mwc-button';

import { IconButton } from '@material/mwc-icon-button';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import { EditEventV2 } from '@openscd/oscd-api';
import OscdEditorSld from './oscd-editor-sld.js';
import { SldSubstationEditor } from './sld-substation-editor.js';
import { SldEditor } from './sld-editor.js';

function sldAttribute(element: Element, attr: string): string | null {
  const nsp = 'https://openscd.org/SCL/SSD/SLD/v0';
  return (
    element
      .querySelector(
        ':scope > Private[type="OpenSCD-SLD-Layout"] > SLDAttributes'
      )
      ?.getAttributeNS(nsp, attr) ?? null
  );
}

customElements.define('oscd-editor-sld', OscdEditorSld);

export const emptyDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL">
</SCL>`;

export const voltageLevelDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns:smth="https://openscd.org/SCL/SSD/SLD/v0" xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B">
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <smth:SLDAttributes smth:w="50" smth:h="25"/>
    </Private>
    <VoltageLevel name="V1" desc="some description">
      <Private type="OpenSCD-SLD-Layout">
        <smth:SLDAttributes smth:x="1" smth:y="1" smth:lx="1" smth:ly="1" smth:w="48" smth:h="23"/>
      </Private>
    </VoltageLevel>
  </Substation>
</SCL>
`;

export const bayDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:eosld="https://openscd.org/SCL/SSD/SLD/v0">
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <eosld:SLDAttributes eosld:w="50" eosld:h="25"/>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="1" eosld:y="1" eosld:w="13" eosld:h="13" eosld:lx="1" eosld:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="2" eosld:y="2" eosld:w="3" eosld:h="3" eosld:lx="2" eosld:ly="2"/>
        </Private>
        <ConnectivityNode name="L1" pathName="S1/V1/B1/L1" />
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="15" eosld:y="1" eosld:w="13" eosld:h="13" eosld:lx="15" eosld:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="20" eosld:y="11" eosld:w="1" eosld:h="1" eosld:lx="20" eosld:ly="11"/>
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;

export const equipmentDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:eosld="https://openscd.org/SCL/SSD/SLD/v0">
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <eosld:SLDAttributes eosld:w="50" eosld:h="25"/>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="1" eosld:y="1" eosld:w="13" eosld:h="13" eosld:lx="1" eosld:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="2" eosld:y="2" eosld:w="6" eosld:h="6" eosld:lx="2" eosld:ly="2"/>
        </Private>
        <ConductingEquipment type="CBR" name="CBR1" desc="CBR description">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="4" eosld:y="4" eosld:rot="1" eosld:lx="3.5" eosld:ly="4"/>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="15" eosld:y="1" eosld:w="23" eosld:h="23" eosld:lx="15" eosld:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="16" eosld:y="2" eosld:w="6" eosld:h="6" eosld:lx="16" eosld:ly="2"/>
        </Private>
        <ConductingEquipment type="CTR" name="CTR1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="17" eosld:y="5" eosld:rot="3" eosld:lx="17" eosld:ly="7.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="DIS" name="DIS1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="18" eosld:y="4" eosld:rot="1" eosld:lx="17" eosld:ly="4.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="NEW" name="NEW1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="19" eosld:y="3" eosld:rot="2" eosld:lx="20" eosld:ly="3.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="VTR" name="VTR1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="17" eosld:y="3" eosld:rot="3" eosld:lx="17" eosld:ly="3"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="DIS" name="DIS2">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="20" eosld:y="4" eosld:rot="0" eosld:lx="21" eosld:ly="5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="BAT" name="BAT1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="19" eosld:y="7" eosld:rot="3" eosld:lx="19" eosld:ly="7"/>
          </Private>
          <Terminal name="erroneous"/>
        </ConductingEquipment>
        <ConductingEquipment type="SMC" name="SMC1">
          <Private type="OpenSCD-SLD-Layout">
            <eosld:SLDAttributes eosld:x="21" eosld:y="7" eosld:rot="3" eosld:lx="22" eosld:ly="8" />
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;

function getSldSubstationEditor(element: OscdEditorSld): SldSubstationEditor | null | undefined {
  return element.shadowRoot?.querySelector<SldSubstationEditor>('sld-editor')?.shadowRoot?.querySelector('sld-substation-editor');
}

function getSldEditor(element: OscdEditorSld): SldEditor | null | undefined {
  return element.shadowRoot?.querySelector<SldEditor>('sld-editor');
}

describe('SLD Editor', () => {
  let element: OscdEditorSld;
  let xmlEditor: XMLEditor;

  beforeEach(async () => {
    const doc = new DOMParser().parseFromString(
      emptyDocString,
      'application/xml'
    );
    // Use the actual editor here so that tests depending on a sequence of changes, still makes sense.
    xmlEditor = new XMLEditor();
    element = await fixture(
      html`<oscd-editor-sld
        docName="testDoc"
        .doc=${doc}
        @oscd-edit-v2=${(event: EditEventV2) => {
          xmlEditor.commit(event.detail.edit);
          element.docVersion += 1;
        }}
      ></oscd-editor-sld>`
    );
  });

  afterEach(async () => {
    await sendMouse({ type: 'click', position: [0, 0] });
    await resetMouse();
  });

  it('shows a placeholder message while no document is loaded', async () => {
    element = await fixture(html`<oscd-editor-sld></oscd-editor-sld>`);
    expect(element.shadowRoot?.querySelector('p')).to.contain.text('SCL');
  });

  it('adds the SLD XML namespace if doc lacks it', async () => {
    expect(element.doc.documentElement).to.have.attribute('xmlns:eosld');
  });

  it('adds a substation on add button click', async () => {
    expect(element.doc.querySelector('Substation')).to.not.exist;
    element
      .shadowRoot!.querySelector<Button>('[label="Add Substation"]')
      ?.click();
    expect(element.doc.querySelector('Substation')).to.exist;
  });

  it('gives new substations unique names', async () => {
    element
      .shadowRoot!.querySelector<Button>('[label="Add Substation"]')
      ?.click();
    element
      .shadowRoot!.querySelector<Button>('[label="Add Substation"]')
      ?.click();
    const [name1, name2] = Array.from(
      element.doc.querySelectorAll('Substation')
    ).map(substation => substation.getAttribute('name'));
    expect(name1).not.to.equal(name2);
  });

  it('does not zoom out past a positive minimum value', async () => {
    for (let i = 0; i < 20; i += 1)
      element
        .shadowRoot!.querySelector<IconButton>('[icon="zoom_out"]')
        ?.click();
    expect(element.gridSize).to.be.greaterThan(0);
  });

  describe('given a substation', () => {
    let sldSubstationEditor: SldSubstationEditor;
    let sldEditor: SldEditor;
    beforeEach(async () => {
      element
        .shadowRoot!.querySelector<Button>('[label="Add Substation"]')
        ?.click();
      await element.updateComplete;
      sldEditor = getSldEditor(element)!;
      await sldEditor.updateComplete;
      sldSubstationEditor = getSldSubstationEditor(element)!;
      await sldSubstationEditor.updateComplete;
    });

    it('zooms in on zoom in button click', async () => {
      const initial = element.gridSize;
      element
        .shadowRoot!.querySelector<IconButton>('[icon="zoom_in"]')
        ?.click();
      expect(element.gridSize).to.be.greaterThan(initial);
    });

    it('zooms out on zoom out button click', async () => {
      const initial = element.gridSize;
      element
        .shadowRoot!.querySelector<IconButton>('[icon="zoom_out"]')
        ?.click();
      expect(element.gridSize).to.be.lessThan(initial);
    });

    it('allows placing a new voltage level', async () => {
      element
        .shadowRoot!.querySelector<Button>('[label="Add VoltageLevel"]')
        ?.click();
      expect(sldEditor)
        .property('placing')
        .to.have.property('tagName', 'VoltageLevel');
      await sendMouse({ type: 'click', position: [200, 252] });
      expect(sldEditor).to.have.property('placing', undefined);
      expect(sldEditor)
        .property('resizingBR')
        .to.have.property('tagName', 'VoltageLevel');
      await sendMouse({ type: 'click', position: [400, 452] });
      await aTimeout(10); // Wait for quick machines
      expect(sldEditor).to.have.property('resizingBR', undefined);
      const voltLv = element.doc.querySelector('VoltageLevel')!;
      expect(sldAttribute(voltLv, 'x')).to.equal('5');
      expect(sldAttribute(voltLv, 'y')).to.equal('3');
      expect(sldAttribute(voltLv, 'w')).to.equal('7');
      expect(sldAttribute(voltLv, 'h')).to.equal('8');
    });

    it('gives new voltage levels unique names', async () => {
      element
        .shadowRoot!.querySelector<Button>('[label="Add VoltageLevel"]')
        ?.click();
      await sendMouse({ type: 'click', position: [200, 252] });
      await sendMouse({ type: 'click', position: [300, 352] });
      element
        .shadowRoot!.querySelector<Button>('[label="Add VoltageLevel"]')
        ?.click();
      await sendMouse({ type: 'click', position: [350, 402] });
      await sendMouse({ type: 'click', position: [450, 502] });
      const [name1, name2] = Array.from(
        element.doc.querySelectorAll('VoltageLevel')
      ).map(substation => substation.getAttribute('name'));
      expect(name1).not.to.equal(name2);
      expect(name1).to.exist;
      expect(name2).to.exist;
    });

    it('allows the user to abort placing an element', async () => {
      element
        .shadowRoot!.querySelector<Button>('[label="Add VoltageLevel"]')
        ?.click();
      expect(sldEditor)
        .property('placing')
        .to.have.property('tagName', 'VoltageLevel');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);
      expect(sldEditor).to.have.property('placing', undefined);
    });
  });

  describe('given a voltage level', () => {
    let sldSubstationEditor: SldSubstationEditor;
    let sldEditor: SldEditor;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        voltageLevelDocString,
        'application/xml'
      );
      element.doc = doc;
      await element.updateComplete;
      sldEditor = getSldEditor(element)!;
      await sldEditor.updateComplete;
      sldSubstationEditor = getSldSubstationEditor(element)!;
      await sldSubstationEditor.updateComplete;
    });

    it('allows placing a new bay', async () => {
      element.shadowRoot!.querySelector<Button>('[label="Add Bay"]')?.click();
      expect(sldEditor).property('placing').to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: [200, 252] });
      expect(sldEditor).to.have.property('placing', undefined);
      expect(sldEditor).property('resizingBR').to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: [400, 500] });
      expect(sldSubstationEditor).to.have.property('resizingBR', undefined);
      const bay = sldEditor.doc.querySelector('Bay')!;
      expect(bay).to.exist;
      expect(sldAttribute(bay, 'x')).to.equal('5');
      expect(sldAttribute(bay, 'y')).to.equal('3');
      expect(sldAttribute(bay, 'w')).to.equal('7');
      expect(sldAttribute(bay, 'h')).to.equal('8');
    });

    it('allows placing a new bus bar', async () => {
      element
        .shadowRoot!.querySelector<Button>('[label="Add Bus Bar"]')
        ?.click();
      expect(sldEditor).property('placing').to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: [200, 252] });
      expect(sldEditor).to.have.property('placing', undefined);
      expect(sldEditor).property('resizingBR').to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: [400, 452] });
      expect(sldSubstationEditor).to.have.property('resizingBR', undefined);
      const bus = sldEditor.doc.querySelector('Bay');
      expect(bus).to.exist;
      expect(sldAttribute(bus!, 'x')).to.equal('5');
      expect(sldAttribute(bus!, 'y')).to.equal('3');
      expect(sldAttribute(bus!, 'w')).to.equal('1');
      expect(sldAttribute(bus!, 'h')).to.equal('8');
      await expect(bus).dom.to.equalSnapshot({
        ignoreAttributes: ['eosld:uuid'],
      });
    });
  });

  describe('given a bay', () => {
    let sldSubstationEditor: SldSubstationEditor;
    let sldEditor: SldEditor;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        bayDocString,
        'application/xml'
      );
      element.doc = doc;
      await element.updateComplete;
      sldEditor = getSldEditor(element)!;
      await sldEditor.updateComplete;
      sldSubstationEditor = getSldSubstationEditor(element)!;
      await sldSubstationEditor.updateComplete;
    });

    it('allows placing new conducting equipment', async () => {
      element.shadowRoot!.querySelector<Button>('[label="Add GEN"]')?.click();
      expect(sldEditor)
        .property('placing')
        .to.have.property('tagName', 'ConductingEquipment');
      await sendMouse({ type: 'click', position: [160, 324] });
      expect(sldEditor).to.have.property('placing', undefined);
      expect(sldEditor).to.have.property('resizingBR', undefined);
      const equipment = element.doc.querySelector('ConductingEquipment');
      expect(equipment).to.exist;
      expect(sldAttribute(equipment!, 'x')).to.equal('4');
      expect(sldAttribute(equipment!, 'y')).to.equal('4');
    });
  });
});