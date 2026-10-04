import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VDD"],
  pin2: ["PA0", "STEP_OUT"],
  pin3: ["PA1", "DIR_OUT"],
  pin4: ["PA2", "ENABLE_OUT"],
  pin5: ["PA3", "UART1"],
  pin6: ["PA4", "STDBY_OUT"],
  pin7: ["PA5", "DIAG_IN"],
  pin8: ["PA6"],
  pin9: ["PA7", "VBUS_ADC"],
  pin10: ["PB0"],
  pin11: ["PB1"],
  pin12: ["PB3"],
  pin13: ["PB11"],
  pin14: ["PC18", "DIO"],
  pin15: ["PB12"],
  pin16: ["PC19", "DCK"],
  pin17: ["PC16", "USB_DM"],
  pin18: ["PC17", "USB_DP"],
  pin19: ["PC14", "CC1"],
  pin20: ["PC15", "CC2"],
  pin21: ["GND"]
} as const

const pinAttributes = {
  pin1: {requiresPower: true},
  pin21: {requiresGround: true}
} as const

const footprinterPinLabels = {
  ...pinLabels,
  "pin21": [...pinLabels["pin21"], "thermalpad"],
} as const

export const CH32X035F8U6 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={footprinterPinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C42442062"
  ]
}}
      manufacturerPartNumber="CH32X035F8U6"
      footprint="qfn20_thermalpad1.7mmx1.7mm_p0.4mm_h4mm_pw0.2mm_pl0.8mm"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C42442062.obj?uuid=71760926877f42c6b0f5954e672bfe89",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C42442062.step?uuid=71760926877f42c6b0f5954e672bfe89",
        pcbRotationOffset: 270,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
