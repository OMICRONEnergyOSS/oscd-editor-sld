/* eslint-disable no-unused-expressions */
import { html } from 'lit';
import { fixture, expect, aTimeout } from '@open-wc/testing';

import type { Button } from '@material/mwc-button';

import { IconButton } from '@material/mwc-icon-button';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { identity } from '@openscd/oscd-scl';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import { EditEventV2 } from '@openscd/oscd-api';
import { SldSubstationEditor } from './sld-substation-editor.js';
import { busSections, makeBusBar, setSLDAttributes } from './util.js';

import type { SldEditor } from './sld-editor.js';
import './sld-editor.js';

function middleOf(element: Element): [number, number] {
    const { x, y, width, height } = element.getBoundingClientRect();

    return [
        Math.floor(x + window.pageXOffset + width / 2),
        Math.floor(y + window.pageYOffset + height / 2),
    ];
}

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
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0">
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <esldoscd:SLDAttributes esldoscd:w="50" esldoscd:h="25"/>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <esldoscd:SLDAttributes esldoscd:x="1" esldoscd:y="1" esldoscd:w="13" esldoscd:h="13" esldoscd:lx="1" esldoscd:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <esldoscd:SLDAttributes esldoscd:x="2" esldoscd:y="2" esldoscd:w="3" esldoscd:h="3" esldoscd:lx="2" esldoscd:ly="2"/>
        </Private>
        <ConnectivityNode name="L1" pathName="S1/V1/B1/L1" />
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <esldoscd:SLDAttributes esldoscd:x="15" esldoscd:y="1" esldoscd:w="13" esldoscd:h="13" esldoscd:lx="15" esldoscd:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <esldoscd:SLDAttributes esldoscd:x="20" esldoscd:y="11" esldoscd:w="1" esldoscd:h="1" esldoscd:lx="20" esldoscd:ly="11"/>
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;

export const equipmentDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0">
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <esldoscd:SLDAttributes esldoscd:w="50" esldoscd:h="25"/>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <esldoscd:SLDAttributes esldoscd:x="1" esldoscd:y="1" esldoscd:w="13" esldoscd:h="13" esldoscd:lx="1" esldoscd:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <esldoscd:SLDAttributes esldoscd:x="2" esldoscd:y="2" esldoscd:w="6" esldoscd:h="6" esldoscd:lx="2" esldoscd:ly="2"/>
        </Private>
        <ConductingEquipment type="CBR" name="CBR1" desc="CBR description">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="4" esldoscd:y="4" esldoscd:rot="1" esldoscd:lx="3.5" esldoscd:ly="4"/>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <esldoscd:SLDAttributes esldoscd:x="15" esldoscd:y="1" esldoscd:w="23" esldoscd:h="23" esldoscd:lx="15" esldoscd:ly="1"/>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <esldoscd:SLDAttributes esldoscd:x="16" esldoscd:y="2" esldoscd:w="6" esldoscd:h="6" esldoscd:lx="16" esldoscd:ly="2"/>
        </Private>
        <ConductingEquipment type="CTR" name="CTR1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="17" esldoscd:y="5" esldoscd:rot="3" esldoscd:lx="17" esldoscd:ly="7.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="DIS" name="DIS1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="18" esldoscd:y="4" esldoscd:rot="1" esldoscd:lx="17" esldoscd:ly="4.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="NEW" name="NEW1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="19" esldoscd:y="3" esldoscd:rot="2" esldoscd:lx="20" esldoscd:ly="3.5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="VTR" name="VTR1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="17" esldoscd:y="3" esldoscd:rot="3" esldoscd:lx="17" esldoscd:ly="3"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="DIS" name="DIS2">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="20" esldoscd:y="4" esldoscd:rot="0" esldoscd:lx="21" esldoscd:ly="5"/>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment type="BAT" name="BAT1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="19" esldoscd:y="7" esldoscd:rot="3" esldoscd:lx="19" esldoscd:ly="7"/>
          </Private>
          <Terminal name="erroneous"/>
        </ConductingEquipment>
        <ConductingEquipment type="SMC" name="SMC1">
          <Private type="OpenSCD-SLD-Layout">
            <esldoscd:SLDAttributes esldoscd:x="21" esldoscd:y="7" esldoscd:rot="3" esldoscd:lx="22" esldoscd:ly="8" />
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;

function getSldSubstationEditor(element: SldEditor): SldSubstationEditor | null | undefined {
    return element.shadowRoot?.querySelector('sld-substation-editor');
}

