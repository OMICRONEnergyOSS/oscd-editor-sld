/* @web/test-runner snapshot v1 */
export const snapshots = {};

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

