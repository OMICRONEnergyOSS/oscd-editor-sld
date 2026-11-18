import { html, LitElement } from 'lit';
import { fixture, expect, aTimeout, waitUntil } from '@open-wc/testing';

import { resetMouse, sendMouse } from '@web/test-runner-commands';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import { EditEventV2 } from '@openscd/oscd-api';
import { newEditEventV2 } from '@openscd/oscd-api/utils.js';
import { identity } from '@openscd/scl-lib';

import OscdEditorSld from './oscd-editor-sld.js';
import { SldSubstationViewer } from './sld-substation-viewer.js';
import { SldEditor } from './sld-editor.js';
import type { PlacementResult } from './sld-editor.js';
import { getSLDAttributes } from './foundations/sld-attributes.js';
import { iedReferences, resolveIed } from './foundations/ied.js';
import { targetInMode } from './foundations/interaction-mode.js';
import { sldNs } from './foundations.js';
import {
  findSubstationSvgRoot,
  gridPosToViewportCoords,
} from './test-helpers.js';

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

export const sldConvertDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4"
  xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0">
  <Header id="sld_convert" />
  <Substation name="S1" esld:w="30" esld:h="21">
    <VoltageLevel name="V2" esld:x="11" esld:y="1" esld:lx="11" esld:ly="1" esld:w="17" esld:h="20">
      <Bay name="BB1" esld:w="9" esld:x="16" esld:y="17" esld:lx="16" esld:ly="17" esld:h="1">
        <ConnectivityNode name="L" pathName="S1/V2/BB1/L">
          <Private type="Transpower-SLD-Vertices">
            <esld:Section bus="true">
              <esld:Vertex esld:x="16.5" esld:y="17.5" />
              <esld:Vertex esld:x="20.5" esld:y="17.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="16.5" esld:y="13.16"
                esld:uuid="542ed7a0-672e-42e2-ba5f-801a60a6655d" />
              <esld:Vertex esld:x="16.5" esld:y="12.5" />
              <esld:Vertex esld:x="20.5" esld:y="12.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="20.5" esld:y="12.5" />
              <esld:Vertex esld:x="20.5" esld:y="17.5" />
            </esld:Section>
            <esld:Section bus="true">
              <esld:Vertex esld:x="20.5" esld:y="17.5" />
              <esld:Vertex esld:x="24.5" esld:y="17.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="16.5" esld:y="11.16"
                esld:uuid="3e3078ef-9a17-4c51-b7e2-925d6b6fbee8" />
              <esld:Vertex esld:x="16.5" esld:y="11" />
              <esld:Vertex esld:x="20.5" esld:y="11" />
              <esld:Vertex esld:x="20.5" esld:y="12.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="25.2" esld:y="14.5"
                esld:uuid="489eb016-92e7-41be-b1cc-2372f5b4b5e5" />
              <esld:Vertex esld:x="26" esld:y="14.5" />
              <esld:Vertex esld:x="26" esld:y="17.5" />
              <esld:Vertex esld:x="24.5" esld:y="17.5" />
            </esld:Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1" esld:x="12" esld:y="2" esld:lx="12" esld:ly="2" esld:w="15" esld:h="18">
        <PowerTransformer type="PTR" esld:kind="earthing" name="PTR6" esld:x="24" esld:y="14"
          esld:lx="25.5" esld:ly="14">
          <TransformerWinding type="PTW" name="W1">
            <Terminal esld:uuid="00803a5a-0033-4efc-8070-a59a7730f271" name="T1"
              connectivityNode="S1/V2/B1/L1" substationName="S1" voltageLevelName="V2" bayName="B1"
              cNodeName="L1" />
            <NeutralPoint esld:uuid="489eb016-92e7-41be-b1cc-2372f5b4b5e5" name="N1"
              connectivityNode="S1/V2/BB1/L" substationName="S1" voltageLevelName="V2" bayName="BB1"
              cNodeName="L" />
          </TransformerWinding>
          <TransformerWinding type="PTW" name="W2" />
        </PowerTransformer>
        <PowerTransformer type="PTR" esld:kind="earthing" name="PTR5" esld:x="24" esld:y="12"
          esld:lx="25.5" esld:ly="12">
          <TransformerWinding type="PTW" name="W1" />
        </PowerTransformer>
        <PowerTransformer type="PTR" name="PTR4" esld:x="24" esld:y="9" esld:lx="25.5" esld:ly="9">
          <TransformerWinding type="PTW" name="W1" />
          <TransformerWinding type="PTW" name="W2" />
          <TransformerWinding type="PTW" name="W3" />
        </PowerTransformer>
        <PowerTransformer type="PTR" name="PTR3" esld:x="24" esld:y="6" esld:lx="25.5" esld:ly="6">
          <TransformerWinding type="PTW" name="W1">
            <NeutralPoint esld:uuid="e5176958-ddd9-4036-9b3e-0d894ae9b58a" name="N1"
              connectivityNode="S1/V2/B1/L1" substationName="S1" voltageLevelName="V2" bayName="B1"
              cNodeName="L1" />
          </TransformerWinding>
          <TransformerWinding type="PTW" name="W2" />
        </PowerTransformer>
        <PowerTransformer type="PTR" esld:kind="auto" name="PTR2" esld:x="24" esld:y="3"
          esld:lx="25.5" esld:ly="3">
          <TransformerWinding type="PTW" name="W1" />
          <TransformerWinding type="PTW" name="W2">
            <NeutralPoint esld:uuid="29451e72-1361-4418-a924-a1fbb6e5bfaa" name="N1"
              connectivityNode="S1/V2/B1/L1" substationName="S1" voltageLevelName="V2" bayName="B1"
              cNodeName="L1" />
          </TransformerWinding>
        </PowerTransformer>
        <PowerTransformer type="PTR" esld:kind="auto" esld:rot="3" name="PTR1" esld:x="21"
          esld:y="3" esld:lx="19" esld:ly="5">
          <TransformerWinding type="PTW" name="W1">
            <Terminal esld:uuid="72432f5f-153b-48d7-bd09-9c47bbe9f5b9" name="T1"
              connectivityNode="S1/V2/B1/L1" substationName="S1" voltageLevelName="V2" bayName="B1"
              cNodeName="L1" />
          </TransformerWinding>
        </PowerTransformer>
        <ConductingEquipment type="VTR" name="VTR1" esld:x="13" esld:y="15" esld:lx="14"
          esld:ly="16" />
        <ConductingEquipment type="SMC" name="SMC1" esld:x="16" esld:y="13" esld:lx="17"
          esld:ly="14">
          <Terminal esld:uuid="542ed7a0-672e-42e2-ba5f-801a60a6655d" name="T1"
            connectivityNode="S1/V2/BB1/L" substationName="S1" voltageLevelName="V2" bayName="BB1"
            cNodeName="L" />
        </ConductingEquipment>
        <ConductingEquipment type="SAR" name="SAR1" esld:x="13" esld:y="13" esld:lx="14"
          esld:ly="14" />
        <ConductingEquipment type="RES" name="RES1" esld:x="16" esld:y="11" esld:lx="17"
          esld:ly="12">
          <Terminal esld:uuid="3e3078ef-9a17-4c51-b7e2-925d6b6fbee8" name="T1"
            connectivityNode="S1/V2/BB1/L" substationName="S1" voltageLevelName="V2" bayName="BB1"
            cNodeName="L" />
        </ConductingEquipment>
        <ConductingEquipment type="REA" name="REA1" esld:x="13" esld:y="11" esld:lx="14"
          esld:ly="12" />
        <ConductingEquipment type="MOT" name="MOT1" esld:x="16" esld:y="9" esld:lx="17" esld:ly="10" />
        <ConductingEquipment type="IFL" name="IFL1" esld:x="13" esld:y="9" esld:lx="14" esld:ly="10" />
        <ConductingEquipment type="GEN" name="GEN1" esld:x="16" esld:y="7" esld:lx="17" esld:ly="8">
          <Terminal esld:uuid="61974884-1be1-4ba0-939b-34f0a43d987e" name="T1"
            connectivityNode="S1/V2/B1/L1" substationName="S1" voltageLevelName="V2" bayName="B1"
            cNodeName="L1" />
        </ConductingEquipment>
        <ConductingEquipment type="DIS" name="DIS1" esld:x="13" esld:y="7" esld:lx="14" esld:ly="8" />
        <ConductingEquipment type="CTR" name="CTR1" esld:x="16" esld:y="5" esld:lx="17" esld:ly="6" />
        <ConductingEquipment type="CBR" name="CBR1" esld:x="13" esld:y="5" esld:lx="14" esld:ly="6" />
        <ConductingEquipment type="CAP" name="CAP1" esld:x="16" esld:y="3" esld:lx="17" esld:ly="4" />
        <ConductingEquipment type="CAB" name="CAB1" esld:x="13" esld:y="3" esld:lx="14" esld:ly="4" />
        <ConnectivityNode name="L1" pathName="S1/V2/B1/L1">
          <Private type="Transpower-SLD-Vertices">
            <esld:Section>
              <esld:Vertex esld:x="23.8" esld:y="14.5"
                esld:uuid="00803a5a-0033-4efc-8070-a59a7730f271" />
              <esld:Vertex esld:x="21.5" esld:y="14.5" />
              <esld:Vertex esld:x="21.5" esld:y="6.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="21.5" esld:y="6.5" />
              <esld:Vertex esld:x="18.5" esld:y="6.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="20.3" esld:y="3.5"
                esld:uuid="72432f5f-153b-48d7-bd09-9c47bbe9f5b9" />
              <esld:Vertex esld:x="18.5" esld:y="3.5" />
              <esld:Vertex esld:x="18.5" esld:y="6.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="18.5" esld:y="6.5" />
              <esld:Vertex esld:x="16.5" esld:y="6.5" />
              <esld:Vertex esld:x="16.5" esld:y="7.16"
                esld:uuid="61974884-1be1-4ba0-939b-34f0a43d987e" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="23.8" esld:y="4.5"
                esld:uuid="29451e72-1361-4418-a924-a1fbb6e5bfaa" />
              <esld:Vertex esld:x="21.5" esld:y="4.5" />
              <esld:Vertex esld:x="21.5" esld:y="6.5" />
            </esld:Section>
            <esld:Section>
              <esld:Vertex esld:x="23.8" esld:y="6.5"
                esld:uuid="e5176958-ddd9-4036-9b3e-0d894ae9b58a" />
              <esld:Vertex esld:x="21.5" esld:y="6.5" />
            </esld:Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:lx="1" esld:ly="1" esld:w="9" esld:h="7">
      <Bay name="B1" esld:x="2" esld:y="2" esld:lx="2" esld:ly="2" esld:w="7" esld:h="5" />
    </VoltageLevel>
  </Substation>
