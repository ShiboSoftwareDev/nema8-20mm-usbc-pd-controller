import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["A1", "anode1"],
  pin2: ["A2", "anode2"],
  pin3: ["K", "cathode"],
} as const

export const BAT54C = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{ jlcpcb: ["C916424"] }}
      manufacturerPartNumber="BAT54C"
      footprint={
        <footprint>
          <smtpad portHints={["pin1", "A1", "anode1"]} pcbX="0.999998mm" pcbY="-0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
          <smtpad portHints={["pin2", "A2", "anode2"]} pcbX="0.999998mm" pcbY="0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
          <smtpad portHints={["pin3", "K", "cathode"]} pcbX="-0.999998mm" pcbY="0mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
          <silkscreenpath route={[{ x: 0.7262114, y: 1.5262098 }, { x: -0.7262114, y: 1.5262098 }, { x: -0.7262114, y: 0.4945888 }]} />
          <silkscreenpath route={[{ x: 0.7262114, y: -1.5262098 }, { x: -0.7262114, y: -1.5262098 }, { x: -0.7262114, y: -0.4945888 }]} />
          <silkscreenpath route={[{ x: 0.7262114, y: 0.4553966 }, { x: 0.7262114, y: -0.4553966 }]} />
          <silkscreentext text="{NAME}" pcbX="0.0254mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
          <courtyardoutline outline={[{ x: -1.7486, y: 1.774 }, { x: 1.7994, y: 1.774 }, { x: 1.7994, y: -1.774 }, { x: -1.7486, y: -1.774 }, { x: -1.7486, y: 1.774 }]} />
        </footprint>
      }
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C916424.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C916424.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.0000127, y: -0.0000127, z: 0.050795 },
      }}
      {...props}
    />
  )
}
