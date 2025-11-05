/* eslint-disable no-unused-expressions */
import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { handleEdit } from '@openscd/open-scd-core';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { identity } from '@openscd/oscd-scl';
import OscdEditorSld from './oscd-editor-sld.js';
function middleOf(element) {
    const { x, y, width, height } = element.getBoundingClientRect();
    return [
        Math.floor(x + window.pageXOffset + width / 2),
        Math.floor(y + window.pageYOffset + height / 2),
    ];
}
customElements.define('oscd-editor-sld', OscdEditorSld);
export const emptyDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL">
</SCL>`;
export const voltageLevelDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns:smth="https://transpower.co.nz/SCL/SSD/SLD/v0" xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B">
  <Substation name="S1" smth:w="50" smth:h="25">
    <VoltageLevel name="V1" smth:x="1" smth:y="1" smth:lx="1" smth:ly="1" smth:w="48" smth:h="23" desc="some description"/>
  </Substation>
</SCL>
`;
export const bayDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0">
  <Substation name="S1" esld:w="50" esld:h="25">
    <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:w="13" esld:h="13" esld:lx="1" esld:ly="1">
      <Bay name="B1" esld:x="2" esld:y="2" esld:w="3" esld:h="3" esld:lx="2" esld:ly="2">
        <ConnectivityNode name="L1" pathName="S1/V1/B1/L1"/>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2" esld:x="15" esld:y="1" esld:w="13" esld:h="13" esld:lx="15" esld:ly="1">
      <Bay name="B1" esld:x="20" esld:y="11" esld:w="1" esld:h="1" esld:lx="20" esld:ly="11"/>
    </VoltageLevel>
  </Substation>
