/* eslint-disable no-unused-expressions */
import '@webcomponents/scoped-custom-element-registry';
import { html } from 'lit';
import { fixture, expect, aTimeout } from '@open-wc/testing';

import type { Button } from '@material/mwc-button';
import { IconButton } from '@material/mwc-icon-button';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import { EditEventV2 } from '@openscd/oscd-api';

import OscdEditorSld from './oscd-editor-sld.js';
import { SldSubstationEditor } from './sld-substation-editor.js';
import { SldEditor } from './sld-editor.js';
import { sldNs } from './util.js';

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

export const iedDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:eosld="https://openscd.org/SCL/SSD/SLD/v0">
  <IED name="IED1" manufacturer="Dummy" />
  <IED name="IED2" manufacturer="Dummy" />
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <eosld:SLDAttributes eosld:w="50" eosld:h="25" />
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="1" eosld:y="1" eosld:w="13" eosld:h="13" eosld:lx="1" eosld:ly="1" />
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="2" eosld:y="2" eosld:w="6" eosld:h="6" eosld:lx="2" eosld:ly="2" />
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;

function getSldSubstationEditor(
  element: OscdEditorSld
): SldSubstationEditor | null | undefined {
  return element.shadowRoot
    ?.querySelector<SldSubstationEditor>('sld-editor')
    ?.shadowRoot?.querySelector('sld-substation-editor');
}

function getSldEditor(element: OscdEditorSld): SldEditor | null | undefined {
  return element.shadowRoot?.querySelector<SldEditor>('sld-editor');
}

function svgClientPosition(
  element: OscdEditorSld,
  x: number,
  y: number
): [number, number] {
  const svg = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
    'svg#sld'
  ) as SVGSVGElement | null;

  const viewBox = svg!.viewBox.baseVal;
  const rect = svg!.getBoundingClientRect();

  const clientX =
    rect.left + ((x + 0.5 - viewBox.x) / viewBox.width) * rect.width;
  const clientY =
    rect.top + ((y + 0.5 - viewBox.y) / viewBox.height) * rect.height;

  return [Math.round(clientX), Math.round(clientY)];
}

