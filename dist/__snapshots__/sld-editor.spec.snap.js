/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["SLD Editor given a voltage level opens a menu on voltage level right click"] =
  `<menu
  id="sld-context-menu"
  style="top: -73px; left: 0px;"
>
  <mwc-list>
    <mwc-list-item
      graphic="avatar"
      noninteractive=""
      twoline=""
    >
      <span>
        V1
      </span>
      <span
        slot="secondary"
        style="display: inline-block; max-width: 15em; overflow: hidden; text-overflow: ellipsis;"
      >
        some description
      </span>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Resize
      </span>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Copy
      </span>
      <mwc-icon slot="graphic">
        copy_all
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Move
      </span>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Move Label
      </span>
      <mwc-icon slot="graphic">
        text_rotation_none
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Add Text
      </span>
      <mwc-icon slot="graphic">
        title
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Edit
      </span>
      <mwc-icon slot="graphic">
        edit
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Delete
      </span>
      <mwc-icon slot="graphic">
        delete
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
</menu>
`;
/* end snapshot SLD Editor given a voltage level opens a menu on voltage level right click */

snapshots["SLD Editor given a voltage level allows placing a new bus bar"] =
  `<Bay name="BB1">
  <Private type="OpenSCD-SLD-Layout">
    <SLDAttributes
      smth:h="8"
      smth:lx="5"
      smth:ly="3"
      smth:w="1"
      smth:x="5"
      smth:y="3"
    >
    </SLDAttributes>
  </Private>
  <ConnectivityNode
    name="L"
    pathName="S1/V1/BB1/L"
  >
    <Private type="OpenSCD-SLD-Layout">
      <Section smth:bus="true">
        <Vertex
          smth:x="5.5"
          smth:y="3.5"
        >
        </Vertex>
        <Vertex
          smth:x="5.5"
          smth:y="10.5"
        >
        </Vertex>
      </Section>
    </Private>
  </ConnectivityNode>
</Bay>
`;
/* end snapshot SLD Editor given a voltage level allows placing a new bus bar */

