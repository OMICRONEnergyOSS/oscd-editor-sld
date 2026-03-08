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
import { identity } from '@openscd/scl-lib';

import OscdEditorSld from './oscd-editor-sld.js';
import { SldSubstationEditor } from './sld-substation-editor.js';
import { SldEditor } from './sld-editor.js';
import { getSLDAttributes, iedReferences, resolveIed, sldNs } from './util.js';

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

  it('converts old Transpower SLD layout to OpenSCD layout', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      sldConvertDocString,
      'application/xml'
    );
    await element.updateComplete;

    const convertButton =
      element.shadowRoot!.querySelector<Button>('mwc-button');
    expect(convertButton).to.exist;
    expect(convertButton?.textContent?.trim()).to.equal('Convert SLD Layout');

    convertButton!.click();
    await aTimeout(20);
    await element.updateComplete;

    expect(element.doc.documentElement).to.have.attribute('xmlns:eosld');
    expect(element.doc.documentElement).to.not.have.attribute('xmlns:esld');
    expect(
      element.doc.querySelectorAll('Private[type="Transpower-SLD-Vertices"]')
    ).to.have.lengthOf(0);

    const substation = element.doc.querySelector('Substation[name="S1"]')!;
    expect(sldAttribute(substation, 'w')).to.equal('30');
    expect(sldAttribute(substation, 'h')).to.equal('21');
    expect(substation.getAttributeNS(oldNs, 'w')).to.equal(null);

    const voltageLevelV2 = element.doc.querySelector(
      'VoltageLevel[name="V2"]'
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
      element.doc.querySelectorAll('ConductingEquipment')
    );
    expect(conductingEquipment).to.have.lengthOf(
      Object.keys(expectedConductingEquipment).length
    );

    conductingEquipment.forEach(eq => {
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
      'ConductingEquipment[type="GEN"][name="GEN1"] > Terminal[name="T1"]'
    )!;
    expect(sldAttribute(genTerminal, 'uuid')).to.equal(
      '61974884-1be1-4ba0-939b-34f0a43d987e'
    );

    const bb1ConnNode = element.doc.querySelector(
      'ConnectivityNode[pathName="S1/V2/BB1/L"]'
    )!;
    const bb1Private = bb1ConnNode.querySelector(
      ':scope > Private[type="OpenSCD-SLD-Layout"]'
    );
    expect(bb1Private).to.exist;
    expect(bb1Private!.querySelectorAll(':scope > Section')).to.have.lengthOf(
      6
    );
    expect(
      bb1Private!
        .querySelector(':scope > Section')
        ?.getAttributeNS(sldNs, 'bus')
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
      element.doc.querySelectorAll(':root > Substation, :root > Substation *')
    );
    substationTree.forEach(node => {
      oldLayoutAttributes.forEach(attr => {
        expect(
          node.getAttributeNS(oldNs, attr),
          `${node.tagName} has esld:${attr}`
        ).to.equal(null);
      });
    });
  });

  it('converts Transpower linked IED layout to Reference layout', async () => {
    element.doc = new DOMParser().parseFromString(
      iedConvertDocString,
      'application/xml'
    );
    await element.updateComplete;

    const convertButton =
      element.shadowRoot!.querySelector<Button>('mwc-button');
    expect(convertButton).to.exist;
    expect(convertButton?.textContent?.trim()).to.equal('Convert SLD Layout');

    convertButton!.click();
    await aTimeout(20);
    await element.updateComplete;

    expect(
      element.doc.querySelectorAll('Private[type="OpenSCD-Linked-IEDs"]')
    ).to.have.lengthOf(0);
    expect(element.doc.querySelectorAll('IEDName')).to.have.lengthOf(0);

    const convertedReferences = iedReferences(element.doc);
    expect(convertedReferences).to.have.lengthOf(1);

    const reference = convertedReferences[0];
    expect(reference.getAttributeNS(sldNs, 'type')).to.equal('IED');

    const ied = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_01"]'
    );
    expect(ied).to.exist;
    expect(reference.getAttributeNS(sldNs, 'id')).to.equal(identity(ied!));
    expect(resolveIed(reference)).to.equal(ied);

    const referenceAttrs = reference.querySelector(':scope > SLDAttributes');
    expect(referenceAttrs).to.exist;
    expect(referenceAttrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');

    const parentPrivate = reference.parentElement;
    expect(parentPrivate?.tagName).to.equal('Private');
    expect(parentPrivate).to.have.attribute('type', 'OpenSCD-SLD-Layout');
  });

  it('migrates legacy IED coordinates into Substation IED references', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      iedLegacyCoordinatesDocString,
      'application/xml'
    );
    await element.updateComplete;

    const convertButton =
      element.shadowRoot!.querySelector<Button>('mwc-button');
    expect(convertButton).to.exist;
    convertButton!.click();
    await aTimeout(20);
    await element.updateComplete;

    const iedWithLegacyCoords = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_03"]'
    )!;
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'x')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'y')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'lx')).to.equal(null);
    expect(iedWithLegacyCoords.getAttributeNS(oldNs, 'ly')).to.equal(null);

    const convertedReferences = iedReferences(element.doc);
    expect(convertedReferences).to.have.lengthOf(1);

    const reference = convertedReferences[0];
    expect(reference.getAttributeNS(sldNs, 'type')).to.equal('IED');
    expect(reference.getAttributeNS(sldNs, 'id')).to.equal(
      identity(iedWithLegacyCoords)
    );

    const referenceAttrs = reference.querySelector(':scope > SLDAttributes');
    expect(referenceAttrs).to.exist;
    expect(referenceAttrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(referenceAttrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');

    const substation = element.doc.querySelector(':root > Substation')!;
    expect(reference.closest('Substation')).to.equal(substation);
    expect(reference.closest('Private')).to.have.attribute(
      'type',
      'OpenSCD-SLD-Layout'
    );
  });

  it('does not create duplicate IED references when legacy IEDName exists', async () => {
    const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';

    element.doc = new DOMParser().parseFromString(
      iedNameAndLegacyCoordinatesDocString,
      'application/xml'
    );
    await element.updateComplete;

    const convertButton =
      element.shadowRoot!.querySelector<Button>('mwc-button');
    expect(convertButton).to.exist;
    convertButton!.click();
    await aTimeout(20);
    await element.updateComplete;

    const ied = element.doc.querySelector(
      ':root > IED[name="ACMEInc_DoAnything_01"]'
    )!;
    expect(ied.getAttributeNS(oldNs, 'x')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'y')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'lx')).to.equal(null);
    expect(ied.getAttributeNS(oldNs, 'ly')).to.equal(null);

    const references = iedReferences(element.doc);
    expect(references).to.have.lengthOf(1);
    expect(references[0].getAttributeNS(sldNs, 'id')).to.equal(identity(ied));

    const attrs = references[0].querySelector(':scope > SLDAttributes');
    expect(attrs).to.exist;
    expect(attrs!.getAttributeNS(sldNs, 'x')).to.equal('3');
    expect(attrs!.getAttributeNS(sldNs, 'y')).to.equal('3');
    expect(attrs!.getAttributeNS(sldNs, 'lx')).to.equal('4');
    expect(attrs!.getAttributeNS(sldNs, 'ly')).to.equal('4');
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
        expect(sldEditor.placing!.localName).to.equal('Reference');
      }

      async function placeIedFromMenu(name: string, x: number, y: number) {
        await selectIedFromMenu(name);
        await clickGridAt(x, y);
      }

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
        expect(sldEditor.placing!.localName).to.equal('Reference');
        expect(sldEditor.placing!.namespaceURI).to.equal(sldNs);

        const [clientX, clientY] = svgClientPosition(element, 10, 10);
        await sendMouse({ type: 'move', position: [clientX, clientY] });
        await sendMouse({ type: 'click', position: [clientX, clientY] });
        await aTimeout(20);

        const referencedIeds = iedReferences(element.doc);
        expect(referencedIeds).to.have.lengthOf(1);
        expect(referencedIeds[0].getAttributeNS(sldNs, 'type')).to.equal('IED');
        expect(referencedIeds[0].getAttributeNS(sldNs, 'id')).to.equal(
          identity(element.doc.querySelector(':root > IED[name="IED1"]')!)
        );
        expect(referencedIeds[0].parentElement).to.have.attribute(
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

      it('removes references to missing IEDs via the IED menu action', async () => {
        await loadIedDoc();

        const voltageLevel =
          element.doc.getElementsByTagName('VoltageLevel')[0];
        const privateElement = voltageLevel.querySelector(
          ':scope > Private[type="OpenSCD-SLD-Layout"]'
        )!;
        const missingRef = element.doc.createElementNS(
          sldNs,
          'eosld:Reference'
        );
        missingRef.setAttributeNS(sldNs, 'eosld:id', 'MissingIED');
        missingRef.setAttributeNS(sldNs, 'eosld:type', 'IED');
        const missingRefAttrs = element.doc.createElementNS(
          sldNs,
          'eosld:SLDAttributes'
        );
        missingRefAttrs.setAttributeNS(sldNs, 'eosld:x', '4');
        missingRefAttrs.setAttributeNS(sldNs, 'eosld:y', '4');
        missingRef.appendChild(missingRefAttrs);
        privateElement.appendChild(missingRef);
        element.docVersion += 1;
        await settle();

        expect(
          iedReferences(element.doc).filter(ref => !resolveIed(ref))
        ).to.have.lengthOf(1);

        await openIedMenu();
        const removeUnmatchedItem = element.shadowRoot!.querySelector(
          'mwc-list-item[data-name="Delete Unmatched"]'
        ) as ListItem | null;

        expect(removeUnmatchedItem).to.exist;
        expect(
          removeUnmatchedItem?.textContent?.replace(/\s+/g, ' ').trim()
        ).to.include('Remove reference to 1 missing IED');
        removeUnmatchedItem!.click();
        await settle();

        expect(
          iedReferences(element.doc).filter(ref => !resolveIed(ref))
        ).to.have.lengthOf(0);
      });

      it('hides IEDs when the IED toggle is turned off', async () => {
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