</SCL>
`;

export const iedConvertDocString = `<?xml version="1.0" encoding="UTF-8"?>
  <SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2007" revision="B" release="4">
    <Header id="ied_convert_two"/>
    <Substation xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0" name="S1" esld:w="12" esld:h="7">
      <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:lx="1" esld:ly="1" esld:w="5" esld:h="5">
        <Bay name="B1" esld:x="2" esld:y="2" esld:lx="2" esld:ly="2" esld:w="3" esld:h="3">
          <Private type="OpenSCD-Linked-IEDs">
            <esld:IEDName esld:name="ACMEInc_DoAnything_01" esld:x="3" esld:y="3" esld:lx="4" esld:ly="4"/>
          </Private>
        </Bay>
      </VoltageLevel>
    </Substation>
    <IED name="ACMEInc_DoAnything_01" manufacturer="ACME Inc" type="DoAnything" configVersion="1.0">
      <AccessPoint name="AP1">
        <Server>
          <Authentication/>
          <LDevice inst="LD_PROT">
            <LN0 lnClass="LLN0" inst="" lnType="LLN0_Type"/>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <DataTypeTemplates>
      <LNodeType id="LLN0_Type" lnClass="LLN0"/>
    </DataTypeTemplates>
  </SCL>
  `;

export const iedLegacyCoordinatesDocString = `<?xml version="1.0" encoding="UTF-8"?>
  <SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2007" revision="B" release="4">
    <Header id="ied_convert_two" />
    <Substation name="S1" esld:w="12" esld:h="7">
      <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:lx="1" esld:ly="1" esld:w="5" esld:h="5">
        <Bay name="B1" esld:x="2" esld:y="2" esld:lx="2" esld:ly="2" esld:w="3" esld:h="3" />
      </VoltageLevel>
    </Substation>
    <Communication>
      <SubNetwork name="StationBus" type="8-MMS">
        <ConnectedAP iedName="ACMEInc_DoAnything_03" apName="AP1" />
        <ConnectedAP iedName="ACMEInc_DoAnything_02" apName="AP1" />
        <ConnectedAP iedName="ACMEInc_DoAnything_01" apName="AP1" />
      </SubNetwork>
    </Communication>
    <IED name="ACMEInc_DoAnything_03" manufacturer="ACME Inc" type="DoAnything" configVersion="1.0"
      esld:x="3" esld:y="3" esld:lx="4" esld:ly="4">
      <AccessPoint name="AP1">
        <Server>
          <Authentication />
          <LDevice inst="LD_PROT">
            <LN0 lnClass="LLN0" inst="" lnType="LLN0_Type" />
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="ACMEInc_DoAnything_02" manufacturer="ACME Inc" type="DoAnything" configVersion="1.0" />
    <IED name="ACMEInc_DoAnything_01" manufacturer="ACME Inc" type="DoAnything" configVersion="1.0" />
    <DataTypeTemplates>
      <LNodeType id="LLN0_Type" lnClass="LLN0" />
    </DataTypeTemplates>
  </SCL>
  `;

export const iedNameAndLegacyCoordinatesDocString = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:esld="https://transpower.co.nz/SCL/SSD/SLD/v0" version="2007" revision="B" release="4">
  <Header id="ied_convert_both"/>
  <Substation name="S1" esld:w="12" esld:h="7">
    <VoltageLevel name="V1" esld:x="1" esld:y="1" esld:lx="1" esld:ly="1" esld:w="5" esld:h="5">
      <Bay name="B1" esld:x="2" esld:y="2" esld:lx="2" esld:ly="2" esld:w="3" esld:h="3">
        <Private type="OpenSCD-Linked-IEDs">
          <esld:IEDName esld:name="ACMEInc_DoAnything_01" esld:x="3" esld:y="3" esld:lx="4" esld:ly="4"/>
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
  <IED name="ACMEInc_DoAnything_01" manufacturer="ACME Inc" type="DoAnything" configVersion="1.0" esld:x="9" esld:y="9" esld:lx="8" esld:ly="8"/>
  <DataTypeTemplates>
    <LNodeType id="LLN0_Type" lnClass="LLN0"/>
  </DataTypeTemplates>
</SCL>
`;

