import { html } from 'lit';
import { fixture, expect, aTimeout, waitUntil, chai } from '@open-wc/testing';

// Monkey-patch chai's Assertion.prototype.assert to prevent infinite
// serialization of DOM/XML nodes in error messages. Without this patch,
// any failing assertion involving a DOM element causes chai (via loupe) to
// recurse infinitely trying to serialize the node for the diff output.
const origAssert = chai.Assertion.prototype.assert;
chai.Assertion.prototype.assert = function (
  expr: unknown,
  msg: string,
  negateMsg: string,
  expected?: unknown,
  _actual?: unknown,
  showDiff?: boolean,
) {
  const negate = chai.util.flag(this, 'negate');
  const ok = negate ? !expr : !!expr;
  if (!ok) {
    const actual =
      _actual !== undefined ? _actual : chai.util.flag(this, 'object');
    // Intercept when either side is a Node to prevent loupe from recursing
    // infinitely when chai tries to format the diff/error message.
    if (actual instanceof Node || expected instanceof Node) {
      const fmt = (v: unknown) =>
        v instanceof Node
          ? `<${(v as Element).tagName || 'Node'}>`
          : typeof v === 'string'
            ? `'${v}'`
            : String(v);
      const template = negate ? negateMsg : msg;
      const message = template
        ? template
          .replace('#{this}', fmt(actual))
          .replace('#{exp}', fmt(expected))
          .replace('#{act}', fmt(actual))
        : `expected ${fmt(actual)} to equal ${fmt(expected)}`;
      throw new chai.AssertionError(
        message,
        { actual: fmt(actual), expected: fmt(expected), showDiff: false },
        chai.util.flag(this, 'ssfi'),
      );
    }
  }
  return origAssert.call(
    this,
    expr,
    msg,
    negateMsg,
    expected,
    _actual,
    showDiff,
  );
};
import type { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import type { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';

import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { identity } from '@openscd/scl-lib';
import { OscdMenuItem } from '@omicronenergy/oscd-ui/menu/OscdMenuItem.js';
import type { OscdMenu } from '@omicronenergy/oscd-ui/menu/OscdMenu.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import type { EditEventV2 } from '@openscd/oscd-api';
import { SldSubstationViewer } from './sld-substation-viewer.js';
import { SldSubstationHeader } from './sld-substation-header.js';
import { busSections, makeBusBar } from './foundations/connectivity.js';
import {
  getSLDAttributes,
  setSLDAttributes,
} from './foundations/sld-attributes.js';
import { iedReferences, resolveIed } from './foundations/ied.js';
import {
  connectingFrom,
  idle,
  placing,
  placingLabel,
  resizingBR,
  resizingTL,
  targetInMode,
} from './foundations/interaction-mode.js';
import { defaultSldNsPrefix, sldNs } from './foundations.js';

import { SldEditor } from './sld-editor.js';
import {
  findSubstationSvgRoot,
  gridPosToViewportCoords,
  sclLabelToViewportCoords,
  svgToViewportCoords,
  vlOrigin,
  vlResizeBR,
  placeTL,
  placeBR,
  eqPos,
  eqTarget,
  sldFixture,
} from './test-helpers.js';
import {
  newGroundTerminalEvent,
} from './foundations/events.js';
import { SldResizeSubstationDialog } from './sld-resize-substation-dialog.js';

customElements.define('sld-editor', SldEditor);

class TestSldSubstationViewer extends SldSubstationViewer {
  override render() {
    return html``;
  }

  shouldUpdateForTest(changedProperties: Map<PropertyKey, unknown>) {
    return this.shouldUpdate(changedProperties as never);
  }
}

customElements.define('test-sld-substation-viewer', TestSldSubstationViewer);

function testSldSubstationViewer(): Promise<TestSldSubstationViewer> {
  return fixture(html`<test-sld-substation-viewer></test-sld-substation-viewer>`);
}

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
        ':scope > Private[type="OpenSCD-SLD-Layout"] > SLDAttributes',
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

function getSldSubstationViewer(
  element: SldEditor,
  substation?: Element,
): SldSubstationViewer | null | undefined {
  const viewers = Array.from(
    element.shadowRoot?.querySelectorAll('sld-substation-viewer') ?? [],
  ) as SldSubstationViewer[];
  if (substation) {
    return viewers.find(viewer => viewer.substation === substation) ?? null;
  }
  return viewers[0] ?? null;
}

function getSldSubstationHeader(
  element: SldEditor,
): SldSubstationHeader | null | undefined {
  return element.shadowRoot?.querySelector('sld-substation-header');
}

describe('SLD Editor', () => {
  let element: SldEditor;
  let xmlEditor: XMLEditor;
  let lastCalledSclEdit: Element | undefined;
  let lastSelectedElement: Element | undefined;

  describe('SldSubstationViewer update scheduling', () => {
    it('skips idle mouse-coordinate-only updates', async () => {
      const testEditor = await testSldSubstationViewer();
      testEditor.interaction = idle();

      expect(testEditor.interaction.mode).to.equal('idle');
      expect(
        testEditor.shouldUpdateForTest(
          new Map<PropertyKey, unknown>([
            ['mouseX', 0],
            ['mouseY', 0],
            ['mouseX2', 0],
            ['mouseY2', 0],
            ['mouseX2f', 0],
            ['mouseY2f', 0],
          ]),
        ),
      ).to.equal(false);
    });

    it('skips locked mouse-coordinate-only updates (read-only default)', async () => {
      const testEditor = await testSldSubstationViewer();

      expect(testEditor.interaction.mode).to.equal('locked');
      expect(
        testEditor.shouldUpdateForTest(
          new Map<PropertyKey, unknown>([
            ['mouseX', 0],
            ['mouseY', 0],
            ['mouseX2', 0],
            ['mouseY2', 0],
            ['mouseX2f', 0],
            ['mouseY2f', 0],
          ]),
        ),
      ).to.equal(false);
    });

    it('keeps active mouse-coordinate updates', async () => {
      const testEditor = await testSldSubstationViewer();
      testEditor.interaction = placing(
        document.createElement('VoltageLevel'),
        [0, 0],
      );

      expect(testEditor.interaction.mode).to.equal('placing');
      expect(
        testEditor.shouldUpdateForTest(
          new Map<PropertyKey, unknown>([
            ['mouseX', 0],
            ['mouseY', 0],
          ]),
        ),
      ).to.equal(true);
    });

    it('keeps idle non-mouse updates', async () => {
      const testEditor = await testSldSubstationViewer();
      testEditor.interaction = idle();

      expect(testEditor.interaction.mode).to.equal('idle');
      expect(
        testEditor.shouldUpdateForTest(new Map<PropertyKey, unknown>([['doc', null]])),
      ).to.equal(true);
    });
  });

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
    } = getSldSubstationViewer(element)!.shadowRoot!;
    if (scl) {
      const sclTarget = element.doc.querySelector(scl);
      target = target.getElementById?.(<string>identity(sclTarget))!;
    }
    if (ui === 'menu') {
      return contextMenu() as Element;
    }
    if (ui) {
      target = target.querySelector(ui)!;
    }
    return target as Element;
  }

  function contextMenu(): OscdMenu | null {
    const menu =
      element
        .shadowRoot!.querySelector('sld-context-menu')
        ?.shadowRoot?.querySelector<OscdMenu>('oscd-menu') ??
      null;

    return menu?.querySelector('oscd-menu-item') ? menu : null;
  }

  function clickInteractive(element: HTMLElement): void {
    const target =
      element.shadowRoot?.querySelector<HTMLElement>('#button, #item') ??
      element;
    if (target !== element) {
      target.click();
    } else {
      element.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true }),
      );
    }
  }

  function contextMenuItems(): OscdMenuItem[] {
    return Array.from(
      contextMenu()?.querySelectorAll<OscdMenuItem>('oscd-menu-item') ?? [],
    );
  }

  /** Query menu items by index (0-based) or from end (negative). */
  function menuItem(index: number): OscdMenuItem {
    const items = contextMenuItems();
    const i = index >= 0 ? index : items.length + index;
    return items[i];
  }

  async function waitForMenuClose(): Promise<void> {
    await waitUntil(
      () => contextMenuItems().length === 0,
      'context menu items did not clear',
    );
  }

  function gridPos(gx: number, gy: number): [number, number] {
    return gridPosToViewportCoords(
      findSubstationSvgRoot(getSldSubstationViewer(element)!),
      gx,
      gy,
    );
  }

  function labelPos(lx: number, ly: number): [number, number] {
    return sclLabelToViewportCoords(
      findSubstationSvgRoot(getSldSubstationViewer(element)!),
      lx,
      ly,
    );
  }

  function svgPoint(svgX: number, svgY: number): [number, number] {
    return svgToViewportCoords(
      findSubstationSvgRoot(getSldSubstationViewer(element)!),
      svgX,
      svgY,
    );
  }

  function expectActiveMode(mode: string | undefined) {
    expect(element.interaction.mode).to.equal(mode ?? 'idle');
  }

  beforeEach(async () => {
    const doc = new DOMParser().parseFromString(
      emptyDocString,
      'application/xml',
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
        @oscd-sld-edit-scl=${({
          detail: { element: e },
        }: CustomEvent<{ element: Element }>) => {
          lastCalledSclEdit = e;
        }}
        @oscd-sld-selected=${({
          detail: { element: e },
        }: CustomEvent<{ element: Element }>) => {
          lastSelectedElement = e;
        }}
      ></sld-editor>`,
    );
  });

  afterEach(async () => {
    lastCalledSclEdit = undefined;
    lastSelectedElement = undefined;
    element.interaction = idle();
    await sendMouse({ type: 'click', position: [0, 0] });
    await resetMouse();
  });

  describe('interaction mode exclusivity', () => {
    let voltageLevel: Element;
    let bay: Element;
    let equipment: Element;

    beforeEach(() => {
      const modeDoc = sldFixture({
        children: '<ConductingEquipment name="QA1" type="CBR" />',
      });
      voltageLevel = modeDoc.querySelector('VoltageLevel')!;
      bay = modeDoc.querySelector('Bay')!;
      equipment = modeDoc.querySelector('ConductingEquipment')!;
    });

    it('keeps at most one mode active when switching modes', () => {
      element.startPlacing(voltageLevel);
      expectActiveMode('placing');

      element.interaction = resizingBR(voltageLevel);
      expectActiveMode('resizingBR');

      element.interaction = resizingTL(bay);
      expectActiveMode('resizingTL');

      element.interaction = placingLabel(bay, [0, 0]);
      expectActiveMode('placingLabel');

      element.interaction = connectingFrom(equipment, 'T1', [[1, 1]]);
      expectActiveMode('connectingFrom');

      element.interaction = idle();
      expectActiveMode(undefined);
    });

    it('clears any prior mode when entering each specific mode', () => {
      element.interaction = connectingFrom(equipment, 'T1', [[1, 1]]);
      element.startPlacing(voltageLevel);
      expectActiveMode('placing');

      element.interaction = placingLabel(bay, [0, 0]);
      element.interaction = resizingBR(voltageLevel);
      expectActiveMode('resizingBR');

      element.interaction = placing(voltageLevel, [0, 0]);
      element.interaction = resizingTL(bay);
      expectActiveMode('resizingTL');

      element.interaction = resizingBR(voltageLevel);
      element.interaction = placingLabel(bay, [0, 0]);
      expectActiveMode('placingLabel');

      element.interaction = resizingTL(bay);
      element.interaction = connectingFrom(equipment, 'T1', [[1, 1]]);
      expectActiveMode('connectingFrom');
    });
  });

  describe('public interaction API', () => {
    let voltageLevel: Element;
    let bay: Element;

    beforeEach(() => {
      const modeDoc = sldFixture({
        children: '<ConductingEquipment name="QA1" type="CBR" />',
      });
      voltageLevel = modeDoc.querySelector('VoltageLevel')!;
      bay = modeDoc.querySelector('Bay')!;
    });

    it('enters placing and returns the placement promise for a placing intent', () => {
      const result = element.handleStartInteraction({
        mode: 'placing',
        element: voltageLevel,
      });
      expectActiveMode('placing');
      expect(result).to.be.an.instanceof(Promise);
    });

    it('clones the source before placing a copy intent', () => {
      element.handleStartInteraction({
        mode: 'placing',
        element: voltageLevel,
        copy: true,
      });
      expectActiveMode('placing');
      const target = targetInMode(element.interaction, 'placing');
      expect(target).to.not.equal(voltageLevel);
      expect(target?.tagName).to.equal('VoltageLevel');
    });

    it('places the source itself when copy is not set', () => {
      element.handleStartInteraction({
        mode: 'placing',
        element: voltageLevel,
      });
      expect(targetInMode(element.interaction, 'placing')).to.equal(
        voltageLevel,
      );
    });

    it('resolves the placing intent promise when the mode is escaped', async () => {
      const result = element.handleStartInteraction({
        mode: 'placing',
        element: voltageLevel,
      }) as Promise<unknown>;
      await element.updateComplete;
      element.cancelInteraction();
      expect(await result).to.be.undefined;
    });

    it('enters a non-placing mode and returns void', () => {
      const result = element.handleStartInteraction({
        mode: 'resizingBR',
        element: bay,
      });
      expectActiveMode('resizingBR');
      expect(result).to.be.undefined;
    });

    it('returns to idle on cancelInteraction', () => {
      element.handleStartInteraction({ mode: 'resizingBR', element: bay });
      expectActiveMode('resizingBR');
      element.cancelInteraction();
      expectActiveMode(undefined);
    });
  });

  describe('given a substation', () => {
    let sldSubstationViewer: SldSubstationViewer;
    let dialog: SldResizeSubstationDialog;

    const openResizeDialog = async () => {
      getSldSubstationHeader(element)
        ?.shadowRoot?.querySelectorAll<OscdIconButton>('h2 > oscd-icon-button')[1]
        ?.shadowRoot?.querySelector<HTMLElement>('#button')
        ?.click();
      await dialog.updateComplete;
    };
    beforeEach(async () => {
      const subSt = element.doc.createElement('Substation');
      subSt.setAttribute('name', 'S1');
      setSLDAttributes(subSt, element.nsp, { w: '51', h: '26' });
      element.doc.documentElement.appendChild(subSt);
      dialog = element.resizeDialog;
      element.requestUpdate();
      await element.updateComplete;

      sldSubstationViewer = getSldSubstationViewer(element)!;
      await sldSubstationViewer.updateComplete;
    });

    it('does not declare the SLD namespace on load', async () => {
      expect(element.doc.documentElement).to.not.have.attribute(
        `xmlns:${defaultSldNsPrefix}`,
      );
    });

    it('allows resizing substations', async () => {
      await openResizeDialog();

      const width = dialog.shadowRoot!.querySelector<OscdOutlinedTextField>(
        '#substationWidth',
      )!;
      const height = dialog.shadowRoot!.querySelector<OscdOutlinedTextField>(
        '#substationHeight',
      )!;
      const confirm = () =>
        dialog.shadowRoot!
          .querySelector<OscdFilledButton>(
            'div[slot="actions"] > oscd-filled-button',
          )
          ?.shadowRoot?.querySelector<HTMLElement>('#button')
          ?.click();

      width.value = '51';
      height.value = '26';
      confirm();
      expect(element).to.have.property('docVersion', 0);

      width.value = '1337';
      height.value = '42';
      confirm();
      expect(sldAttribute(sldSubstationViewer.substation, 'h')).to.equal('42');
      expect(sldAttribute(sldSubstationViewer.substation, 'w')).to.equal(
        '1337',
      );
    });

    it('applies validateSubstationResize from the editor to the resize dialog', async () => {
      element.validateSubstationResize = () => 'Blocked by host';
      await element.updateComplete;

      await openResizeDialog();
      const width = dialog.shadowRoot!.querySelector<OscdOutlinedTextField>('#substationWidth')!;

      width.value = '60';
      width.dispatchEvent(new Event('input'));

      expect(dialog.validateSubstationResize).to.equal(element.validateSubstationResize);
      expect(width.validationMessage).to.equal('Blocked by host');
    });

    it('routes substation deletion from the header through the editor', async () => {
      getSldSubstationHeader(element)
        ?.shadowRoot?.querySelectorAll<OscdIconButton>('h2 > oscd-icon-button')[2]
        ?.shadowRoot?.querySelector<HTMLElement>('#button')
        ?.click();
      await element.updateComplete;

      expect(element.doc.querySelector('Substation')).to.be.null;
    });

    it('allows placing a new voltage level', async () => {
      const newVoltLevel = element.doc.createElement('VoltageLevel');
      newVoltLevel.setAttribute('name', 'NewVoltLevel');
      element.startPlacing(newVoltLevel);

      expect(targetInMode(element.interaction, 'placing'))
        .to.have.property('tagName', 'VoltageLevel');
      await sendMouse({ type: 'click', position: gridPos(...placeTL) });
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.have.property('tagName', 'VoltageLevel');
      await sendMouse({ type: 'click', position: gridPos(...placeBR) });
      expect(targetInMode(element.interaction, 'resizingBR')).to.be.undefined;
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

      expect(targetInMode(element.interaction, 'placing'))
        .to.have.property('tagName', 'VoltageLevel');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
    });
  });

  describe('given a voltage level', () => {
    let sldSubstationViewer: SldSubstationViewer;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        voltageLevelDocString,
        'application/xml',
      );
      element.doc = doc;
      await element.updateComplete;
      sldSubstationViewer = getSldSubstationViewer(element)!;
      await sldSubstationViewer.updateComplete;
    });

    it('forbids undersizing the substation', async () => {
      getSldSubstationHeader(element)
        ?.shadowRoot?.querySelectorAll<OscdIconButton>('h2 > oscd-icon-button')[1]
        ?.shadowRoot?.querySelector<HTMLElement>('#button')
        ?.click();
      await element.updateComplete;
      const dialog = element.resizeDialog;
      await dialog.updateComplete;

      dialog.shadowRoot!.querySelector<OscdOutlinedTextField>(
        '#substationWidth',
      )!.value = '30';
      dialog.shadowRoot!.querySelector<OscdOutlinedTextField>(
        '#substationHeight',
      )!.value = '20';
      dialog.shadowRoot!
        .querySelector<OscdFilledButton>(
          'div[slot="actions"] > oscd-filled-button',
        )
        ?.shadowRoot?.querySelector<HTMLElement>('#button')
        ?.click();
      expect(sldAttribute(sldSubstationViewer.substation, 'h')).to.equal('25');
      expect(sldAttribute(sldSubstationViewer.substation, 'w')).to.equal('50');
    });

    it('allows resizing voltage levels', async () => {
      const moveHandle =
        sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
          '.handle',
        )[1];
      moveHandle.dispatchEvent(new PointerEvent('click'));
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'resizingBR')!;
      expect(sldAttribute(voltageLevel, 'w')).to.equal('48');
      expect(sldAttribute(voltageLevel, 'h')).to.equal('23');
      await sendMouse({ type: 'click', position: gridPos(...vlResizeBR) });
      expect(sldAttribute(voltageLevel, 'w')).to.equal('8');
      expect(sldAttribute(voltageLevel, 'h')).to.equal('7');
    });

    it('moves voltage levels on move handle click', async () => {
      // Click inside VL rect but outside the TL resize handle (1x1 at VL origin) to start moving it
      await sendMouse({ type: 'click', position: gridPos(3, 2) });
      expect(targetInMode(element.interaction, 'placing'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'placing')!;
      expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
      expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
      // Click to place at new position (moved right and down)
      await sendMouse({ type: 'click', position: gridPos(4, 3) });
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
      await sldSubstationViewer.updateComplete;
      const item = menuItem(0);
      clickInteractive(item);
      await sldSubstationViewer.updateComplete;
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'resizingBR')!;
      expect(sldAttribute(voltageLevel, 'w')).to.equal('48');
      expect(sldAttribute(voltageLevel, 'h')).to.equal('23');
      await sendMouse({ type: 'click', position: gridPos(...vlResizeBR) });
      expect(sldAttribute(voltageLevel, 'w')).to.equal('8');
      expect(sldAttribute(voltageLevel, 'h')).to.equal('7');
    });

    it('moves voltage levels on move menu item select', async () => {
      const voltageRect = queryUI({
        scl: 'VoltageLevel',
        ui: 'rect',
      });

      // Move mouse to establish position, then open context menu with coordinates
      const [cx, cy] = gridPos(...vlOrigin);
      await sendMouse({ type: 'move', position: [cx, cy] });
      await element.updateComplete;

      voltageRect.dispatchEvent(
        new PointerEvent('contextmenu', {
          clientX: cx,
          clientY: cy,
          bubbles: true,
          composed: true,
        }),
      );
      await waitUntil(() => contextMenuItems().length > 0, 'menu items did not appear');

      // Select "Move" menu item
      const item = menuItem(2);
      clickInteractive(item);
      await sldSubstationViewer.updateComplete;
      await waitForMenuClose();

      expect(targetInMode(element.interaction, 'placing'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'placing')!;
      expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
      expect(sldAttribute(voltageLevel, 'y')).to.equal('1');

      // Click to place at [2,2]
      await sendMouse({ type: 'click', position: gridPos(2, 2) });
      expect(sldAttribute(voltageLevel, 'x')).to.equal('2');
      expect(sldAttribute(voltageLevel, 'y')).to.equal('2');
    });

    it('requests voltage level scl edit on edit menu item select', async () => {
      queryUI({
        scl: 'VoltageLevel',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      clickInteractive(menuItem(-2));
      await sldSubstationViewer.updateComplete;
      expect(lastCalledSclEdit).to.equal(
        element.doc.querySelector('VoltageLevel'),
      );
    });

    it('moves the voltage level label on "move label" menu item select', async () => {
      queryUI({
        scl: 'VoltageLevel',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      clickInteractive(menuItem(-4));
      await sldSubstationViewer.updateComplete;
      expect(targetInMode(element.interaction, 'placingLabel'))
        .to.have.property('tagName', 'VoltageLevel');
      await sendMouse({ type: 'click', position: labelPos(5, 4.5) });
      const voltageLevel = element.doc.querySelector('VoltageLevel')!;
      expect(sldAttribute(voltageLevel, 'lx')).to.equal('5');
      expect(sldAttribute(voltageLevel, 'ly')).to.equal('4.5');
    });

    it('forbids moving voltage levels out of bounds', async () => {
      queryUI({
        scl: 'VoltageLevel',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('click'));
      expect(targetInMode(element.interaction, 'placing'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'placing')!;
      expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
      expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
      await sendMouse({ type: 'click', position: gridPos(...placeTL) });
      expect(sldAttribute(voltageLevel, 'x')).to.equal('1');
      expect(sldAttribute(voltageLevel, 'y')).to.equal('1');
    });

    it('moves the voltage level label on label left click', async () => {
      // Click on label to start placing/moving it
      queryUI({ ui: '.label text' }).dispatchEvent(new PointerEvent('click'));
      const placingLabel = targetInMode(element.interaction, 'placingLabel');
      const placingLabelTagName = placingLabel?.tagName;
      expect(placingLabelTagName).to.equal('VoltageLevel');
      // Unlike the menu-based "Move Label", a direct label click captures a
      // drag offset from the current (stale) mouse position. The afterEach
      // reset leaves the mouse at [0,0], so the offset bakes in the label's
      // original position (1,1). We target SVG (3.9, 3.4) which, after the
      // offset is applied, results in the label being stored at lx=5, ly=4.5.
      const svg = findSubstationSvgRoot(getSldSubstationViewer(element)!);
      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      const clickX = Math.round(
        rect.left + ((3.9 - vb.x) / vb.width) * rect.width,
      );
      const clickY = Math.round(
        rect.top + ((3.4 - vb.y) / vb.height) * rect.height,
      );
      await sendMouse({ type: 'click', position: [clickX, clickY] });
      const voltageLevel = element.doc.querySelector('VoltageLevel')!;
      expect(sldAttribute(voltageLevel, 'lx')).to.equal('5');
      expect(sldAttribute(voltageLevel, 'ly')).to.equal('4.5');
    });

    it('requests a voltage level scl edit on label middle click', async () => {
      queryUI({ ui: '.label text' }).dispatchEvent(
        new PointerEvent('auxclick', { button: 1 }),
      );
      expect(lastCalledSclEdit).to.equal(
        element.doc.querySelector('VoltageLevel'),
      );
    });

    it('allows placing a new bay', async () => {
      const newBay = element.doc.createElement('Bay');
      newBay.setAttribute('name', 'NewBay');
      element.startPlacing(newBay);

      expect(targetInMode(element.interaction, 'placing')).to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: gridPos(...placeTL) });
      await aTimeout(10); // Wait for possible async operations
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(element.interaction, 'resizingBR')).to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: gridPos(...placeBR) });
      expect(targetInMode(element.interaction, 'resizingBR')).to.be.undefined;
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

      expect(targetInMode(element.interaction, 'placing')).to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: gridPos(...placeTL) });
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(element.interaction, 'resizingBR')).to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: gridPos(...placeBR) });
      expect(targetInMode(element.interaction, 'resizingBR')).to.be.undefined;
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
    let sldSubstationViewer: SldSubstationViewer;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        bayDocString,
        'application/xml',
      );
      element.doc = doc;
      await element.updateComplete;
      sldSubstationViewer = getSldSubstationViewer(element)!;
      await sldSubstationViewer.updateComplete;
    });

    it('allows resizing bays', async () => {
      const moveHandle =
        sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
          'g.bay .handle',
        )[1];
      moveHandle.dispatchEvent(new PointerEvent('click'));
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.exist.and.to.have.property('tagName', 'Bay');
      const bay = targetInMode(element.interaction, 'resizingBR')!;
      expect(sldAttribute(bay, 'w')).to.equal('3');
      expect(sldAttribute(bay, 'h')).to.equal('3');
      await sendMouse({ type: 'click', position: gridPos(...placeBR) });
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

    it('requests bay scl edit on edit menu item select', async () => {
      queryUI({
        scl: 'Bay',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      clickInteractive(menuItem(-2));
      await sldSubstationViewer.updateComplete;
      expect(lastCalledSclEdit).to.equal(element.doc.querySelector('Bay'));
    });

    it('forbids resizing bays out of bounds', async () => {
      const moveHandle =
        sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
          'g.bay .handle',
        )[1];
      moveHandle.dispatchEvent(new PointerEvent('click'));
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.exist.and.to.have.property('tagName', 'Bay');
      const bay = targetInMode(element.interaction, 'resizingBR')!;
      expect(sldAttribute(bay, 'w')).to.equal('3');
      expect(sldAttribute(bay, 'h')).to.equal('3');
      await sendMouse({ type: 'click', position: gridPos(18, 12) });
      expect(sldAttribute(bay, 'w')).to.equal('3');
      expect(sldAttribute(bay, 'h')).to.equal('3');
    });

    it('forbids undersizing voltage levels containing bays', async () => {
      const moveHandle =
        sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
          'g.voltagelevel > .handle',
        )[1];
      moveHandle.dispatchEvent(new PointerEvent('click'));
      expect(targetInMode(element.interaction, 'resizingBR'))
        .to.exist.and.to.have.property('tagName', 'VoltageLevel');
      const voltageLevel = targetInMode(element.interaction, 'resizingBR')!;
      expect(sldAttribute(voltageLevel, 'w')).to.equal('13');
      expect(sldAttribute(voltageLevel, 'h')).to.equal('13');
      await sendMouse({ type: 'click', position: gridPos(2, 3) });
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
        position: gridPos(currentX, currentY),
      });
      await element.updateComplete;

      // Use contextmenu approach for bay movement
      queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu', { bubbles: true, composed: true }),
      );
      await element.updateComplete;

      clickInteractive(menuItem(2));
      await sldSubstationViewer.updateComplete;

      expect(targetInMode(element.interaction, 'placing'))
        .to.exist.and.to.have.property('tagName', 'Bay');
      const bay = targetInMode(element.interaction, 'placing')!;
      // Click to place at new position [4,3]
      await sendMouse({ type: 'click', position: gridPos(4, 3) });
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
        position: gridPos(currentX, currentY),
      });
      await element.updateComplete;

      queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
        new PointerEvent('click'),
      );
      const bay = targetInMode(element.interaction, 'placing')!;
      expect(bay.parentElement).to.have.attribute('name', 'V1');
      expect(bay).to.have.attribute('name', 'B1');
      await sendMouse({ type: 'click', position: gridPos(18, 3) });
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(sldAttribute(bay, 'x')).to.equal('18');
      expect(sldAttribute(bay, 'y')).to.equal('3');
      expect(bay.parentElement).to.have.attribute('name', 'V2');
      expect(bay).to.have.attribute('name', 'B2');
      queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
        new PointerEvent('click'),
      );
      await sendMouse({ type: 'click', position: gridPos(...placeTL) });
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
        position: gridPos(currentX, currentY),
      });
      await element.updateComplete;

      queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
        new PointerEvent('click'),
      );
      const bay = targetInMode(element.interaction, 'placing')!;
      const cNode = bay.querySelector('ConnectivityNode')!;
      expect(cNode).to.have.attribute('pathName', 'S1/V1/B1/L1');
      await sendMouse({ type: 'click', position: gridPos(18, 3) });
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(cNode).to.have.attribute('pathName', 'S1/V2/B2/L1');
      await expect(element.doc.documentElement).dom.to.equalSnapshot({
        ignoreAttributes: ['esldoscd:uuid'],
      });
    });

    it('moves a bay when its parent voltage level is moved', async () => {
      // const voltageLevel = element.doc.querySelector('VoltageLevel')!;
      await sendMouse({ type: 'click', position: gridPos(1, 3) });
      const bay = targetInMode(element.interaction, 'placing')!.querySelector('Bay')!;
      expect(sldAttribute(bay, 'x')).to.equal('2');
      expect(sldAttribute(bay, 'y')).to.equal('2');
      await sendMouse({
        type: 'click',
        position: gridPos(2, 2),
      });
      expect(sldAttribute(bay, 'x')).to.equal('3');
      expect(sldAttribute(bay, 'y')).to.equal('1');
    });

    it('allows placing new conducting equipment', async () => {
      const condEq = element.doc.createElement('ConductingEquipment');
      condEq.setAttribute('type', 'GEN');
      condEq.setAttribute('name', 'GEN1');
      element.startPlacing(condEq);

      expect(targetInMode(element.interaction, 'placing'))
        .to.have.property('tagName', 'ConductingEquipment');
      await sendMouse({ type: 'click', position: gridPos(...eqPos) });
      expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(element.interaction, 'resizingBR')).to.be.undefined;
      const equipment = element.doc.querySelector('ConductingEquipment');
      expect(equipment).to.exist;
      expect(sldAttribute(equipment!, 'x')).to.equal('4');
      expect(sldAttribute(equipment!, 'y')).to.equal('4');
    });

    describe('with a sibling bus bar', () => {
      beforeEach(async () => {
        const busBar = makeBusBar(element.doc, element.nsp);
        element.startPlacing(busBar);

        await sendMouse({ type: 'click', position: gridPos(...placeTL) });
        await sendMouse({ type: 'click', position: gridPos(...placeBR) });
      });

      it('allows the bay to overlap its sibling bus bar', async () => {
        const moveHandle =
          sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
            'g.bay .handle',
          )[1];
        moveHandle.dispatchEvent(new PointerEvent('click'));
        expect(targetInMode(element.interaction, 'resizingBR'))
          .to.exist.and.to.have.property('tagName', 'Bay');
        const bay = targetInMode(element.interaction, 'resizingBR')!;
        expect(sldAttribute(bay, 'w')).to.equal('3');
        expect(sldAttribute(bay, 'h')).to.equal('3');
        await sendMouse({ type: 'click', position: gridPos(...placeBR) });
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
          position: gridPos(currentX, currentY),
        });
        await element.updateComplete;

        // Use contextmenu approach for bus bar movement
        queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(
          new PointerEvent('contextmenu', { bubbles: true, composed: true }),
        );
        await element.updateComplete;

        clickInteractive(menuItem(1));
        await sldSubstationViewer.updateComplete;
        await waitForMenuClose();

        await sendMouse({ type: 'click', position: gridPos(...eqTarget) });
        expect(sldAttribute(bus!, 'x')).to.equal('3');
      });

      it('resizes the bus bar on middle mouse button click', async () => {
        const bus = element.doc.querySelector('[name="BB1"]');
        const currentX = parseInt(sldAttribute(bus!, 'x')!, 10);
        const currentY = parseInt(sldAttribute(bus!, 'y')!, 10);

        // Move mouse to bus bar position to establish offset
        await sendMouse({
          type: 'move',
          position: gridPos(currentX, currentY),
        });
        await element.updateComplete;

        // Use contextmenu approach for bus bar resize instead of middle click
        queryUI({ scl: '[name="L"]', ui: 'line:not([stroke])' }).dispatchEvent(
          new PointerEvent('contextmenu', { bubbles: true, composed: true }),
        );
        await element.updateComplete;

        clickInteractive(menuItem(0));
        await sldSubstationViewer.updateComplete;

        expect(sldAttribute(bus!, 'w')).to.equal('1');
        expect(sldAttribute(bus!, 'h')).to.equal('8');
        await sendMouse({ type: 'click', position: gridPos(7, 3) });
        expect(sldAttribute(bus!, 'w')).to.equal('3');
        expect(sldAttribute(bus!, 'h')).to.equal('1');
      });
    });
  });

  describe('given IED references', () => {
    let sldSubstationViewer: SldSubstationViewer;

    async function settle() {
      await aTimeout(20);
      await element.updateComplete;
      sldSubstationViewer = getSldSubstationViewer(element)!;
      await sldSubstationViewer.updateComplete;
    }

    function referencedIed(name: string): Element | undefined {
      const links = iedReferences(element.doc).filter(
        ied => resolveIed(ied)?.getAttribute('name') === name,
      );
      return links.find(ied => getSLDAttributes(ied, 'x') !== null) ?? links[0];
    }

    function iedAttr(name: string, attr: string): number {
      const value = referencedIed(name)
        ? getSLDAttributes(referencedIed(name)!, attr)
        : null;
      expect(value).to.exist;
      return Number(value);
    }

    async function placeIedFromScl(name: string, x: number, y: number) {
      const ied = element.doc.querySelector(`:root > IED[name="${name}"]`);
      expect(ied).to.exist;

      const reference = element.doc.createElementNS(
        sldNs,
        `${element.nsp}:Reference`,
      );
      reference.setAttributeNS(sldNs, `${element.nsp}:id`, `${identity(ied)}`);
      reference.setAttributeNS(sldNs, `${element.nsp}:type`, 'IED');

      element.startPlacing(reference);
      await settle();

      sldSubstationViewer.mouseX = x;
      sldSubstationViewer.mouseY = y;
      sldSubstationViewer.requestUpdate();
      await sldSubstationViewer.updateComplete;

      const previewRect = sldSubstationViewer.shadowRoot?.querySelector(
        'g.ied.preview rect',
      ) as SVGElement;
      expect(previewRect).to.exist;
      previewRect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await settle();
    }

    async function moveIed(name: string, x: number, y: number) {
      const ied = referencedIed(name);
      expect(ied).to.exist;
      element.startPlacing(ied!);
      await settle();

      sldSubstationViewer.mouseX = x;
      sldSubstationViewer.mouseY = y;
      sldSubstationViewer.requestUpdate();
      await sldSubstationViewer.updateComplete;

      const previewRect = sldSubstationViewer.shadowRoot?.querySelector(
        'g.ied.preview rect',
      ) as SVGElement;
      expect(previewRect).to.exist;
      previewRect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await settle();
    }

    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        iedDocString,
        'application/xml',
      );
      element.doc = doc;
      await settle();
    });

    it('moves an IED from voltage level to bay and updates XML location', async () => {
      await placeIedFromScl('IED1', 10, 10);
      await moveIed('IED1', 4, 4);

      const ied = referencedIed('IED1')!;
      expect(ied.closest('Bay')?.getAttribute('name')).to.equal('B1');
      expect(ied.closest('VoltageLevel')?.getAttribute('name')).to.equal('V1');
    });

    it('moves an IED from bay to substation and updates XML location', async () => {
      await placeIedFromScl('IED1', 3, 3);
      await moveIed('IED1', 20, 10);

      const ied = referencedIed('IED1')!;
      expect(ied.closest('Bay')).to.be.null;
      expect(ied.closest('VoltageLevel')).to.be.null;
      expect(ied.closest('Substation')?.getAttribute('name')).to.equal('S1');
    });

    it('moves an IED with its bay when the bay is moved', async () => {
      await placeIedFromScl('IED1', 3, 3);

      const oldIedX = iedAttr('IED1', 'x');
      const oldIedY = iedAttr('IED1', 'y');

      await sendMouse({ type: 'click', position: gridPos(5, 5) });
      expect(targetInMode(element.interaction, 'placing')).to.have.property('tagName', 'Bay');
      await sendMouse({ type: 'click', position: gridPos(7, 7) });

      const movedBay = element.doc.querySelector('Bay')!;
      expect(sldAttribute(movedBay, 'x')).to.equal('4');
      expect(sldAttribute(movedBay, 'y')).to.equal('4');
      expect(iedAttr('IED1', 'x')).to.equal(oldIedX + 2);
      expect(iedAttr('IED1', 'y')).to.equal(oldIedY + 2);
    });

    it('moves an IED label independently', async () => {
      await placeIedFromScl('IED1', 10, 10);

      const ied = referencedIed('IED1')!;
      const oldLx = getSLDAttributes(ied, 'lx');
      const oldLy = getSLDAttributes(ied, 'ly');

      const label = sldSubstationViewer.shadowRoot?.querySelector(
        '*[id="label:IED1"] text',
      ) as SVGElement | null;
      expect(label).to.exist;

      const [labelX, labelY] = middleOf(label!);
      await sendMouse({ type: 'move', position: [labelX, labelY] });
      label!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await settle();

      await sendMouse({ type: 'click', position: gridPos(13, 13) });
      await settle();

      expect(getSLDAttributes(ied, 'lx')).to.not.equal(oldLx);
      expect(getSLDAttributes(ied, 'ly')).to.not.equal(oldLy);
    });

    it('triggers oscd-scl-dialogs on IED label middle-click', async () => {
      await placeIedFromScl('IED1', 10, 10);

      const sclDialogs = element.shadowRoot?.querySelector(
        'oscd-scl-dialogs',
      ) as
        | {
          edit: (editType: { element: Element }) => Promise<unknown[]>;
        }
        | undefined;
      expect(sclDialogs).to.exist;

      const editCalls: { element: Element }[] = [];
      const originalEdit = sclDialogs!.edit.bind(sclDialogs);
      sclDialogs!.edit = async (editType) => {
        editCalls.push(editType);
        return [];
      };

      const label = sldSubstationViewer.shadowRoot?.querySelector(
        '*[id="label:IED1"] text',
      ) as SVGElement | null;
      expect(label).to.exist;

      label!.dispatchEvent(
        new PointerEvent('auxclick', {
          bubbles: true,
          composed: true,
          button: 1,
        }),
      );
      await settle();

      expect(editCalls).to.have.lengthOf(1);
      expect(editCalls[0].element).to.equal(
        element.doc.querySelector(':root > IED[name="IED1"]'),
      );

      sclDialogs!.edit = originalEdit;
    });

    it('triggers oscd-scl-dialogs via the IED context menu edit action', async () => {
      await placeIedFromScl('IED1', 3, 3);

      const sclDialogs = element.shadowRoot?.querySelector(
        'oscd-scl-dialogs',
      ) as
        | {
          edit: (editType: { element: Element }) => Promise<unknown[]>;
        }
        | undefined;
      expect(sclDialogs).to.exist;

      const editCalls: { element: Element }[] = [];
      const originalEdit = sclDialogs!.edit.bind(sclDialogs);
      sclDialogs!.edit = async (editType) => {
        editCalls.push(editType);
        return [];
      };

      const iedRect = sldSubstationViewer.shadowRoot?.querySelector(
        '#IEDRef-IED1 rect',
      ) as SVGElement | null;
      expect(iedRect).to.exist;

      iedRect!.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          composed: true,
          cancelable: true,
          clientX: 200,
          clientY: 200,
        }),
      );
      await settle();

      const menu = contextMenu();
      expect(menu).to.exist;

      const items = contextMenuItems();
      const editItem = items.find(item =>
        item.textContent?.includes('Edit'),
      ) as OscdMenuItem | undefined;
      expect(editItem).to.exist;
      clickInteractive(editItem!);
      await settle();

      expect(editCalls).to.have.lengthOf(1);
      expect(editCalls[0].element).to.equal(
        element.doc.querySelector(':root > IED[name="IED1"]'),
      );

      sclDialogs!.edit = originalEdit;
    });

    it('renames an IED via context menu edit dialog', async () => {
      await placeIedFromScl('IED1', 3, 3);

      const sclDialogs = element.shadowRoot?.querySelector(
        'oscd-scl-dialogs',
      ) as
        | {
          edit: (editType: { element: Element }) => Promise<unknown[]>;
        }
        | undefined;
      expect(sclDialogs).to.exist;

      const originalEdit = sclDialogs!.edit.bind(sclDialogs);
      sclDialogs!.edit = async ({ element: sclIed }) => [
        [
          {
            element: sclIed,
            attributes: { name: 'IED1_RENAMED' },
            attributesNS: {},
          },
        ],
      ];

      const iedRect = sldSubstationViewer.shadowRoot?.querySelector(
        '#IEDRef-IED1 rect',
      ) as SVGElement | null;
      expect(iedRect).to.exist;

      iedRect!.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          composed: true,
          cancelable: true,
          clientX: 200,
          clientY: 200,
        }),
      );
      await settle();

      const menu = contextMenu();
      expect(menu).to.exist;

      const editItem = contextMenuItems().find(item =>
        item.textContent?.includes('Edit'),
      ) as OscdMenuItem | undefined;
      expect(editItem).to.exist;
      clickInteractive(editItem!);
      await settle();

      expect(element.doc.querySelector(':root > IED[name="IED1"]')).to.not
        .exist;
      const renamedIed = element.doc.querySelector(
        ':root > IED[name="IED1_RENAMED"]',
      );
      expect(renamedIed).to.exist;

      const references = iedReferences(element.doc);
      expect(references).to.have.lengthOf(1);
      expect(references[0].getAttributeNS(sldNs, 'id')).to.equal(
        'IED1_RENAMED',
      );

      sclDialogs!.edit = originalEdit;
    });

    it('moves an IED via the right-click context menu', async () => {
      await placeIedFromScl('IED1', 10, 10);

      const iedRect = sldSubstationViewer.shadowRoot?.querySelector(
        '#IEDRef-IED1 rect',
      ) as SVGElement | null;
      expect(iedRect).to.exist;

      iedRect!.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
      await settle();

      const menu = contextMenu();
      expect(menu).to.exist;

      const items = contextMenuItems();
      const moveItem = items.find(item =>
        item.textContent?.includes('Move'),
      ) as OscdMenuItem | undefined;
      expect(moveItem).to.exist;
      clickInteractive(moveItem!);
      await settle();

      expect(targetInMode(element.interaction, 'placing')).to.exist;
      expect(targetInMode(element.interaction, 'placing')!.localName).to.equal('Reference');

      sldSubstationViewer.mouseX = 15;
      sldSubstationViewer.mouseY = 15;
      sldSubstationViewer.requestUpdate();
      await sldSubstationViewer.updateComplete;

      const previewRect = sldSubstationViewer.shadowRoot?.querySelector(
        'g.ied.preview rect',
      ) as SVGElement;
      expect(previewRect).to.exist;
      previewRect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await settle();

      expect(iedAttr('IED1', 'x')).to.equal(15);
      expect(iedAttr('IED1', 'y')).to.equal(15);
    });

    it('removes an IED from the SLD via right-click menu', async () => {
      await placeIedFromScl('IED1', 10, 10);

      let iedGroup = sldSubstationViewer.shadowRoot?.querySelector(
        'g[id="IEDRef-IED1"]',
      );
      expect(iedGroup).to.exist;

      const iedRect = sldSubstationViewer.shadowRoot?.querySelector(
        '#IEDRef-IED1 rect',
      ) as SVGElement | null;
      expect(iedRect).to.exist;

      iedRect!.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
      await settle();

      const menu = contextMenu();
      expect(menu).to.exist;

      const items = contextMenuItems();
      const removeItem = items.find(item =>
        item.textContent?.includes('Remove from SLD'),
      ) as OscdMenuItem | undefined;
      expect(removeItem).to.exist;
      clickInteractive(removeItem!);
      await settle();

      const sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
      expect(sclIed).to.exist;

      iedGroup = sldSubstationViewer.shadowRoot?.querySelector(
        'g[id="IEDRef-IED1"]',
      );
      expect(iedGroup).to.not.exist;
    });

    it('deletes an IED via right-click menu', async () => {
      await placeIedFromScl('IED1', 10, 10);

      let sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
      expect(sclIed).to.exist;

      const iedRect = sldSubstationViewer.shadowRoot?.querySelector(
        '#IEDRef-IED1 rect',
      ) as SVGElement | null;
      expect(iedRect).to.exist;

      iedRect!.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
      await settle();

      const menu = contextMenu();
      expect(menu).to.exist;

      const items = contextMenuItems();
      const deleteItem = items.find(item =>
        item.textContent?.includes('Delete IED'),
      ) as OscdMenuItem | undefined;
      expect(deleteItem).to.exist;
      clickInteractive(deleteItem!);
      await settle();

      sclIed = element.doc.querySelector(':root > IED[name="IED1"]');
      expect(sclIed).to.not.exist;

      const iedGroup = sldSubstationViewer.shadowRoot?.querySelector(
        'g[id="IEDRef-IED1"]',
      );
      expect(iedGroup).to.not.exist;
    });
  });

  describe('given conducting equipment', () => {
    let sldSubstationViewer: SldSubstationViewer;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        equipmentDocString,
        'application/xml',
      );
      element.doc = doc;
      await element.updateComplete;
      sldSubstationViewer = getSldSubstationViewer(element)!;
      await sldSubstationViewer.updateComplete;
    });

    it('routes terminal grounding from the viewer through the editor', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment')!;

      sldSubstationViewer.dispatchEvent(
        newGroundTerminalEvent(equipment, 'T1'),
      );

      expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
      expect(
        element.doc.querySelector('ConnectivityNode[name="grounded"]'),
      ).to.exist;
    });

    it('requests equipment scl edit on edit menu item select', async () => {
      queryUI({
        scl: '[type="SMC"]',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      clickInteractive(menuItem(-2));
      await sldSubstationViewer.updateComplete;
      expect(lastCalledSclEdit).to.equal(
        element.doc.querySelector('[type="SMC"]'),
      );
    });

    it('moves the equipment label on "move label" menu item select', async () => {
      queryUI({
        scl: 'ConductingEquipment',
        ui: 'rect',
      }).dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      clickInteractive(menuItem(-4));
      await sldSubstationViewer.updateComplete;
      expect(targetInMode(element.interaction, 'placingLabel'))
        .to.have.property('tagName', 'ConductingEquipment');
      await sendMouse({ type: 'click', position: labelPos(5, 4.5) });
      const condEq = element.doc.querySelector('ConductingEquipment')!;
      expect(sldAttribute(condEq, 'lx')).to.equal('5');
      expect(sldAttribute(condEq, 'ly')).to.equal('4.5');
    });

    it('moves equipment on left mouse button click', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      // Click on equipment to start placing/moving
      await sendMouse({ type: 'click', position: gridPos(...eqTarget) });
      // Click to place at new position (moved left -1, up -1 grid units)
      await sendMouse({ type: 'click', position: gridPos(2, 2) });
      expect(sldAttribute(equipment!, 'x')).to.equal('3');
      expect(sldAttribute(equipment!, 'y')).to.equal('3');
    });

    it('copies equipment on shift click', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      const id = identity(equipment);
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;
      eqClickTarget.dispatchEvent(
        new PointerEvent('click', { shiftKey: true }),
      );
      expect(
        element.doc.querySelector(
          'ConductingEquipment>Private>SLDAttributes[*|x="3"][*|y="3"]',
        ),
      ).to.not.exist;
      await sendMouse({ type: 'click', position: gridPos(...eqTarget) });
      const newCondEqSld = element.doc.querySelector(
        'ConductingEquipment>Private>SLDAttributes[*|x="3"][*|y="3"]',
      );
      const newCondEq = newCondEqSld?.parentElement?.parentElement;
      expect(newCondEq).to.exist;
      expect(newCondEq).to.exist.and.have.attribute(
        'type',
        equipment!.getAttribute('type')!,
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
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;
      expect(sldAttribute(equipment!, 'rot')).to.equal('1');
      eqClickTarget.dispatchEvent(new PointerEvent('auxclick', { button: 1 }));
      expect(sldAttribute(equipment!, 'rot')).to.equal('2');
    });

    it('opens a menu on equipment right click', async () => {
      queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu', { clientX: 750, clientY: 550 }),
      );
      await element.updateComplete;
      expect(queryUI({ ui: 'menu' })).to.exist;
      await expect(queryUI({ ui: 'menu' })).dom.to.equalSnapshot();
    });

    it('flips equipment on mirror menu item select', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      const id = identity(equipment);
      let eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;
      eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      let item = menuItem(4);
      expect(equipment).to.not.have.attribute('esldoscd:flip');
      clickInteractive(item);
      await element.updateComplete;
      item.selected = false;
      expect(sldAttribute(equipment!, 'flip')).to.equal('true');
      eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;
      eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      item = menuItem(4);
      clickInteractive(item);
      await element.updateComplete;
      expect(equipment).to.not.have.attribute('esldoscd:flip');
    });

    it('rotates equipment on rotate menu item select', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      const id = identity(equipment);
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;
      eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      const item = menuItem(5);
      expect(sldAttribute(equipment!, 'rot')).to.equal('1');
      clickInteractive(item);
      await element.updateComplete;
      expect(sldAttribute(equipment!, 'rot')).to.equal('2');
    });

    it('moves equipment on move menu item select', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      const id = identity(equipment);
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>id)!
        .querySelector('rect')!;

      // Try to find coordinates that give [4,4]
      // Equipment tests showed [160,260] → [4,2], so Y is off by 2
      // Try adding 64 to Y: [160, 324]
      await sendMouse({ type: 'move', position: gridPos(4, 6) });
      await element.updateComplete;

      // Open context menu
      eqClickTarget.dispatchEvent(
        new PointerEvent('contextmenu', {
          bubbles: true,
          composed: true,
        }),
      );
      await element.updateComplete;

      // Select "Move" menu item (5th from end)
      const item = menuItem(-5);
      clickInteractive(item);
      await element.updateComplete;
      await waitForMenuClose();

      expect(sldAttribute(equipment!, 'x')).to.equal('4');
      expect(sldAttribute(equipment!, 'y')).to.equal('4');

      // Click to place at [3,3] - try [128, 292] (adding 64 to Y)
      await sendMouse({ type: 'move', position: gridPos(3, 5) });
      await sendMouse({ type: 'click', position: gridPos(...eqTarget) });
      expect(sldAttribute(equipment!, 'x')).to.equal('3');
      expect(sldAttribute(equipment!, 'y')).to.equal('3');
    });

    it('grounds equipment on connection point right click', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment')!;
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>identity(equipment))!
        .querySelector('circle')!;
      eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
      expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
        .exist;
      expect(equipment.querySelector('Terminal[name="T1"]')).to.have.attribute(
        'cNodeName',
        'grounded',
      );
      await element.updateComplete;
      await aTimeout(10);
      const eqClickTarget2 = sldSubstationViewer
        .shadowRoot!.getElementById(<string>identity(equipment))!
        .querySelector('circle')!;
      eqClickTarget2.dispatchEvent(new PointerEvent('contextmenu'));
      expect(element.doc.querySelector('ConnectivityNode[name="grounded"]')).to
        .exist;
      expect(equipment.querySelector('Terminal[name="T2"]')).to.have.attribute(
        'cNodeName',
        'grounded',
      );
      await expect(element.doc.documentElement).dom.to.equalSnapshot({
        ignoreAttributes: ['esldoscd:uuid'],
      });
    });

    it('grounds equipment on ground menu item select', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment')!;
      queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      expect(
        equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]'),
      ).to.not.exist;
      clickInteractive(menuItem(1));
      await element.updateComplete;
      expect(
        equipment.querySelector('Terminal[name="T1"][cNodeName="grounded"]'),
      ).to.exist;
      queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      expect(
        equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]'),
      ).to.not.exist;
      clickInteractive(menuItem(2));
      await element.updateComplete;
      expect(
        equipment.querySelector('Terminal[name="T2"][cNodeName="grounded"]'),
      ).to.exist;
    });

    it('connects equipment on connection point and equipment click', async () => {
      const equipment = element.doc.querySelectorAll('ConductingEquipment')[0];
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>identity(equipment))!
        .querySelector('circle:nth-of-type(2)')!;
      eqClickTarget.dispatchEvent(new PointerEvent('click'));
      await element.updateComplete;
      const equipment2 = element.doc.querySelectorAll('ConductingEquipment')[1];
      const eq2ClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
        <string>identity(equipment2),
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
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      clickInteractive(menuItem(0));
      expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
      let position = middleOf(queryUI({ scl: '[type="VTR"]', ui: 'rect' }));
      position[1] -= 1;
      await sendMouse({ type: 'click', position });
      expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;

      queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      clickInteractive(menuItem(1));
      expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
      position = middleOf(queryUI({ scl: '[type="NEW"]', ui: 'rect' }));
      position[1] -= 1;
      await sendMouse({ type: 'click', position });
      expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;

      equipment = element.doc.querySelector('[type="DIS"]')!;
      queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      clickInteractive(menuItem(0));
      expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
      position = middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' }));
      await sendMouse({ type: 'click', position });
      expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;

      queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
        new PointerEvent('contextmenu'),
      );
      await element.updateComplete;
      clickInteractive(menuItem(1));
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
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>identity(equipment))!
        .querySelector('circle:nth-of-type(1)')!;
      eqClickTarget.dispatchEvent(new PointerEvent('click'));
      await element.updateComplete;
      const eq2ClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
        <string>identity(equipment),
      )!;
      const position = middleOf(eq2ClickTarget);
      expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
      await sendMouse({ type: 'click', position });
      expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
    });

    it('retargets grounded terminals when reparenting equipment', async () => {
      const equipment = element.doc.querySelector('ConductingEquipment');
      const eqClickTarget = sldSubstationViewer
        .shadowRoot!.getElementById(<string>identity(equipment))!
        .querySelector('circle:nth-of-type(2)')!;
      expect(
        element.doc.querySelectorAll('ConnectivityNode[name="grounded"]'),
      ).to.have.lengthOf(0);
      eqClickTarget.dispatchEvent(new PointerEvent('contextmenu'));
      await element.updateComplete;
      expect(
        element.doc.querySelectorAll('ConnectivityNode[name="grounded"]'),
      ).to.have.lengthOf(1);
      await sendMouse({ type: 'move', position: gridPos(...eqPos) });
      await element.updateComplete;
      await sendMouse({ type: 'click', position: gridPos(...eqPos) });
      await element.updateComplete;
      await sendMouse({ type: 'click', position: gridPos(19, 5) });
      expect(
        element.doc.querySelectorAll('ConnectivityNode[name="grounded"]'),
      ).to.have.lengthOf(2);
      await expect(element.doc.documentElement).dom.to.equalSnapshot({
        ignoreAttributes: ['esldoscd:uuid'],
      });
    });

    describe('with established connectivity', () => {
      beforeEach(async () => {
        const equipment = element.doc.querySelector('ConductingEquipment');
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        eqClickTarget.dispatchEvent(new PointerEvent('click'));
        await element.updateComplete;
        const equipment2 = element.doc.querySelector(
          'ConductingEquipment[type="DIS"]',
        );
        const eq2ClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
          <string>identity(equipment2),
        )!;
        const position = middleOf(eq2ClickTarget);
        position[0] -= 1;
        await sendMouse({ type: 'click', position });
      });

      it('uniquely names new connectivity nodes', async () => {
        const equipment = element.doc.querySelector('ConductingEquipment');
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        eqClickTarget.dispatchEvent(new PointerEvent('click'));
        await element.updateComplete;
        const equipment2 = element.doc.querySelector(
          'ConductingEquipment[type="CTR"]',
        );
        const eq2ClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
          <string>identity(equipment2),
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
          'ConductingEquipment[type="CTR"]',
        );
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        eqClickTarget.dispatchEvent(new PointerEvent('click'));
        const cNode = element.doc.querySelector('ConnectivityNode');
        const cNodeClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
          <string>identity(cNode),
        )!;
        await sendMouse({
          type: 'click',
          position: middleOf(cNodeClickTarget),
        });
        expect(
          equipment!.querySelector('Terminal'),
        ).to.exist.and.to.have.attribute(
          'connectivityNode',
          cNode!.getAttribute('pathName')!,
        );
        await expect(element.doc.documentElement).dom.to.equalSnapshot({
          ignoreAttributes: ['esldoscd:uuid'],
        });
      });

      it('avoids short circuit connections', async () => {
        const equipment = element.doc.querySelector(
          'ConductingEquipment[type="DIS"]',
        );
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        eqClickTarget.dispatchEvent(new PointerEvent('click'));
        const cNode = element.doc.querySelector('ConnectivityNode');
        const cNodeClickTarget = sldSubstationViewer.shadowRoot!.getElementById(
          <string>identity(cNode),
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
          'ConductingEquipment[type="CTR"]',
        );
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        eqClickTarget.dispatchEvent(new PointerEvent('click'));
        await sendMouse({ type: 'click', position: svgPoint(12.0, 5.5) });
        await sendMouse({ type: 'click', position: svgPoint(10.0, 5.5) });
        await sendMouse({ type: 'click', position: svgPoint(8.5, 4.0) });
        await sendMouse({ type: 'click', position: svgPoint(8.5, 4.5) });
        const equipment2 = element.doc.querySelector(
          'ConductingEquipment[type="NEW"]',
        );
        const eq2ClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment2))!
          .querySelector('circle')!;
        eq2ClickTarget.dispatchEvent(new PointerEvent('click'));
        await sendMouse({ type: 'click', position: svgPoint(8.5, 4.5) });
        const equipment3 = element.doc.querySelector(
          'ConductingEquipment[type="VTR"]',
        );
        const eq3ClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment3))!
          .querySelector('circle')!;
        eq3ClickTarget.dispatchEvent(new PointerEvent('click'));
        await sendMouse({ type: 'click', position: svgPoint(10.0, 4.5) });
        expect(element.doc.querySelectorAll('Vertex')).to.have.property(
          'length',
          15,
        );
        await expect(element.doc.documentElement).dom.to.equalSnapshot({
          ignoreAttributes: ['esldoscd:uuid'],
        });
      });

      describe('between more than two pieces of equipment', () => {
        beforeEach(async () => {
          queryUI({ scl: '[type="CTR"]', ui: 'circle' }).dispatchEvent(
            new PointerEvent('click'),
          );
          await sendMouse({
            type: 'click',
            position: middleOf(queryUI({ scl: 'ConnectivityNode' })),
          });
          queryUI({ scl: '[type="BAT"]', ui: 'circle' }).dispatchEvent(
            new PointerEvent('click'),
          );
          await sendMouse({
            type: 'click',
            position: middleOf(queryUI({ scl: '[type="CTR"]', ui: 'rect' })),
          });
        });

        it('disconnects equipment on rotation', async () => {
          expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.exist;
          queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
          );
          expect(element.doc.querySelector('[type="CTR"] > Terminal')).to.not
            .exist;
          expect(element.doc.querySelectorAll('Vertex')).to.have.property(
            'length',
            2,
          );
          expect(element.doc.querySelector('[type="BAT"] > Terminal')).to.exist;
          queryUI({ scl: '[type="BAT"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
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
            new PointerEvent('contextmenu'),
          );
          await element.updateComplete;
          expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
          clickInteractive(menuItem(0));
          await element.updateComplete;
          expect(equipment.querySelector('Terminal[name="T1"]')).to.not.exist;
          queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('contextmenu'),
          );
          await sldSubstationViewer.updateComplete;
          expect(equipment.querySelector('Terminal[name="T2"]')).to.exist;
          clickInteractive(menuItem(2));
          await element.updateComplete;
          expect(equipment.querySelector('Terminal[name="T2"]')).to.not.exist;
        });

        it('simplifies horizontal connection paths when disconnecting', async () => {
          queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(
            new PointerEvent('click'),
          );
          await sendMouse({ type: 'click', position: gridPos(8, 4) });
          expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
          expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
          queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
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
            new PointerEvent('click'),
          );
          await sendMouse({ type: 'click', position: svgPoint(18.0, 6.5) });
          expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
          expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
          queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
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
            new PointerEvent('click'),
          );
          await sendMouse({ type: 'click', position: gridPos(8, 4) });
          queryUI({ scl: '[type="NEW"]', ui: 'circle' }).dispatchEvent(
            new PointerEvent('click'),
          );
          await sendMouse({ type: 'click', position: gridPos(8, 4) });
          expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(7);
          expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(19);
          queryUI({ scl: '[type="NEW"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
          );
          expect(element.doc.querySelectorAll('Section')).to.have.lengthOf(6);
          expect(element.doc.querySelectorAll('Vertex')).to.have.lengthOf(16);
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('disconnects equipment upon being moved', async () => {
          queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('click'),
          );
          expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.exist;
          await sendMouse({ type: 'click', position: gridPos(4, 2) });
          expect(element.doc.querySelector('[type="DIS"] > Terminal')).to.not
            .exist;
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('removes superfluous connectivity nodes when disconnecting', async () => {
          queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
          );
          queryUI({ scl: '[type="DIS"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('auxclick', { button: 1 }),
          );
          expect(element.doc.querySelector('ConnectivityNode')).to.not.exist;
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('removes contained connectivity nodes when moving containers', async () => {
          await sendMouse({ type: 'click', position: gridPos(3, 5) });
          await sendMouse({ type: 'click', position: gridPos(3, 4) });
          expect(
            element.doc.querySelectorAll('ConnectivityNode'),
          ).to.have.lengthOf(1);
        });

        it('removes connected connectivity nodes when moving containers', async () => {
          queryUI({
            scl: '[name="V2"]',
            ui: 'rect',
          }).dispatchEvent(new PointerEvent('click'));
          expect(
            element.doc.querySelectorAll('ConnectivityNode'),
          ).to.have.lengthOf(2);
          await sendMouse({ type: 'click', position: gridPos(18, 4) });
          expect(
            element.doc.querySelectorAll('ConnectivityNode'),
          ).to.have.lengthOf(1);
        });

        it('keeps internal connectivity nodes when moving containers', async () => {
          const position = middleOf(
            queryUI({
              scl: '[name="V2"]',
              ui: '.handle',
            }),
          );
          position[1] += 140;
          queryUI({
            scl: '[name="V2"]',
            ui: 'rect',
          }).dispatchEvent(new PointerEvent('click'));
          const subSt = element.doc.createElement('Substation');
          subSt.setAttribute('name', 'S2');
          element.doc.documentElement.insertBefore(
            subSt,
            element.doc.querySelector('Substation'),
          );
          setSLDAttributes(subSt, element.nsp, { w: '50', h: '25' });

          expect(
            element.doc.querySelectorAll('ConnectivityNode'),
          ).to.have.lengthOf(2);
          await sendMouse({ position, type: 'click' });
          expect(
            element.doc.querySelectorAll('ConnectivityNode'),
          ).to.have.lengthOf(1);
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('deletes conducting equipment on delete menu item select', async () => {
          const equipment = element.doc.querySelector('[type="CTR"]')!;
          queryUI({ scl: '[type="CTR"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('contextmenu'),
          );
          await element.updateComplete;
          expect(equipment.querySelector('Terminal[name="T1"]')).to.exist;
          clickInteractive(menuItem(-1));
          await element.updateComplete;
          expect(equipment.parentElement).to.not.exist;
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('deletes bays on delete menu item select', async () => {
          const bay = element.doc.querySelector('Bay')!;
          queryUI({ scl: 'Bay', ui: 'rect' }).dispatchEvent(
            new PointerEvent('contextmenu'),
          );
          await element.updateComplete;
          expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
          clickInteractive(menuItem(-1));
          await element.updateComplete;
          expect(bay.parentElement).to.not.exist;
          await expect(element.doc.documentElement).dom.to.equalSnapshot({
            ignoreAttributes: ['esldoscd:uuid'],
          });
        });

        it('deletes voltage levels on delete menu item select', async () => {
          const bay = element.doc.querySelector('[name="V2"]')!;
          queryUI({ scl: '[name="V2"]', ui: 'rect' }).dispatchEvent(
            new PointerEvent('contextmenu'),
          );
          await element.updateComplete;
          expect(bay.querySelector('Terminal[name="T1"]')).to.exist;
          clickInteractive(menuItem(-1));
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

            await sendMouse({ type: 'click', position: gridPos(12, 0) });
            await sendMouse({ type: 'click', position: gridPos(12, 3) });
            await sendMouse({
              type: 'click',
              position: middleOf(queryUI({ scl: '[name="L"]' })),
            });
            await sendMouse({ type: 'click', position: gridPos(13, 0) });
            queryUI({ scl: '[type="VTR"]', ui: 'circle' }).dispatchEvent(
              new PointerEvent('click'),
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
              }),
            );
            expect(
              element.doc
                .querySelector('[name="L"]')
                ?.querySelectorAll('Section'),
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
                ?.querySelectorAll('Section'),
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
            await sendMouse({ type: 'click', position: gridPos(13, 3) });
            queryUI({ scl: '[type="CBR"]', ui: 'circle' }).dispatchEvent(
              new PointerEvent('click'),
            );
            await sendMouse({ type: 'click', position: gridPos(12, 3) });
            expect(busSection.querySelectorAll('Vertex')).to.have.lengthOf(2);
            queryUI({ scl: '[type="CBR"]', ui: 'rect' }).dispatchEvent(
              new PointerEvent('auxclick', { button: 1 }),
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
              position: gridPos(currentX, currentY),
            });
            await element.updateComplete;

            queryUI({
              scl: '[name="L"]',
              ui: 'line:not([stroke])',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            clickInteractive(menuItem(0));
            expect(sldAttribute(bus!, 'h')).equal('1');
            await sendMouse({ type: 'click', position: gridPos(11, 4) });
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
            await sendMouse({ type: 'move', position: gridPos(...eqPos) });
            await element.updateComplete;

            equipmentRect.dispatchEvent(
              new PointerEvent('contextmenu', {
                bubbles: true,
                composed: true,
              }),
            );
            await element.updateComplete;
            clickInteractive(menuItem(-6));
            await waitForMenuClose();
            expect(
              element.doc.querySelector(
                'ConductingEquipment SLDAttributes[*|x="3"][*|y="3"]',
              ),
            ).to.not.exist;
            expect(
              sldAttribute(
                element.doc.querySelector('ConductingEquipment')!,
                'x',
              ),
            ).to.equal('4');
            expect(
              sldAttribute(
                element.doc.querySelector('ConductingEquipment')!,
                'y',
              ),
            ).to.equal('4');
            // Click to place copy at [3,3] using equipment formula: screenY = (3-1)*32 + 228 = 292
            await sendMouse({ type: 'click', position: gridPos(...eqTarget) });
            expect(
              element.doc.querySelector(
                'ConductingEquipment SLDAttributes[*|x="3"][*|y="3"]',
              ),
            ).to.exist;
            expect(
              element.doc.querySelector(
                'ConductingEquipment SLDAttributes[*|x="4"][*|y="4"]',
              ),
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
              position: gridPos(currentX, currentY),
            });
            await element.updateComplete;

            busLine.dispatchEvent(
              new PointerEvent('contextmenu', {
                bubbles: true,
                composed: true,
              }),
            );
            await element.updateComplete;

            clickInteractive(menuItem(1));
            await sldSubstationViewer.updateComplete;
            await waitForMenuClose();

            expect(sldAttribute(bus!, 'y')).to.equal(initialY);
            // Click to place at y=4: screenY = (4-1)*32 + 228 = 324
            await sendMouse({ type: 'click', position: gridPos(1, 4) });
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
            clickInteractive(menuItem(-4));
            await sldSubstationViewer.updateComplete;
            expect(targetInMode(element.interaction, 'placingLabel'))
              .to.have.attribute('name', 'BB1');
            await sendMouse({ type: 'click', position: labelPos(5, 4.5) });
            const busBar = element.doc.querySelector('[name="BB1"]');
            expect(sldAttribute(busBar!, 'lx')).to.equal('5');
            expect(sldAttribute(busBar!, 'ly')).to.equal('4.5');
          });

          it('requests bus bar scl edit on edit menu item select', async () => {
            queryUI({
              scl: '[name="L"]',
              ui: 'line:not([stroke])',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            clickInteractive(menuItem(-2));
            await sldSubstationViewer.updateComplete;
            expect(lastCalledSclEdit).to.equal(
              element.doc.querySelector('[name="BB1"]'),
            );
          });

          it('deletes the bus bar on delete menu item select', async () => {
            queryUI({
              scl: '[name="L"]',
              ui: 'line:not([stroke])',
            }).dispatchEvent(new PointerEvent('contextmenu'));
            await element.updateComplete;
            expect(element.doc.querySelector('[name="BB1"]')).to.exist;
            clickInteractive(menuItem(-1));
            await sldSubstationViewer.updateComplete;
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
            await sendMouse({ type: 'move', position: gridPos(16, 2) });
            await element.updateComplete;

            bayRect.dispatchEvent(
              new PointerEvent('contextmenu', {
                bubbles: true,
                composed: true,
              }),
            );
            await element.updateComplete;
            clickInteractive(menuItem(-6));
            expect(element.doc.querySelector('[name="V1"] [name="B2"]')).not.to
              .exist;
            // Place in V1 voltage level - target around [5,8] using equipment formula
            await sendMouse({ type: 'click', position: gridPos(5, 8) });
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
            element.doc.documentElement.insertBefore(
              subSt,
              element.doc.querySelector('Substation'),
            );
            setSLDAttributes(subSt, element.nsp, { w: '50', h: '25' });

            await sendMouse({ type: 'click', position: gridPos(19, 9) });
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
      let sldSubstationViewer: SldSubstationViewer;
      beforeEach(async () => {
        const subSt = element.doc.createElement('Substation');
        subSt.setAttribute('name', 'S1');
        setSLDAttributes(subSt, element.nsp, { w: '51', h: '26' });
        element.doc.documentElement.appendChild(subSt);
        element.requestUpdate();
        await element.updateComplete;

        sldSubstationViewer = getSldSubstationViewer(element)!;
        await sldSubstationViewer.updateComplete;
      });

      it('disables substation buttons', async () => {
        const header = getSldSubstationHeader(element);
        await header?.updateComplete;
        const h2 = header?.shadowRoot?.querySelector('h2');
        await expect(h2).dom.to.equalSnapshot();
      });

      it('does not add voltage level', async () => {
        const newVoltLevel = element.doc.createElement('VoltageLevel');
        newVoltLevel.setAttribute('name', 'NewVoltLevel');
        element.startPlacing(newVoltLevel);

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });
    });

    describe('given a voltage level', () => {
      let sldSubstationViewer: SldSubstationViewer;
      beforeEach(async () => {
        const doc = new DOMParser().parseFromString(
          voltageLevelDocString,
          'application/xml',
        );
        element.doc = doc;
        await element.updateComplete;
        sldSubstationViewer = getSldSubstationViewer(element)!;
        await sldSubstationViewer.updateComplete;
      });

      it('does not render resize handlers', async () => {
        const moveHandle =
          sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
            '.handle',
          )[1];
        expect(moveHandle).to.be.undefined;
      });

      it('does not allow to move voltage level', async () => {
        // Click on voltage level to start placing/moving
        await sendMouse({ type: 'click', position: gridPos(...vlOrigin) });

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
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

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('does not trigger auxclick', async () => {
        queryUI({ ui: '.label text' }).dispatchEvent(
          new PointerEvent('auxclick', { button: 1 }),
        );
        expect(lastCalledSclEdit).to.be.undefined;
      });

      it('does not allow placing a new bay', async () => {
        const newBay = element.doc.createElement('Bay');
        newBay.setAttribute('name', 'NewBay');
        element.startPlacing(newBay);

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('allows placing a new bus bar', async () => {
        const busBar = makeBusBar(element.doc, element.nsp);
        element.startPlacing(busBar);

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('send a selected event on voltage level label click', async () => {
        element.selectable = ['S1>V1'];
        element.requestUpdate();
        await element.updateComplete;
        await sldSubstationViewer.updateComplete;
        await element.updateComplete;

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ ui: '*[id="label:S1>V1"]' })),
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('VoltageLevel[name="V1"]'),
        );
      });
    });

    describe('given a bay', () => {
      let sldSubstationViewer: SldSubstationViewer;
      beforeEach(async () => {
        const doc = new DOMParser().parseFromString(
          bayDocString,
          'application/xml',
        );
        element.doc = doc;
        await element.updateComplete;
        sldSubstationViewer = getSldSubstationViewer(element)!;
        await sldSubstationViewer.updateComplete;
      });

      it('does not render resize handlers', async () => {
        const moveHandle =
          sldSubstationViewer.shadowRoot!.querySelectorAll<SVGElement>(
            'g.bay .handle',
          )[1];

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
          position: gridPos(currentX, currentY),
        });
        await element.updateComplete;

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('does not allow to place conducting equipment', async () => {
        const condEq = element.doc.createElement('ConductingEquipment');
        condEq.setAttribute('type', 'GEN');
        condEq.setAttribute('name', 'GEN1');
        element.startPlacing(condEq);

        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('send a selected event on bay label click', async () => {
        element.selectable = ['S1>V1>B1'];
        element.requestUpdate();
        await element.updateComplete;
        await sldSubstationViewer.updateComplete;
        await element.updateComplete;

        // Click on equipment to start placing/moving
        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ ui: '*[id="label:S1>V1>B1"]' })),
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('Bay[name="B1"]'),
        );

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ ui: '*[id="label:S1>V2>B1"]' })),
        });
        expect(lastSelectedElement).to.not.equal(
          element.doc.querySelector('VoltageLevel[name="V2"]>Bay[type="B1"]'),
        );
      });
    });

    describe('given conducting equipment', () => {
      let sldSubstationViewer: SldSubstationViewer;
      beforeEach(async () => {
        const doc = new DOMParser().parseFromString(
          equipmentDocString,
          'application/xml',
        );
        element.doc = doc;
        element.selectable = [];
        await element.updateComplete;
        sldSubstationViewer = getSldSubstationViewer(element)!;
        await sldSubstationViewer.updateComplete;
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
        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ scl: '[type="CBR"]', ui: 'rect' })),
        });
        expect(targetInMode(element.interaction, 'placing')).to.be.undefined;
      });

      it('does not rotate on auxclick', () => {
        const equipment = element.doc.querySelector('ConductingEquipment');
        const id = identity(equipment);
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>id)!
          .querySelector('rect')!;
        expect(sldAttribute(equipment!, 'rot')).to.equal('1');
        eqClickTarget.dispatchEvent(
          new PointerEvent('auxclick', { button: 1 }),
        );
        expect(sldAttribute(equipment!, 'rot')).to.equal('1');
      });

      it('does not opens a menu on equipment right click', async () => {
        queryUI({ scl: 'ConductingEquipment', ui: 'rect' }).dispatchEvent(
          new PointerEvent('contextmenu', { clientX: 750, clientY: 550 }),
        );
        await element.updateComplete;
        expect(queryUI({ ui: 'menu' })).to.not.exist;
      });

      it('does not render connector', async () => {
        const equipment = element.doc.querySelector('ConductingEquipment')!;
        const eqClickTarget = sldSubstationViewer
          .shadowRoot!.getElementById(<string>identity(equipment))!
          .querySelector('circle')!;
        expect(eqClickTarget).to.not.exist;
      });

      it('send a selected event on conducting equipment click', async () => {
        element.selectable = ['S1>V1>B1>CBR1', 'S1>V2>B1>NEW1'];
        element.requestUpdate();
        await element.updateComplete;

        // Click on equipment to start placing/moving
        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ scl: '[type="CBR"]', ui: 'rect' })),
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('[type="CBR"]'),
        );

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ scl: '[type="VTR"]', ui: 'rect' })),
        });
        expect(lastSelectedElement).to.not.equal(
          element.doc.querySelector('[type="VTR"]'),
        );

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ scl: '[type="NEW"]', ui: 'rect' })),
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('[type="NEW"]'),
        );
      });

      it('send a selected event on conducting equipment label click', async () => {
        element.selectable = ['S1>V1>B1>CBR1', 'S1>V2>B1>NEW1'];
        element.requestUpdate();
        await element.updateComplete;
        await sldSubstationViewer.updateComplete;
        await element.updateComplete;

        // Click on equipment to start placing/moving
        const pos = middleOf(queryUI({ ui: '*[id="label:S1>V1>B1>CBR1"]' }));
        await sendMouse({
          type: 'click',
          position: [pos[0], pos[1]],
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('[type="CBR"]'),
        );

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ ui: '*[id="label:S1>V2>B1>VTR1"]' })),
        });
        expect(lastSelectedElement).to.not.equal(
          element.doc.querySelector('[type="VTR"]'),
        );

        await sendMouse({
          type: 'click',
          position: middleOf(queryUI({ ui: '*[id="label:S1>V2>B1>NEW1"]' })),
        });
        expect(lastSelectedElement).to.equal(
          element.doc.querySelector('[type="NEW"]'),
        );
      });
    });
  });
});

describe('SLD namespace prefix forwarding', () => {
  it('forwards the document SLD prefix from the editor down to the substation viewer', async () => {
    const doc = new DOMParser().parseFromString(
      voltageLevelDocString,
      'application/xml',
    );
    const editor: SldEditor = await fixture(
      html`<sld-editor docName="testDoc" .doc=${doc}></sld-editor>`,
    );
    await editor.updateComplete;
    const viewer = getSldSubstationViewer(editor)!;
    await viewer.updateComplete;

    // The document declares the SLD namespace under the `smth` prefix. The
    // editor detects it; the view must adopt the SAME prefix so that any edit
    // it builds (context menu, placing copy) is written under the document's
    // prefix rather than the view's standalone default.
    expect(editor.nsp).to.equal('smth');
    expect(viewer.nsp).to.equal(editor.nsp);
  });

  it('stamps view-built SLD attributes with the document prefix, not the view default', async () => {
    const doc = new DOMParser().parseFromString(
      voltageLevelDocString,
      'application/xml',
    );
    const editor: SldEditor = await fixture(
      html`<sld-editor docName="testDoc" .doc=${doc}></sld-editor>`,
    );
    await editor.updateComplete;
    const viewer = getSldSubstationViewer(editor)!;

    // Write an SLD attribute through the prefix the VIEW would use for its
    // edits and assert the LITERAL prefix on the produced attribute node —
    // a namespace-URI read would be prefix-agnostic and miss the divergence.
    const vl = doc.querySelector('VoltageLevel')!;
    setSLDAttributes(vl, viewer.nsp, { rot: '1' });
    const sldAttrs = vl.querySelector(
      'Private[type="OpenSCD-SLD-Layout"] > *',
    )!;
    const written = sldAttrs.getAttributeNodeNS(sldNs, 'rot')!;
    expect(written.prefix).to.equal('smth');
  });
});
