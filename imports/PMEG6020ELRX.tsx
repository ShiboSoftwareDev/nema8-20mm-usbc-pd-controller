import type { DiodeProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode","neg"],
  pin2: ["anode","pos"]
} as const

export const PMEG6020ELRX = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props

  return (
    <diode
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C478000"
  ]
}}
      manufacturerPartNumber="PMEG6020ELRX"
      footprint="smdpads2_p3.3848mm_pw0.95mm_ph1.15mm"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C478000.obj?uuid=ffe28a36cfa04cde86eca0e275be7a76",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C478000.step?uuid=ffe28a36cfa04cde86eca0e275be7a76",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.55 },
      }}
      {...restProps}
    />
  )
}