function getSldSubstationViewer(
  element: OscdEditorSld,
  substation?: Element,
): SldSubstationViewer | null | undefined {
  const editor = element.shadowRoot?.querySelector<SldEditor>('sld-editor');
  const viewers = Array.from(
    editor?.shadowRoot?.querySelectorAll('sld-substation-viewer') ?? [],
  ) as SldSubstationViewer[];
  if (substation) {
    return viewers.find(viewer => viewer.substation === substation) ?? null;
  }
  return viewers[0] ?? null;
}

function getToolbarRoot(element: OscdEditorSld): ShadowRoot | null | undefined {
  return element.shadowRoot?.querySelector('sld-toolbar')?.shadowRoot;
}

async function awaitToolbar(element: OscdEditorSld): Promise<void> {
  const toolbar = element.shadowRoot?.querySelector('sld-toolbar') as
    | LitElement
    | null
    | undefined;
  if (toolbar) {
    await toolbar.updateComplete;
  }
}

function queryToolbar<T extends HTMLElement>(
  element: OscdEditorSld,
  selector: string,
): T | null {
  return getToolbarRoot(element)?.querySelector<T>(selector) ?? null;
}

function clickInteractive(element: HTMLElement): void {
  const target =
    element.shadowRoot?.querySelector<HTMLElement>('#button, #item') ?? element;
  target.click();
}

