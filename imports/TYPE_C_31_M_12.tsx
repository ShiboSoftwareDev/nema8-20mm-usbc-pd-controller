import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["EH2"],
  pin2: ["EH1"],
  pin3: ["EH4"],
  pin4: ["EH3"],
  pin5: ["B8","SBU2"],
  pin6: ["A5","CC1"],
  pin7: ["B7","DN2"],
  pin8: ["A6","DP1"],
  pin9: ["A7","DN1"],
  pin10: ["B6","DP2"],
  pin11: ["A8","SBU1"],
  pin12: ["B5","CC2"],
  pin13: ["A1B12","GND1"],
  pin14: ["B1A12","GND2"],
  pin15: ["B4A9","VBUS1"],
  pin16: ["A4B9","VBUS2"]
} as const

const footprinterPinLabels = {
  ...pinLabels,
  "pin4": [...pinLabels["pin4"], "pin1"],
  "pin1": [...pinLabels["pin1"], "pin2"],
  "pin2": [...pinLabels["pin2"], "pin4"],
} as const

export const TYPE_C_31_M_12 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={footprinterPinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C165948"
  ]
}}
      manufacturerPartNumber="TYPE-C-31-M-12"
      footprint="usbcmidmount16_tophw0.8mm_bottomhw0.8mm_tophh1.6mm_bottomhh1.4mm_topring0.2mm_bottomring0.2mm_rowy2.174mm_ph1.3mm_pw0.3mm_powerpw0.6mm_powerx3.2mm_shellx4.3251mm_topy1.4057mm_bottomy2.7741mm_holex2.8999mm_holey0.9056mm_holed0.6mm"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C165948.obj?uuid=617b05f9bba7410b96c001093d8189e4",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C165948.step?uuid=617b05f9bba7410b96c001093d8189e4",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: -2.7500289000000517, z: 0.000010999999999872223 },
      }}
      {...props}
    />
  )
}