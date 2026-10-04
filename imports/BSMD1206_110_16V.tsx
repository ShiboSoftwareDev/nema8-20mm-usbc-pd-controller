import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const BSMD1206_110_16V = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematictext text="{REF}" schX={0} schY={0.24} anchor="bottom_center" fontSize={0.16} />
          <schematicrect schX={0} schY={0} width={0.52} height={0.12} strokeWidth={0.02} color="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":0.2,"y":0}]} strokeColor="#8D2323" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C2803346"
  ]
}}
      manufacturerPartNumber="BSMD1206-110-16V"
      footprint="smdpads2_p2.89mm_pw1.1901mm_ph1.728mm"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2803346.obj?uuid=7dbd95a5ee9a45949b72cb8147e267ff",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2803346.step?uuid=7dbd95a5ee9a45949b72cb8147e267ff",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.000012699999999199463, z: 0 },
      }}
      {...props}
    />
  )
}