async function waitForSubstationEditor(
  element: OscdEditorSld,
): Promise<{ sldEditor: SldEditor; sldSubstationViewer: SldSubstationViewer }> {
  let sldEditor: SldEditor;
  let sldSubstationViewer: SldSubstationViewer;

  await waitUntil(() => {
    const el = element.shadowRoot?.querySelector(
      'sld-editor',
    ) as SldEditor | null;
    if (!el?.shadowRoot) {
      return false;
    }
    const sub = el.shadowRoot.querySelector(
      'sld-substation-viewer',
    ) as SldSubstationViewer | null;
    if (!sub?.shadowRoot) {
      return false;
    }
    sldEditor = el;
    sldSubstationViewer = sub;
    return true;
  }, 'Timed out waiting for sld-substation-viewer');

  await sldEditor!.updateComplete;
  await sldSubstationViewer!.updateComplete;
  return { sldEditor: sldEditor!, sldSubstationViewer: sldSubstationViewer! };
}

function svgClientPosition(
  element: OscdEditorSld,
  x: number,
  y: number,
): [number, number] {
  const substationEditor = getSldSubstationViewer(element)!;
  return gridPosToViewportCoords(findSubstationSvgRoot(substationEditor), x, y);
}

/**
 * Drives a conversion the way the root orchestrates it: by emitting the
 * `sld-convert` contract event from the migration notice. Keeps the root spec
 * decoupled from the notice's button internals (those are covered in
 * `sld-migration-notice.spec.ts`).
 */
async function triggerConversion(element: OscdEditorSld): Promise<void> {
  const notice = element.shadowRoot!.querySelector('sld-migration-notice');
  expect(!!notice, 'migration notice is shown').to.be.true;
  notice!.dispatchEvent(
    new CustomEvent('sld-convert', { bubbles: true, composed: true }),
  );
  await element.updateComplete;
}

