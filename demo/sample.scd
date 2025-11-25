<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eosld="https://openscd.org/SCL/SSD/SLD/v0" version="2007" revision="B">
  <Header id="development sample"/>
  <Substation name="S1">
    <Private type="OpenSCD-SLD-Layout">
      <eosld:SLDAttributes eosld:w="50" eosld:h="25"/>
    </Private>
    <VoltageLevel name="V1">
      <Private type="OpenSCD-SLD-Layout">
        <eosld:SLDAttributes eosld:x="1" eosld:y="1" eosld:lx="1" eosld:ly="1" eosld:w="48" eosld:h="22"/>
      </Private>
      <Bay name="B2">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="14" eosld:y="2" eosld:lx="14" eosld:ly="2" eosld:w="12" eosld:h="20"/>
        </Private>
      </Bay>
      <Bay name="B1">
        <Private type="OpenSCD-SLD-Layout">
          <eosld:SLDAttributes eosld:x="2" eosld:y="2" eosld:lx="2" eosld:ly="2" eosld:w="11" eosld:h="20"/>
        </Private>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>
