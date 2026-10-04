import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin201: ["CATHODE_TVS"],
  pin202: ["ANODE_TVS"]
} as const

export const SMBJ16A = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematictext text="{REF}" schX={0.3} schY={0} anchor="center_left" fontSize={0.16} />
          <port name="pin201" pinNumber={201} aliases={["CATHODE_TVS"]} direction="up" schX={0} schY={0.4} schStemLength={0.2} />
          <port name="pin202" pinNumber={202} aliases={["ANODE_TVS"]} direction="down" schX={0} schY={-0.4} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.14,"y":0.1},{"x":0.14,"y":0.1}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.2},{"x":0,"y":0.1}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.1},{"x":0,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.14 -0.1 L 0 0.1 L 0.14 -0.1 Z" strokeColor="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C19077571"
  ]
}}
      manufacturerPartNumber="SMBJ16A"
      footprint={
        <footprint>
          <smtpad portHints={["pin201"]} pcbX="0mm" pcbY="-2.5913mm"
            width="2.241mm" height="2.0475mm" shape="rect" />
          <smtpad portHints={["pin202"]} pcbX="0mm" pcbY="2.5913mm"
            width="2.241mm" height="2.0475mm" shape="rect" />
          <courtyardoutline outline={[
            { x: -1.1205, y: -3.61505 }, { x: 1.1205, y: -3.61505 },
            { x: 1.1205, y: 3.61505 }, { x: -1.1205, y: 3.61505 },
            { x: -1.1205, y: -3.61505 },
          ]} />
        </footprint>
      }
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19077571.obj?uuid=acb0ba035ec44d9bb847900f974b6821",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C19077571.step?uuid=acb0ba035ec44d9bb847900f974b6821",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999956566899, y: 0, z: -1.2 },
      }}
      {...props}
    />
  )
}
