import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin101: ["1"],
  pin102: ["2"],
} as const

export const TL3780AF100QG = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematictext text="{REF}" schX={0} schY={0.32} anchor="bottom_center" fontSize={0.16} />
          <schematicpath points={[{ x: -0.2, y: 0 }, { x: 0.14, y: 0.1 }]} strokeColor="#880000" />
          <schematiccircle center={{ x: 0.18, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <port name="pin102" pinNumber={102} aliases={["2"]} direction="right" schX={0.6} schY={0} schStemLength={0.4} />
          <port name="pin101" pinNumber={101} aliases={["1"]} direction="left" schX={-0.6} schY={0} schStemLength={0.4} />
        </symbol>
      }
      supplierPartNumbers={{ jlcpcb: ["C2886892"] }}
      manufacturerPartNumber="TL3780AF100QG"
      footprint={
        <footprint>
          <smtpad portHints={["pin102"]} pcbX="1.650492mm" pcbY="0mm" width="0.7999984mm" height="1.524mm" shape="rect" />
          <smtpad portHints={["pin101"]} pcbX="-1.650492mm" pcbY="0mm" width="0.7999984mm" height="1.524mm" shape="rect" />
          <silkscreenpath route={[{ x: 1.499489, y: 1.0000234 }, { x: -1.5005304, y: 1.0000234 }]} />
          <silkscreenpath route={[{ x: -1.500505, y: -0.9999726 }, { x: 1.499489, y: -0.9999726 }]} />
          <silkscreencircle pcbX="-0.000508mm" pcbY="0mm" radius="0.635mm" />
          <silkscreentext text="{NAME}" pcbX="-0.017018mm" pcbY="1.991616mm" anchorAlignment="center" fontSize="1mm" />
          <courtyardoutline outline={[{ x: -2.311718, y: 1.241616 }, { x: 2.277682, y: 1.241616 }, { x: 2.277682, y: -1.290384 }, { x: -2.311718, y: -1.290384 }, { x: -2.311718, y: 1.241616 }]} />
        </footprint>
      }
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2886892.obj?uuid=965cd0ca6c094e7c81ef6da0eb45e1aa",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2886892.step?uuid=965cd0ca6c094e7c81ef6da0eb45e1aa",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.0000127, y: 0.0005, z: -0.285 },
      }}
      {...props}
    />
  )
}
