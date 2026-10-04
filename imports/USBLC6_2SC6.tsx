import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin401: ["DM_IN"],
  pin402: ["GND"],
  pin403: ["DP_IN"],
  pin404: ["DP_OUT"],
  pin405: ["VBUS"],
  pin406: ["DM_OUT"]
} as const

export const USBLC6_2SC6 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematictext text="{REF}" schX={0} schY={1.18} anchor="bottom_center" fontSize={0.16} />
          <schematicpath points={[{"x":-0.9,"y":1},{"x":0.9,"y":1},{"x":0.9,"y":-1},{"x":-0.9,"y":-1},{"x":-0.9,"y":1}]} strokeWidth={0.02} strokeColor="#880000" isFilled fillColor="#FFFFFF" />
          <port name="pin401" pinNumber={401} aliases={["DM_IN"]} direction="left" schX={-1.3} schY={0.6} schStemLength={0.4} />
          <port name="pin402" pinNumber={402} aliases={["GND"]} direction="left" schX={-1.3} schY={0} schStemLength={0.4} />
          <port name="pin403" pinNumber={403} aliases={["DP_IN"]} direction="left" schX={-1.3} schY={-0.6} schStemLength={0.4} />
          <port name="pin404" pinNumber={404} aliases={["DP_OUT"]} direction="right" schX={1.3} schY={-0.6} schStemLength={0.4} />
          <port name="pin405" pinNumber={405} aliases={["VBUS"]} direction="right" schX={1.3} schY={0} schStemLength={0.4} />
          <port name="pin406" pinNumber={406} aliases={["DM_OUT"]} direction="right" schX={1.3} schY={0.6} schStemLength={0.4} />
          <schematicpath points={[{"x":-0.9,"y":0.6},{"x":0.9,"y":0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.9,"y":-0.6},{"x":0.9,"y":-0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.9,"y":0},{"x":0.9,"y":0}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.14 -0.12 L 0.06 0 L -0.14 0.14 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":0.16},{"x":0.06,"y":0.16},{"x":0.06,"y":-0.14},{"x":0,"y":-0.14}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.68,"y":0},{"x":-0.68,"y":0.4},{"x":0.66,"y":0.4},{"x":0.66,"y":-0.4},{"x":-0.68,"y":-0.4},{"x":-0.68,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.6},{"x":0,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.6},{"x":0,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.46 0.28 L -0.26 0.4 L -0.46 0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.26,"y":0.56},{"x":-0.26,"y":0.56},{"x":-0.26,"y":0.26},{"x":-0.26,"y":0.26}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0.22 0.28 L 0.42 0.4 L 0.22 0.54 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.42,"y":0.56},{"x":0.42,"y":0.56},{"x":0.42,"y":0.26},{"x":0.42,"y":0.26}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.48 -0.52 L -0.28 -0.4 L -0.48 -0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.28,"y":-0.24},{"x":-0.28,"y":-0.24},{"x":-0.28,"y":-0.54},{"x":-0.28,"y":-0.54}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0.22 -0.52 L 0.42 -0.4 L 0.22 -0.26 Z" strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.42,"y":-0.24},{"x":0.42,"y":-0.24},{"x":0.42,"y":-0.54},{"x":0.42,"y":-0.54}]} strokeColor="#880000" />
          <schematiccircle center={{ x: 0, y: 0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0, y: 0.4 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: -0.68, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0.66, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0, y: -0.4 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0, y: -0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C7519"
  ]
}}
      manufacturerPartNumber="USBLC6-2SC6"
      footprint={
        <footprint>
          <smtpad portHints={["pin401"]} pcbX="-0.95mm" pcbY="-1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <smtpad portHints={["pin402"]} pcbX="0mm" pcbY="-1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <smtpad portHints={["pin403"]} pcbX="0.95mm" pcbY="-1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <smtpad portHints={["pin404"]} pcbX="0.95mm" pcbY="1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <smtpad portHints={["pin405"]} pcbX="0mm" pcbY="1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <smtpad portHints={["pin406"]} pcbX="-0.95mm" pcbY="1.1491mm" width="0.532mm" height="1.072mm" shape="rect" />
          <courtyardoutline outline={[
            { x: -1.216, y: -1.6851 }, { x: 1.216, y: -1.6851 },
            { x: 1.216, y: 1.6851 }, { x: -1.216, y: 1.6851 },
            { x: -1.216, y: -1.6851 },
          ]} />
        </footprint>
      }
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7519.obj?uuid=229b69761e2c45dba6a83d8866dec72d",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7519.step?uuid=229b69761e2c45dba6a83d8866dec72d",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0.000012700000070253736, z: -0.048939 },
      }}
      {...props}
    />
  )
}
