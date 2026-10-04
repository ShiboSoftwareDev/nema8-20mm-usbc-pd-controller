import type { DiodeProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode", "neg"],
  pin2: ["anode", "pos"],
} as const

export const BAT54WS = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props
  return (
    <diode
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{ jlcpcb: ["C7502694"] }}
      manufacturerPartNumber="BAT54WS"
      footprint={
        <footprint>
          <smtpad portHints={["pin1", "cathode", "neg"]} pcbX="-1.139952mm" pcbY="0mm" width="0.8299958mm" height="0.6299962mm" shape="rect" />
          <smtpad portHints={["pin2", "anode", "pos"]} pcbX="1.139952mm" pcbY="0mm" width="0.8299958mm" height="0.6299962mm" shape="rect" />
          <silkscreenpath route={[{ x: 0.8889238, y: -0.4950968 }, { x: 0.8889238, y: -0.635 }]} />
          <silkscreenpath route={[{ x: 0.8889238, y: 0.635 }, { x: 0.8889238, y: 0.495173 }]} />
          <silkscreenpath route={[{ x: -0.8890762, y: 0.635 }, { x: -1.020064, y: 0.635 }, { x: -1.020064, y: 0.4950968 }, { x: -0.8890762, y: 0.4950968 }]} />
          <silkscreenpath route={[{ x: -0.8890762, y: -0.635 }, { x: 0.8889238, y: -0.635 }]} />
          <silkscreenpath route={[{ x: 0.1904238, y: 0.381 }, { x: 0.1904238, y: -0.381 }, { x: -0.1905762, y: 0 }, { x: 0.1904238, y: 0.381 }]} />
          <silkscreenpath route={[{ x: -0.8890762, y: 0.635 }, { x: 0.8889238, y: 0.635 }]} />
          <silkscreenpath route={[{ x: 0.5079238, y: 0 }, { x: -0.5080762, y: 0 }]} />
          <silkscreenpath route={[{ x: -0.2540762, y: 0.381 }, { x: -0.2540762, y: -0.381 }]} />
          <silkscreentext text="{NAME}" pcbX="0.004064mm" pcbY="1.6604mm" anchorAlignment="center" fontSize="1mm" />
          <courtyardoutline outline={[{ x: -1.795336, y: 0.9104 }, { x: 1.803464, y: 0.9104 }, { x: 1.803464, y: -0.9104 }, { x: -1.795336, y: -0.9104 }, { x: -1.795336, y: 0.9104 }]} />
        </footprint>
      }
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7502694.obj?uuid=ca55f7f4aa2143938eb241550bbe4129",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7502694.step?uuid=ca55f7f4aa2143938eb241550bbe4129",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.55 },
      }}
      {...restProps}
    />
  )
}