describe('SLD Editor', () => {
  let element: OscdEditorSld;
  let xmlEditor: XMLEditor;

  beforeEach(async () => {
    const doc = new DOMParser().parseFromString(
      emptyDocString,
      'application/xml',
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
      ></oscd-editor-sld>`,
    );
  });

  afterEach(async () => {
    await sendMouse({ type: 'click', position: [0, 0] });
    await resetMouse();
    window.scrollTo(0, 0);
  });

  it('shows a placeholder message while no document is loaded', async () => {
    element = await fixture(html`<oscd-editor-sld></oscd-editor-sld>`);
    expect(element.shadowRoot?.querySelector('p')?.textContent).to.contain(
      'SCL',
    );
  });

  it('does not declare the SLD namespace on load when the document has no SLD metadata', async () => {
    expect(element.doc.documentElement.hasAttribute('xmlns:eosld')).to.be.false;
    expect(xmlEditor.past.length).to.equal(0);
  });

  it('declares the SLD namespace as part of the first SLD edit, and removes it on undo', async () => {
    const scl = element.doc.documentElement;
    expect(scl.hasAttribute('xmlns:eosld')).to.be.false;
    const original = new XMLSerializer().serializeToString(element.doc);

    // a child fires a plain SLD edit (no namespace declaration of its own)
    const sldEditor = element.shadowRoot!.querySelector('sld-editor')!;
    sldEditor.dispatchEvent(
      newEditEventV2({
        element: scl,
        attributesNS: { [sldNs]: { 'eosld:test': '1' } },
      }),
    );
    await element.updateComplete;

    // the edit applied AND the namespace was declared, in a single undoable commit
    expect(scl.hasAttribute('xmlns:eosld')).to.be.true;
    expect(scl.getAttributeNS(sldNs, 'test')).to.equal('1');
    expect(xmlEditor.past.length).to.equal(1);

    // undoing the one user edit also removes the namespace declaration
    xmlEditor.undo();
    expect(scl.hasAttribute('xmlns:eosld')).to.be.false;
    expect(scl.getAttributeNS(sldNs, 'test')).to.equal(null);
    expect(new XMLSerializer().serializeToString(element.doc)).to.equal(
      original,
    );
  });

  it('asks to migrate legacy Text/Private layout, then moves it to TextLayout', async () => {
    element.doc = new DOMParser().parseFromString(
      `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:eosld="${sldNs}">
        <Substation name="S1">
          <Private type="OpenSCD-SLD-Layout"><eosld:SLDAttributes eosld:w="5" eosld:h="5"/></Private>
          <Text><Private type="OpenSCD-SLD-Layout"><eosld:SLDAttributes eosld:lx="3" eosld:ly="4"/></Private>Note</Text>
        </Substation>
      </SCL>`,
      'application/xml',
    );
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('sld-editor')).to.equal(null);

    await triggerConversion(element);

    expect(element.doc.querySelector('Text > Private')).to.equal(null);
    expect(
      element.doc
        .querySelector('Substation > Private > TextLayout')!
        .getAttributeNS(sldNs, 'lx'),
    ).to.equal('3');
    expect(element.shadowRoot!.querySelector('sld-migration-notice')).to.equal(
      null,
    );
  });

  it('converts old Transpower SLD layout to OpenSCD layout', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      sldConvertDocString,
      'application/xml',
    );
    await element.updateComplete;

    await triggerConversion(element);

    expect(element.doc.documentElement.hasAttribute('xmlns:eosld')).to.be.true;
    expect(element.doc.documentElement.hasAttribute('xmlns:esld')).to.be.false;
    expect(
      element.doc.querySelectorAll('Private[type="Transpower-SLD-Vertices"]')
        .length,
    ).to.equal(0);

    const substation = element.doc.querySelector('Substation[name="S1"]')!;
    expect(sldAttribute(substation, 'w')).to.equal('30');
    expect(sldAttribute(substation, 'h')).to.equal('21');
    expect(substation.getAttributeNS(oldNs, 'w')).to.equal(null);

    const voltageLevelV2 = element.doc.querySelector(
      'VoltageLevel[name="V2"]',
    )!;
    expect(sldAttribute(voltageLevelV2, 'x')).to.equal('11');
    expect(sldAttribute(voltageLevelV2, 'h')).to.equal('20');

    const ptr1 = element.doc.querySelector('PowerTransformer[name="PTR1"]')!;
    expect(sldAttribute(ptr1, 'kind')).to.equal('auto');
    expect(sldAttribute(ptr1, 'rot')).to.equal('3');

    const expectedConductingEquipment = {
      'VTR:VTR1': { x: '13', y: '15', lx: '14', ly: '16' },
      'SMC:SMC1': { x: '16', y: '13', lx: '17', ly: '14' },
      'SAR:SAR1': { x: '13', y: '13', lx: '14', ly: '14' },
      'RES:RES1': { x: '16', y: '11', lx: '17', ly: '12' },
      'REA:REA1': { x: '13', y: '11', lx: '14', ly: '12' },
      'MOT:MOT1': { x: '16', y: '9', lx: '17', ly: '10' },
      'IFL:IFL1': { x: '13', y: '9', lx: '14', ly: '10' },
      'GEN:GEN1': { x: '16', y: '7', lx: '17', ly: '8' },
      'DIS:DIS1': { x: '13', y: '7', lx: '14', ly: '8' },
      'CTR:CTR1': { x: '16', y: '5', lx: '17', ly: '6' },
      'CBR:CBR1': { x: '13', y: '5', lx: '14', ly: '6' },
      'CAP:CAP1': { x: '16', y: '3', lx: '17', ly: '4' },
      'CAB:CAB1': { x: '13', y: '3', lx: '14', ly: '4' },
    } as const;

    const conductingEquipment = Array.from(
      element.doc.querySelectorAll('ConductingEquipment'),
    );
    expect(conductingEquipment.length).to.equal(
      Object.keys(expectedConductingEquipment).length,
    );

    conductingEquipment.forEach((eq) => {
      const key = `${eq.getAttribute('type')}:${eq.getAttribute('name')}`;
      const expected =
        expectedConductingEquipment[
          key as keyof typeof expectedConductingEquipment
        ];
      expect(expected, `unexpected equipment ${key}`).to.exist;
      expect(getSLDAttributes(eq, 'x')).to.equal(expected.x);
      expect(getSLDAttributes(eq, 'y')).to.equal(expected.y);
      expect(getSLDAttributes(eq, 'lx')).to.equal(expected.lx);
      expect(getSLDAttributes(eq, 'ly')).to.equal(expected.ly);
    });

    const genTerminal = element.doc.querySelector(
      'ConductingEquipment[type="GEN"][name="GEN1"] > Terminal[name="T1"]',
    )!;
    expect(sldAttribute(genTerminal, 'uuid')).to.equal(
      '61974884-1be1-4ba0-939b-34f0a43d987e',
    );

    const bb1ConnNode = element.doc.querySelector(
      'ConnectivityNode[pathName="S1/V2/BB1/L"]',
    )!;
    const bb1Private = bb1ConnNode.querySelector(
      ':scope > Private[type="OpenSCD-SLD-Layout"]',
    );
    expect(!!bb1Private).to.be.true;
    expect(bb1Private!.querySelectorAll(':scope > Section').length).to.equal(6);
    expect(
      bb1Private!
        .querySelector(':scope > Section')
        ?.getAttributeNS(sldNs, 'bus'),
    ).to.equal('true');

    const oldLayoutAttributes = [
      'x',
      'y',
      'w',
      'h',
      'lx',
      'ly',
      'rot',
      'flip',
      'color',
      'weight',
      'kind',
      'uuid',
    ];

    const substationTree = Array.from(
      element.doc.querySelectorAll(':root > Substation, :root > Substation *'),
    );
    substationTree.forEach((node) => {
      oldLayoutAttributes.forEach((attr) => {
        expect(
          node.getAttributeNS(oldNs, attr),
          `${node.tagName} has esld:${attr}`,
        ).to.equal(null);
      });
    });
  });

  it('converts Transpower linked IED layout to Reference layout', async () => {
    element.doc = new DOMParser().parseFromString(
      iedConvertDocString,
      'application/xml',
    );
    await element.updateComplete;

    await triggerConversion(element);

    expect(
      element.doc.querySelectorAll('Private[type="OpenSCD-Linked-IEDs"]')
        .length,
    ).to.equal(0);
    expect(element.doc.querySelectorAll('IEDName').length).to.equal(0);

    const convertedReferences = iedReferences(element.doc);
    expect(convertedReferences.length).to.equal(1);

    const reference = convertedReferences[0];
    expect(reference.getAttributeNS(sldNs, 'type')).to.equal('IED');

    const ied = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_01"]',
    );
    expect(!!ied).to.be.true;
    expect(reference.getAttributeNS(sldNs, 'id')).to.equal(identity(ied!));
    expect(resolveIed(reference) === ied).to.be.true;

    const referenceAttrs = reference.querySelector(':scope > SLDAttributes');
    expect(!!referenceAttrs).to.be.true;
    expect(referenceAttrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');

    const parentPrivate = reference.parentElement;
    expect(parentPrivate?.tagName).to.equal('Private');
    expect(parentPrivate?.getAttribute('type')).to.equal('OpenSCD-SLD-Layout');
  });

  it('migrates legacy IED coordinates into Substation IED references', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      iedLegacyCoordinatesDocString,
      'application/xml',
    );
    await element.updateComplete;

    await triggerConversion(element);

    const iedWithLegacyCoords = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_03"]',
    )!;
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'x')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'y')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'lx')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'ly')).to.equal(null);

    const convertedReferences = iedReferences(element.doc);
    expect(convertedReferences.length).to.equal(1);

    const reference = convertedReferences[0];
    expect(reference.getAttributeNS(sldNs, 'type')).to.equal('IED');
    expect(reference.getAttributeNS(sldNs, 'id')).to.equal(
      identity(iedWithLegacyCoords),
    );

    const referenceAttrs = reference.querySelector(':scope > SLDAttributes');
    expect(!!referenceAttrs).to.be.true;
    expect(referenceAttrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');

    const substation = element.doc.querySelector(':root > Substation')!;
    expect(reference.closest('Substation') === substation).to.be.true;
    expect(reference.closest('Private')?.getAttribute('type')).to.equal(
      'OpenSCD-SLD-Layout',
    );
  });

  it('does not create duplicate IED references when legacy IEDName exists', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      iedNameAndLegacyCoordinatesDocString,
      'application/xml',
    );
    await element.updateComplete;

    await triggerConversion(element);

    const ied = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_01"]',
    )!;
    expect(ied.getAttributeNS(oldNs, 'x')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'y')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'lx')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'ly')).to.equal(null);

    const references = iedReferences(element.doc);
    expect(references.length).to.equal(1);
    expect(references[0].getAttributeNS(sldNs, 'id')).to.equal(identity(ied));

    const attrs = references[0].querySelector(':scope > SLDAttributes');
    expect(!!attrs).to.be.true;
    expect(attrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(attrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(attrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(attrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');
  });

  describe('zoom controls', () => {
    it('increases the grid size when zooming in', () => {
      const before = element.gridSize;
      element.zoomIn();
      expect(element.gridSize).to.equal(before + 3);
    });

    it('decreases the grid size when zooming out', () => {
      const before = element.gridSize;
      element.zoomOut();
      expect(element.gridSize).to.equal(before - 3);
    });

    it('clamps the grid size to a minimum of 2 when zooming out', () => {
      element.gridSize = 3;
      element.zoomOut();
      expect(element.gridSize).to.equal(2);
    });
  });

  describe('toolbar actions', () => {
    function dispatchOnToolbar(type: string, detail?: unknown): void {
      const toolbar = element.shadowRoot!.querySelector('sld-toolbar')!;
      toolbar.dispatchEvent(new CustomEvent(type, { detail }));
    }

    it('zooms in on a toolbar zoom event', () => {
      const before = element.gridSize;
      dispatchOnToolbar('zoom', { direction: 'in' });
      expect(element.gridSize).to.equal(before + 3);
    });

    it('zooms out on a toolbar zoom event', () => {
      const before = element.gridSize;
      dispatchOnToolbar('zoom', { direction: 'out' });
      expect(element.gridSize).to.equal(before - 3);
    });

    it('updates label and IED visibility on a view-change event', () => {
      dispatchOnToolbar('view-change', { showLabels: false, showIeds: false });
      expect(element.showLabels).to.be.false;
      expect(element.showIeds).to.be.false;
    });

    it('inserts imported IEDs when bay typical placement succeeds', async () => {
      const bayTypical = element.doc.createElement('Bay');
      const ied = element.doc.createElement('IED');
      ied.setAttribute('name', 'IED_A');
      element.sldEditor!.handleStartInteraction = () =>
        Promise.resolve({} as PlacementResult);

      const edits: EditEventV2[] = [];
      element.addEventListener('oscd-edit-v2', e =>
        edits.push(e as EditEventV2),
      );
      dispatchOnToolbar('start-placing-typical', { bayTypical, ieds: [ied] });
      await aTimeout(0);

      expect(edits.length).to.be.greaterThan(0);
      expect(element.doc.querySelector('IED[name="IED_A"]')).to.not.be.null;
    });

    it('does not insert IEDs when bay typical placement is aborted', async () => {
      const bayTypical = element.doc.createElement('Bay');
      const ied = element.doc.createElement('IED');
      ied.setAttribute('name', 'IED_B');
      element.sldEditor!.handleStartInteraction = () => Promise.resolve(undefined);

      const edits: EditEventV2[] = [];
      element.addEventListener('oscd-edit-v2', e =>
        edits.push(e as EditEventV2),
      );
      dispatchOnToolbar('start-placing-typical', { bayTypical, ieds: [ied] });
      await aTimeout(0);

      expect(edits.length).to.equal(0);
      expect(element.doc.querySelector('IED[name="IED_B"]')).to.be.null;
    });
  });

  describe('given a substation', () => {
    let sldEditor: SldEditor;
    beforeEach(async () => {
      await element.updateComplete;
      await awaitToolbar(element);
      // Click the Add Substation FAB in the toolbar
      const fab = queryToolbar<HTMLElement>(
        element,
        '[title="Add Substation"]',
      )!;
      clickInteractive(fab);
      await element.updateComplete;
      await awaitToolbar(element);
      const editors = await waitForSubstationEditor(element);
      sldEditor = editors.sldEditor;
    });

    it('allows placing a new voltage level', async () => {
      queryToolbar(element, '[title="Add VoltageLevel"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('VoltageLevel');
      const [x1, y1] = svgClientPosition(element, 5, 3);
      await sendMouse({ type: 'click', position: [x1, y1] });
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(sldEditor.interaction, 'resizingBR')?.tagName).to.equal('VoltageLevel');
      const [x2, y2] = svgClientPosition(element, 11, 10);
      await sendMouse({ type: 'click', position: [x2, y2] });
      await aTimeout(10); // Wait for quick machines
      expect(targetInMode(sldEditor.interaction, 'resizingBR')).to.be.undefined;
      const voltLv = element.doc.querySelector('VoltageLevel')!;
      expect(sldAttribute(voltLv, 'x')).to.equal('5');
      expect(sldAttribute(voltLv, 'y')).to.equal('3');
      expect(sldAttribute(voltLv, 'w')).to.equal('7');
      expect(sldAttribute(voltLv, 'h')).to.equal('8');
    });

    it('gives new voltage levels unique names', async () => {
      queryToolbar(element, '[title="Add VoltageLevel"]')?.click();
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 5, 3),
      });
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 8, 6),
      });
      queryToolbar(element, '[title="Add VoltageLevel"]')?.click();
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 10, 7),
      });
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 13, 11),
      });
      const [name1, name2] = Array.from(
        element.doc.querySelectorAll('VoltageLevel'),
      ).map(substation => substation.getAttribute('name'));
      expect(name1).not.to.equal(name2);
      expect(name1).to.exist;
      expect(name2).to.exist;
    });

    it('allows the user to abort placing an element', async () => {
      queryToolbar(element, '[title="Add VoltageLevel"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('VoltageLevel');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
    });

    it('aborts placing via the toolbar cancel button', async () => {
      queryToolbar(element, '[title="Add VoltageLevel"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('VoltageLevel');
      await element.updateComplete;
      await awaitToolbar(element);
      const cancel = queryToolbar<HTMLElement>(element, '[title="Cancel"]')!;
      clickInteractive(cancel);
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
    });
  });

  describe('given a voltage level', () => {
    let sldEditor: SldEditor;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        voltageLevelDocString,
        'application/xml',
      );
      element.doc = doc;
      await element.updateComplete;
      await awaitToolbar(element);
      const editors = await waitForSubstationEditor(element);
      sldEditor = editors.sldEditor;
    });

    it('allows placing a new bay', async () => {
      queryToolbar(element, '[title="Add Bay"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('Bay');
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 5, 3),
      });
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(sldEditor.interaction, 'resizingBR')?.tagName).to.equal('Bay');
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 11, 10),
      });
      expect(targetInMode(sldEditor.interaction, 'resizingBR')).to.be.undefined;
      const bay = sldEditor.doc.querySelector('Bay')!;
      expect(!!bay).to.be.true;
      expect(sldAttribute(bay, 'x')).to.equal('5');
      expect(sldAttribute(bay, 'y')).to.equal('3');
      expect(sldAttribute(bay, 'w')).to.equal('7');
      expect(sldAttribute(bay, 'h')).to.equal('8');
    });

    it('allows placing a new bus bar', async () => {
      queryToolbar(element, '[title="Add Bus Bar"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('Bay');
      const [x1, y1] = svgClientPosition(element, 5, 3);
      await sendMouse({ type: 'click', position: [x1, y1] });
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(sldEditor.interaction, 'resizingBR')?.tagName).to.equal('Bay');
      const [x2, y2] = svgClientPosition(element, 11, 10);
      await sendMouse({ type: 'click', position: [x2, y2] });
      expect(targetInMode(sldEditor.interaction, 'resizingBR')).to.be.undefined;
      const bus = sldEditor.doc.querySelector('Bay');
      expect(!!bus).to.be.true;
      expect(sldAttribute(bus!, 'x')).to.equal('5');
      expect(sldAttribute(bus!, 'y')).to.equal('3');
      expect(sldAttribute(bus!, 'w')).to.equal('1');
      expect(sldAttribute(bus!, 'h')).to.equal('8');
      expect(bus).dom.to.equalSnapshot({
        ignoreAttributes: ['eosld:uuid'],
      });
    });
  });

  describe('given a bay', () => {
    let _sldSubstationViewer: SldSubstationViewer;
    let sldEditor: SldEditor;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        bayDocString,
        'application/xml',
      );
      element.doc = doc;
      await element.updateComplete;
      await awaitToolbar(element);
      const editors = await waitForSubstationEditor(element);
      sldEditor = editors.sldEditor;
      _sldSubstationViewer = editors.sldSubstationViewer;
    });

    it('allows placing new conducting equipment', async () => {
      queryToolbar(element, '[title="Add GEN"]')?.click();
      expect(targetInMode(sldEditor.interaction, 'placing')?.tagName).to.equal('ConductingEquipment');
      await sendMouse({
        type: 'click',
        position: svgClientPosition(element, 4, 4),
      });
      expect(targetInMode(sldEditor.interaction, 'placing')).to.be.undefined;
      expect(targetInMode(sldEditor.interaction, 'resizingBR')).to.be.undefined;
      const equipment = element.doc.querySelector('ConductingEquipment');
      expect(!!equipment).to.be.true;
      expect(sldAttribute(equipment!, 'x')).to.equal('4');
      expect(sldAttribute(equipment!, 'y')).to.equal('4');
    });
  });
});
