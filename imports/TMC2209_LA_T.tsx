import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["OB2"],
  pin2: ["ENN"],
  pin3: ["GND2"],
  pin4: ["CPO"],
  pin5: ["CPI"],
  pin6: ["VCP"],
  pin7: ["SPREAD"],
  pin8: ["5VOUT"],
  pin9: ["MS1_AD0"],
  pin10: ["MS2_AD1"],
  pin11: ["DIAG"],
  pin12: ["INDEX"],
  pin13: ["CLK"],
  pin14: ["PDN_UART"],
  pin15: ["VCC_IO"],
  pin16: ["STEP"],
  pin17: ["VREF"],
  pin18: ["GND1"],
  pin19: ["DIR"],
  pin20: ["STDBY"],
  pin21: ["OA2"],
  pin22: ["VS2"],
  pin23: ["BRA"],
  pin24: ["OA1"],
  pin25: ["UNUSED"],
  pin26: ["OB1"],
  pin27: ["BRB"],
  pin28: ["VS1"],
  pin29: ["EP"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true},
  pin18: {requiresGround: true},
  pin29: {requiresGround: true}
} as const

const footprinterPinLabels = {
  ...pinLabels,
  "pin29": [...pinLabels["pin29"], "thermalpad"],
} as const

export const TMC2209_LA_T = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={footprinterPinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2150710"
  ]
}}
      manufacturerPartNumber="TMC2209-LA-T"
      footprint="qfn28_thermalpad3.5mmx3.5mm_pillpads_h6.1mm_pw0.28mm_pl0.9mm_pin1location(bottomside,left)"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2150710.obj?uuid=ae12e1b5ea7a411e8a6f7d8e9f5ed919",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2150710.step?uuid=ae12e1b5ea7a411e8a6f7d8e9f5ed919",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.00006349999998889189, y: -0.00006349999999599731, z: -0.02 },
      }}
      {...props}
    />
  )
}