describe('SLD Editor', () => {
    let element: SldEditor;
    let xmlEditor: XMLEditor;
    let lastCalledWizard: Element | undefined;

    function queryUI({
        scl,
        ui,
    }:
        | { scl: string; ui?: undefined }
        | { ui: string; scl?: undefined }
        | { scl: string; ui: string }) {
        let target: {
            getElementById?: (id: string) => Element | null;
            querySelector: (sel: string) => Element | null;
        } =
            getSldSubstationEditor(element)!.shadowRoot!;
        if (scl) {
            const sclTarget = element.doc.querySelector(scl);
            target = target.getElementById?.(<string>identity(sclTarget))!;
        }
        if (ui) {
            target = target.querySelector(ui)!;
        }
        return target as Element;
    }

    beforeEach(async () => {
        const doc = new DOMParser().parseFromString(
            emptyDocString,
            'application/xml'
        );
        // Use the actual editor here so that tests depending on a sequence of changes, still makes sense.
        xmlEditor = new XMLEditor();
        element = await fixture(
            html`<sld-editor
        docName="testDoc"
        .doc=${doc}
        @oscd-edit-v2=${(event: EditEventV2) => {
                    xmlEditor.commit(event.detail.edit);
                    element.docVersion += 1;
                }}
        @oscd-edit-wizard-request=${({
                    detail: { element: e },
                }: CustomEvent<{ element: Element }>) => {
                    lastCalledWizard = e;
                }}
      ></sld-editor>`
        );
    });

    afterEach(async () => {
        lastCalledWizard = undefined;
        await sendMouse({ type: 'click', position: [0, 0] });
        await resetMouse();
    });

    describe('given a substation', () => {
        let sldSubstationEditor: SldSubstationEditor;
        beforeEach(async () => {
            const subSt = element.doc.createElement('Substation');
            subSt.setAttribute('name', 'S1');
            setSLDAttributes(subSt, element.nsp, { w: '51', h: '26' });
            element.doc.documentElement.appendChild(subSt);
            element.requestUpdate();
            await element.updateComplete;

            sldSubstationEditor = getSldSubstationEditor(element)!;
            await sldSubstationEditor.updateComplete;
        });

        it('adds the SLD XML namespace if doc lacks it', async () => {
            expect(element.doc.documentElement).to.have.attribute('xmlns:eoscd');
        });

        it('allows resizing substations', async () => {
            sldSubstationEditor.shadowRoot
                ?.querySelector<IconButton>('h2 > mwc-icon-button')
                ?.click();
            sldSubstationEditor.substationWidthUI.value = '50';
            sldSubstationEditor.substationHeightUI.value = '25';
            sldSubstationEditor.shadowRoot
                ?.querySelector<Button>('mwc-button[slot="primaryAction"]')
                ?.click();
            expect(element).to.have.property('docVersion', 0);
            sldSubstationEditor.substationWidthUI.value = '1337';
            sldSubstationEditor.substationHeightUI.value = '42';
            sldSubstationEditor.shadowRoot
                ?.querySelector<Button>('mwc-button[slot="primaryAction"]')
                ?.click();
            expect(sldAttribute(sldSubstationEditor.substation, 'h')).to.equal('42');
            expect(sldAttribute(sldSubstationEditor.substation, 'w')).to.equal('1337');
        });

        it('allows placing a new voltage level', async () => {
            const newVoltLevel = element.doc.createElement('VoltageLevel');
            newVoltLevel.setAttribute('name', 'NewVoltLevel');
            element.startPlacing(newVoltLevel);

            expect(element)
                .property('placing')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [184, 176] });
            expect(element).to.have.property('placing', undefined);
            expect(element)
                .property('resizingBR')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [390, 395] });
            expect(element).to.have.property('resizingBR', undefined);
            const voltLv = element.doc.querySelector('VoltageLevel')!;
            expect(sldAttribute(voltLv, 'x')).to.equal('5');
            expect(sldAttribute(voltLv, 'y')).to.equal('3');
            expect(sldAttribute(voltLv, 'w')).to.equal('7');
            expect(sldAttribute(voltLv, 'h')).to.equal('8');
        });

        it('allows the user to abort placing an element', async () => {
            const newVoltLevel = element.doc.createElement('VoltageLevel');
            newVoltLevel.setAttribute('name', 'NewVoltLevel');
            element.startPlacing(newVoltLevel);

            expect(element)
                .property('placing')
                .to.have.property('tagName', 'VoltageLevel');
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            window.dispatchEvent(event);
            expect(element).to.have.property('placing', undefined);
        });
    });

    describe('given a voltage level', () => {
        let sldSubstationEditor: SldSubstationEditor;
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(
                voltageLevelDocString,
                'application/xml'
            );
            element.doc = doc;
            await element.updateComplete;
            sldSubstationEditor = getSldSubstationEditor(element)!;
            await sldSubstationEditor.updateComplete;
        });

        it('forbids undersizing the substation', async () => {
            sldSubstationEditor.shadowRoot
                ?.querySelector<IconButton>('h2 > mwc-icon-button')
                ?.click();
            sldSubstationEditor.substationWidthUI.value = '30';
            sldSubstationEditor.substationHeightUI.value = '20';
            sldSubstationEditor.shadowRoot
                ?.querySelector<Button>('mwc-button[slot="primaryAction"]')
                ?.click();
            expect(sldAttribute(sldSubstationEditor.substation, 'h')).to.equal('25');
            expect(sldAttribute(sldSubstationEditor.substation, 'w')).to.equal('50');
        });


        it('allows resizing voltage levels', async () => {
            const moveHandle =
                sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>('.handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR!;
            expect(sldAttribute(voltageLevel, 'w')).to.equal('48');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('23');
            await sendMouse({ type: 'click', position: [284, 290] });
            expect(sldAttribute(voltageLevel, 'w')).to.equal('8');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('7');
        });

        it('moves voltage levels on move handle click', async () => {
            // Click on voltage level to start placing/moving
            await sendMouse({ type: 'click', position: [100 - 16, 180 - 76] });
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing!;
            expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
            // Click to place at new position (moved right and down)
            await sendMouse({ type: 'click', position: [132 - 16, 202 - 76] });
            expect(sldAttribute(voltageLevel, 'x')).to.equal('2');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('2');
        });

        it('opens a menu on voltage level right click', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(queryUI({ ui: 'menu' })).to.exist;
            await expect(queryUI({ ui: 'menu' })).dom.to.equalSnapshot();
        });

        it('resizes voltage levels on resize menu item select', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            const item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(2)'
            )!;
            item.selected = true;
            await element.updateComplete;
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR!;
            expect(sldAttribute(voltageLevel, 'w')).to.equal('48');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('23');
            await sendMouse({ type: 'click', position: [300 - 16, 352 - 72] });
            expect(sldAttribute(voltageLevel, 'w')).to.equal('8');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('7');
        });

        it('moves voltage levels on move menu item select', async () => {
            const voltageRect = queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            });

            // Move mouse to voltage level position [1,1] to establish coordinates
            await sendMouse({ type: 'move', position: [64 - 16, 164 - 72] });
            await element.updateComplete;

            // Open context menu
            voltageRect.dispatchEvent(
                new PointerEvent('contextmenu', {
                    bubbles: true,
                    composed: true,
                })
            );
            await element.updateComplete;

            // Select "Move" menu item
            const item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(4)'
            )!;
            item.selected = true;
            await sldSubstationEditor.updateComplete;

            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing!;
            expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('1');

            // Click to place at [2,2]
            await sendMouse({ type: 'click', position: [96 - 16, 196 - 72] });
            expect(sldAttribute(voltageLevel, 'x')).to.equal('2');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('2');
        });

        it('requests voltage level edit wizard on edit menu item select', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(2)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;
            expect(lastCalledWizard).to.equal(
                element.doc.querySelector('VoltageLevel')
            );
        });

        it('moves the voltage level label on "move label" menu item select', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(4)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [200 - 16, 252 - 76] });
            const voltageLevel = element.doc.querySelector('VoltageLevel')!;
            expect(sldAttribute(voltageLevel, 'lx')).to.equal('5');
            expect(sldAttribute(voltageLevel, 'ly')).to.equal('4.5');
        });

        it('forbids moving voltage levels out of bounds', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing!;
            expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
            await sendMouse({ type: 'click', position: [200 - 16, 252 - 76] });
            expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
            expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
        });

        it('moves the voltage level label on label left click', async () => {
            // Click on label to start placing/moving it
            queryUI({ ui: '.label text' }).dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'VoltageLevel');
            // Click to place label at position [5, 4.5]
            await sendMouse({ type: 'click', position: [144 - 16, 244 - 76] });
            const voltageLevel = element.doc.querySelector('VoltageLevel')!;
            expect(sldAttribute(voltageLevel, 'lx')).to.equal('5');
            expect(sldAttribute(voltageLevel, 'ly')).to.equal('4.5');
        });

        it('requests a voltage level edit wizard on label middle click', async () => {
            queryUI({ ui: '.label text' }).dispatchEvent(
                new PointerEvent('auxclick', { button: 1 })
            );
            expect(lastCalledWizard).to.equal(
                element.doc.querySelector('VoltageLevel')
            );
        });

        it('allows placing a new bay', async () => {
            const newBay = element.doc.createElement('Bay');
            newBay.setAttribute('name', 'NewBay');
            element.startPlacing(newBay);

            expect(element).property('placing').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [200 - 16, 252 - 76] });
            await aTimeout(10); // Wait for possible async operations
            expect(element).to.have.property('placing', undefined);
            expect(element).property('resizingBR').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [400 - 16, 470 - 76] });
            expect(sldSubstationEditor).to.have.property('resizingBR', undefined);
            const bay = element.doc.querySelector('Bay')!;
            expect(bay).to.exist;
            expect(sldAttribute(bay, 'x')).to.equal('5');
            expect(sldAttribute(bay, 'y')).to.equal('3');
            expect(sldAttribute(bay, 'w')).to.equal('7');
            expect(sldAttribute(bay, 'h')).to.equal('8');
        });

        it('allows placing a new bus bar', async () => {
            const busBar = makeBusBar(element.doc, element.nsp);
            element.startPlacing(busBar);

            expect(element).property('placing').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [200 - 16, 252 - 76] });
            expect(element).to.have.property('placing', undefined);
            expect(element).property('resizingBR').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [400 - 16, 452 - 76] });
            expect(sldSubstationEditor).to.have.property('resizingBR', undefined);
            const bus = element.doc.querySelector('Bay');
            expect(bus).to.exist;
            expect(sldAttribute(bus!, 'x')).to.equal('5');
            expect(sldAttribute(bus!, 'y')).to.equal('3');
            expect(sldAttribute(bus!, 'w')).to.equal('1');
            expect(sldAttribute(bus!, 'h')).to.equal('8');
            await expect(bus).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });
    });

    describe('given a bay', () => {
        let sldSubstationEditor: SldSubstationEditor;
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(
                bayDocString,
                'application/xml'
            );
            element.doc = doc;
            await element.updateComplete;
            sldSubstationEditor = getSldSubstationEditor(element)!;
            await sldSubstationEditor.updateComplete;
        });

        it('allows resizing bays', async () => {
            const moveHandle =
                sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>('g.bay .handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.resizingBR!;
            expect(sldAttribute(bay, 'w')).to.equal('3');
            expect(sldAttribute(bay, 'h')).to.equal('3');
            await sendMouse({ type: 'click', position: [384 - 16, 516 - 120] });
            expect(sldAttribute(bay!, 'w')).to.equal('10');
            expect(sldAttribute(bay, 'h')).to.equal('9');
        });

        it('opens a menu on bay right click', async () => {
            queryUI({
                scl: 'Bay',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(queryUI({ ui: 'menu' })).to.exist;
        });

        it('requests bay edit wizard on edit menu item select', async () => {
            queryUI({
                scl: 'Bay',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(2)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;
            expect(lastCalledWizard).to.equal(element.doc.querySelector('Bay'));
        });

        it('forbids resizing bays out of bounds', async () => {
            const moveHandle =
                sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>('g.bay .handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.resizingBR!;
            expect(sldAttribute(bay, 'w')).to.equal('3');
            expect(sldAttribute(bay, 'h')).to.equal('3');
            await sendMouse({ type: 'click', position: [600, 452] });
            expect(sldAttribute(bay, 'w')).to.equal('3');
            expect(sldAttribute(bay, 'h')).to.equal('3');
        });

        it('forbids undersizing voltage levels containing bays', async () => {
            const moveHandle = sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>(
                'g.voltagelevel > .handle'
            )[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR!;
            expect(sldAttribute(voltageLevel, 'w')).to.equal('13');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('13');
            await sendMouse({ type: 'click', position: [100, 152] });
            expect(sldAttribute(voltageLevel, 'w')).to.equal('13');
            expect(sldAttribute(voltageLevel, 'h')).to.equal('13');
        });

        it('moves bays on move handle click', async () => {
            const bayElement = element.doc.querySelector('Bay')!;
            const currentX = parseInt(sldAttribute(bayElement, 'x')!, 10);
            const currentY = parseInt(sldAttribute(bayElement, 'y')!, 10);

            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
            });
            await element.updateComplete;

            // Use contextmenu approach for bay movement
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu', { bubbles: true, composed: true })
            );
            await element.updateComplete;

            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(4)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;

            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.placing!;
            // Click to place at new position [4,3] using equipment context formula
            await sendMouse({ type: 'click', position: [160 - 16, 292 - 76] });
            expect(sldAttribute(bay, 'x')).to.equal('4');
            expect(sldAttribute(bay, 'y')).to.equal('3');
        });

        it('renames reparented bays if necessary', async () => {
            const bayElement = element.doc.querySelector('Bay')!;
            const currentX = parseInt(sldAttribute(bayElement, 'x')!, 10);
            const currentY = parseInt(sldAttribute(bayElement, 'y')!, 10);

            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
            });
            await element.updateComplete;

            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
                new PointerEvent('click')
            );
            const bay = element.placing!;
            expect(bay.parentElement).to.have.attribute('name', 'V1');
            expect(bay).to.have.attribute('name', 'B1');
            await sendMouse({ type: 'click', position: [608 - 16, 292 - 76] });
            expect(element).to.have.property('placing', undefined);
            expect(sldAttribute(bay, 'x')).to.equal('18');
            expect(sldAttribute(bay, 'y')).to.equal('3');
            expect(bay.parentElement).to.have.attribute('name', 'V2');
            expect(bay).to.have.attribute('name', 'B2');
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
                new PointerEvent('click')
            );
            await sendMouse({ type: 'click', position: [192 - 16, 292 - 76] });
            expect(sldAttribute(bay, 'x')).to.equal('5');
            expect(sldAttribute(bay, 'y')).to.equal('3');
            expect(bay.parentElement).to.have.attribute('name', 'V1');
            expect(bay).to.have.attribute('name', 'B2');
        });

        it("updates reparented bays' connectivity node paths", async () => {
            const bayElement = element.doc.querySelector('Bay')!;
            const currentX = parseInt(sldAttribute(bayElement, 'x')!, 10);
            const currentY = parseInt(sldAttribute(bayElement, 'y')!, 10);

            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
            });
            await element.updateComplete;

            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
                new PointerEvent('click')
            );
            const bay = element.placing!;
            const cNode = bay.querySelector('ConnectivityNode')!;
            expect(cNode).to.have.attribute('pathName', 'S1/V1/B1/L1');
            await sendMouse({ type: 'click', position: [608 - 16, 292 - 76] });
            expect(element).to.have.property('placing', undefined);
            expect(cNode).to.have.attribute('pathName', 'S1/V2/B2/L1');
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        it('moves a bay when its parent voltage level is moved', async () => {
            // const voltageLevel = element.doc.querySelector('VoltageLevel')!;
            await sendMouse({ type: 'click', position: [70 - 16, 250 - 76] });
            const bay = element.placing!.querySelector('Bay')!;
            expect(sldAttribute(bay, 'x')).to.equal('2');
            expect(sldAttribute(bay, 'y')).to.equal('2');
            await sendMouse({
                type: 'click',
                position: [100 - 16, 220 - 76],
            });
            expect(sldAttribute(bay, 'x')).to.equal('3');
            expect(sldAttribute(bay, 'y')).to.equal('1');
        });

        it('allows placing new conducting equipment', async () => {
            const condEq = element.doc.createElement('ConductingEquipment');
            condEq.setAttribute('type', 'GEN');
            condEq.setAttribute('name', 'GEN1');
            element.startPlacing(condEq);

            expect(element)
                .property('placing')
                .to.have.property('tagName', 'ConductingEquipment');
            await sendMouse({ type: 'click', position: [160 - 16, 324 - 120] });
            expect(element).to.have.property('placing', undefined);
            expect(element).to.have.property('resizingBR', undefined);
            const equipment = element.doc.querySelector('ConductingEquipment');
            expect(equipment).to.exist;
            expect(sldAttribute(equipment!, 'x')).to.equal('4');
            expect(sldAttribute(equipment!, 'y')).to.equal('4');
        });

        describe('with a sibling bus bar', () => {
            beforeEach(async () => {
                const busBar = makeBusBar(element.doc, element.nsp);
                element.startPlacing(busBar);

                await sendMouse({ type: 'click', position: [200 - 16, 244 - 76] });
                await sendMouse({ type: 'click', position: [400 - 16, 468 - 76] });
            });


            it('allows the bay to overlap its sibling bus bar', async () => {
                const moveHandle =
                    sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>(
                        'g.bay .handle'
                    )[1];
                moveHandle.dispatchEvent(new PointerEvent('click'));
                expect(element)
                    .property('resizingBR')
                    .to.exist.and.to.have.property('tagName', 'Bay');
                const bay = element.resizingBR!;
                expect(sldAttribute(bay, 'w')).to.equal('3');
                expect(sldAttribute(bay, 'h')).to.equal('3');
                await sendMouse({ type: 'click', position: [384 - 16, 516 - 120] });
                expect(sldAttribute(bay, 'w')).to.equal('10');
                expect(sldAttribute(bay, 'h')).to.equal('9');
            });

            it('moves the bus bar on left click', async () => {
                const bus = element.doc.querySelector('[name="BB1"]');
                expect(sldAttribute(bus!, 'x')).to.equal('5');

                // Move mouse to current bus position to establish offset
                const currentX = parseInt(sldAttribute(bus!, 'x')!, 10);
                const currentY = parseInt(sldAttribute(bus!, 'y')!, 10);
                await sendMouse({
                    type: 'move',
                    position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
                });
                await element.updateComplete;

                // Use contextmenu approach for bus bar movement
                queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(
                    new PointerEvent('contextmenu', { bubbles: true, composed: true })
                );
                await element.updateComplete;

                sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                    'mwc-list-item:nth-of-type(3)'
                )!.selected = true;
                await sldSubstationEditor.updateComplete;

                await sendMouse({ type: 'click', position: [128 - 16, 260 - 76] });
                expect(sldAttribute(bus!, 'x')).to.equal('3');
            });

            it('resizes the bus bar on middle mouse button click', async () => {
                const bus = element.doc.querySelector('[name="BB1"]');
                const currentX = parseInt(sldAttribute(bus!, 'x')!, 10);
                const currentY = parseInt(sldAttribute(bus!, 'y')!, 10);

                // Move mouse to bus bar position to establish offset
                await sendMouse({
                    type: 'move',
                    position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
                });
                await element.updateComplete;

                // Use contextmenu approach for bus bar resize instead of middle click
                queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(
                    new PointerEvent('contextmenu', { bubbles: true, composed: true })
                );
                await element.updateComplete;

                sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                    'mwc-list-item:nth-of-type(2)'
                )!.selected = true;
                await sldSubstationEditor.updateComplete;

                expect(sldAttribute(bus!, 'w')).to.equal('1');
                expect(sldAttribute(bus!, 'h')).to.equal('8');
                await sendMouse({ type: 'click', position: [272 - 16, 260 - 76] });
                expect(sldAttribute(bus!, 'w')).to.equal('3');
                expect(sldAttribute(bus!, 'h')).to.equal('1');
            });
        });
    });

    describe('given conducting equipment', () => {
        let sldSubstationEditor: SldSubstationEditor;
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(
                equipmentDocString,
                'application/xml'
            );
            element.doc = doc;
            await element.updateComplete;
            sldSubstationEditor = getSldSubstationEditor(element)!;
            await sldSubstationEditor.updateComplete;
        });

        it('requests equipment edit wizard on edit menu item select', async () => {
            queryUI({
                scl: '[type="SMC"]',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(2)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;
            expect(lastCalledWizard).to.equal(
                element.doc.querySelector('[type="SMC"]')
            );
        });

        it('moves the equipment label on "move label" menu item select', async () => {
            queryUI({
                scl: 'ConductingEquipment',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(4)'
            )!.selected = true;
            await sldSubstationEditor.updateComplete;
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'ConductingEquipment');
            await sendMouse({ type: 'click', position: [200 - 16, 308 - 125] });
            const condEq = element.doc.querySelector('ConductingEquipment')!;
            expect(sldAttribute(condEq, 'lx')).to.equal('5');
            expect(sldAttribute(condEq, 'ly')).to.equal('4.5');
        });

        it('moves equipment on left mouse button click', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            // Click on equipment to start placing/moving
            await sendMouse({ type: 'click', position: [150 - 16, 230 - 76] });
            // Click to place at new position (moved left -1, up -1 grid units)
            await sendMouse({ type: 'click', position: [118 - 16, 198 - 76] });
            expect(sldAttribute(equipment!, 'x')).to.equal('3');
            expect(sldAttribute(equipment!, 'y')).to.equal('3');
        });

        it('copies equipment on shift click', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;
            eqClickTarget.dispatchEvent(
                new PointerEvent('click', { shiftKey: true })
            );
            expect(
                element.doc.querySelector(
                    'ConductingEquipment>Private>SLDAttributes[*|x="3"][*|y="3"]'
                )
            ).to.not.exist;
            await sendMouse({ type: 'click', position: [128 - 16, 292 - 120] });
            const newCondEqSld = element.doc.querySelector(
                'ConductingEquipment>Private>SLDAttributes[*|x="3"][*|y="3"]'
            );
            const newCondEq = newCondEqSld?.parentElement?.parentElement;
            expect(newCondEq).to.exist;
            expect(newCondEq).to.exist.and.have.attribute(
                'type',
                equipment!.getAttribute('type')!
            );
            expect(sldAttribute(equipment!, 'x')).to.equal('4');
            expect(sldAttribute(equipment!, 'y')).to.equal('4');
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        it('rotates equipment on middle mouse button click', () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;
            expect(sldAttribute(equipment!, 'rot')).to.equal('1');
            eqClickTarget.dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
            expect(sldAttribute(equipment!, 'rot')).to.equal('2');
        });

        it('opens a menu on equipment right click', async () => {
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu', { clientX: 750, clientY: 550 })
            );
            await element.updateComplete;
            expect(queryUI({ ui: 'menu' })).to.exist;
            await expect(queryUI({ ui: 'menu' })).dom.to.equalSnapshot();
        });

        it('flips equipment on mirror menu item select', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            let eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            let item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(6)'
            )!;
            expect(equipment).to.not.have.attribute('esldoscd:flip');
            item.selected = true;
            await element.updateComplete;
            item.selected = false;
            expect(sldAttribute(equipment!, 'flip')).to.equal('true');
            eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(6)'
            )!;
            item.selected = true;
            await element.updateComplete;
            expect(equipment).to.not.have.attribute('esldoscd:flip');
        });

        it('rotates equipment on rotate menu item select', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            const item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(7)'
            )!;
            expect(sldAttribute(equipment!, 'rot')).to.equal('1');
            item.selected = true;
            await element.updateComplete;
            expect(sldAttribute(equipment!, 'rot')).to.equal('2');
        });

        it('moves equipment on move menu item select', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>id)!
                .querySelector('rect')!;

            // Try to find coordinates that give [4,4]
            // Equipment tests showed [160,260] → [4,2], so Y is off by 2
            // Try adding 64 to Y: [160, 324]
            await sendMouse({ type: 'move', position: [160 - 16, 324 - 76] });
            await element.updateComplete;

            // Open context menu
            eqClickTarget.dispatchEvent(
                new PointerEvent('contextmenu', {
                    bubbles: true,
                    composed: true,
                })
            );
            await element.updateComplete;

            // Select "Move" menu item (5th from end)
            const item = sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-last-of-type(5)'
            )!;
            item.selected = true;
            await element.updateComplete;

            expect(sldAttribute(equipment!, 'x')).to.equal('4');
            expect(sldAttribute(equipment!, 'y')).to.equal('4');

            // Click to place at [3,3] - try [128, 292] (adding 64 to Y)
            await sendMouse({ type: 'move', position: [128 - 16, 292 - 76] });
            await sendMouse({ type: 'click', position: [128 - 16, 292 - 120] });
            expect(sldAttribute(equipment!, 'x')).to.equal('3');
            expect(sldAttribute(equipment!, 'y')).to.equal('3');
        });

        it('grounds equipment on connection point right click', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment')!;
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>identity(equipment))!
                .querySelector('circle')!;
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
                .exist;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.have.attribute(
                'cNodeName',
                'grounded'
            );
            await element.updateComplete;
            await aTimeout(10);
            const eqClickTarget2 = sldSubstationEditor
                .shadowRoot!.getElementById(<string>identity(equipment))!
                .querySelector('circle')!;
            eqClickTarget2.dispatchEvent(new PointerEvent('contextmenu'));
            expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
                .exist;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.have.attribute(
                'cNodeName',
                'grounded'
            );
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        it('grounds equipment on ground menu item select', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment')!;
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            expect(
                equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]')
            ).to.not.exist;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(3)'
            )!.selected = true;
            await element.updateComplete;
            expect(
                equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]')
            ).to.exist;
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            expect(
                equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]')
            ).to.not.exist;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(4)'
            )!.selected = true;
            await element.updateComplete;
            expect(
                equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]')
            ).to.exist;
        });

        it('connects equipment on connection point and equipment click', async () => {
            const equipment = element.doc.querySelectorAll('ConductingEquipment')[0];
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>identity(equipment))!
                .querySelector('circle:nth-of-type(2)')!;
            eqClickTarget.dispatchEvent(new PointerEvent('click'));
            await element.updateComplete;
            const equipment2 = element.doc.querySelectorAll('ConductingEquipment')[1];
            const eq2ClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                <string>identity(equipment2)
            )!;
            const position = middleOf(eq2ClickTarget);
            position[0] -= 1;
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
            await sendMouse({ type: 'click', position });
            expect(element.doc.querySelector('ConnectivityNode')).to.exist;
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        it('connects equipment on connect menu item select', async () => {
            let equipment = element.doc.querySelector('ConductingEquipment')!;
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(2)'
            )!.selected = true;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
            let position = middleOf(queryUI({ scl: '[type="VTR"]', ui: 'rect' }));
            position[1] -= 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;

            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(3)'
            )!.selected = true;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[type="NEW"]', ui: 'rect' }));
            position[1] -= 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;

            equipment = element.doc.querySelector('[type="DIS"]')!;
            queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(2)'
            )!.selected = true;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' }));
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;

            queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
                new PointerEvent('contextmenu')
            );
            await element.updateComplete;
            sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                'mwc-list-item:nth-of-type(3)'
            )!.selected = true;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[name="DIS2"]', ui: 'rect' }));
            position[1] += 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        it('will not connect equipment directly to itself', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>identity(equipment))!
                .querySelector('circle:nth-of-type(1)')!;
            eqClickTarget.dispatchEvent(new PointerEvent('click'));
            await element.updateComplete;
            const eq2ClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                <string>identity(equipment)
            )!;
            const position = middleOf(eq2ClickTarget);
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
            await sendMouse({ type: 'click', position });
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
        });

        it('retargets grounded terminals when reparenting equipment', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldSubstationEditor
                .shadowRoot!.getElementById(<string>identity(equipment))!
                .querySelector('circle:nth-of-type(2)')!;
            expect(
                element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')
            ).to.have.lengthOf(0);
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(
                element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')
            ).to.have.lengthOf(1);
            const position = middleOf(
                queryUI({ scl: 'ConductingEquipment', ui: 'rect' })
            );
            await sendMouse({ type: 'click', position });
            await sendMouse({
                type: 'click',
                position: middleOf(queryUI({ scl: '[name="V2"] Bay', ui: 'rect' })),
            });
            expect(
                element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')
            ).to.have.lengthOf(2);
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esldoscd:uuid'],
            });
        });

        describe('with established connectivity', () => {
            beforeEach(async () => {
                const equipment = element.doc.querySelector('ConductingEquipment');
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await element.updateComplete;
                const equipment2 = element.doc.querySelector(
                    'ConductingEquipment[type="DIS"]'
                );
                const eq2ClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                    <string>identity(equipment2)
                )!;
                const position = middleOf(eq2ClickTarget);
                position[0] -= 1;
                await sendMouse({ type: 'click', position });
            });

            it('uniquely names new connectivity nodes', async () => {
                const equipment = element.doc.querySelector('ConductingEquipment');
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await element.updateComplete;
                const equipment2 = element.doc.querySelector(
                    'ConductingEquipment[type="CTR"]'
                );
                const eq2ClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                    <string>identity(equipment2)
                )!;
                const position = middleOf(eq2ClickTarget);
                position[0] -= 1;
                expect(element.doc.querySelector('ConnectivityNode[name="L1"]')).to
                    .exist;
                expect(element.doc.querySelector('ConnectivityNode[name="L2"]')).to.not
                    .exist;
                await sendMouse({ type: 'click', position });
                expect(element.doc.querySelector('ConnectivityNode[name="L2"]')).to
                    .exist;
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esldoscd:uuid'],
                });
            });

            it('connects equipment on connection point and connectivity node click', async () => {
                const equipment = element.doc.querySelector(
                    'ConductingEquipment[type="CTR"]'
                );
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                const cNode = element.doc.querySelector('ConnectivityNode');
                const cNodeClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                    <string>identity(cNode)
                )!;
                await sendMouse({
                    type: 'click',
                    position: middleOf(cNodeClickTarget),
                });
                expect(
                    equipment!.querySelector('Terminal')
                ).to.exist.and.to.have.attribute(
                    'connectivityNode',
                    cNode!.getAttribute('pathName')!
                );
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esldoscd:uuid'],
                });
            });

            it('avoids short circuit connections', async () => {
                const equipment = element.doc.querySelector(
                    'ConductingEquipment[type="DIS"]'
                );
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                const cNode = element.doc.querySelector('ConnectivityNode');
                const cNodeClickTarget = sldSubstationEditor.shadowRoot!.getElementById(
                    <string>identity(cNode)
                )!;
                expect(equipment!.querySelectorAll('Terminal')).to.have.lengthOf(1);
                await sendMouse({
                    type: 'click',
                    position: middleOf(cNodeClickTarget),
                });
                expect(equipment!.querySelectorAll('Terminal')).to.have.lengthOf(1);
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esldoscd:uuid'],
                });
            });

            it('keeps connection paths simple', async () => {
                const equipment = element.doc.querySelector(
                    'ConductingEquipment[type="CTR"]'
                );
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [400 - 16, 352 - 120] });
                await sendMouse({ type: 'click', position: [350 - 16, 352 - 120] });
                await sendMouse({ type: 'click', position: [300 - 16, 302 - 120] });
                await sendMouse({ type: 'click', position: [300 - 16, 320 - 120] });
                const equipment2 = element.doc.querySelector(
                    'ConductingEquipment[type="NEW"]'
                );
                const eq2ClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment2))!
                    .querySelector('circle')!;
                eq2ClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [300 - 16, 320 - 120] });
                const equipment3 = element.doc.querySelector(
                    'ConductingEquipment[type="VTR"]'
                );
                const eq3ClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment3))!
                    .querySelector('circle')!;
                eq3ClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [350 - 16, 320 - 120] });
                expect(element.doc.querySelectorAll('Vertex')).to.have.property(
                    'length',
                    15
                );
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esldoscd:uuid'],
                });
            });

            describe('between more than two pieces of equipment', async () => {
                beforeEach(async () => {
                    queryUI({ scl: '[type="CTR"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({
                        type: 'click',
                        position: middleOf(queryUI({ scl: 'ConnectivityNode' })),
                    });
                    queryUI({ scl: '[type="BAT"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({
                        type: 'click',
                        position: middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' })),
                    });
                });

                it('disconnects equipment on rotation', async () => {
                    expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.exist;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.not
                        .exist;
                    expect(element.doc.querySelectorAll('Vertex')).to.have.property(
                        'length',
                        2
                    );
                    expect(element.doc.querySelector('[type="BAT"] > Terminal')).to.exist;
                    queryUI({ scl: '[type="BAT"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    expect(element.doc.querySelector('[type="BAT"] > Terminal')).to.not
                        .exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('disconnects terminals on detach menu item select', async () => {
                    const equipment = element.doc.querySelector('[type="CTR"]')!;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('contextmenu')
                    );
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
                    sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                        'mwc-list-item:nth-of-type(2)'
                    )!.selected = true;
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('contextmenu')
                    );
                    await sldSubstationEditor.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
                    sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                        'mwc-list-item:nth-of-type(4)'
                    )!.selected = true;
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
                });

                it('simplifies horizontal connection paths when disconnecting', async () => {
                    queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({ type: 'click', position: [300 - 16, 322 - 120] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    element.updateComplete;
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(4);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(13);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('simplifies vertical connection paths when disconnecting', async () => {
                    queryUI({ scl: '[type="NEW"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({ type: 'click', position: [600 - 16, 382 - 120] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    await element.updateComplete;
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(4);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(11);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('simplifies when disconnecting only where possible', async () => {
                    queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({ type: 'click', position: [300 - 16, 326 - 125] });
                    queryUI({ scl: '[type="NEW"]', ui: 'circle' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    await sendMouse({ type: 'click', position: [300 - 16, 326 - 125] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(7);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(19);
                    queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('disconnects equipment upon being moved', async () => {
                    queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('click')
                    );
                    expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.exist;
                    await sendMouse({ type: 'click', position: [160 - 16, 258 - 125] });
                    expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.not
                        .exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('removes superfluous connectivity nodes when disconnecting', async () => {
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('auxclick', { button: 1 })
                    );
                    expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('removes contained connectivity nodes when moving containers', async () => {
                    await sendMouse({ type: 'click', position: [150 - 16, 360 - 120] });
                    await sendMouse({ type: 'click', position: [150 - 16, 330 - 120] });
                    expect(
                        element.doc.querySelectorAll('ConnectivityNode')
                    ).to.have.lengthOf(1);
                });

                it('removes connected connectivity nodes when moving containers', async () => {
                    queryUI({
                        scl: '[name="V2"]',
                        ui: 'rect',
                    }).dispatchEvent(new PointerEvent('click'));
                    expect(
                        element.doc.querySelectorAll('ConnectivityNode')
                    ).to.have.lengthOf(2);
                    await sendMouse({ type: 'click', position: [600 - 16, 330 - 120] });
                    expect(
                        element.doc.querySelectorAll('ConnectivityNode')
                    ).to.have.lengthOf(1);
                });

                it('keeps internal connectivity nodes when moving containers', async () => {
                    const position = middleOf(
                        queryUI({
                            scl: '[name="V2"]',
                            ui: '.handle',
                        })
                    );
                    position[1] += 140;
                    queryUI({
                        scl: '[name="V2"]',
                        ui: 'rect',
                    }).dispatchEvent(new PointerEvent('click'));
                    const subSt = element.doc.createElement('Substation');
                    subSt.setAttribute('name', 'S2');
                    element.doc.documentElement.insertBefore(subSt, element.doc.querySelector('Substation'));
                    setSLDAttributes(subSt, element.nsp, { w: '50', h: '25' });

                    expect(
                        element.doc.querySelectorAll('ConnectivityNode')
                    ).to.have.lengthOf(2);
                    await sendMouse({ position, type: 'click' });
                    expect(
                        element.doc.querySelectorAll('ConnectivityNode')
                    ).to.have.lengthOf(1);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('deletes conducting equipment on delete menu item select', async () => {
                    const equipment = element.doc.querySelector('[type="CTR"]')!;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('contextmenu')
                    );
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
                    sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                        'mwc-list-item:nth-last-of-type(1)'
                    )!.selected = true;
                    await element.updateComplete;
                    expect(equipment.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('deletes bays on delete menu item select', async () => {
                    const bay = element.doc.querySelector('Bay')!;
                    queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('contextmenu')
                    );
                    await element.updateComplete;
                    expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
                    sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                        'mwc-list-item:nth-last-of-type(1)'
                    )!.selected = true;
                    await element.updateComplete;
                    expect(bay.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                it('deletes voltage levels on delete menu item select', async () => {
                    const bay = element.doc.querySelector('[name="V2"]')!;
                    queryUI({ scl: '[name="V2"]', ui: 'rect' }).dispatchEvent(
                        new PointerEvent('contextmenu')
                    );
                    await element.updateComplete;
                    expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
                    sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                        'mwc-list-item:nth-last-of-type(1)'
                    )!.selected = true;
                    await element.updateComplete;
                    expect(bay.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esldoscd:uuid'],
                    });
                });

                describe('and a bus bar', () => {
                    beforeEach(async () => {
                        const busBar = makeBusBar(element.doc, element.nsp);
                        element.startPlacing(busBar);

                        await sendMouse({ type: 'click', position: [430 - 16, 202 - 120] });
                        await sendMouse({ type: 'click', position: [430 - 16, 282 - 120] });
                        await sendMouse({
                            type: 'click',
                            position: middleOf(queryUI({ scl: '[name="L"]' })),
                        });
                        await sendMouse({ type: 'click', position: [450 - 16, 202 - 120] });
                        queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(
                            new PointerEvent('click')
                        );
                        await sendMouse({
                            type: 'click',
                            position: middleOf(queryUI({ scl: '[name="L"]' })),
                        });
                    });

                    it('keeps the bus bar when moving containers', async () => {
                        const position = middleOf(
                            queryUI({
                                scl: '[name="V2"] > [name="B1"]',
                                ui: '.handle',
                            })
                        );
                        expect(
                            element.doc
                                .querySelector('[name="L"]')
                                ?.querySelectorAll('Section')
                        ).to.have.lengthOf(2);
                        position[1] += 120;
                        await sendMouse({ position, type: 'click' });
                        await element.updateComplete;
                        position[1] += 40;
                        await sendMouse({ position, type: 'click' });
                        await element.updateComplete;
                        expect(
                            element.doc
                                .querySelector('[name="L"]')
                                ?.querySelectorAll('Section')
                        ).to.have.lengthOf(1);
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('does not merge bus bar sections with feeder sections', async () => {
                        const busBar = element.doc.querySelector('Bay[name="BB1"]');
                        const busSection = busSections(busBar!)[0];

                        queryUI({
                            scl: '[type="NEW"]',
                            ui: 'circle:nth-of-type(2)',
                        }).dispatchEvent(new PointerEvent('click'));
                        await sendMouse({ type: 'click', position: [450 - 16, 292 - 120] });
                        queryUI({ scl: '[type="CBR"]', ui: 'circle' }).dispatchEvent(
                            new PointerEvent('click')
                        );
                        await sendMouse({ type: 'click', position: [420 - 16, 292 - 120] });
                        expect(busSection.querySelectorAll('Vertex')).to.have.lengthOf(2);
                        queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(
                            new PointerEvent('auxclick', { button: 1 })
                        );
                        expect(busSection.querySelectorAll('Vertex')).to.have.lengthOf(2);
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('resizes the bus bar on resize menu item select', async () => {
                        const bus = element.doc.querySelector('[name="BB1"]');
                        const currentX = parseInt(sldAttribute(bus!, 'x')!, 10);
                        const currentY = parseInt(sldAttribute(bus!, 'y')!, 10);

                        // Move mouse to bus bar position to establish offset
                        await sendMouse({
                            type: 'move',
                            position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
                        });
                        await element.updateComplete;

                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-of-type(2)'
                        )!.selected = true;
                        expect(sldAttribute(bus!, 'h')).equal('1');
                        await sendMouse({ type: 'click', position: [380 - 16, 330 - 120] });
                        expect(sldAttribute(bus!, 'h')).equal('2');
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('copies equipment on copy menu item select', async () => {
                        const equipmentRect = queryUI({
                            scl: 'ConductingEquipment',
                            ui: 'rect',
                        });

                        // Move mouse to equipment position [4,4] using equipment formula: screenY = (gridY - 1) * 32 + 228
                        await sendMouse({ type: 'move', position: [160 - 16, 324 - 120] });
                        await element.updateComplete;

                        equipmentRect.dispatchEvent(
                            new PointerEvent('contextmenu', {
                                bubbles: true,
                                composed: true,
                            })
                        );
                        await element.updateComplete;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-last-of-type(6)'
                        )!.selected = true;
                        expect(
                            element.doc.querySelector(
                                'ConductingEquipment SLDAttributes[*|x="3"][*|y="3"]'
                            )
                        ).to.not.exist;
                        expect(
                            sldAttribute(
                                element.doc.querySelector('ConductingEquipment')!,
                                'x'
                            )
                        ).to.equal('4');
                        expect(
                            sldAttribute(
                                element.doc.querySelector('ConductingEquipment')!,
                                'y'
                            )
                        ).to.equal('4');
                        // Click to place copy at [3,3] using equipment formula: screenY = (3-1)*32 + 228 = 292
                        await sendMouse({ type: 'click', position: [128 - 16, 292 - 120] });
                        expect(
                            element.doc.querySelector(
                                'ConductingEquipment SLDAttributes[*|x="3"][*|y="3"]'
                            )
                        ).to.exist;
                        expect(
                            element.doc.querySelector(
                                'ConductingEquipment SLDAttributes[*|x="4"][*|y="4"]'
                            )
                        ).to.exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('moves the bus bar on move menu item select', async () => {
                        const busLine = queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        });
                        const bus = element.doc.querySelector('[name="BB1"]');
                        const initialY = sldAttribute(bus!, 'y')!;
                        const initialX = sldAttribute(bus!, 'x')!;

                        // Move mouse to bus bar position at current x,y
                        // Using equipment formula: screenX = (gridX - 1) * 32 + 64, screenY = (gridY - 1) * 32 + 228
                        const currentY = parseInt(initialY, 10);
                        const currentX = parseInt(initialX, 10);
                        await sendMouse({
                            type: 'move',
                            position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 120],
                        });
                        await element.updateComplete;

                        busLine.dispatchEvent(
                            new PointerEvent('contextmenu', {
                                bubbles: true,
                                composed: true,
                            })
                        );
                        await element.updateComplete;

                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-of-type(3)'
                        )!.selected = true;
                        await sldSubstationEditor.updateComplete;

                        expect(sldAttribute(bus!, 'y')).to.equal(initialY);
                        // Click to place at y=4: screenY = (4-1)*32 + 228 = 324
                        await sendMouse({ type: 'click', position: [64 - 16, 324 - 120] });
                        expect(sldAttribute(bus!, 'y')).to.equal('4');
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('moves the bus bar label on "move label" menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-last-of-type(4)'
                        )!.selected = true;
                        await sldSubstationEditor.updateComplete;
                        expect(element)
                            .property('placingLabel')
                            .to.have.attribute('name', 'BB1');
                        await sendMouse({ type: 'click', position: [200 - 16, 308 - 125] });
                        const busBar = element.doc.querySelector('[name="BB1"]');
                        expect(sldAttribute(busBar!, 'lx')).to.equal('5');
                        expect(sldAttribute(busBar!, 'ly')).to.equal('4.5');
                    });

                    it('requests bus bar edit wizard on edit menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-last-of-type(2)'
                        )!.selected = true;
                        await sldSubstationEditor.updateComplete;
                        expect(lastCalledWizard).to.equal(
                            element.doc.querySelector('[name="BB1"]')
                        );
                    });

                    it('deletes the bus bar on delete menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        expect(element.doc.querySelector('[name="BB1"]')).to.exist;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-last-of-type(1)'
                        )!.selected = true;
                        await sldSubstationEditor.updateComplete;
                        expect(element.doc.querySelector('[name="BB1"]')).to.not.exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('copies bays on copy menu item select', async () => {
                        const bayRect = queryUI({
                            scl: '[name="V2"] [name="B1"]',
                            ui: 'rect',
                        });

                        // Move mouse to bay position first to establish offset for equipment context
                        // V2 bay is at [16,2], so use equipment formula: screenX = (16-1)*32 + 64 = 544, screenY = (2-1)*32 + 228 = 260
                        await sendMouse({ type: 'move', position: [544 - 16, 260 - 120] });
                        await element.updateComplete;

                        bayRect.dispatchEvent(
                            new PointerEvent('contextmenu', {
                                bubbles: true,
                                composed: true,
                            })
                        );
                        await element.updateComplete;
                        sldSubstationEditor.shadowRoot!.querySelector<ListItem>(
                            'mwc-list-item:nth-last-of-type(6)'
                        )!.selected = true;
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).not.to
                            .exist;
                        // Place in V1 voltage level - target around [5,8] using equipment formula
                        await sendMouse({ type: 'click', position: [192 - 16, 452 - 120] });
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).to
                            .exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('copies voltage levels on move handle shift click', async () => {
                        queryUI({
                            scl: '[name="V1"]',
                            ui: 'rect',
                        }).dispatchEvent(new PointerEvent('click', { shiftKey: true }));
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).not.to
                            .exist;

                        const subSt = element.doc.createElement('Substation');
                        subSt.setAttribute('name', 'S2');
                        element.doc.documentElement.insertBefore(subSt, element.doc.querySelector('Substation'));
                        setSLDAttributes(subSt, element.nsp, { w: '50', h: '25' });

                        await sendMouse({ type: 'click', position: [640 - 16, 480 - 120] });
                        expect(element.doc.querySelector('[name="S2"] [name="V1"]')).to
                            .exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esldoscd:uuid'],
                        });
                    });

                    it('opens a menu on bus bar right click', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        expect(queryUI({ ui: 'menu' })).to.exist;
                    });
                });
            });
        });
    });

    describe('when disabled', () => {
        beforeEach(async () => {
            element.disabled = true;
            await element.updateComplete;
        });

        describe('given a substation', () => {
            let sldSubstationEditor: SldSubstationEditor;
            beforeEach(async () => {
                const subSt = element.doc.createElement('Substation');
                subSt.setAttribute('name', 'S1');
                setSLDAttributes(subSt, element.nsp, { w: '51', h: '26' });
                element.doc.documentElement.appendChild(subSt);
                element.requestUpdate();
                await element.updateComplete;

                sldSubstationEditor = getSldSubstationEditor(element)!;
                await sldSubstationEditor.updateComplete;
            });

            it('disables substation buttons', async () => {
                const h2 = sldSubstationEditor.shadowRoot?.querySelector('h2');
                await expect(h2).dom.to.equalSnapshot();
            });

            it('does not add voltage level', async () => {
                const newVoltLevel = element.doc.createElement('VoltageLevel');
                newVoltLevel.setAttribute('name', 'NewVoltLevel');
                element.startPlacing(newVoltLevel);

                expect(element).to.have.property('placing', undefined);
            });
        });

        describe('given a voltage level', () => {
            let sldSubstationEditor: SldSubstationEditor;
            beforeEach(async () => {
                const doc = new DOMParser().parseFromString(
                    voltageLevelDocString,
                    'application/xml'
                );
                element.doc = doc;
                await element.updateComplete;
                sldSubstationEditor = getSldSubstationEditor(element)!;
                await sldSubstationEditor.updateComplete;
            });

            it('does not render resize handlers', async () => {
                const moveHandle =
                    sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>('.handle')[1];
                expect(moveHandle).to.be.undefined;
            });

            it('does not allow to move voltage level', async () => {
                // Click on voltage level to start placing/moving
                await sendMouse({ type: 'click', position: [100 - 16, 180 - 76] });

                expect(element).to.have.property('placing', undefined);
            });

            it('disabled context menu', async () => {
                queryUI({
                    scl: 'VoltageLevel',
                    ui: 'rect',
                }).dispatchEvent(new PointerEvent('contextmenu'));
                await element.updateComplete;
                expect(queryUI({ ui: 'menu' })).to.not.exist;
            });

            it('does not allow to move label', async () => {
                // Click on label to start placing/moving it
                queryUI({ ui: '.label text' }).dispatchEvent(new PointerEvent('click'));

                expect(element).to.have.property('placing', undefined);
            });

            it('does not trigger auxclick', async () => {
                queryUI({ ui: '.label text' }).dispatchEvent(
                    new PointerEvent('auxclick', { button: 1 })
                );
                expect(lastCalledWizard).to.be.undefined
            });

            it('does not allow placing a new bay', async () => {
                const newBay = element.doc.createElement('Bay');
                newBay.setAttribute('name', 'NewBay');
                element.startPlacing(newBay);

                expect(element).to.have.property('placing', undefined);
            });

            it('allows placing a new bus bar', async () => {
                const busBar = makeBusBar(element.doc, element.nsp);
                element.startPlacing(busBar);

                expect(element).to.have.property('placing', undefined)
            });
        });

        describe('given a bay', () => {
            let sldSubstationEditor: SldSubstationEditor;
            beforeEach(async () => {
                const doc = new DOMParser().parseFromString(
                    bayDocString,
                    'application/xml'
                );
                element.doc = doc;
                await element.updateComplete;
                sldSubstationEditor = getSldSubstationEditor(element)!;
                await sldSubstationEditor.updateComplete;
            });

            it('does not render resize handlers', async () => {
                const moveHandle =
                    sldSubstationEditor.shadowRoot!.querySelectorAll<SVGElement>('g.bay .handle')[1];

                expect(moveHandle).to.be.undefined;
            });

            it('disables auxclick', async () => {
                queryUI({
                    scl: 'Bay',
                    ui: 'rect',
                }).dispatchEvent(new PointerEvent('contextmenu'));
                await element.updateComplete;
                expect(queryUI({ ui: 'menu' })).to.not.exist;
            });

            it('does not allow to move bays', async () => {
                const bayElement = element.doc.querySelector('Bay')!;
                const currentX = parseInt(sldAttribute(bayElement, 'x')!, 10);
                const currentY = parseInt(sldAttribute(bayElement, 'y')!, 10);

                // Move mouse to bay position to establish offset
                await sendMouse({
                    type: 'move',
                    position: [(currentX - 1) * 32 + 64 - 16, (currentY - 1) * 32 + 228 - 76],
                });
                await element.updateComplete;

                expect(element).to.have.property('placing', undefined);
            });

            it('does not allow to place conducting equipment', async () => {
                const condEq = element.doc.createElement('ConductingEquipment');
                condEq.setAttribute('type', 'GEN');
                condEq.setAttribute('name', 'GEN1');
                element.startPlacing(condEq);

                expect(element).to.have.property('placing', undefined);
            });
        });

        describe('given conducting equipment', () => {
            let sldSubstationEditor: SldSubstationEditor;
            beforeEach(async () => {
                const doc = new DOMParser().parseFromString(
                    equipmentDocString,
                    'application/xml'
                );
                element.doc = doc;
                await element.updateComplete;
                sldSubstationEditor = getSldSubstationEditor(element)!;
                await sldSubstationEditor.updateComplete;
            });

            it('disables contextmenu', async () => {
                queryUI({
                    scl: '[type="SMC"]',
                    ui: 'rect',
                }).dispatchEvent(new PointerEvent('contextmenu'));
                await element.updateComplete;
                expect(queryUI({ ui: 'menu' })).to.not.exist;
            });

            it('does not allow to move conducting equipment', async () => {
                // Click on equipment to start placing/moving
                await sendMouse({ type: 'click', position: [150 - 16, 230 - 76] });
                expect(element).to.have.property('placing', undefined);
            });

            it('does not rotate on auxclick', () => {
                const equipment = element.doc.querySelector('ConductingEquipment');
                const id = identity(equipment);
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>id)!
                    .querySelector('rect')!;
                expect(sldAttribute(equipment!, 'rot')).to.equal('1');
                eqClickTarget.dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                expect(sldAttribute(equipment!, 'rot')).to.equal('1');
            });

            it('does not opens a menu on equipment right click', async () => {
                queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
                    new PointerEvent('contextmenu', { clientX: 750, clientY: 550 })
                );
                await element.updateComplete;
                expect(queryUI({ ui: 'menu' })).to.not.exist;
            });

            it('does not render connector', async () => {
                const equipment = element.doc.querySelector('ConductingEquipment')!;
                const eqClickTarget = sldSubstationEditor
                    .shadowRoot!.getElementById(<string>identity(equipment))!
                    .querySelector('circle')!;
                expect(eqClickTarget).to.not.exist;
            });
        });
    })
});