function middleOf(element: Element): [number, number] {
  const { x, y, width, height } = element.getBoundingClientRect();

  return [
    Math.floor(x + window.pageXOffset + width / 2),
    Math.floor(y + window.pageYOffset + height / 2),
  ];
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
    window.scrollTo(0, 0);
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

    describe('IED interactions', () => {
      let lastCalledWizard: Element | undefined;

      const onWizardRequest = ({
        detail: { element: wizardElement },
      }: CustomEvent<{ element: Element }>) => {
        lastCalledWizard = wizardElement;
      };

      function linkedIed(name: string): Element | undefined {
        return Array.from(
          element.doc.getElementsByTagNameNS(sldNs, 'IEDName')
        ).find(ied => ied.getAttributeNS(sldNs, 'name') === name);
      }

      function iedAttr(name: string, attr: string): number {
        const value = linkedIed(name)?.getAttributeNS(sldNs, attr);
        expect(value).to.exist;
        return Number(value);
      }

      async function settle() {
        await aTimeout(20);
        await element.updateComplete;
        sldEditor = getSldEditor(element)!;
        await sldEditor.updateComplete;
        sldSubstationEditor = getSldSubstationEditor(element)!;
        await sldSubstationEditor.updateComplete;
      }

      async function clickGridAt(x: number, y: number) {
        const [clientX, clientY] = svgClientPosition(element, x, y);
        await sendMouse({ type: 'move', position: [clientX, clientY] });
        await sendMouse({ type: 'click', position: [clientX, clientY] });
        await settle();
      }

      async function placePreviewAt(selector: string, x: number, y: number) {
        const [clientX, clientY] = svgClientPosition(element, x, y);
        await sendMouse({ type: 'move', position: [clientX, clientY] });
        await aTimeout(50);

        const previewTarget = sldSubstationEditor.shadowRoot?.querySelector(
          selector
        ) as SVGElement;
        expect(previewTarget).to.exist;
        previewTarget!.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
        await settle();
      }

      async function loadIedDoc() {
        element.doc = new DOMParser().parseFromString(
          iedDocString,
          'application/xml'
        );
        await settle();
      }

      async function openIedMenu() {
        element.shadowRoot!.querySelector<Button>('[label="Add IED"]')?.click();
        await settle();
      }

      async function selectIedFromMenu(name: string) {
        await openIedMenu();
        const iedMenu = element.shadowRoot!.querySelector('mwc-menu#iedMenu');
        const iedList = iedMenu?.querySelector('mwc-list');
        const item = Array.from(
          iedList?.querySelectorAll('mwc-list-item') ?? []
        ).find(listItem => listItem.getAttribute('data-name') === name) as
          | ListItem
          | undefined;

        expect(item).to.exist;
        item!.click();
        await settle();
        expect(sldEditor.placing).to.exist;
        expect(sldEditor.placing!.localName).to.equal('IEDName');
      }

      async function placeIedFromMenu(name: string, x: number, y: number) {
        await selectIedFromMenu(name);
        await clickGridAt(x, y);
      }

      async function moveIed(name: string, x: number, y: number) {
        const ied = linkedIed(name);
        expect(ied).to.exist;

        sldEditor.startPlacing(ied!);
        await settle();

        expect(sldEditor.placing).to.equal(ied);
        await placePreviewAt('g.ied.preview rect', x, y);
      }

      beforeEach(async () => {
        element.addEventListener(
          'oscd-edit-wizard-request',
          onWizardRequest as any
        );
        lastCalledWizard = undefined;
      });

      afterEach(() => {
        element.removeEventListener(
          'oscd-edit-wizard-request',
          onWizardRequest as any
        );
      });

      it('places IEDs from the IED menu', async () => {
        element.doc = new DOMParser().parseFromString(
          iedDocString,
          'application/xml'
        );
        await element.updateComplete;
        await sldEditor.updateComplete;
        await sldSubstationEditor.updateComplete;

        element.shadowRoot!.querySelector<Button>('[label="Add IED"]')?.click();
        await element.updateComplete;
        await aTimeout(20);

        const iedMenu = element.shadowRoot!.querySelector('mwc-menu#iedMenu');
        const iedList = iedMenu?.querySelector('mwc-list');
        const iedItems = Array.from(
          iedList?.querySelectorAll('mwc-list-item') ?? []
        );
        const itemIndex = iedItems.findIndex(
          item => item.getAttribute('data-name') === 'IED1'
        );
        expect(itemIndex).to.be.greaterThan(-1);
        const item = iedItems[itemIndex] as ListItem;
        item.click();

        await aTimeout(20);
        await sldEditor.updateComplete;

        expect(sldEditor.placing).to.exist;
        expect(sldEditor.placing!.localName).to.equal('IEDName');
        expect(sldEditor.placing!.namespaceURI).to.equal(sldNs);

        const [clientX, clientY] = svgClientPosition(element, 10, 10);
        await sendMouse({ type: 'move', position: [clientX, clientY] });
        await sendMouse({ type: 'click', position: [clientX, clientY] });
        await aTimeout(20);

        const linkedIeds = Array.from(
          element.doc.getElementsByTagNameNS(sldNs, 'IEDName')
        );
        expect(linkedIeds).to.have.lengthOf(1);
        expect(linkedIeds[0].getAttributeNS(sldNs, 'name')).to.equal('IED1');
        expect(linkedIeds[0].parentElement).to.have.attribute(
          'type',
          'OpenSCD-SLD-Layout'
        );
      });

      it('does not show IED menu button when no IEDs exist in SCL', async () => {
        element.doc = new DOMParser().parseFromString(
          voltageLevelDocString,
          'application/xml'
        );
        await settle();

        const addIedButton =
          element.shadowRoot!.querySelector<Button>('[label="Add IED"]');
        expect(addIedButton).to.not.exist;
      });

      it('shows placed and unplaced IEDs in menu with correct status markers', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 3, 3);

        await openIedMenu();

        const iedMenu = element.shadowRoot!.querySelector('mwc-menu#iedMenu');
        const iedList = iedMenu?.querySelector('mwc-list');
        const iedItem1 = Array.from(
          iedList?.querySelectorAll('mwc-list-item') ?? []
        ).find(item => item.getAttribute('data-name') === 'IED1');
        const iedItem2 = Array.from(
          iedList?.querySelectorAll('mwc-list-item') ?? []
        ).find(item => item.getAttribute('data-name') === 'IED2');

        expect(iedItem1).to.exist;
        expect(iedItem2).to.exist;

        expect(
          iedItem1?.querySelector('mwc-icon[slot="meta"]')?.textContent?.trim()
        ).to.equal('pin_drop');
        expect(iedItem2?.querySelector('mwc-icon[slot="meta"]')).to.not.exist;
      });

      it('triggers oscd-scl-dialogs via the IED context menu edit action', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 3, 3);

        const sclDialogs = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('oscd-scl-dialogs') as
          | {
              edit: (wizardType: { element: Element }) => Promise<any[]>;
            }
          | undefined;
        expect(sclDialogs).to.exist;

        const editCalls: { element: Element }[] = [];
        const originalEdit = sclDialogs!.edit.bind(sclDialogs);
        sclDialogs!.edit = async wizardType => {
          editCalls.push(wizardType);
          return [];
        };

        const iedRect =
          getSldSubstationEditor(element)?.shadowRoot?.querySelector(
            '#IEDName-IED1 rect'
          );
        expect(iedRect).to.exist;

        iedRect!.dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            composed: true,
            cancelable: true,
            clientX: 200,
            clientY: 200,
          })
        );
        await settle();

        const menu = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'menu#sld-context-menu'
        );
        expect(menu).to.exist;

        const items = Array.from(menu!.querySelectorAll('mwc-list-item'));
        const editItem = items.find(item =>
          item.textContent?.includes('Edit')
        ) as ListItem | undefined;
        expect(editItem).to.exist;
        editItem!.click();
        await settle();

        expect(editCalls).to.have.lengthOf(1);
        expect(editCalls[0].element).to.equal(
          element.doc.querySelector(':root > IED[name="IED1"]')
        );

        sclDialogs!.edit = originalEdit;
      });

      it('moves an IED from voltage level to bay and updates XML location', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        await moveIed('IED1', 4, 4);

        const ied = linkedIed('IED1')!;
        expect(ied.closest('Bay')?.getAttribute('name')).to.equal('B1');
        expect(ied.closest('VoltageLevel')?.getAttribute('name')).to.equal(
          'V1'
        );
      });

      it('moves an IED from bay to substation and updates XML location', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 3, 3);

        await moveIed('IED1', 20, 10);

        const ied = linkedIed('IED1')!;
        expect(ied.closest('Bay')).to.be.null;
        expect(ied.closest('VoltageLevel')).to.be.null;
        expect(ied.closest('Substation')?.getAttribute('name')).to.equal('S1');
      });

      it('moves an IED from substation to voltage level and updates XML location', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 20, 10);

        await moveIed('IED1', 10, 10);

        const ied = linkedIed('IED1')!;
        expect(ied.closest('Bay')).to.be.null;
        expect(ied.closest('VoltageLevel')?.getAttribute('name')).to.equal(
          'V1'
        );
      });

      it('moves an IED with its bay when the bay is moved', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 3, 3);

        const oldIedX = iedAttr('IED1', 'x');
        const oldIedY = iedAttr('IED1', 'y');

        await clickGridAt(6, 6);
        expect(sldEditor.placing).to.have.property('tagName', 'Bay');
        await clickGridAt(8, 8);

        const movedBay = element.doc.querySelector('Bay')!;
        expect(sldAttribute(movedBay, 'x')).to.equal('4');
        expect(sldAttribute(movedBay, 'y')).to.equal('4');
        expect(iedAttr('IED1', 'x')).to.equal(oldIedX + 2);
        expect(iedAttr('IED1', 'y')).to.equal(oldIedY + 2);
      });

      it('moves an IED with its voltage level when the voltage level is moved', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        const oldIedX = iedAttr('IED1', 'x');
        const oldIedY = iedAttr('IED1', 'y');

        const voltageLevel = element.doc.querySelector('VoltageLevel')!;
        sldEditor.startPlacing(voltageLevel);
        await settle();

        expect(sldEditor.placing).to.have.property('tagName', 'VoltageLevel');
        sldSubstationEditor.mouseX = 3;
        sldSubstationEditor.mouseY = 3;
        sldSubstationEditor.requestUpdate();
        await sldSubstationEditor.updateComplete;

        const previewRect = sldSubstationEditor.shadowRoot?.querySelector(
          'g.voltagelevel.preview > rect'
        ) as SVGElement;
        expect(previewRect).to.exist;
        previewRect!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await settle();

        const movedVl = element.doc.querySelector('VoltageLevel')!;
        expect(sldAttribute(movedVl, 'x')).to.equal('3');
        expect(sldAttribute(movedVl, 'y')).to.equal('3');
        expect(iedAttr('IED1', 'x')).to.equal(oldIedX + 2);
        expect(iedAttr('IED1', 'y')).to.equal(oldIedY + 2);
      });

      it('moves an IED label independently', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        const ied = linkedIed('IED1')!;
        const oldLx = ied.getAttributeNS(sldNs, 'lx');
        const oldLy = ied.getAttributeNS(sldNs, 'ly');

        const label = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('*[id="label:IED1"] text');
        expect(label).to.exist;

        const [labelX, labelY] = middleOf(label!);
        await sendMouse({ type: 'move', position: [labelX, labelY] });
        (label! as SVGElement).dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
        await settle();

        expect(sldEditor.placingLabel).to.equal(ied);

        await clickGridAt(12, 12);

        expect(ied.getAttributeNS(sldNs, 'lx')).to.not.equal(oldLx);
        expect(ied.getAttributeNS(sldNs, 'ly')).to.not.equal(oldLy);
      });

      it('opens the wizard on IED label middle-click', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        const label = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('*[id="label:IED1"] text');
        expect(label).to.exist;

        label!.dispatchEvent(
          new PointerEvent('auxclick', {
            bubbles: true,
            composed: true,
            button: 1,
          })
        );
        await settle();

        expect(lastCalledWizard).to.equal(
          element.doc.querySelector(':root > IED[name="IED1"]')
        );
      });

      it('hides IEDs when the IED toggle is turned off', async () => {
        // Note: IED toggle button rendering appears to have timing issues in tests
        // This functionality works in the actual application but is difficult to test reliably
        await loadIedDoc();

        // Force a render and wait
        element.requestUpdate();
        await element.updateComplete;
        await settle();
        await aTimeout(100);

        const iedToggle = element.shadowRoot!.querySelector<IconButtonToggle>(
          'mwc-icon-button-toggle[label="Toggle IEDs"]'
        );

        expect(iedToggle).to.exist;
        expect(iedToggle!.on).to.be.true;

        // Place an IED
        await placeIedFromMenu('IED1', 10, 10);
        await settle();

        // Verify IED is visible
        let iedGroup = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('g[id="IEDName-IED1"]');
        expect(iedGroup).to.exist;

        // Click the toggle to hide IEDs
        iedToggle!.click();
        await settle();

        // Verify IED is now hidden
        expect(iedToggle!.on).to.be.false;
        expect(element.showIeds).to.be.false;
        iedGroup = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'g[id="IEDName-IED1"]'
        );
        expect(iedGroup).to.not.exist;

        // Toggle back on
        iedToggle!.click();
        await settle();

        // Verify IED is visible again
        expect(iedToggle!.on).to.be.true;
        expect(element.showIeds).to.be.true;
        iedGroup = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'g[id="IEDName-IED1"]'
        );
        expect(iedGroup).to.exist;
      });

      it('moves an IED via the right-click context menu', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        const iedRect =
          getSldSubstationEditor(element)?.shadowRoot?.querySelector(
            '#IEDName-IED1 rect'
          );
        expect(iedRect).to.exist;

        // Right-click to open context menu
        iedRect!.dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
        await settle();

        // Find and click the Move menu item
        const menu = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'menu#sld-context-menu'
        );
        expect(menu).to.exist;

        const items = Array.from(menu!.querySelectorAll('mwc-list-item'));
        const moveItem = items.find(item =>
          item.textContent?.includes('Move')
        ) as ListItem | undefined;
        expect(moveItem).to.exist;
        moveItem!.click();
        await settle();
        await aTimeout(100);

        // Verify placing mode is active
        expect(sldEditor.placing).to.exist;
        expect(sldEditor.placing!.localName).to.equal('IEDName');

        // Move to new position using preview placement
        sldSubstationEditor.mouseX = 15;
        sldSubstationEditor.mouseY = 15;
        sldSubstationEditor.requestUpdate();
        await sldSubstationEditor.updateComplete;

        const previewRect = sldSubstationEditor.shadowRoot?.querySelector(
          'g.ied.preview rect'
        ) as SVGElement;
        expect(previewRect).to.exist;
        previewRect!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await settle();

        expect(iedAttr('IED1', 'x')).to.equal(15);
        expect(iedAttr('IED1', 'y')).to.equal(15);
      });

      it('removes an IED from the SLD via right-click menu', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        // Verify IED is visible
        let iedGroup = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('g[id="IEDName-IED1"]');
        expect(iedGroup).to.exist;

        const iedRect =
          getSldSubstationEditor(element)?.shadowRoot?.querySelector(
            '#IEDName-IED1 rect'
          );
        expect(iedRect).to.exist;

        // Right-click to open context menu
        iedRect!.dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
        await settle();

        // Find and click the "Remove from SLD" menu item
        const menu = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'menu#sld-context-menu'
        );
        expect(menu).to.exist;

        const items = Array.from(menu!.querySelectorAll('mwc-list-item'));
        const removeItem = items.find(item =>
          item.textContent?.includes('Remove from SLD')
        ) as ListItem | undefined;
        expect(removeItem).to.exist;
        removeItem!.click();
        await settle();

        // Verify IED element still exists in document
        const sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
        expect(sclIed).to.exist;

        // Verify IED is no longer visible in SVG
        iedGroup = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'g[id="IEDName-IED1"]'
        );
        expect(iedGroup).to.not.exist;
      });

      it('deletes an IED via right-click menu', async () => {
        await loadIedDoc();
        await placeIedFromMenu('IED1', 10, 10);

        // Verify IED exists
        let sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
        expect(sclIed).to.exist;

        const iedRect =
          getSldSubstationEditor(element)?.shadowRoot?.querySelector(
            '#IEDName-IED1 rect'
          );
        expect(iedRect).to.exist;

        // Right-click to open context menu
        iedRect!.dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
        await settle();

        // Find and click the "Delete IED" menu item
        const menu = getSldSubstationEditor(element)?.shadowRoot?.querySelector(
          'menu#sld-context-menu'
        );
        expect(menu).to.exist;

        const items = Array.from(menu!.querySelectorAll('mwc-list-item'));
        const deleteItem = items.find(item =>
          item.textContent?.includes('Delete IED')
        ) as ListItem | undefined;
        expect(deleteItem).to.exist;
        deleteItem!.click();
        await settle();

        // Verify IED element is removed from document
        sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
        expect(sclIed).to.not.exist;

        // Verify IED is no longer visible in SVG
        const iedGroup = getSldSubstationEditor(
          element
        )?.shadowRoot?.querySelector('g[id="IEDName-IED1"]');
        expect(iedGroup).to.not.exist;
      });
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
      expect(sldEditor)
        .property('resizingBR')
        .to.have.property('tagName', 'Bay');
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
      expect(sldEditor)
        .property('resizingBR')
        .to.have.property('tagName', 'Bay');
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
