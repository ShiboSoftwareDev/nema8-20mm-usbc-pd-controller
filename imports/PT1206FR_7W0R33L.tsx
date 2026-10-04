import type { ResistorProps } from "@tscircuit/props"

export const PT1206FR_7W0R33L = (props: Omit<ResistorProps, "resistance">) => {
  const { name = "R1", ...restProps } = props

  return (
    <resistor
      name={name}
      resistance="330mohm"
      supplierPartNumbers={{
  "jlcpcb": [
    "C858786"
  ]
}}
      manufacturerPartNumber="PT1206FR-7W0R33L"
      footprint="smdpads2_p2.9576mm_pw1.2075mm_ph1.701mm"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C858786.obj?uuid=da5f078ee43c429f91838a456f48f0a8",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C858786.step?uuid=da5f078ee43c429f91838a456f48f0a8",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...restProps}
    />
  )
}