</SCL>
`;
export const equipmentDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0">
  <Substation name="S1" esld:w="50" esld:h="25">
    <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:w="13" esld:h="13" esld:lx="1" esld:ly="1">
      <Bay name="B1" esld:x="2" esld:y="2" esld:w="6" esld:h="6" esld:lx="2" esld:ly="2">
        <ConductingEquipment type="CBR" name="CBR1" desc="CBR description" esld:x="4" esld:y="4" esld:rot="1" esld:lx="3.5" esld:ly="4"/>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2" esld:x="15" esld:y="1" esld:w="23" esld:h="23" esld:lx="15" esld:ly="1">
      <Bay name="B1" esld:x="16" esld:y="2" esld:w="6" esld:h="6" esld:lx="16" esld:ly="2">
        <ConductingEquipment type="CTR" name="CTR1" esld:x="17" esld:y="5" esld:rot="3" esld:lx="17" esld:ly="7.5"/>
        <ConductingEquipment type="DIS" name="DIS1" esld:x="18" esld:y="4" esld:rot="1" esld:lx="17" esld:ly="4.5"/>
        <ConductingEquipment type="NEW" name="NEW1" esld:x="19" esld:y="3" esld:rot="2" esld:lx="20" esld:ly="3.5"/>
        <ConductingEquipment type="VTR" name="VTR1" esld:x="17" esld:y="3" esld:rot="3" esld:lx="17" esld:ly="3"/>
        <ConductingEquipment type="DIS" name="DIS2" esld:x="20" esld:y="4" esld:rot="0" esld:lx="21" esld:ly="5"/>
        <ConductingEquipment type="BAT" name="BAT1" esld:x="19" esld:y="7" esld:rot="3" esld:lx="19" esld:ly="7">
          <Terminal name="erroneous"/>
        </ConductingEquipment>
        <ConductingEquipment type="SMC" name="SMC1" esld:x="21" esld:y="7" esld:rot="3" esld:lx="22" esld:ly="8" />
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
describe('SLD Editor', () => {
    let element;
    let lastCalledWizard;
    function queryUI({ scl, ui, }) {
        var _a;
        let target = element.shadowRoot.querySelector('sld-editor').shadowRoot;
        if (scl) {
            const sclTarget = element.doc.querySelector(scl);
            target = (_a = target.getElementById) === null || _a === void 0 ? void 0 : _a.call(target, identity(sclTarget));
        }
        if (ui) {
            target = target.querySelector(ui);
        }
        return target;
    }
    beforeEach(async () => {
        const doc = new DOMParser().parseFromString(emptyDocString, 'application/xml');
        element = await fixture(html `<oscd-editor-sld
        docName="testDoc"
        .doc=${doc}
        @oscd-edit=${({ detail }) => {
            handleEdit(detail);
            element.editCount += 1;
        }}
        @oscd-edit-wizard-request=${({ detail: { element: e }, }) => {
            lastCalledWizard = e;
        }}
      ></oscd-editor-sld>`);
    });
    afterEach(async () => {
        lastCalledWizard = undefined;
        await sendMouse({ type: 'click', position: [0, 0] });
        await resetMouse();
    });
    it('shows a placeholder message while no document is loaded', async () => {
        var _a;
        element = await fixture(html `<oscd-editor-sld></oscd-editor-sld>`);
        expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('p')).to.contain.text('SCL');
    });
    it('adds the SLD XML namespace if doc lacks it', async () => {
        expect(element.doc.documentElement).to.have.attribute('xmlns:esld');
    });
    it('adds a substation on add button click', async () => {
        var _a;
        expect(element.doc.querySelector('Substation')).to.not.exist;
        (_a = element
            .shadowRoot.querySelector('[label="Add Substation"]')) === null || _a === void 0 ? void 0 : _a.click();
        expect(element.doc.querySelector('Substation')).to.exist;
    });
    it('gives new substations unique names', async () => {
        var _a, _b;
        (_a = element
            .shadowRoot.querySelector('[label="Add Substation"]')) === null || _a === void 0 ? void 0 : _a.click();
        (_b = element
            .shadowRoot.querySelector('[label="Add Substation"]')) === null || _b === void 0 ? void 0 : _b.click();
        const [name1, name2] = Array.from(element.doc.querySelectorAll('Substation')).map(substation => substation.getAttribute('name'));
        expect(name1).not.to.equal(name2);
    });
    it('does not zoom out past a positive minimum value', async () => {
        var _a;
        for (let i = 0; i < 20; i += 1)
            (_a = element
                .shadowRoot.querySelector('[icon="zoom_out"]')) === null || _a === void 0 ? void 0 : _a.click();
        expect(element.gridSize).to.be.greaterThan(0);
    });
    describe('given a substation', () => {
        beforeEach(async () => {
            var _a;
            (_a = element
                .shadowRoot.querySelector('[label="Add Substation"]')) === null || _a === void 0 ? void 0 : _a.click();
            await element.updateComplete;
        });
        it('zooms in on zoom in button click', async () => {
            var _a;
            const initial = element.gridSize;
            (_a = element
                .shadowRoot.querySelector('[icon="zoom_in"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element.gridSize).to.be.greaterThan(initial);
        });
        it('zooms out on zoom out button click', async () => {
            var _a;
            const initial = element.gridSize;
            (_a = element
                .shadowRoot.querySelector('[icon="zoom_out"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element.gridSize).to.be.lessThan(initial);
        });
        it('allows resizing substations', async () => {
            var _a, _b, _c, _d, _e, _f;
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            (_b = (_a = sldEditor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('h2 > mwc-icon-button')) === null || _b === void 0 ? void 0 : _b.click();
            sldEditor.substationWidthUI.value = '50';
            sldEditor.substationHeightUI.value = '25';
            (_d = (_c = sldEditor.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]')) === null || _d === void 0 ? void 0 : _d.click();
            expect(element).to.have.property('editCount', 0);
            sldEditor.substationWidthUI.value = '1337';
            sldEditor.substationHeightUI.value = '42';
            (_f = (_e = sldEditor.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]')) === null || _f === void 0 ? void 0 : _f.click();
            expect(sldEditor.substation).to.have.attribute('esld:h', '42');
            expect(sldEditor.substation).to.have.attribute('esld:w', '1337');
        });
        it('allows placing a new voltage level', async () => {
            var _a;
            (_a = element
                .shadowRoot.querySelector('[label="Add VoltageLevel"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element)
                .property('placing')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [200, 252] });
            expect(element).to.have.property('placing', undefined);
            expect(element)
                .property('resizingBR')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [400, 452] });
            expect(element).to.have.property('resizingBR', undefined);
            expect(element.doc.querySelector('VoltageLevel')).to.exist;
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('x', '5');
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('y', '3');
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('w', '7');
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('h', '8');
        });
        it('gives new voltage levels unique names', async () => {
            var _a, _b;
            (_a = element
                .shadowRoot.querySelector('[label="Add VoltageLevel"]')) === null || _a === void 0 ? void 0 : _a.click();
            await sendMouse({ type: 'click', position: [200, 252] });
            await sendMouse({ type: 'click', position: [300, 352] });
            (_b = element
                .shadowRoot.querySelector('[label="Add VoltageLevel"]')) === null || _b === void 0 ? void 0 : _b.click();
            await sendMouse({ type: 'click', position: [350, 402] });
            await sendMouse({ type: 'click', position: [450, 502] });
            const [name1, name2] = Array.from(element.doc.querySelectorAll('VoltageLevel')).map(substation => substation.getAttribute('name'));
            expect(name1).not.to.equal(name2);
            expect(name1).to.exist;
            expect(name2).to.exist;
        });
        it('allows the user to abort placing an element', async () => {
            var _a;
            (_a = element
                .shadowRoot.querySelector('[label="Add VoltageLevel"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element)
                .property('placing')
                .to.have.property('tagName', 'VoltageLevel');
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            window.dispatchEvent(event);
            expect(element).to.have.property('placing', undefined);
        });
    });
    describe('given a voltage level', () => {
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(voltageLevelDocString, 'application/xml');
            element.doc = doc;
            await element.updateComplete;
        });
        it('forbids undersizing the substation', async () => {
            var _a, _b, _c, _d;
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            (_b = (_a = sldEditor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('h2 > mwc-icon-button')) === null || _b === void 0 ? void 0 : _b.click();
            sldEditor.substationWidthUI.value = '30';
            sldEditor.substationHeightUI.value = '20';
            (_d = (_c = sldEditor.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="primaryAction"]')) === null || _d === void 0 ? void 0 : _d.click();
            expect(sldEditor.substation).to.have.attribute('smth:h', '25');
            expect(sldEditor.substation).to.have.attribute('smth:w', '50');
        });
        it('allows resizing voltage levels', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const moveHandle = sldEditor.shadowRoot.querySelectorAll('.handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR;
            expect(voltageLevel).to.have.attribute('smth:w', '48');
            expect(voltageLevel).to.have.attribute('smth:h', '23');
            await sendMouse({ type: 'click', position: [300, 352] });
            expect(voltageLevel).to.have.attribute('smth:w', '8');
            expect(voltageLevel).to.have.attribute('smth:h', '7');
        });
        it('moves voltage levels on move handle click', async () => {
            // Click on voltage level to start placing/moving
            await sendMouse({ type: 'click', position: [100, 180] });
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing;
            expect(voltageLevel).to.have.attribute('smth:x', '1');
            expect(voltageLevel).to.have.attribute('smth:y', '1');
            // Click to place at new position (moved right and down)
            await sendMouse({ type: 'click', position: [132, 202] });
            expect(voltageLevel).to.have.attribute('smth:x', '2');
            expect(voltageLevel).to.have.attribute('smth:y', '2');
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
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)');
            item.selected = true;
            await element.updateComplete;
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR;
            expect(voltageLevel).to.have.attribute('smth:w', '48');
            expect(voltageLevel).to.have.attribute('smth:h', '23');
            await sendMouse({ type: 'click', position: [300, 352] });
            expect(voltageLevel).to.have.attribute('smth:w', '8');
            expect(voltageLevel).to.have.attribute('smth:h', '7');
        });
        it('moves voltage levels on move menu item select', async () => {
            const voltageRect = queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            });
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            // Move mouse to voltage level position [1,1] to establish coordinates
            await sendMouse({ type: 'move', position: [64, 164] });
            await element.updateComplete;
            // Open context menu
            voltageRect.dispatchEvent(new PointerEvent('contextmenu', {
                bubbles: true,
                composed: true,
            }));
            await element.updateComplete;
            // Select "Move" menu item
            const item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(4)');
            item.selected = true;
            await sldEditor.updateComplete;
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing;
            expect(voltageLevel).to.have.attribute('smth:x', '1');
            expect(voltageLevel).to.have.attribute('smth:y', '1');
            // Click to place at [2,2]
            await sendMouse({ type: 'click', position: [96, 196] });
            expect(voltageLevel).to.have.attribute('smth:x', '2');
            expect(voltageLevel).to.have.attribute('smth:y', '2');
        });
        it('requests voltage level edit wizard on edit menu item select', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(2)').selected = true;
            await sldEditor.updateComplete;
            expect(lastCalledWizard).to.equal(element.doc.querySelector('VoltageLevel'));
        });
        it('moves the voltage level label on "move label" menu item select', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(4)').selected = true;
            await sldEditor.updateComplete;
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'VoltageLevel');
            await sendMouse({ type: 'click', position: [200, 252] });
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('smth:lx', '5');
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('smth:ly', '4.5');
        });
        it('forbids moving voltage levels out of bounds', async () => {
            queryUI({
                scl: 'VoltageLevel',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.placing;
            expect(voltageLevel).to.have.attribute('smth:x', '1');
            expect(voltageLevel).to.have.attribute('smth:y', '1');
            await sendMouse({ type: 'click', position: [200, 252] });
            expect(voltageLevel).to.have.attribute('smth:x', '1');
            expect(voltageLevel).to.have.attribute('smth:y', '1');
        });
        it('moves the voltage level label on label left click', async () => {
            // Click on label to start placing/moving it
            queryUI({ ui: '.label text' }).dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'VoltageLevel');
            // Click to place label at position [5, 4.5]
            await sendMouse({ type: 'click', position: [144, 244] });
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('smth:lx', '5');
            expect(element.doc.querySelector('VoltageLevel')).to.have.attribute('smth:ly', '4.5');
        });
        it('requests a voltage level edit wizard on label middle click', async () => {
            queryUI({ ui: '.label text' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
            expect(lastCalledWizard).to.equal(element.doc.querySelector('VoltageLevel'));
        });
        it('allows placing a new bay', async () => {
            var _a;
            (_a = element.shadowRoot.querySelector('[label="Add Bay"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element).property('placing').to.have.property('tagName', 'Bay');
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await sendMouse({ type: 'click', position: [200, 252] });
            expect(element).to.have.property('placing', undefined);
            expect(element).property('resizingBR').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [400, 500] });
            expect(sldEditor).to.have.property('resizingBR', undefined);
            const bay = element.doc.querySelector('Bay');
            expect(bay).to.exist;
            expect(bay).to.have.attribute('x', '5');
            expect(bay).to.have.attribute('y', '3');
            expect(bay).to.have.attribute('w', '7');
            expect(bay).to.have.attribute('h', '8');
        });
        it('allows placing a new bus bar', async () => {
            var _a;
            (_a = element
                .shadowRoot.querySelector('[label="Add Bus Bar"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element).property('placing').to.have.property('tagName', 'Bay');
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await sendMouse({ type: 'click', position: [200, 252] });
            expect(element).to.have.property('placing', undefined);
            expect(element).property('resizingBR').to.have.property('tagName', 'Bay');
            await sendMouse({ type: 'click', position: [400, 452] });
            expect(sldEditor).to.have.property('resizingBR', undefined);
            const bus = element.doc.querySelector('Bay');
            expect(bus).to.exist;
            expect(bus).to.have.attribute('x', '5');
            expect(bus).to.have.attribute('y', '3');
            expect(bus).to.have.attribute('smth:w', '1');
            expect(bus).to.have.attribute('h', '8');
            await expect(bus).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
    });
    describe('given a bay', () => {
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(bayDocString, 'application/xml');
            element.doc = doc;
            await element.updateComplete;
        });
        it('allows resizing bays', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const moveHandle = sldEditor.shadowRoot.querySelectorAll('g.bay .handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.resizingBR;
            expect(bay).to.have.attribute('esld:w', '3');
            expect(bay).to.have.attribute('esld:h', '3');
            await sendMouse({ type: 'click', position: [384, 516] });
            expect(bay).to.have.attribute('esld:w', '10');
            expect(bay).to.have.attribute('esld:h', '9');
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
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(2)').selected = true;
            await sldEditor.updateComplete;
            expect(lastCalledWizard).to.equal(element.doc.querySelector('Bay'));
        });
        it('forbids resizing bays out of bounds', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const moveHandle = sldEditor.shadowRoot.querySelectorAll('g.bay .handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.resizingBR;
            expect(bay).to.have.attribute('esld:w', '3');
            expect(bay).to.have.attribute('esld:h', '3');
            await sendMouse({ type: 'click', position: [600, 452] });
            expect(bay).to.have.attribute('esld:w', '3');
            expect(bay).to.have.attribute('esld:h', '3');
        });
        it('forbids undersizing voltage levels containing bays', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const moveHandle = sldEditor.shadowRoot.querySelectorAll('g.voltagelevel > .handle')[1];
            moveHandle.dispatchEvent(new PointerEvent('click'));
            expect(element)
                .property('resizingBR')
                .to.exist.and.to.have.property('tagName', 'VoltageLevel');
            const voltageLevel = element.resizingBR;
            expect(voltageLevel).to.have.attribute('esld:w', '13');
            expect(voltageLevel).to.have.attribute('esld:h', '13');
            await sendMouse({ type: 'click', position: [100, 152] });
            expect(voltageLevel).to.have.attribute('esld:w', '13');
            expect(voltageLevel).to.have.attribute('esld:h', '13');
        });
        it('moves bays on move handle click', async () => {
            const bayElement = element.doc.querySelector('Bay');
            const currentX = parseInt(bayElement.getAttribute('esld:x'));
            const currentY = parseInt(bayElement.getAttribute('esld:y'));
            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
            });
            await element.updateComplete;
            // Use contextmenu approach for bay movement
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu', { bubbles: true, composed: true }));
            await element.updateComplete;
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(4)').selected = true;
            await sldEditor.updateComplete;
            expect(element)
                .property('placing')
                .to.exist.and.to.have.property('tagName', 'Bay');
            const bay = element.placing;
            // Click to place at new position [4,3] using equipment context formula
            await sendMouse({ type: 'click', position: [160, 292] });
            expect(bay).to.have.attribute('esld:x', '4');
            expect(bay).to.have.attribute('esld:y', '3');
        });
        it('renames reparented bays if necessary', async () => {
            const bayElement = element.doc.querySelector('Bay');
            const currentX = parseInt(bayElement.getAttribute('esld:x'));
            const currentY = parseInt(bayElement.getAttribute('esld:y'));
            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
            });
            await element.updateComplete;
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(new PointerEvent('click'));
            const bay = element.placing;
            expect(bay.parentElement).to.have.attribute('name', 'V1');
            expect(bay).to.have.attribute('name', 'B1');
            await sendMouse({ type: 'click', position: [608, 292] });
            expect(element).to.have.property('placing', undefined);
            expect(bay).to.have.attribute('esld:x', '18');
            expect(bay).to.have.attribute('esld:y', '3');
            expect(bay.parentElement).to.have.attribute('name', 'V2');
            expect(bay).to.have.attribute('name', 'B2');
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(new PointerEvent('click'));
            await sendMouse({ type: 'click', position: [192, 292] });
            expect(bay).to.have.attribute('esld:x', '5');
            expect(bay).to.have.attribute('esld:y', '3');
            expect(bay.parentElement).to.have.attribute('name', 'V1');
            expect(bay).to.have.attribute('name', 'B2');
        });
        it("updates reparented bays' connectivity node paths", async () => {
            const bayElement = element.doc.querySelector('Bay');
            const currentX = parseInt(bayElement.getAttribute('esld:x'));
            const currentY = parseInt(bayElement.getAttribute('esld:y'));
            // Move mouse to bay position to establish offset
            await sendMouse({
                type: 'move',
                position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
            });
            await element.updateComplete;
            queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(new PointerEvent('click'));
            const bay = element.placing;
            const cNode = bay.querySelector('ConnectivityNode');
            expect(cNode).to.have.attribute('pathName', 'S1/V1/B1/L1');
            await sendMouse({ type: 'click', position: [608, 292] });
            expect(element).to.have.property('placing', undefined);
            expect(cNode).to.have.attribute('pathName', 'S1/V2/B2/L1');
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        it('moves a bay when its parent voltage level is moved', async () => {
            const voltageLevel = element.doc.querySelector('VoltageLevel');
            await sendMouse({
                type: 'click',
                position: [70, 250],
            });
            const bay = element.placing.querySelector('Bay');
            expect(bay).to.have.attribute('esld:x', '2');
            expect(bay).to.have.attribute('esld:y', '2');
            await sendMouse({
                type: 'click',
                position: [100, 220],
            });
            expect(bay).to.have.attribute('esld:x', '3');
            expect(bay).to.have.attribute('esld:y', '1');
        });
        it('allows placing new conducting equipment', async () => {
            var _a;
            (_a = element.shadowRoot.querySelector('[label="Add GEN"]')) === null || _a === void 0 ? void 0 : _a.click();
            expect(element)
                .property('placing')
                .to.have.property('tagName', 'ConductingEquipment');
            await sendMouse({ type: 'click', position: [160, 324] });
            expect(element).to.have.property('placing', undefined);
            expect(element).to.have.property('resizingBR', undefined);
            const equipment = element.doc.querySelector('ConductingEquipment');
            expect(equipment).to.exist;
            expect(equipment).to.have.attribute('x', '4');
            expect(equipment).to.have.attribute('y', '4');
        });
        describe('with a sibling bus bar', () => {
            beforeEach(async () => {
                var _a;
                (_a = element
                    .shadowRoot.querySelector('[label="Add Bus Bar"]')) === null || _a === void 0 ? void 0 : _a.click();
                await sendMouse({ type: 'click', position: [200, 244] });
                await sendMouse({ type: 'click', position: [400, 468] });
            });
            it('allows the bay to overlap its sibling bus bar', async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const moveHandle = sldEditor.shadowRoot.querySelectorAll('g.bay .handle')[1];
                moveHandle.dispatchEvent(new PointerEvent('click'));
                expect(element)
                    .property('resizingBR')
                    .to.exist.and.to.have.property('tagName', 'Bay');
                const bay = element.resizingBR;
                expect(bay).to.have.attribute('esld:w', '3');
                expect(bay).to.have.attribute('esld:h', '3');
                await sendMouse({ type: 'click', position: [384, 516] });
                expect(bay).to.have.attribute('esld:w', '10');
                expect(bay).to.have.attribute('esld:h', '9');
            });
            it('moves the bus bar on left click', async () => {
                const bus = element.doc.querySelector('[name="BB1"]');
                expect(bus).to.have.attribute('x', '5');
                // Move mouse to current bus position to establish offset
                const currentX = parseInt(bus.getAttribute('x'));
                const currentY = parseInt(bus.getAttribute('y'));
                await sendMouse({
                    type: 'move',
                    position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
                });
                await element.updateComplete;
                // Use contextmenu approach for bus bar movement
                queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(new PointerEvent('contextmenu', { bubbles: true, composed: true }));
                await element.updateComplete;
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(3)').selected = true;
                await sldEditor.updateComplete;
                await sendMouse({ type: 'click', position: [128, 260] });
                expect(bus).to.have.attribute('x', '3');
            });
            it('resizes the bus bar on middle mouse button click', async () => {
                const bus = element.doc.querySelector('[name="BB1"]');
                const currentX = parseInt(bus.getAttribute('x'));
                const currentY = parseInt(bus.getAttribute('y'));
                // Move mouse to bus bar position to establish offset
                await sendMouse({
                    type: 'move',
                    position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
                });
                await element.updateComplete;
                // Use contextmenu approach for bus bar resize instead of middle click
                queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(new PointerEvent('contextmenu', { bubbles: true, composed: true }));
                await element.updateComplete;
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)').selected = true;
                await sldEditor.updateComplete;
                expect(bus).to.have.attribute('esld:w', '1');
                expect(bus).to.have.attribute('h', '8');
                await sendMouse({ type: 'click', position: [272, 260] });
                expect(bus).to.have.attribute('esld:w', '3');
                expect(bus).to.have.attribute('h', '1');
            });
        });
    });
    describe('given conducting equipment', () => {
        beforeEach(async () => {
            const doc = new DOMParser().parseFromString(equipmentDocString, 'application/xml');
            element.doc = doc;
            await element.updateComplete;
        });
        it('requests equipment edit wizard on edit menu item select', async () => {
            queryUI({
                scl: '[type="SMC"]',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(2)').selected = true;
            await sldEditor.updateComplete;
            expect(lastCalledWizard).to.equal(element.doc.querySelector('[type="SMC"]'));
        });
        it('moves the equipment label on "move label" menu item select', async () => {
            queryUI({
                scl: 'ConductingEquipment',
                ui: 'rect',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(4)').selected = true;
            await sldEditor.updateComplete;
            expect(element)
                .property('placingLabel')
                .to.have.property('tagName', 'ConductingEquipment');
            await sendMouse({ type: 'click', position: [200, 308] });
            expect(element.doc.querySelector('ConductingEquipment')).to.have.attribute('esld:lx', '5');
            expect(element.doc.querySelector('ConductingEquipment')).to.have.attribute('esld:ly', '4.5');
        });
        it('moves equipment on left mouse button click', async () => {
            const equipment = element.doc.querySelector('ConductingEquipment');
            // Click on equipment to start placing/moving
            await sendMouse({ type: 'click', position: [150, 230] });
            // Click to place at new position (moved left -1, up -1 grid units)
            await sendMouse({ type: 'click', position: [118, 198] });
            expect(equipment).to.have.attribute('esld:x', '3');
            expect(equipment).to.have.attribute('esld:y', '3');
        });
        it('copies equipment on shift click', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            eqClickTarget.dispatchEvent(new PointerEvent('click', { shiftKey: true }));
            expect(element.doc.querySelector('ConductingEquipment[*|x="3"][*|y="3"]'))
                .to.not.exist;
            await sendMouse({ type: 'click', position: [128, 292] });
            expect(element.doc.querySelector('ConductingEquipment[*|x="3"][*|y="3"]')).to.exist.and.have.attribute('type', equipment.getAttribute('type'));
            expect(equipment).to.have.attribute('esld:x', '4');
            expect(equipment).to.have.attribute('esld:y', '4');
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        it('rotates equipment on middle mouse button click', () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            expect(equipment).to.have.attribute('esld:rot', '1');
            eqClickTarget.dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
            expect(equipment).to.have.attribute('esld:rot', '2');
        });
        it('opens a menu on equipment right click', async () => {
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu', { clientX: 750, clientY: 550 }));
            await element.updateComplete;
            expect(queryUI({ ui: 'menu' })).to.exist;
            await expect(queryUI({ ui: 'menu' })).dom.to.equalSnapshot();
        });
        it('flips equipment on mirror menu item select', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            let eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            let item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(6)');
            expect(equipment).to.not.have.attribute('esld:flip');
            item.selected = true;
            await element.updateComplete;
            item.selected = false;
            expect(equipment).to.have.attribute('esld:flip', 'true');
            eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(6)');
            item.selected = true;
            await element.updateComplete;
            expect(equipment).to.not.have.attribute('esld:flip');
        });
        it('rotates equipment on rotate menu item select', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            const item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(7)');
            expect(equipment).to.have.attribute('esld:rot', '1');
            item.selected = true;
            await element.updateComplete;
            expect(equipment).to.have.attribute('esld:rot', '2');
        });
        it('moves equipment on move menu item select', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const id = identity(equipment);
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(id)
                .querySelector('rect');
            // Try to find coordinates that give [4,4]
            // Equipment tests showed [160,260] → [4,2], so Y is off by 2
            // Try adding 64 to Y: [160, 324]
            await sendMouse({ type: 'move', position: [160, 324] });
            await element.updateComplete;
            // Open context menu
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu', {
                bubbles: true,
                composed: true,
            }));
            await element.updateComplete;
            // Select "Move" menu item (5th from end)
            const item = sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(5)');
            item.selected = true;
            await element.updateComplete;
            expect(equipment).to.have.attribute('esld:x', '4');
            expect(equipment).to.have.attribute('esld:y', '4');
            // Click to place at [3,3] - try [128, 292] (adding 64 to Y)
            await sendMouse({ type: 'click', position: [128, 292] });
            expect(equipment).to.have.attribute('esld:x', '3');
            expect(equipment).to.have.attribute('esld:y', '3');
        });
        it('grounds equipment on connection point right click', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(identity(equipment))
                .querySelector('circle');
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
                .exist;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.have.attribute('cNodeName', 'grounded');
            await element.updateComplete;
            const eqClickTarget2 = sldEditor
                .shadowRoot.getElementById(identity(equipment))
                .querySelector('circle');
            eqClickTarget2.dispatchEvent(new PointerEvent('contextmenu'));
            expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
                .exist;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.have.attribute('cNodeName', 'grounded');
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        it('grounds equipment on ground menu item select', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]')).to.not.exist;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(3)').selected = true;
            await element.updateComplete;
            expect(equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]')).to.exist;
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]')).to.not.exist;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(4)').selected = true;
            await element.updateComplete;
            expect(equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]')).to.exist;
        });
        it('connects equipment on connection point and equipment click', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(identity(equipment))
                .querySelector('circle:nth-of-type(2)');
            eqClickTarget.dispatchEvent(new PointerEvent('click'));
            await element.updateComplete;
            const equipment2 = element.doc.querySelector('ConductingEquipment:nth-child(2)');
            const eq2ClickTarget = sldEditor.shadowRoot.getElementById(identity(equipment2));
            const position = middleOf(eq2ClickTarget);
            position[0] -= 1;
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
            await sendMouse({ type: 'click', position });
            expect(element.doc.querySelector('ConnectivityNode')).to.exist;
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        it('connects equipment on connect menu item select', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            let equipment = element.doc.querySelector('ConductingEquipment');
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)').selected = true;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
            let position = middleOf(queryUI({ scl: '[type="VTR"]', ui: 'rect' }));
            position[1] -= 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
            queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(3)').selected = true;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[type="NEW"]', ui: 'rect' }));
            position[1] -= 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
            equipment = element.doc.querySelector('[type="DIS"]');
            queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)').selected = true;
            expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' }));
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
            queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(3)').selected = true;
            expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
            position = middleOf(queryUI({ scl: '[name="DIS2"]', ui: 'rect' }));
            position[1] += 1;
            await sendMouse({ type: 'click', position });
            expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        it('will not connect equipment directly to itself', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(identity(equipment))
                .querySelector('circle:nth-of-type(1)');
            eqClickTarget.dispatchEvent(new PointerEvent('click'));
            await element.updateComplete;
            const eq2ClickTarget = sldEditor.shadowRoot.getElementById(identity(equipment));
            const position = middleOf(eq2ClickTarget);
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
            await sendMouse({ type: 'click', position });
            expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
        });
        it('retargets grounded terminals when reparenting equipment', async () => {
            const sldEditor = element.shadowRoot.querySelector('sld-editor');
            const equipment = element.doc.querySelector('ConductingEquipment');
            const eqClickTarget = sldEditor
                .shadowRoot.getElementById(identity(equipment))
                .querySelector('circle:nth-of-type(2)');
            expect(element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')).to.have.lengthOf(0);
            eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')).to.have.lengthOf(1);
            const position = middleOf(queryUI({ scl: 'ConductingEquipment', ui: 'rect' }));
            await sendMouse({ type: 'click', position });
            await sendMouse({
                type: 'click',
                position: middleOf(queryUI({ scl: '[name="V2"] Bay', ui: 'rect' })),
            });
            expect(element.doc.querySelectorAll('ConnectivityNode[name="grounded"]')).to.have.lengthOf(2);
            await expect(element.doc.documentElement).dom.to.equalSnapshot({
                ignoreAttributes: ['esld:uuid'],
            });
        });
        describe('with established connectivity', () => {
            beforeEach(async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const equipment = element.doc.querySelector('ConductingEquipment');
                const eqClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment))
                    .querySelector('circle');
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await element.updateComplete;
                const equipment2 = element.doc.querySelector('ConductingEquipment[type="DIS"]');
                const eq2ClickTarget = sldEditor.shadowRoot.getElementById(identity(equipment2));
                const position = middleOf(eq2ClickTarget);
                position[0] -= 1;
                await sendMouse({ type: 'click', position });
            });
            it('uniquely names new connectivity nodes', async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const equipment = element.doc.querySelector('ConductingEquipment');
                const eqClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment))
                    .querySelector('circle');
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await element.updateComplete;
                const equipment2 = element.doc.querySelector('ConductingEquipment[type="CTR"]');
                const eq2ClickTarget = sldEditor.shadowRoot.getElementById(identity(equipment2));
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
                    ignoreAttributes: ['esld:uuid'],
                });
            });
            it('connects equipment on connection point and connectivity node click', async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const equipment = element.doc.querySelector('ConductingEquipment[type="CTR"]');
                const eqClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment))
                    .querySelector('circle');
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                const cNode = element.doc.querySelector('ConnectivityNode');
                const cNodeClickTarget = sldEditor.shadowRoot.getElementById(identity(cNode));
                await sendMouse({
                    type: 'click',
                    position: middleOf(cNodeClickTarget),
                });
                expect(equipment.querySelector('Terminal')).to.exist.and.to.have.attribute('connectivityNode', cNode.getAttribute('pathName'));
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esld:uuid'],
                });
            });
            it('avoids short circuit connections', async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const equipment = element.doc.querySelector('ConductingEquipment[type="DIS"]');
                const eqClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment))
                    .querySelector('circle');
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                const cNode = element.doc.querySelector('ConnectivityNode');
                const cNodeClickTarget = sldEditor.shadowRoot.getElementById(identity(cNode));
                expect(equipment.querySelectorAll('Terminal')).to.have.lengthOf(1);
                await sendMouse({
                    type: 'click',
                    position: middleOf(cNodeClickTarget),
                });
                expect(equipment.querySelectorAll('Terminal')).to.have.lengthOf(1);
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esld:uuid'],
                });
            });
            it('keeps connection paths simple', async () => {
                const sldEditor = element.shadowRoot.querySelector('sld-editor');
                const equipment = element.doc.querySelector('ConductingEquipment[type="CTR"]');
                const eqClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment))
                    .querySelector('circle');
                eqClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [400, 352] });
                await sendMouse({ type: 'click', position: [350, 352] });
                await sendMouse({ type: 'click', position: [300, 302] });
                await sendMouse({ type: 'click', position: [300, 320] });
                const equipment2 = element.doc.querySelector('ConductingEquipment[type="NEW"]');
                const eq2ClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment2))
                    .querySelector('circle');
                eq2ClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [300, 320] });
                const equipment3 = element.doc.querySelector('ConductingEquipment[type="VTR"]');
                const eq3ClickTarget = sldEditor
                    .shadowRoot.getElementById(identity(equipment3))
                    .querySelector('circle');
                eq3ClickTarget.dispatchEvent(new PointerEvent('click'));
                await sendMouse({ type: 'click', position: [350, 320] });
                expect(element.doc.querySelectorAll('Vertex')).to.have.property('length', 15);
                await expect(element.doc.documentElement).dom.to.equalSnapshot({
                    ignoreAttributes: ['esld:uuid'],
                });
            });
            describe('between more than two pieces of equipment', async () => {
                beforeEach(async () => {
                    queryUI({ scl: '[type="CTR"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({
                        type: 'click',
                        position: middleOf(queryUI({ scl: 'ConnectivityNode' })),
                    });
                    queryUI({ scl: '[type="BAT"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({
                        type: 'click',
                        position: middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' })),
                    });
                });
                it('disconnects equipment on rotation', async () => {
                    expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.exist;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.not
                        .exist;
                    expect(element.doc.querySelectorAll('Vertex')).to.have.property('length', 2);
                    expect(element.doc.querySelector('[type="BAT"] > Terminal')).to.exist;
                    queryUI({ scl: '[type="BAT"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    expect(element.doc.querySelector('[type="BAT"] > Terminal')).to.not
                        .exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('disconnects terminals on detach menu item select', async () => {
                    const sldEditor = element.shadowRoot.querySelector('sld-editor');
                    const equipment = element.doc.querySelector('[type="CTR"]');
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
                    sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)').selected = true;
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
                    await sldEditor.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
                    sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(4)').selected = true;
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
                });
                it('simplifies horizontal connection paths when disconnecting', async () => {
                    queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({ type: 'click', position: [300, 322] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    element.updateComplete;
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(4);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(13);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('simplifies vertical connection paths when disconnecting', async () => {
                    queryUI({ scl: '[type="NEW"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({ type: 'click', position: [600, 382] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    element.updateComplete;
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(4);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(11);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('simplifies when disconnecting only where possible', async () => {
                    queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({ type: 'click', position: [300, 326] });
                    queryUI({ scl: '[type="NEW"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                    await sendMouse({ type: 'click', position: [300, 326] });
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(7);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(19);
                    queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
                    expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('disconnects equipment upon being moved', async () => {
                    queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(new PointerEvent('click'));
                    expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.exist;
                    await sendMouse({ type: 'click', position: [160, 258] });
                    expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.not
                        .exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('removes superfluous connectivity nodes when disconnecting', async () => {
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                    expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('removes contained connectivity nodes when moving containers', async () => {
                    await sendMouse({ type: 'click', position: [150, 360] });
                    await sendMouse({ type: 'click', position: [150, 330] });
                    expect(element.doc.querySelectorAll('ConnectivityNode')).to.have.lengthOf(1);
                });
                it('removes connected connectivity nodes when moving containers', async () => {
                    queryUI({
                        scl: '[name="V2"]',
                        ui: 'rect',
                    }).dispatchEvent(new PointerEvent('click'));
                    expect(element.doc.querySelectorAll('ConnectivityNode')).to.have.lengthOf(2);
                    await sendMouse({ type: 'click', position: [600, 330] });
                    expect(element.doc.querySelectorAll('ConnectivityNode')).to.have.lengthOf(1);
                });
                it('keeps internal connectivity nodes when moving containers', async () => {
                    var _a;
                    const position = middleOf(queryUI({
                        scl: '[name="V2"]',
                        ui: '.handle',
                    }));
                    position[1] += 140;
                    queryUI({
                        scl: '[name="V2"]',
                        ui: 'rect',
                    }).dispatchEvent(new PointerEvent('click'));
                    (_a = element
                        .shadowRoot.querySelector('[label="Add Substation"]')) === null || _a === void 0 ? void 0 : _a.click();
                    expect(element.doc.querySelectorAll('ConnectivityNode')).to.have.lengthOf(2);
                    await sendMouse({ position, type: 'click' });
                    expect(element.doc.querySelectorAll('ConnectivityNode')).to.have.lengthOf(1);
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('deletes conducting equipment on delete menu item select', async () => {
                    const sldEditor = element.shadowRoot.querySelector('sld-editor');
                    const equipment = element.doc.querySelector('[type="CTR"]');
                    queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
                    await element.updateComplete;
                    expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
                    sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(1)').selected = true;
                    await element.updateComplete;
                    expect(equipment.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('deletes bays on delete menu item select', async () => {
                    const sldEditor = element.shadowRoot.querySelector('sld-editor');
                    const bay = element.doc.querySelector('Bay');
                    queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
                    await element.updateComplete;
                    expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
                    sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(1)').selected = true;
                    await element.updateComplete;
                    expect(bay.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                it('deletes voltage levels on delete menu item select', async () => {
                    const sldEditor = element.shadowRoot.querySelector('sld-editor');
                    const bay = element.doc.querySelector('[name="V2"]');
                    queryUI({ scl: '[name="V2"]', ui: 'rect' }).dispatchEvent(new PointerEvent('contextmenu'));
                    await element.updateComplete;
                    expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
                    sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(1)').selected = true;
                    await element.updateComplete;
                    expect(bay.parentElement).to.not.exist;
                    await expect(element.doc.documentElement).dom.to.equalSnapshot({
                        ignoreAttributes: ['esld:uuid'],
                    });
                });
                describe('and a bus bar', () => {
                    beforeEach(async () => {
                        var _a;
                        (_a = element
                            .shadowRoot.querySelector('[label="Add Bus Bar"]')) === null || _a === void 0 ? void 0 : _a.click();
                        await sendMouse({ type: 'click', position: [430, 202] });
                        await sendMouse({ type: 'click', position: [430, 282] });
                        await sendMouse({
                            type: 'click',
                            position: middleOf(queryUI({ scl: '[name="L"]' })),
                        });
                        await sendMouse({ type: 'click', position: [450, 202] });
                        queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                        await sendMouse({
                            type: 'click',
                            position: middleOf(queryUI({ scl: '[name="L"]' })),
                        });
                    });
                    it('keeps the bus bar when moving containers', async () => {
                        var _a, _b;
                        const position = middleOf(queryUI({
                            scl: '[name="V2"] > [name="B1"]',
                            ui: '.handle',
                        }));
                        expect((_a = element.doc
                            .querySelector('[name="L"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('Section')).to.have.lengthOf(2);
                        position[1] += 120;
                        await sendMouse({ position, type: 'click' });
                        await element.updateComplete;
                        position[1] += 40;
                        await sendMouse({ position, type: 'click' });
                        await element.updateComplete;
                        expect((_b = element.doc
                            .querySelector('[name="L"]')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('Section')).to.have.lengthOf(1);
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('does not merge bus bar sections with feeder sections', async () => {
                        queryUI({
                            scl: '[type="NEW"]',
                            ui: 'circle:nth-of-type(2)',
                        }).dispatchEvent(new PointerEvent('click'));
                        await sendMouse({ type: 'click', position: [450, 292] });
                        queryUI({ scl: '[type="CBR"]', ui: 'circle' }).dispatchEvent(new PointerEvent('click'));
                        await sendMouse({ type: 'click', position: [420, 292] });
                        expect(element.doc.querySelectorAll('Section[bus] Vertex')).to.have.lengthOf(2);
                        queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
                        expect(element.doc.querySelectorAll('Section[bus] Vertex')).to.have.lengthOf(2);
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
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
                    it('resizes the bus bar on resize menu item select', async () => {
                        const bus = element.doc.querySelector('[name="BB1"]');
                        const currentX = parseInt(bus.getAttribute('x'));
                        const currentY = parseInt(bus.getAttribute('y'));
                        // Move mouse to bus bar position to establish offset
                        await sendMouse({
                            type: 'move',
                            position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
                        });
                        await element.updateComplete;
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(2)').selected = true;
                        expect(bus).to.have.attribute('h', '1');
                        await sendMouse({ type: 'click', position: [380, 330] });
                        expect(bus).to.have.attribute('h', '2');
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('copies equipment on copy menu item select', async () => {
                        const equipmentRect = queryUI({
                            scl: 'ConductingEquipment',
                            ui: 'rect',
                        });
                        // Move mouse to equipment position [4,4] using equipment formula: screenY = (gridY - 1) * 32 + 228
                        await sendMouse({ type: 'move', position: [160, 324] });
                        await element.updateComplete;
                        equipmentRect.dispatchEvent(new PointerEvent('contextmenu', {
                            bubbles: true,
                            composed: true,
                        }));
                        await element.updateComplete;
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(6)').selected = true;
                        expect(element.doc.querySelector('ConductingEquipment[*|x="3"][*|y="3"]')).to.not.exist;
                        expect(element.doc.querySelector('ConductingEquipment')).to.have.attribute('esld:x', '4');
                        expect(element.doc.querySelector('ConductingEquipment')).to.have.attribute('esld:y', '4');
                        // Click to place copy at [3,3] using equipment formula: screenY = (3-1)*32 + 228 = 292
                        await sendMouse({ type: 'click', position: [128, 292] });
                        expect(element.doc.querySelector('ConductingEquipment[*|x="3"][*|y="3"]')).to.exist;
                        expect(element.doc.querySelector('ConductingEquipment[*|x="4"][*|y="4"]')).to.exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('moves the bus bar on move menu item select', async () => {
                        const busLine = queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        });
                        const bus = element.doc.querySelector('[name="BB1"]');
                        const initialY = bus.getAttribute('y');
                        const initialX = bus.getAttribute('x');
                        // Move mouse to bus bar position at current x,y
                        // Using equipment formula: screenX = (gridX - 1) * 32 + 64, screenY = (gridY - 1) * 32 + 228
                        const currentY = parseInt(initialY);
                        const currentX = parseInt(initialX);
                        await sendMouse({
                            type: 'move',
                            position: [(currentX - 1) * 32 + 64, (currentY - 1) * 32 + 228],
                        });
                        await element.updateComplete;
                        busLine.dispatchEvent(new PointerEvent('contextmenu', {
                            bubbles: true,
                            composed: true,
                        }));
                        await element.updateComplete;
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-of-type(3)').selected = true;
                        await sldEditor.updateComplete;
                        expect(bus).to.have.attribute('y', initialY);
                        // Click to place at y=4: screenY = (4-1)*32 + 228 = 324
                        await sendMouse({ type: 'click', position: [64, 324] });
                        expect(bus).to.have.attribute('y', '4');
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('moves the bus bar label on "move label" menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        await element.updateComplete;
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(4)').selected = true;
                        await sldEditor.updateComplete;
                        expect(element)
                            .property('placingLabel')
                            .to.have.attribute('name', 'BB1');
                        await sendMouse({ type: 'click', position: [200, 308] });
                        expect(element.doc.querySelector('[name="BB1"]')).to.have.attribute('lx', '5');
                        expect(element.doc.querySelector('[name="BB1"]')).to.have.attribute('ly', '4.5');
                    });
                    it('requests bus bar edit wizard on edit menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        await element.updateComplete;
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(2)').selected = true;
                        await sldEditor.updateComplete;
                        expect(lastCalledWizard).to.equal(element.doc.querySelector('[name="BB1"]'));
                    });
                    it('deletes the bus bar on delete menu item select', async () => {
                        queryUI({
                            scl: '[name="L"]',
                            ui: 'line:not([stroke])',
                        }).dispatchEvent(new PointerEvent('contextmenu'));
                        await element.updateComplete;
                        expect(element.doc.querySelector('[name="BB1"]')).to.exist;
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(1)').selected = true;
                        await sldEditor.updateComplete;
                        expect(element.doc.querySelector('[name="BB1"]')).to.not.exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('copies bays on copy menu item select', async () => {
                        const bayRect = queryUI({
                            scl: '[name="V2"] [name="B1"]',
                            ui: 'rect',
                        });
                        // Move mouse to bay position first to establish offset for equipment context
                        // V2 bay is at [16,2], so use equipment formula: screenX = (16-1)*32 + 64 = 544, screenY = (2-1)*32 + 228 = 260
                        await sendMouse({ type: 'move', position: [544, 260] });
                        await element.updateComplete;
                        bayRect.dispatchEvent(new PointerEvent('contextmenu', {
                            bubbles: true,
                            composed: true,
                        }));
                        await element.updateComplete;
                        const sldEditor = element.shadowRoot.querySelector('sld-editor');
                        sldEditor.shadowRoot.querySelector('mwc-list-item:nth-last-of-type(6)').selected = true;
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).not.to
                            .exist;
                        // Place in V1 voltage level - target around [5,8] using equipment formula
                        await sendMouse({ type: 'click', position: [192, 452] });
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).to
                            .exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                    it('copies voltage levels on move handle shift click', async () => {
                        var _a;
                        queryUI({
                            scl: '[name="V1"]',
                            ui: 'rect',
                        }).dispatchEvent(new PointerEvent('click', { shiftKey: true }));
                        expect(element.doc.querySelector('[name="V1"] [name="B2"]')).not.to
                            .exist;
                        (_a = element
                            .shadowRoot.querySelector('[label="Add Substation"]')) === null || _a === void 0 ? void 0 : _a.click();
                        await sendMouse({ type: 'click', position: [640, 480] });
                        expect(element.doc.querySelector('[name="S2"] [name="V1"]')).to
                            .exist;
                        await expect(element.doc.documentElement).dom.to.equalSnapshot({
                            ignoreAttributes: ['esld:uuid'],
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=oscd-editor-sld.spec.js.map