snapshots["SLD Editor given a bay updates reparented bays' connectivity node paths"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B2">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="3"
            esldoscd:lx="18"
            esldoscd:ly="3"
            esldoscd:w="3"
            esldoscd:x="18"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B2/L1"
        >
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="20"
            esldoscd:ly="11"
            esldoscd:w="1"
            esldoscd:x="20"
            esldoscd:y="11"
          >
          </SLDAttributes>
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given a bay updates reparented bays' connectivity node paths */

snapshots["SLD Editor given conducting equipment copies equipment on shift click"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR2"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="2.5"
              esldoscd:ly="3"
              esldoscd:rot="1"
              esldoscd:x="3"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment copies equipment on shift click */

snapshots["SLD Editor given conducting equipment opens a menu on equipment right click"] =
  `<menu
  id="sld-context-menu"
  style="top: 477px; left: 750px;"
>
  <mwc-list>
    <mwc-list-item
      graphic="avatar"
      noninteractive=""
      twoline=""
    >
      <span>
        CBR1
      </span>
      <span
        slot="secondary"
        style="display: inline-block; max-width: 15em; overflow: hidden; text-overflow: ellipsis;"
      >
        CBR — CBR description
      </span>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Connect right
      </span>
      <mwc-icon slot="graphic">
        east
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Ground right
      </span>
      <mwc-icon slot="graphic">
        chevron_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Connect left
      </span>
      <mwc-icon slot="graphic">
        west
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Ground left
      </span>
      <mwc-icon slot="graphic">
        chevron_left
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Mirror
      </span>
      <mwc-icon slot="graphic">
        flip
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Rotate
      </span>
      <mwc-icon slot="graphic">
        rotate_90_degrees_cw
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Copy
      </span>
      <mwc-icon slot="graphic">
        copy_all
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Move
      </span>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Move Label
      </span>
      <mwc-icon slot="graphic">
        text_rotation_none
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Add Text
      </span>
      <mwc-icon slot="graphic">
        title
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Edit
      </span>
      <mwc-icon slot="graphic">
        edit
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="icon"
      mwc-list-item=""
    >
      <span>
        Delete
      </span>
      <mwc-icon slot="graphic">
        delete
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
</menu>
`;
/* end snapshot SLD Editor given conducting equipment opens a menu on equipment right click */

snapshots["SLD Editor given conducting equipment grounds equipment on connection point right click"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="grounded"
            connectivityNode="S1/V1/B1/grounded"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="grounded"
            connectivityNode="S1/V1/B1/grounded"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="grounded"
          pathName="S1/V1/B1/grounded"
        >
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment grounds equipment on connection point right click */

snapshots["SLD Editor given conducting equipment connects equipment on connection point and equipment click"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.16"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment connects equipment on connection point and equipment click */

snapshots["SLD Editor given conducting equipment connects equipment on connect menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V1/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L2"
          pathName="S1/V1/B1/L2"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.16"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="19.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="19.5"
                esldoscd:y="3.16"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V1/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L2"
          pathName="S1/V2/B1/L2"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="20.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="20.5"
                esldoscd:y="4.84"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="18.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment connects equipment on connect menu item select */

snapshots["SLD Editor given conducting equipment retargets grounded terminals when reparenting equipment"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="grounded"
          pathName="S1/V1/B1/grounded"
        >
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="18.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="19"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="grounded"
            connectivityNode="S1/V2/B1/grounded"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="grounded"
          pathName="S1/V2/B1/grounded"
        >
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment retargets grounded terminals when reparenting equipment */

snapshots["SLD Editor given conducting equipment with established connectivity uniquely names new connectivity nodes"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V1/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L2"
          pathName="S1/V1/B1/L2"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.16"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V1/B1/L2"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity uniquely names new connectivity nodes */

snapshots["SLD Editor given conducting equipment with established connectivity connects equipment on connection point and connectivity node click"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity connects equipment on connection point and connectivity node click */

snapshots["SLD Editor given conducting equipment with established connectivity avoids short circuit connections"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity avoids short circuit connections */

snapshots["SLD Editor given conducting equipment with established connectivity keeps connection paths simple"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="10"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="10"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="19.5"
                esldoscd:y="3.84"
              >
              </Vertex>
              <Vertex
                esldoscd:x="19.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="10"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="10"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity keeps connection paths simple */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment disconnects equipment on rotation"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="0"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="0"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment disconnects equipment on rotation */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies horizontal connection paths when disconnecting"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="2"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L2"
          pathName="S1/V2/B1/L2"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies horizontal connection paths when disconnecting */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies vertical connection paths when disconnecting"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies vertical connection paths when disconnecting */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies when disconnecting only where possible"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="8.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment simplifies when disconnecting only where possible */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment disconnects equipment upon being moved"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3"
              esldoscd:ly="2.5"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="2"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment disconnects equipment upon being moved */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment removes superfluous connectivity nodes when disconnecting"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="0"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="2"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment removes superfluous connectivity nodes when disconnecting */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment keeps internal connectivity nodes when moving containers"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S2">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="14"
          esldoscd:ly="2"
          esldoscd:w="23"
          esldoscd:x="14"
          esldoscd:y="2"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="15"
            esldoscd:ly="3"
            esldoscd:w="6"
            esldoscd:x="15"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="16"
              esldoscd:ly="8.5"
              esldoscd:rot="3"
              esldoscd:x="16"
              esldoscd:y="6"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S2/V2/B1/L1"
            name="T2"
            substationName="S2"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="16"
              esldoscd:ly="5.5"
              esldoscd:rot="1"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="4.5"
              esldoscd:rot="2"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="16"
              esldoscd:ly="4"
              esldoscd:rot="3"
              esldoscd:x="16"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="6"
              esldoscd:rot="0"
              esldoscd:x="19"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="18"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="18"
              esldoscd:y="8"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S2/V2/B1/L1"
            name="T1"
            substationName="S2"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="9"
              esldoscd:rot="3"
              esldoscd:x="20"
              esldoscd:y="8"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S2/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="8.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="8.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17"
                esldoscd:y="6.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="16.84"
                esldoscd:y="6.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment keeps internal connectivity nodes when moving containers */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes conducting equipment on delete menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes conducting equipment on delete menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes bays on delete menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes bays on delete menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes voltage levels on delete menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment deletes voltage levels on delete menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar keeps the bus bar when moving containers"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="2"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="3"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="8.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="6"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="5.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="4.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="6"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="8"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="9"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="8"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="8.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="8.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="6.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="6.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar keeps the bus bar when moving containers */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar does not merge bus bar sections with feeder sections"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="2"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="2"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L2"
            connectivityNode="S1/V2/B1/L2"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L2"
          pathName="S1/V2/B1/L2"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar does not merge bus bar sections with feeder sections */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar resizes the bus bar on resize menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="2"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="1"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar resizes the bus bar on resize menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies equipment on copy menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="2"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR2"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="2.5"
              esldoscd:ly="3"
              esldoscd:rot="1"
              esldoscd:x="3"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="BB1"
            cNodeName="L"
            connectivityNode="S1/V1/BB1/L"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies equipment on copy menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar moves the bus bar on move menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="1"
            esldoscd:ly="4"
            esldoscd:w="2"
            esldoscd:x="1"
            esldoscd:y="4"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="1.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="2.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar moves the bus bar on move menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar deletes the bus bar on delete menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar deletes the bus bar on delete menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies bays on copy menu item select"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B2">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="5"
            esldoscd:ly="8"
            esldoscd:w="6"
            esldoscd:x="5"
            esldoscd:y="8"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="6"
              esldoscd:ly="13.5"
              esldoscd:rot="3"
              esldoscd:x="6"
              esldoscd:y="11"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B2"
            cNodeName="L1"
            connectivityNode="S1/V1/B2/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="6"
              esldoscd:ly="10.5"
              esldoscd:rot="1"
              esldoscd:x="7"
              esldoscd:y="10"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="9"
              esldoscd:ly="9.5"
              esldoscd:rot="2"
              esldoscd:x="8"
              esldoscd:y="9"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="6"
              esldoscd:ly="9"
              esldoscd:rot="3"
              esldoscd:x="6"
              esldoscd:y="9"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="BB1"
            cNodeName="L"
            connectivityNode="S1/V1/BB1/L"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="10"
              esldoscd:ly="11"
              esldoscd:rot="0"
              esldoscd:x="9"
              esldoscd:y="10"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="8"
              esldoscd:ly="13"
              esldoscd:rot="3"
              esldoscd:x="8"
              esldoscd:y="13"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B2"
            cNodeName="L1"
            connectivityNode="S1/V1/B2/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="11"
              esldoscd:ly="14"
              esldoscd:rot="3"
              esldoscd:x="10"
              esldoscd:y="13"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B2/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="8.16"
                esldoscd:y="13.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="7"
                esldoscd:y="13.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="7"
                esldoscd:y="11.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="6.84"
                esldoscd:y="11.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="2"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="BB1"
            cNodeName="L"
            connectivityNode="S1/V1/BB1/L"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies bays on copy menu item select */

snapshots["SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies voltage levels on move handle shift click"] =
  `<SCL
  revision="B"
  version="2007"
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:esldoscd="https://openscd.org/SCL/SSD/SLD/v0"
>
  <Substation name="S2">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="7"
          esldoscd:ly="7"
          esldoscd:w="13"
          esldoscd:x="7"
          esldoscd:y="7"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="8"
            esldoscd:ly="8"
            esldoscd:w="6"
            esldoscd:x="8"
            esldoscd:y="8"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="9.5"
              esldoscd:ly="10"
              esldoscd:rot="1"
              esldoscd:x="10"
              esldoscd:y="10"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
            </Private>
          </Terminal>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <SLDAttributes
        esldoscd:h="25"
        esldoscd:w="50"
      >
      </SLDAttributes>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="13"
          esldoscd:lx="1"
          esldoscd:ly="1"
          esldoscd:w="13"
          esldoscd:x="1"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="BB1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="1"
            esldoscd:lx="12"
            esldoscd:ly="3"
            esldoscd:w="2"
            esldoscd:x="12"
            esldoscd:y="3"
          >
          </SLDAttributes>
        </Private>
        <ConnectivityNode
          name="L"
          pathName="S1/V1/BB1/L"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section esldoscd:bus="true">
              <Vertex
                esldoscd:x="12.5"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="3.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="13.5"
                esldoscd:y="3.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="2"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="2"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          desc="CBR description"
          name="CBR1"
          type="CBR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="3.5"
              esldoscd:ly="4"
              esldoscd:rot="1"
              esldoscd:x="4"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V1/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="4.84"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="17.16"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
            <Section>
              <Vertex
                esldoscd:x="11.5"
                esldoscd:y="4.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18.16"
                esldoscd:y="4.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="V2">
      <Private type="OpenSCD-SLD-Layout">
        <SLDAttributes
          esldoscd:h="23"
          esldoscd:lx="15"
          esldoscd:ly="1"
          esldoscd:w="23"
          esldoscd:x="15"
          esldoscd:y="1"
        >
        </SLDAttributes>
      </Private>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <SLDAttributes
            esldoscd:h="6"
            esldoscd:lx="16"
            esldoscd:ly="2"
            esldoscd:w="6"
            esldoscd:x="16"
            esldoscd:y="2"
          >
          </SLDAttributes>
        </Private>
        <ConductingEquipment
          name="CTR1"
          type="CTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="7.5"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="5"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS1"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="4.5"
              esldoscd:rot="1"
              esldoscd:x="18"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V1/B1/L1"
            name="T2"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="NEW1"
          type="NEW"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="20"
              esldoscd:ly="3.5"
              esldoscd:rot="2"
              esldoscd:x="19"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="VTR1"
          type="VTR"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="17"
              esldoscd:ly="3"
              esldoscd:rot="3"
              esldoscd:x="17"
              esldoscd:y="3"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="BB1"
            cNodeName="L"
            connectivityNode="S1/V1/BB1/L"
            name="T1"
            substationName="S1"
            voltageLevelName="V1"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="DIS2"
          type="DIS"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="21"
              esldoscd:ly="5"
              esldoscd:rot="0"
              esldoscd:x="20"
              esldoscd:y="4"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConductingEquipment
          name="BAT1"
          type="BAT"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="19"
              esldoscd:ly="7"
              esldoscd:rot="3"
              esldoscd:x="19"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
          <Terminal
            bayName="B1"
            cNodeName="L1"
            connectivityNode="S1/V2/B1/L1"
            name="T1"
            substationName="S1"
            voltageLevelName="V2"
          >
            <Private type="OpenSCD-SLD-Layout">
              <SLDAttributes>
              </SLDAttributes>
            </Private>
          </Terminal>
          <Terminal name="erroneous">
          </Terminal>
        </ConductingEquipment>
        <ConductingEquipment
          name="SMC1"
          type="SMC"
        >
          <Private type="OpenSCD-SLD-Layout">
            <SLDAttributes
              esldoscd:lx="22"
              esldoscd:ly="8"
              esldoscd:rot="3"
              esldoscd:x="21"
              esldoscd:y="7"
            >
            </SLDAttributes>
          </Private>
        </ConductingEquipment>
        <ConnectivityNode
          name="L1"
          pathName="S1/V2/B1/L1"
        >
          <Private type="OpenSCD-SLD-Layout">
            <Section>
              <Vertex
                esldoscd:x="19.16"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="7.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="18"
                esldoscd:y="5.5"
              >
              </Vertex>
              <Vertex
                esldoscd:x="17.84"
                esldoscd:y="5.5"
              >
              </Vertex>
            </Section>
          </Private>
        </ConnectivityNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
`;
/* end snapshot SLD Editor given conducting equipment with established connectivity between more than two pieces of equipment and a bus bar copies voltage levels on move handle shift click */

snapshots["SLD Editor when disabled given a substation disables substation buttons"] =
  `<h2 class="disabled">
  S1
  <mwc-icon-button
    icon="edit"
    label="Edit Substation"
    title="Edit Substation"
  >
  </mwc-icon-button>
  <mwc-icon-button
    label="Resize Substation"
    title="Resize Substation"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="delete"
    label="Delete Substation"
    title="Delete Substation"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="file_download"
    label="Export Single Line Diagram SVG"
    title="Export Single Line Diagram SVG"
  >
  </mwc-icon-button>
</h2>
`;
/* end snapshot SLD Editor when disabled given a substation disables substation buttons */


