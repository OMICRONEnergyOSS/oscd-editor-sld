import { expect } from '@open-wc/testing';

import {
  busBarVertexEdits,
  createDeleteBusBarEdits,
  createDeleteContainerEdits,
  createFlipElementEdits,
  createGroundTerminalEdits,
  createAddTextEdit,
  createRemoveTextEdits,
  createResizeTLEdits,
  createRotateEdits,
  disconnectExternalEdits,
  rewireTerminalEdits,
  shiftDescendantEdits,
  shiftElementEdits,
  shiftTextEdits,
  wrapIedReferenceEdits,
} from './edits.js';
import { sldNs } from '../foundations.js';
import { createSCLDoc, sldFixture } from '../test-helpers.js';

function bayWithTextLayout(): XMLDocument {
  return createSCLDoc(`
    <Substation name="S1">
      <VoltageLevel name="V1">
        <Bay name="B1">
          <Private type="OpenSCD-SLD-Layout">
            <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
            <smth:TextLayout smth:lx="2" smth:ly="3"/>
          </Private>
          <Text>Note</Text>
        </Bay>
      </VoltageLevel>
    </Substation>
  `);
}

describe('edits', () => {
  describe('createGroundTerminalEdits', () => {
    it('creates edits for grounding a terminal', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createGroundTerminalEdits(eq, 'T1');
      expect(edits).to.not.be.null;
      expect(edits!.length).to.be.greaterThan(0);
    });

    it('creates a ConnectivityNode named "grounded" if not present', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createGroundTerminalEdits(eq, 'N1')!;
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      const cNodeInsert = insertEdits.find(
        e => (e.node as Element).tagName === 'ConnectivityNode',
      );
      expect(cNodeInsert).to.not.be.undefined;
      expect(cNodeInsert!.node.getAttribute('name')).to.equal('grounded');
    });

    it('reuses existing grounded ConnectivityNode', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
              <ConnectivityNode name="grounded" pathName="S1/V1/B1/grounded"/>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createGroundTerminalEdits(eq, 'T1')!;
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      const cNodeInsert = insertEdits.find(
        e => (e.node as Element).tagName === 'ConnectivityNode',
      );
      expect(cNodeInsert).to.be.undefined;
    });

    it('creates a NeutralPoint for N-prefixed terminals', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createGroundTerminalEdits(eq, 'N1')!;
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      const npInsert = insertEdits.find(
        e => (e.node as Element).tagName === 'NeutralPoint',
      );
      expect(npInsert).to.not.be.undefined;
    });

    it('returns null when equipment has no Bay parent', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <ConductingEquipment name="Q1" type="CBR"/>
        </Substation>
      `);
      const eq = doc.querySelector('ConductingEquipment')!;
      expect(createGroundTerminalEdits(eq, 'T1')).to.be.null;
    });
  });

  describe('createFlipElementEdits', () => {
    it('returns edit to toggle flip attribute', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createFlipElementEdits(eq, 'smth');
      expect(edits.length).to.be.greaterThan(0);
    });

    it('sets flip to "true" when currently not flipped', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createFlipElementEdits(eq, 'smth');
      const updateEdit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      const nsAttrs = updateEdit.attributesNS[sldNs];
      expect(nsAttrs[`smth:flip`]).to.equal('true');
    });

    it('removes flip when currently flipped', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1" smth:flip="true"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createFlipElementEdits(eq, 'smth');
      const updateEdit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      const nsAttrs = updateEdit.attributesNS[sldNs];
      expect(nsAttrs[`smth:flip`]).to.be.null;
    });

    it('also removes first winding terminals for PowerTransformer', () => {
      const doc = sldFixture({ children: `
              <PowerTransformer name="T1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1"/>
                </Private>
                <TransformerWinding name="W1">
                  <Terminal name="T1" connectivityNode="S1/V1/B1/L1"/>
                  <Terminal name="T2" connectivityNode="S1/V1/B1/L1"/>
                </TransformerWinding>
                <TransformerWinding name="W2">
                  <Terminal name="T1" connectivityNode="S1/V1/B1/L1"/>
                </TransformerWinding>
              </PowerTransformer>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1"/>
            ` });
      const pt = doc.querySelector('PowerTransformer')!;
      const edits = createFlipElementEdits(pt, 'smth');
      expect(edits.length).to.be.greaterThan(1);
      const nodeEdits = edits.filter(
        e => 'node' in e && (e as { node: Node }).node instanceof Element,
      );
      expect(nodeEdits.length).to.be.greaterThan(0);
    });

    it('also removes NeutralPoints for earthing transformers', () => {
      const doc = sldFixture({ children: `
              <PowerTransformer name="T1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:w="1" smth:h="1" smth:kind="earthing"/>
                </Private>
                <TransformerWinding name="W1">
                  <Terminal name="T1" connectivityNode="S1/V1/B1/L1"/>
                  <NeutralPoint name="N1" connectivityNode="S1/V1/B1/L1"/>
                </TransformerWinding>
              </PowerTransformer>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1"/>
            ` });
      const pt = doc.querySelector('PowerTransformer')!;
      const edits = createFlipElementEdits(pt, 'smth');
      expect(edits.length).to.be.greaterThan(1);
    });
  });

  describe('createAddTextEdit', () => {
    it('creates a Text element with label position', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="5" smth:w="1" smth:h="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const [textEdit, layoutEdit] = createAddTextEdit(eq, 'smth') as {
        node: Element;
        parent: Element;
        reference: Element | null;
      }[];
      expect(textEdit.node.tagName).to.equal('Text');
      expect(textEdit.parent).to.equal(eq);
      expect(layoutEdit.node.localName).to.equal('TextLayout');
      expect(layoutEdit.node.getAttributeNS(sldNs, 'lx')).to.equal('3');
      expect(layoutEdit.parent).to.equal(eq.querySelector('Private'));
    });
  });

  describe('createRemoveTextEdits', () => {
    it('removes the Text and its TextLayout', () => {
      const doc = bayWithTextLayout();
      const text = doc.querySelector('Text')!;
      const edits = createRemoveTextEdits(text) as { node: Element }[];
      expect(edits.map(e => e.node.localName)).to.deep.equal([
        'Text',
        'TextLayout',
      ]);
    });
  });

  describe('createDeleteBusBarEdits', () => {
    it('removes the connectivity node and the bay', () => {
      const doc = sldFixture({ bayName: "BB1", children: `
              <ConnectivityNode name="L" pathName="S1/V1/BB1/L">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section smth:bus="true">
                    <smth:Vertex smth:x="0.5" smth:y="0.5"/>
                    <smth:Vertex smth:x="1.5" smth:y="0.5"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const bay = doc.querySelector('Bay')!;
      const edits = createDeleteBusBarEdits(bay);
      expect(edits.length).to.be.greaterThan(1);
      const removedNodes = edits
        .filter((e): e is { node: Element } => 'node' in e && !('parent' in e))
        .map(e => e.node);
      expect(removedNodes).to.include(bay);
    });
  });

  describe('createDeleteContainerEdits', () => {
    it('removes the container element', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="10" smth:h="10"/>
            </Private>
            <Bay name="B1">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="2" smth:y="2" smth:w="5" smth:h="5"/>
              </Private>
            </Bay>
          </VoltageLevel>
        </Substation>
      `);
      const vl = doc.querySelector('VoltageLevel')!;
      const edits = createDeleteContainerEdits(vl);
      const removedNodes = edits
        .filter((e): e is { node: Element } => 'node' in e && !('parent' in e))
        .map(e => e.node);
      expect(removedNodes).to.include(vl);
    });

    it('removes foreign connectivity nodes when terminals reference external nodes', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="20" smth:h="20"/>
            </Private>
            <Bay name="B1">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="2" smth:y="2" smth:w="5" smth:h="5"/>
              </Private>
              <ConductingEquipment name="Q1" type="CBR">
                <Terminal name="T1" connectivityNode="S1/V1/B2/L1"/>
              </ConductingEquipment>
            </Bay>
            <Bay name="B2">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="10" smth:y="2" smth:w="5" smth:h="5"/>
              </Private>
              <ConnectivityNode name="L1" pathName="S1/V1/B2/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section>
                    <smth:Vertex smth:x="0.5" smth:y="0.5"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            </Bay>
          </VoltageLevel>
        </Substation>
      `);
      const b1 = doc.querySelector('Bay[name="B1"]')!;
      const edits = createDeleteContainerEdits(b1);
      expect(edits.length).to.be.greaterThan(1);
    });
  });

  describe('createRotateEdits', () => {
    it('increments rotation by 1', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="1"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createRotateEdits(eq, 'smth');
      const updateEdit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      expect(updateEdit.attributesNS[sldNs]['smth:rot']).to.equal('2');
    });

    it('wraps rotation from 3 back to 0', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="3"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createRotateEdits(eq, 'smth');
      const updateEdit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      expect(updateEdit.attributesNS[sldNs]['smth:rot']).to.equal('0');
    });

    it('removes non-grounded terminals from ConductingEquipment', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="0"/>
                </Private>
                <Terminal name="T1" connectivityNode="S1/V1/B1/L1" cNodeName="L1"/>
                <Terminal name="T2" cNodeName="grounded"/>
              </ConductingEquipment>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section smth:bus="false">
                    <smth:Vertex smth:x="3" smth:y="2" smth:uuid="uid1"/>
                    <smth:Vertex smth:x="3" smth:y="3" smth:uuid="uid2"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createRotateEdits(eq, 'smth');
      // First edit is the rotation, remaining edits remove the non-grounded terminal
      expect(edits.length).to.be.greaterThan(1);
    });

    it('does not remove grounded terminals', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="0"/>
                </Private>
                <Terminal name="T1" cNodeName="grounded"/>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = createRotateEdits(eq, 'smth');
      // Only the rotation edit, no terminal removal
      expect(edits).to.have.length(1);
    });
  });

  describe('shiftElementEdits', () => {
    it('returns empty for Vertex elements', () => {
      const doc = sldFixture({ children: `
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section>
                    <smth:Vertex smth:x="2" smth:y="2"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const vertex = doc.getElementsByTagNameNS(sldNs, 'Vertex')[0]!;
      const edits = shiftElementEdits(vertex, 5, 5, 'smth');
      expect(edits).to.have.length(0);
    });

    it('shifts position and label for ConductingEquipment', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:lx="4" smth:ly="4"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = shiftElementEdits(eq, 5, 6, 'smth');
      expect(edits).to.have.length(1);
      const edit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      const ns = edit.attributesNS[sldNs];
      expect(ns['smth:x']).to.equal('5');
      expect(ns['smth:y']).to.equal('6');
      expect(ns['smth:lx']).to.equal('6');
      expect(ns['smth:ly']).to.equal('7');
    });

    it('applies default label offset for CE with no explicit label and even rotation', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="0"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = shiftElementEdits(eq, 5, 5, 'smth');
      const edit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      const ns = edit.attributesNS[sldNs];
      // Default label: lx = oldLX + 1 + dx, ly = oldLY + 1 + dy
      // oldLX=0 (no explicit lx → 0), dx=2 → lx=(0+1)+2=3, ly=(0+1)+2=3
      expect(ns['smth:lx']).to.equal('3');
      expect(ns['smth:ly']).to.equal('3');
    });

    it('applies default label offset for PowerTransformer with rot < 2', () => {
      const doc = sldFixture({ children: `
              <PowerTransformer name="T1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3" smth:rot="0"/>
                </Private>
                <TransformerWinding name="W1"/>
              </PowerTransformer>
            ` });
      const pt = doc.querySelector('PowerTransformer')!;
      const edits = shiftElementEdits(pt, 5, 5, 'smth');
      const edit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      const ns = edit.attributesNS[sldNs];
      // lx = (0 + 1.5) + 2 = 3.5
      expect(ns['smth:lx']).to.equal('3.5');
    });
  });

  describe('shiftTextEdits', () => {
    it('shifts the TextLayout of each Text by delta', () => {
      const doc = bayWithTextLayout();
      const bay = doc.querySelector('Bay')!;
      const edits = shiftTextEdits(bay, 2, 3, 'smth');
      expect(edits).to.have.length(1);
      const edit0 = edits[0] as {
        element: Element;
        attributesNS: Record<string, Record<string, string | null>>;
      };
      expect(edit0.element.localName).to.equal('TextLayout');
      expect(edit0.attributesNS[sldNs]['smth:lx']).to.equal('4');
      expect(edit0.attributesNS[sldNs]['smth:ly']).to.equal('6');
    });

    it('returns empty when no Text children', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            ` });
      const bay = doc.querySelector('Bay')!;
      const edits = shiftTextEdits(bay, 2, 3, 'smth');
      expect(edits).to.have.length(0);
    });
  });

  describe('shiftDescendantEdits', () => {
    it('shifts nested equipment and vertices by delta', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="2" smth:y="2" smth:lx="3" smth:ly="3"/>
                </Private>
              </ConductingEquipment>
            ` });
      const bay = doc.querySelector('Bay')!;
      const edits = shiftDescendantEdits(bay, 1, 2, 'smth');
      expect(edits).to.have.length(1);
      const edit = edits[0] as { attributesNS: Record<string, Record<string, string | null>> };
      expect(edit.attributesNS[sldNs]['smth:x']).to.equal('3');
      expect(edit.attributesNS[sldNs]['smth:y']).to.equal('4');
      expect(edit.attributesNS[sldNs]['smth:lx']).to.equal('4');
      expect(edit.attributesNS[sldNs]['smth:ly']).to.equal('5');
    });

    it('does not include lx/ly for Vertex descendants', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section>
                    <smth:Vertex smth:x="2" smth:y="2"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const bay = doc.querySelector('Bay')!;
      const edits = shiftDescendantEdits(bay, 1, 1, 'smth');
      // Should find the Vertex via querySelectorAll('Vertex') — but it's in SLD namespace
      // Actually querySelectorAll uses localName, so it matches
      const vertexEdits = edits.filter((e) => {
        const edit = e as { element?: Element };
        return edit.element?.localName === 'Vertex';
      });
      // Vertex edits should not have lx/ly
      vertexEdits.forEach((e) => {
        const edit = e as { attributesNS: Record<string, Record<string, string | null>> };
        expect(edit.attributesNS[sldNs]).to.not.have.property('smth:lx');
      });
    });
  });

  describe('rewireTerminalEdits', () => {
    it('returns empty for non-equipment elements', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            ` });
      const bay = doc.querySelector('Bay')!;
      const parent = doc.querySelector('VoltageLevel')!;
      const edits = rewireTerminalEdits(bay, parent, doc);
      expect(edits).to.have.length(0);
    });

    it('removes non-grounded terminals', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3"/>
                </Private>
                <Terminal name="T1" connectivityNode="S1/V1/B1/L1" cNodeName="L1"/>
              </ConductingEquipment>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section>
                    <smth:Vertex smth:x="3" smth:y="2" smth:uuid="u1"/>
                    <smth:Vertex smth:x="3" smth:y="3" smth:uuid="u2"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const bay = doc.querySelector('Bay')!;
      const edits = rewireTerminalEdits(eq, bay, doc);
      expect(edits.length).to.be.greaterThan(0);
    });

    it('re-points grounded terminals to destination bay', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Bay name="B1">
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3"/>
                </Private>
                <Terminal name="T1" cNodeName="grounded" connectivityNode="S1/V1/B1/grounded"
                  substationName="S1" voltageLevelName="V1" bayName="B1"/>
              </ConductingEquipment>
              <ConnectivityNode name="grounded" pathName="S1/V1/B1/grounded"/>
            </Bay>
            <Bay name="B2">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="5" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            </Bay>
          </VoltageLevel>
        </Substation>
      `);
      const eq = doc.querySelector('ConductingEquipment')!;
      const b2 = doc.querySelector('Bay[name="B2"]')!;
      const edits = rewireTerminalEdits(eq, b2, doc);
      // Should create a new grounded cNode in B2 and update terminal attributes
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      const cNodeInsert = insertEdits.find(
        e => (e.node as Element).tagName === 'ConnectivityNode',
      );
      expect(cNodeInsert).to.not.be.undefined;
      expect(cNodeInsert!.node.getAttribute('name')).to.equal('grounded');
    });
  });

  describe('disconnectExternalEdits', () => {
    it('returns empty for ConductingEquipment', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const edits = disconnectExternalEdits(eq, doc);
      expect(edits).to.have.length(0);
    });

    it('removes cNodes referenced by terminals outside the container', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Bay name="B1">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="2" smth:y="2"/>
                </Private>
                <Terminal name="T1" connectivityNode="S1/V1/B1/L1" cNodeName="L1"/>
              </ConductingEquipment>
              <ConnectivityNode name="L1" pathName="S1/V1/B1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section>
                    <smth:Vertex smth:x="2" smth:y="1" smth:uuid="u1"/>
                    <smth:Vertex smth:x="2" smth:y="2" smth:uuid="u2"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            </Bay>
            <Bay name="B2">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="5" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
              <ConductingEquipment name="Q2" type="DIS">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="6" smth:y="2"/>
                </Private>
                <Terminal name="T1" connectivityNode="S1/V1/B1/L1" cNodeName="L1"/>
              </ConductingEquipment>
            </Bay>
          </VoltageLevel>
        </Substation>
      `);
      const b1 = doc.querySelector('Bay[name="B1"]')!;
      const edits = disconnectExternalEdits(b1, doc);
      // B2's Q2 has a terminal referencing B1's cNode → should remove that cNode
      expect(edits.length).to.be.greaterThan(0);
    });

    it('returns empty when element is not in the document', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            ` });
      const bay = doc.querySelector('Bay')!;
      const detached = bay.cloneNode(true) as Element;
      const edits = disconnectExternalEdits(detached, doc);
      expect(edits).to.have.length(0);
    });
  });

  describe('busBarVertexEdits', () => {
    it('returns empty for non-Vertex elements', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            ` });
      const bay = doc.querySelector('Bay')!;
      const edits = busBarVertexEdits(bay, 5, 5, 'smth');
      expect(edits).to.have.length(0);
    });

    it('produces edits to resize a bus bar when moving its end vertex', () => {
      const doc = sldFixture({ bayName: "BB1", children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="2" smth:y="3" smth:w="4" smth:h="1"/>
              </Private>
              <ConnectivityNode name="L1" pathName="S1/V1/BB1/L1">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:Section smth:bus="true">
                    <smth:Vertex smth:x="2" smth:y="3"/>
                    <smth:Vertex smth:x="5" smth:y="3"/>
                  </smth:Section>
                </Private>
              </ConnectivityNode>
            ` });
      const vertex = doc.getElementsByTagNameNS(sldNs, 'Vertex')[1]!;
      const edits = busBarVertexEdits(vertex, 7, 3, 'smth');
      expect(edits.length).to.be.greaterThan(0);
    });
  });

  describe('wrapIedReferenceEdits', () => {
    it('returns empty for non-IED reference elements', () => {
      const doc = sldFixture({ children: `
              <ConductingEquipment name="Q1" type="CBR">
                <Private type="OpenSCD-SLD-Layout">
                  <smth:SLDAttributes smth:x="3" smth:y="3"/>
                </Private>
              </ConductingEquipment>
            ` });
      const eq = doc.querySelector('ConductingEquipment')!;
      const bay = doc.querySelector('Bay')!;
      const edits = wrapIedReferenceEdits(eq, bay, doc);
      expect(edits).to.have.length(0);
    });

    it('creates Private wrapper and moves IED reference into it', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Bay name="B1">
              <Private type="OpenSCD-SLD-Layout">
                <smth:Reference smth:type="IED" smth:id="IED1">
                  <smth:SLDAttributes smth:x="2" smth:y="2"/>
                </smth:Reference>
              </Private>
            </Bay>
            <Bay name="B2">
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="5" smth:y="1" smth:w="5" smth:h="5"/>
              </Private>
            </Bay>
          </VoltageLevel>
        </Substation>
      `);
      const iedRef = doc.getElementsByTagNameNS(sldNs, 'Reference')[0]!;
      const b2 = doc.querySelector('Bay[name="B2"]')!;
      const edits = wrapIedReferenceEdits(iedRef, b2, doc);
      // Should create new Private in B2 and move the reference there
      expect(edits.length).to.be.greaterThan(0);
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      expect(insertEdits.length).to.be.greaterThan(0);
    });

    it('reuses existing Private in target parent', () => {
      const doc = sldFixture({ children: `
              <Private type="OpenSCD-SLD-Layout">
                <smth:SLDAttributes smth:x="1" smth:y="1" smth:w="5" smth:h="5"/>
                <smth:Reference smth:type="IED" smth:id="IED1">
                  <smth:SLDAttributes smth:x="2" smth:y="2"/>
                </smth:Reference>
              </Private>
            ` });
      const iedRef = doc.getElementsByTagNameNS(sldNs, 'Reference')[0]!;
      const bay = doc.querySelector('Bay')!;
      const edits = wrapIedReferenceEdits(iedRef, bay, doc);
      // Already in the right Private — no new Private created
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      const privInsert = insertEdits.find(
        e => (e.node as Element).tagName === 'Private',
      );
      expect(privInsert).to.be.undefined;
    });

    it('creates a new Private when target parent has none', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Bay name="B1">
              <Private type="OpenSCD-SLD-Layout">
                <smth:Reference smth:type="IED" smth:id="IED1">
                  <smth:SLDAttributes smth:x="2" smth:y="2"/>
                </smth:Reference>
              </Private>
            </Bay>
            <Bay name="B2"/>
          </VoltageLevel>
        </Substation>
      `);
      const iedRef = doc.getElementsByTagNameNS(sldNs, 'Reference')[0]!;
      const b2 = doc.querySelector('Bay[name="B2"]')!;
      const edits = wrapIedReferenceEdits(iedRef, b2, doc);
      const insertEdits = edits.filter(
        (e): e is { parent: Element; node: Element; reference: Element | null } =>
          'parent' in e && 'node' in e,
      );
      // First insert should be a new Private into B2
      const privInsert = insertEdits.find(
        e =>
          (e.node as Element).tagName === 'Private' && e.parent === b2,
      );
      expect(privInsert).to.not.be.undefined;
      expect(
        (privInsert!.node as Element).getAttribute('type'),
      ).to.equal('OpenSCD-SLD-Layout');
      // Second insert moves the Reference into that new Private
      const refInsert = insertEdits.find(
        e => (e.node as Element).localName === 'Reference',
      );
      expect(refInsert).to.not.be.undefined;
    });
  });

  describe('createResizeTLEdits', () => {
    it('updates x, y, w, h in the returned edit', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="2" smth:y="3" smth:w="5" smth:h="4" smth:lx="6" smth:ly="7"/>
            </Private>
          </VoltageLevel>
        </Substation>
      `);
      const vl = doc.querySelector('VoltageLevel')!;
      const edit = createResizeTLEdits(vl, 'smth', 1, 1, 8, 6) as {
        attributesNS: Record<string, Record<string, string | null>>;
      };
      const ns = edit.attributesNS[sldNs];
      expect(ns['smth:x']).to.equal('1');
      expect(ns['smth:y']).to.equal('1');
      expect(ns['smth:w']).to.equal('8');
      expect(ns['smth:h']).to.equal('6');
    });

    it('shifts label when label position equals element position', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="4" smth:y="5" smth:w="3" smth:h="3" smth:lx="4" smth:ly="5"/>
            </Private>
          </VoltageLevel>
        </Substation>
      `);
      const vl = doc.querySelector('VoltageLevel')!;
      // Moving top-left from (4,5) to (2,3) → dx=-2, dy=-2
      const edit = createResizeTLEdits(vl, 'smth', 2, 3, 5, 5) as {
        attributesNS: Record<string, Record<string, string | null>>;
      };
      const ns = edit.attributesNS[sldNs];
      // lx = 4 + (2-4) = 2, ly = 5 + (3-5) = 3
      expect(ns['smth:lx']).to.equal('2');
      expect(ns['smth:ly']).to.equal('3');
    });

    it('does not shift label when label position differs from element position', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="4" smth:y="5" smth:w="3" smth:h="3" smth:lx="7" smth:ly="8"/>
            </Private>
          </VoltageLevel>
        </Substation>
      `);
      const vl = doc.querySelector('VoltageLevel')!;
      // Moving top-left from (4,5) to (2,3) but label (7,8) ≠ pos (4,5)
      const edit = createResizeTLEdits(vl, 'smth', 2, 3, 5, 5) as {
        attributesNS: Record<string, Record<string, string | null>>;
      };
      const ns = edit.attributesNS[sldNs];
      // Label stays at original values
      expect(ns['smth:lx']).to.equal('7');
      expect(ns['smth:ly']).to.equal('8');
    });

    it('handles zero label position matching zero element position', () => {
      const doc = createSCLDoc(`
        <Substation name="S1">
          <VoltageLevel name="V1">
            <Private type="OpenSCD-SLD-Layout">
              <smth:SLDAttributes smth:x="0" smth:y="0" smth:w="6" smth:h="4" smth:lx="0" smth:ly="0"/>
            </Private>
          </VoltageLevel>
        </Substation>
      `);
      const vl = doc.querySelector('VoltageLevel')!;
      const edit = createResizeTLEdits(vl, 'smth', 3, 2, 6, 4) as {
        attributesNS: Record<string, Record<string, string | null>>;
      };
      const ns = edit.attributesNS[sldNs];
      // lx = 0 + (3-0) = 3, ly = 0 + (2-0) = 2
      expect(ns['smth:lx']).to.equal('3');
      expect(ns['smth:ly']).to.equal('2');
    });
  });
});
