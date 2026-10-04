import { Fragment } from "react"
import { BAT54KFILM } from "./imports/BAT54KFILM"
import { BAT54WS } from "./imports/BAT54WS"
import { BM04B_SRSS_TB_LF__SN_ } from "./imports/BM04B_SRSS_TB_LF__SN_"
import { BSMD1206_110_16V } from "./imports/BSMD1206_110_16V"
import { CH32X035F8U6 } from "./imports/CH32X035F8U6"
import { CJ6330A33M } from "./imports/CJ6330A33M"
import { PMEG6020ELRX } from "./imports/PMEG6020ELRX"
import { PT1206FR_7W0R33L } from "./imports/PT1206FR_7W0R33L"
import { SMBJ16A } from "./imports/SMBJ16A"
import { TMC2209_LA_T } from "./imports/TMC2209_LA_T"
import { TL3780AF100QG } from "./imports/TL3780AF100QG"
import { TYPE_C_31_M_12 } from "./imports/TYPE_C_31_M_12"
import { USBLC6_2SC6 } from "./imports/USBLC6_2SC6"
import frozenFabricationRoutes from "./fabrication-routes.json"

const fabricationRoutes = (frozenFabricationRoutes as any[]).map((item, index) => {
  let route = item.route
  if (index === 13 && item.connection === ".U_DRV > .PDN_UART") {
    route = [
      ...[...route].reverse(),
      ...(frozenFabricationRoutes as any[])[14].route.slice(1),
    ]
  }
  if (index >= 0 && index <= 3) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.25 }
      : point)
  }
  if (index === 5) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.25 }
      : point)
  }
  if (index === 56) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.4 }
      : point)
  }
  if ([57, 58].includes(index)) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.25 }
      : point)
  }
  if ([51, 53, 54, 63, 65].includes(index)) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.25 }
      : point)
  }
  if (index === 66) {
    route = route.map((point: any) => point.route_type === "wire"
      ? { ...point, width: 0.2 }
      : point)
  }
  if (index === 27 || index === 31) {
    route = route.map((point: any, pointIndex: number) => pointIndex === 0
      ? { ...point, x: point.x - 0.1 }
      : point)
  }
  if (index === 46) {
    route = route.map((point: any, pointIndex: number) => pointIndex === 0
      ? { ...point, x: 6.1949962, y: 3.2612 }
      : point)
  }
  if (index === 52 || index === 54) {
    route = route.map((point: any, pointIndex: number) => pointIndex === route.length - 1
      ? { ...point, x: 6.2050038, y: 1.8388 }
      : point)
  }
  if (index === 51) {
    route = [
      { route_type: "wire", x: -9.025, y: -0.7, width: 0.25, layer: "bottom" },
      { route_type: "wire", x: -9.025, y: 0.1, width: 0.25, layer: "bottom" },
      { route_type: "wire", x: -7.290295877303295, y: 0.1834484746846172,
        width: 0.25, layer: "bottom" },
      ...route.slice(4),
    ]
  }
  if (index === 6) {
    route = route.map((point: any, pointIndex: number) => pointIndex === route.length - 1
      ? { ...point, x: -3.49, y: -3.0 }
      : point)
  }
  if ([65, 66].includes(index)) {
    route = route.map((point: any, pointIndex: number) => pointIndex === route.length - 1
      ? { ...point, x: -4.51, y: -3.0 }
      : point)
  }
  if (index === 43) {
    route = route.map((point: any, pointIndex: number) => pointIndex === 0
      ? { ...point, x: 6.9, y: -3.975 }
      : point)
  }
  if (index === 55) {
    route = route.map((point: any, pointIndex: number) => pointIndex === 0
      ? { ...point, x: 6.2050038, y: 1.8388 }
      : point)
  }
  // The boot switch is wired directly. The original routing snapshot used two
  // zero-ohm links whose pads overlapped the switch pads; splice those routes
  // here so the electrical behavior is unchanged without the assembly clash.
  if (index === 24 && item.connection === ".R_SW_BIAS > .pin2") {
    route = [
      ...[...route].reverse(),
      { route_type: "wire", x: 5.85, y: -3.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.849508, y: -3.5, width: 0.15, layer: "top" },
    ]
    return { ...item, connection: ".R_BOOT > .pin2", route }
  }
  if (index === 28 && item.connection === ".U_MCU > .PC17") {
    route = [
      ...route,
      { route_type: "wire", x: 9.15, y: -3.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
    ]
  }
  return { ...item, route }
}).filter((_, index) => ![14, 25, 26].includes(index))

const resistorParts: Record<string, string> = {
  "0": "C17168", "27": "C25100", "1k": "C11702", "4.7k": "C25900", "5.1k": "C25905", "6.8k": "C25907", "10k": "C25744",
  "12k": "C25752", "47k": "C25792", "56k": "C25794", "100k": "C25741", "270k": "C25770",
}

const capacitorParts: Record<string, { part: string; footprint: string; voltage: string }> = {
  "22nF_50V": { part: "C1532", footprint: "0402", voltage: "50V" },
  "100nF": { part: "C1525", footprint: "0402", voltage: "16V" },
  "100nF_50V": { part: "C14663", footprint: "0603", voltage: "50V" },
  "1uF_50V": { part: "C28323", footprint: "0805", voltage: "50V" },
  "2.2uF_10V": { part: "C107370", footprint: "0402", voltage: "10V" },
  "2.2uF": { part: "C23630", footprint: "0603", voltage: "16V" },
  "10uF_25V": { part: "C96446", footprint: "0603", voltage: "25V" },
}

const R = ({ name, resistance, ...props }: any) => (
  <resistor name={name} resistance={resistance} footprint="0402"
    supplierPartNumbers={{ jlcpcb: [resistorParts[resistance]] }} {...props} />
)

const C = ({ name, value, ...props }: any) => {
  const item = capacitorParts[value]
  return <capacitor name={name} capacitance={value.replace(/_\d+V$/, "")}
    footprint={item.footprint} maxVoltageRating={item.voltage}
    maxDecouplingTraceLength="50mm"
    supplierPartNumbers={{ jlcpcb: [item.part] }} {...props} />
}

const nets = [
  "GND", "PD_VBUS_RAW", "PD_VBUS_FUSED", "VM", "USB_5V", "LOGIC_IN", "VIO",
  "PD_CC1", "PD_CC2", "DATA_CC1", "DATA_CC2",
  "USB_DM_CONN", "USB_DP_CONN", "USB_DP_ESD", "USB_DM_ESD", "USB_DM", "USB_DP",
  "BOOT_BIAS", "VBUS_ADC", "DIAG",
  "STEP", "DIR", "ENN", "STDBY", "UART_MCU", "UART_DRV", "V5_DRV",
  "VREF", "CP_HI", "CP_LO", "VCP", "SENSE_A", "SENSE_B", "MOTOR_B_NEG",
  "MOTOR_B_POS", "MOTOR_A_POS", "MOTOR_A_NEG",
] as const
const nonGroundNets = nets.filter((name) => name !== "GND")

const schematicSheets = {
  power: "power",
  control: "control",
  driver: "driver",
} as const

const schematicSections = {
  powerInput: "power_input",
  logicPower: "logic_power",
  usbData: "usb_data",
  controller: "controller",
  driverCore: "driver_core",
} as const

const netWidths: Partial<Record<(typeof nets)[number], string>> = {
  PD_VBUS_RAW: "0.6mm", PD_VBUS_FUSED: "0.6mm", VM: "0.8mm", USB_5V: "0.4mm",
  LOGIC_IN: "0.4mm", SENSE_A: "0.6mm", SENSE_B: "0.6mm",
  MOTOR_B_NEG: "1.0mm", MOTOR_B_POS: "1.0mm", MOTOR_A_POS: "1.0mm", MOTOR_A_NEG: "1.0mm",
}
const routingPhaseByNet: Partial<Record<(typeof nets)[number], number>> = {
  VIO: 1,
  STEP: 8,
  UART_MCU: 9,
  PD_CC2: 10,
  USB_DP_ESD: 11,
  DIR: 12,
  USB_DP: 13,
  PD_VBUS_RAW: 14,
  PD_VBUS_FUSED: 14,
  VM: 14,
  MOTOR_B_NEG: 18,
  MOTOR_B_POS: 17,
  MOTOR_A_POS: 16,
  MOTOR_A_NEG: 15,
  SENSE_A: 19,
  SENSE_B: 19,
  USB_5V: 20,
  LOGIC_IN: 33,
  PD_CC1: 21,
  DATA_CC1: 22,
  DATA_CC2: 22,
  USB_DP_CONN: 23,
  USB_DM_CONN: 23,
  USB_DM_ESD: 24,
  USB_DM: 24,
  BOOT_BIAS: 25,
  VBUS_ADC: 25,
  DIAG: 26,
  ENN: 34,
  STDBY: 35,
  UART_DRV: 27,
  V5_DRV: 28,
  VREF: 32,
  CP_HI: 29,
  CP_LO: 30,
  VCP: 31,
}
const cleanRouteOrder = [
  "VIO", "VM", "PD_VBUS_RAW", "PD_VBUS_FUSED", "USB_5V", "LOGIC_IN",
  "MOTOR_A_NEG", "MOTOR_A_POS", "MOTOR_B_POS", "MOTOR_B_NEG",
  "SENSE_A", "SENSE_B", "V5_DRV", "VREF", "CP_HI", "CP_LO", "VCP",
  "USB_DP_CONN", "USB_DM_CONN", "USB_DP_ESD", "USB_DM_ESD", "USB_DP", "USB_DM",
  "PD_CC1", "PD_CC2", "DATA_CC1", "DATA_CC2",
  "STEP", "DIR", "ENN", "STDBY", "UART_MCU", "UART_DRV", "DIAG",
  "BOOT_BIAS", "VBUS_ADC",
] as const
const cleanRoutingPhaseByNet = Object.fromEntries(
  cleanRouteOrder.map((name) => [name, 17]),
) as Partial<Record<(typeof nets)[number], number>>
const cleanFinalRouteOrder = [
  "USB_DP_CONN", "USB_DM_CONN", "USB_DP_ESD", "USB_DM_ESD",
  "BOOT_BIAS",
  "PD_CC1", "PD_CC2", "DIAG", "STEP", "DIR",
  "UART_MCU", "LOGIC_IN",
] as const
const cleanFinalRoutingPhaseByNet = Object.fromEntries(
  cleanFinalRouteOrder.map((name, index) => [
    name,
    index < 4 ? 29 + index : index <= 10 ? 31 + index : 33 + index,
  ]),
) as Partial<Record<(typeof nets)[number], number>>
const fabricationRouteOrder = [
  "PD_VBUS_RAW", "PD_VBUS_FUSED", "VM", "VIO",
  "MOTOR_A_NEG", "MOTOR_A_POS", "MOTOR_B_POS", "MOTOR_B_NEG",
  "SENSE_A", "SENSE_B",
  "USB_DP_CONN", "USB_DM_CONN", "USB_DP_ESD", "USB_DM_ESD", "USB_DM", "USB_DP",
  "PD_CC1", "PD_CC2", "DATA_CC1", "DATA_CC2",
  "USB_5V", "LOGIC_IN", "V5_DRV", "CP_HI", "CP_LO", "VCP", "VREF",
  "BOOT_BIAS", "VBUS_ADC", "DIAG", "STEP", "DIR", "ENN", "STDBY",
  "UART_MCU", "UART_DRV",
] as const
const fabricationRoutingGroups = [
  { name: "SIGNALS", phase: 70,
    nets: nonGroundNets },
] as const
const fabricationPrecomputedRoutes: Partial<Record<
  (typeof fabricationRouteOrder)[number],
  any[]
>> = {
  USB_DM_CONN: [{
    connection: ".J_USB_DATA > .DN1",
    route: [
      { route_type: "wire", x: -0.75, y: 3.776, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: -0.75, y: 3.3, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 0.0, y: 2.6, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 0.7, y: 1.4, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 1.6509, y: 0.35, width: 0.15, layer: "bottom" },
    ],
  }, {
    connection: ".J_USB_DATA > .DN2",
    route: [
      { route_type: "wire", x: -1.75, y: 3.776, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: -1.75, y: 3.1, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: -0.8, y: 2.1, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 0.2, y: 0.8, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 1.6509, y: 0.35, width: 0.15, layer: "bottom" },
    ],
  }],
  USB_DP_ESD: [{
    connection: ".U_USB_ESD > .DP_OUT",
    route: [
      { route_type: "wire", x: 3.9491, y: 2.25, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 4.5, y: 1.7, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 4.5, y: -0.4, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 3.29, y: -0.8, width: 0.15, layer: "bottom" },
    ],
  }],
  USB_DM_ESD: [{
    connection: ".U_USB_ESD > .DM_OUT",
    route: [
      { route_type: "wire", x: 3.9491, y: 0.35, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 3.5, y: 0.0, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 2.5, y: -0.2, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 1.49, y: -0.8, width: 0.15, layer: "bottom" },
    ],
  }],
  USB_DM: [{
    connection: ".R_USB_DM > .pin2",
    route: [
      { route_type: "wire", x: 2.51, y: -0.8, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 3.1, y: -0.8, width: 0.15, layer: "bottom" },
      { route_type: "via", x: 3.1, y: -0.8, from_layer: "bottom", to_layer: "top",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 7.1, y: -3.8, width: 0.15, layer: "top" },
      { route_type: "via", x: 7.1, y: -3.8, from_layer: "top", to_layer: "bottom",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 7.1, y: -3.2, width: 0.15, layer: "bottom" },
    ],
  }],
  USB_DP: [{
    connection: ".R_USB_DP > .pin2",
    route: [
      { route_type: "wire", x: 4.31, y: -0.8, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 4.6, y: -1.2, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 4.6, y: -4.3, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 6.7, y: -4.3, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 6.7, y: -3.2, width: 0.15, layer: "bottom" },
    ],
  }, {
    connection: ".SW_BOOT > .pin102",
    route: [
      { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 8.3, y: -4.0, width: 0.15, layer: "top" },
      { route_type: "via", x: 8.3, y: -4.0, from_layer: "top", to_layer: "bottom",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 6.7, y: -4.3, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 6.7, y: -3.2, width: 0.15, layer: "bottom" },
    ],
  }],
  SENSE_B: [{
    connection: ".U_DRV > .BRB",
    route: [
      { route_type: "wire", x: -3.0, y: -0.5, width: 0.6, layer: "top" },
      { route_type: "wire", x: -4.4, y: -0.5, width: 0.6, layer: "top" },
      { route_type: "wire", x: -5.2, y: -1.1, width: 0.6, layer: "top" },
      { route_type: "wire", x: -7.2, y: -1.6, width: 0.6, layer: "top" },
      { route_type: "wire", x: -8.5, y: -0.9788, width: 0.6, layer: "top" },
    ],
  }],
  V5_DRV: [{
    connection: ".U_DRV > .5VOUT",
    route: [
      { route_type: "wire", x: 2.0, y: -1.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 2.5, y: -1.3, width: 0.15, layer: "top" },
      { route_type: "wire", x: 3.49, y: -2.3, width: 0.15, layer: "top" },
    ],
  }, {
    connection: ".R_VREF_TOP > .pin1",
    route: [
      { route_type: "wire", x: 3.29, y: 2.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 3.7, y: 1.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 3.7, y: -1.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 3.49, y: -2.3, width: 0.15, layer: "top" },
    ],
  }],
  UART_DRV: [{
    connection: ".R_UART > .pin2",
    route: [
      { route_type: "wire", x: 0.51, y: 4.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 0.9, y: 4.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 1.5, y: 3.2, width: 0.15, layer: "top" },
      { route_type: "wire", x: 2.0, y: 2.0, width: 0.15, layer: "top" },
    ],
  }],
  DIAG: [{
    connection: ".U_DRV > .DIAG",
    route: [
      { route_type: "wire", x: 2.0, y: 0.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 2.8, y: -0.3, width: 0.15, layer: "top" },
      { route_type: "via", x: 2.8, y: -0.3, from_layer: "top", to_layer: "bottom",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 4.6, y: -0.3, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 6.3, y: -0.2, width: 0.15, layer: "bottom" },
    ],
  }],
  UART_MCU: [{
    connection: ".U_MCU > .UART1",
    route: [
      { route_type: "wire", x: 5.2, y: -0.9, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 4.8, y: -0.9, width: 0.15, layer: "bottom" },
      { route_type: "via", x: 4.8, y: -0.9, from_layer: "bottom", to_layer: "top",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 4.8, y: -3.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 2.6, y: -3.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 2.6, y: 3.8, width: 0.15, layer: "top" },
      { route_type: "wire", x: 1.0, y: 4.2, width: 0.15, layer: "top" },
      { route_type: "wire", x: -0.51, y: 4.7, width: 0.15, layer: "top" },
    ],
  }],
  VCP: [{
    connection: ".C_VCP > .pin1",
    route: [
      { route_type: "wire", x: -3.175, y: -2.5, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: -2.8, y: -3.2, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 0.5, y: -3.2, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 0.5, y: -2.7, width: 0.15, layer: "bottom" },
      { route_type: "via", x: 0.5, y: -2.7, from_layer: "bottom", to_layer: "top",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 0.5, y: -2.0, width: 0.15, layer: "top" },
    ],
  }],
  VREF: [{
    connection: ".U_DRV > .VREF",
    route: [
      { route_type: "wire", x: 0.0, y: 3.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 0.0, y: 3.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.0, y: 3.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
    ],
  }, {
    connection: ".R_VREF_TOP > .pin2",
    route: [
      { route_type: "wire", x: 4.31, y: 2.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 4.31, y: 3.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.0, y: 3.7, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
    ],
  }, {
    connection: ".R_VREF_BOTTOM > .pin1",
    route: [
      { route_type: "wire", x: 5.39, y: 2.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.39, y: 3.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
    ],
  }],
  BOOT_BIAS: [{
    connection: ".R_BOOT > .pin2",
    route: [
      { route_type: "wire", x: 7.41, y: -1.0, width: 0.15, layer: "top" },
      { route_type: "wire", x: 7.8, y: -2.4, width: 0.15, layer: "top" },
      { route_type: "wire", x: 6.7, y: -3.5, width: 0.15, layer: "top" },
      { route_type: "wire", x: 5.849508, y: -3.5, width: 0.15, layer: "top" },
    ],
  }],
  VBUS_ADC: [{
    connection: ".R_VBUS_TOP > .pin2",
    route: [
      { route_type: "wire", x: 8.8, y: -1.31, width: 0.15, layer: "top" },
      { route_type: "wire", x: 8.1, y: -1.31, width: 0.15, layer: "top" },
      { route_type: "wire", x: 8.1, y: 0.4, width: 0.15, layer: "top" },
      { route_type: "via", x: 8.1, y: 0.4, from_layer: "top", to_layer: "bottom",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 7.1, y: -0.2, width: 0.15, layer: "bottom" },
    ],
  }, {
    connection: ".R_VBUS_BOTTOM > .pin1",
    route: [
      { route_type: "wire", x: 8.8, y: 1.71, width: 0.15, layer: "top" },
      { route_type: "wire", x: 8.0, y: 1.71, width: 0.15, layer: "top" },
      { route_type: "wire", x: 8.0, y: 1.2, width: 0.15, layer: "top" },
      { route_type: "via", x: 8.0, y: 1.2, from_layer: "top", to_layer: "bottom",
        via_diameter: 0.45, via_hole_diameter: 0.3 },
      { route_type: "wire", x: 7.6, y: 0.7, width: 0.15, layer: "bottom" },
      { route_type: "wire", x: 7.1, y: -0.2, width: 0.15, layer: "bottom" },
    ],
  }],
}
const fabricationRoutingPhaseByNet = {
  ...Object.fromEntries(
    fabricationRoutingGroups.flatMap((group) =>
      group.nets.map((name) => [name, group.phase]),
    ),
  ),
  PD_CC1: 75,
  PD_CC2: 76,
  DATA_CC1: 77,
  DATA_CC2: 78,
  USB_DP_CONN: 79,
  USB_DM_CONN: 80,
  USB_DP_ESD: 81,
  USB_DM_ESD: 82,
  USB_DM: 83,
  USB_DP: 84,
  UART_MCU: 85,
  UART_DRV: 86,
  ENN: 87,
} as Partial<Record<(typeof nets)[number], number>>
const vmFanoutRoutes = [
  { connection: ".D_LOGIC_PD > .anode", padX: 6.2, padY: 1.860048, viaX: 5.6, viaY: 1.86 },
  { connection: ".C_VM_BULK1 > .pin1", padX: -8.5, padY: -6.075, viaX: -7.7, viaY: -6.075 },
  { connection: ".C_VM_BULK2 > .pin1", padX: -8.5, padY: -2.975, viaX: -7.7, viaY: -2.975 },
  { connection: ".C_VM_HF1 > .pin1", padX: -7.175, padY: -0.7, viaX: -6.6, viaY: -0.7 },
  { connection: ".C_VCP > .pin2", padX: -4.51, padY: -3.0, viaX: -4.825, viaY: -3.1 },
] as const

const groundFanoutConnections = [
  ".J_USB_PD > .EH1", ".J_USB_PD > .EH2", ".J_USB_PD > .EH3", ".J_USB_PD > .EH4",
  ".J_USB_PD > .GND1", ".J_USB_PD > .GND2",
  ".R_VBUS_BOTTOM > .pin2", ".D_VM_TVS > .ANODE_TVS",
  ".R_STDBY_PD > .pin2", ".C_5V > .pin2",
  ".R_SENSE_A > .pin2", ".R_SENSE_B > .pin2", ".R_VREF_BOTTOM > .pin2",
] as const

const bottomGroundConnections = [
  ".J_USB_DATA > .EH1", ".J_USB_DATA > .EH2", ".J_USB_DATA > .EH3", ".J_USB_DATA > .EH4",
  ".J_USB_DATA > .GND1", ".J_USB_DATA > .GND2",
  ".R_DATA_CC1 > .pin2", ".R_DATA_CC2 > .pin2", ".U_USB_ESD > .GND",
  ".U_3V3 > .GND", ".C_LDO_IN > .pin2", ".C_LDO_OUT > .pin2", ".U_MCU > .GND",
  ".C_MCU_HF > .pin2", ".C_MCU_BULK > .pin2", ".C_VM_BULK1 > .pin2", ".C_VM_BULK2 > .pin2",
  ".C_VM_HF1 > .pin2",
] as const
const automaticGroundFanoutConnections = [
  ...groundFanoutConnections,
  ...bottomGroundConnections.slice(0, 9),
] as const
const fabricationTopGroundConnections = [
  ".J_USB_PD > .GND1", ".J_USB_PD > .GND2",
  ".R_VBUS_BOTTOM > .pin2", ".D_VM_TVS > .ANODE_TVS", ".R_STDBY_PD > .pin2",
  ".C_5V > .pin2", ".R_SENSE_A > .pin2",
  ".R_SENSE_B > .pin2", ".R_VREF_BOTTOM > .pin2", ".C_VREF > .pin2",
] as const
const fabricationGroundConnections = [
  ...fabricationTopGroundConnections,
] as const
const fabricationManualTopGroundRoutes = [
  { connection: ".J_USB_PD > .GND1", padX: 1.25, padY: -3.826, viaX: 1.25, viaY: -2.626 },
  { connection: ".J_USB_PD > .GND2", padX: 1.75, padY: -3.826, viaX: 1.75, viaY: -1.926 },
  { connection: ".R_VBUS_BOTTOM > .pin2", padX: 8.8, padY: 1.71, viaX: 7.1, viaY: 2.31 },
  { connection: ".R_STDBY_PD > .pin2", padX: -6.51, padY: 2.6, viaX: -4.71, viaY: 4.15,
    waypoints: [{ x: -5.91, y: 3.95 }, { x: -5.66, y: 4.15 }] },
  { connection: ".C_5V > .pin2", padX: 4.51, padY: -2.3, viaX: 4.51, viaY: -1.75 },
  { connection: ".R_SENSE_A > .pin2", padX: -8.9788, padY: 5.42, viaX: -8.579, viaY: 4.62 },
  { connection: ".R_SENSE_B > .pin2", padX: -8.5, padY: 1.9788, viaX: -8.3, viaY: 3.579 },
  { connection: ".R_VREF_BOTTOM > .pin2", padX: 6.41, padY: 2.0, viaX: 6.01, viaY: 2.6 },
  { connection: ".C_VREF > .pin2", padX: 6.61, padY: 3.5, viaX: 6.31, viaY: 3.9 },
  { connection: ".C_VIO > .pin2", padX: 3.01, padY: 4.7, viaX: 3.01, viaY: 4.9 },
  { connection: ".D_VM_TVS > .ANODE_TVS", padX: 8.5, padY: 8.6913, viaX: 7.8, viaY: 8.591 },
] as const
const fabricationEnabledTopGroundRoutes = fabricationManualTopGroundRoutes.filter((_, index) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(index),
)
const groundManualFanoutRoutes = [
  { connection: ".U_3V3 > .GND", padX: 9.45, padY: 6.77, viaX: 9.4, viaY: 6.1 },
  { connection: ".C_LDO_IN > .pin2", padX: 5.875, padY: 5.2, viaX: 5.5, viaY: 4.6 },
  { connection: ".C_LDO_OUT > .pin2", padX: 5.93, padY: 9.125, viaX: 6.6, viaY: 9.125 },
  { connection: ".U_MCU > .GND", padX: 4.7, padY: -1.7, viaX: 4.7, viaY: -1.7 },
  { connection: ".C_MCU_HF > .pin2", padX: 7.49, padY: -0.4, viaX: 7.5, viaY: -1.0 },
  { connection: ".C_MCU_BULK > .pin2", padX: 6.9, padY: -5.625, viaX: 7.4, viaY: -5.625 },
  { connection: ".C_VM_BULK1 > .pin2", padX: -8.5, padY: -7.725, viaX: -9.3, viaY: -7.725 },
  { connection: ".C_VM_BULK2 > .pin2", padX: -8.5, padY: -4.625, viaX: -9.3, viaY: -4.625 },
  { connection: ".C_VM_HF1 > .pin2", padX: -8.825, padY: -0.7, viaX: -9.4, viaY: -0.7 },
] as const
const vioFanoutRoutes = [
  { connection: ".U_USB_ESD > .VBUS", layer: "bottom", padX: -1.3509, padY: 0.8, viaX: -0.8, viaY: 0.8 },
  { connection: ".U_3V3 > .OUT", layer: "bottom", padX: 7.55, padY: 6.77, viaX: 6.9, viaY: 6.77 },
  { connection: ".C_LDO_OUT > .pin1", layer: "bottom", padX: 5.93, padY: 9.125, viaX: 5.3, viaY: 9.125 },
  { connection: ".U_MCU > .VDD", layer: "bottom", padX: 3.2, padY: -2.5, viaX: 2.5, viaY: -2.1 },
  { connection: ".C_MCU_HF > .pin1", layer: "bottom", padX: 7.31, padY: 1.2, viaX: 7.3, viaY: 0.5 },
  { connection: ".C_MCU_BULK > .pin1", layer: "bottom", padX: 6.9, padY: -3.975, viaX: 7.4, viaY: -3.975 },
  { connection: ".R_BOOT > .pin1", layer: "top", padX: 6.39, padY: -1.0, viaX: 6.39, viaY: 0.8 },
  { connection: ".R_EN_PU > .pin1", layer: "top", padX: -4.29, padY: -2.2, viaX: -4.29, viaY: -1.5 },
  { connection: ".U_DRV > .VCC_IO", layer: "top", padX: 1.0, padY: 3.0, viaX: 1.8, viaY: 3.0 },
  { connection: ".C_VIO > .pin1", layer: "top", padX: 1.99, padY: 4.7, viaX: 1.99, viaY: 4.1 },
] as const

const driverBreakoutConnections = [
  ".U_DRV > .OB2", ".U_DRV > .ENN", ".U_DRV > .GND2", ".U_DRV > .CPO",
  ".U_DRV > .CPI", ".U_DRV > .VCP", ".U_DRV > .SPREAD", ".U_DRV > .5VOUT",
  ".U_DRV > .MS1_AD0", ".U_DRV > .MS2_AD1", ".U_DRV > .DIAG", ".U_DRV > .CLK",
  ".U_DRV > .PDN_UART", ".U_DRV > .VCC_IO", ".U_DRV > .STEP", ".U_DRV > .VREF",
  ".U_DRV > .GND1", ".U_DRV > .DIR", ".U_DRV > .STDBY", ".U_DRV > .OA2",
  ".U_DRV > .VS2", ".U_DRV > .BRA", ".U_DRV > .OA1", ".U_DRV > .UNUSED",
  ".U_DRV > .OB1", ".U_DRV > .BRB", ".U_DRV > .VS1", ".U_DRV > .EP",
] as const
const driverControlBreakoutConnections = [
  ".U_DRV > .CPO", ".U_DRV > .CPI", ".U_DRV > .VCP",
  ".U_DRV > .5VOUT", ".U_DRV > .DIAG", ".U_DRV > .PDN_UART",
  ".U_DRV > .VCC_IO", ".U_DRV > .VREF", ".U_DRV > .STDBY",
] as const

const mcuBreakoutConnections = [
  ".U_MCU > .VDD",
  ".U_MCU > .STDBY_OUT", ".U_MCU > .DIAG_IN",
  ".U_MCU > .VBUS_ADC",
  ".U_MCU > .CC1", ".U_MCU > .CC2",
] as const
const driverGroundRoutes = [
  { connection: ".U_DRV > .GND2", x: -1.3, y: -0.3 },
  { connection: ".U_DRV > .SPREAD", x: 0.3, y: -0.3 },
  { connection: ".U_DRV > .MS1_AD0", x: 0.3, y: -0.3 },
  { connection: ".U_DRV > .MS2_AD1", x: 0.3, y: 0.5 },
  { connection: ".U_DRV > .CLK", x: 0.3, y: 1.3 },
  { connection: ".U_DRV > .GND1", x: -0.5, y: 1.3 },
] as const
const thermalViaOffsets = [-0.8, 0, 0.8] as const
const driverX = -0.5
const driverY = 0.5
const driverSelector = ".U_DRV"
/* Explicit local plane stubs let the routing DRC verify every ground pad.
 * Top-side SMT grounds also receive a 0.30/0.45 mm stitching via to the
 * bottom ground plane; plated USB shell holes already span the stack. */
const groundPlaneStubs: Array<{
  name: string
  from: string
  x: number
  y: number
  stitch?: boolean
  viaX?: number
  viaY?: number
}> = [
  { name: "USB_EH1", from: ".J_USB > .EH1", x: 4.3251, y: -4.5943 },
  { name: "USB_EH2", from: ".J_USB > .EH2", x: -4.3251, y: -4.5943 },
  { name: "USB_EH3", from: ".J_USB > .EH3", x: 4.3251, y: -8.7741 },
  { name: "USB_EH4", from: ".J_USB > .EH4", x: -4.3251, y: -8.7741 },
  { name: "USB_GND1", from: ".J_USB > .A1B12", x: 1.25, y: -3.826, stitch: true, viaY: -3.35 },
  { name: "USB_GND2", from: ".J_USB > .B1A12", x: 1.75, y: -3.826, stitch: true, viaY: -3.35 },
  { name: "ESD_GND", from: ".U_USB_ESD > .GND", x: 1.6491, y: -0.7 },
  { name: "LDO_GND", from: ".U_3V3 > .GND", x: 7.73, y: 5.65 },
  { name: "LDO_IN_GND", from: ".C_LDO_IN > .pin2", x: 3.5, y: 3.875 },
  { name: "LDO_OUT_GND", from: ".C_LDO_OUT > .pin2", x: 5.675, y: 7.3 },
  { name: "MCU_GND", from: ".U_MCU > .GND", x: 4.8, y: -0.3 },
  { name: "MCU_HF_GND", from: ".C_MCU_HF > .pin2", x: 7.59, y: -1.3 },
  { name: "MCU_BULK_GND", from: ".C_MCU_BULK > .pin2", x: 8.0, y: -0.125 },
  { name: "VBUS_DIV_GND", from: ".R_VBUS_BOTTOM > .pin2", x: 9.0, y: 7.51 },
  { name: "TVS_GND", from: ".D_VM_TVS > .ANODE_TVS", x: -2.5913, y: 8.6 },
  { name: "BULK1_GND", from: ".C_VM_BULK1 > .pin2", x: -8.5, y: -7.725 },
  { name: "BULK2_GND", from: ".C_VM_BULK2 > .pin2", x: -8.5, y: -4.625 },
  { name: "BULK3_GND", from: ".C_VM_BULK3 > .pin2", x: -6.5, y: -4.625 },
  { name: "VM_HF1_GND", from: ".C_VM_HF1 > .pin2", x: -7.675, y: -0.7, stitch: true },
  { name: "VM_HF2_GND", from: ".C_VM_HF2 > .pin2", x: -7.675, y: 2.6 },
  { name: "STEP_PD_GND", from: ".R_STEP_PD > .pin2", x: -2.11, y: 5.5 },
  { name: "DIR_PD_GND", from: ".R_DIR_PD > .pin2", x: -0.11, y: 5.5 },
  { name: "STDBY_PD_GND", from: ".R_STDBY_PD > .pin2", x: -2.31, y: 4.1 },
  { name: "SPREAD_GND", from: ".TP_SPREAD_BREAK > .pin1", x: 1.3, y: -1.4, stitch: true, viaX: 2.5, viaY: -2.8 },
  { name: "MS1_GND", from: ".TP_MS1_BREAK > .pin1", x: 1.3, y: 0 },
  { name: "CLK_GND", from: ".TP_CLK_BREAK > .pin1", x: 1.3, y: 1.8, stitch: true },
  { name: "DRV_5V_GND", from: ".C_5V > .pin2", x: 6.525, y: 0 },
  { name: "DRV_VIO_GND", from: ".C_VIO > .pin2", x: 3.41, y: 4.5, stitch: true },
  { name: "SENSE_A_GND", from: ".R_SENSE_A > .pin2", x: -5.5212, y: 4.3 },
  { name: "SENSE_B_GND", from: ".R_SENSE_B > .pin2", x: -8.5, y: -0.8788 },
  { name: "VREF_DIV_GND", from: ".R_VREF_BOTTOM > .pin2", x: 7.41, y: 4.4, stitch: true },
  { name: "VREF_CAP_GND", from: ".C_VREF > .pin2", x: 9.41, y: 4.4 },
  { name: "PROG_GND", from: ".TP_PROG_GND > .pin1", x: 4.5, y: 8.8 },
]

export default function Nema8TwentyMillimeterController({
  debugNoGroundPour = false,
  useCleanAutoroute = true,
}: {
  debugNoGroundPour?: boolean
  useCleanAutoroute?: boolean
} = {}) {
  const useFinalAutoroute = true
  const useMonolithicAutoroute = true
  return (
    <board width="20mm" height="20mm" layers={8} thickness="1.6mm"
      routeRemaining={!useCleanAutoroute}
      fabricatorPreset="jlcpcb_standard_20260912"
      autorouterEffortLevel="10x"
      minTraceWidth="0.15mm" minTraceToPadEdgeClearance="0.1mm"
      minViaEdgeToPadEdgeClearance="0.1mm" minViaHoleEdgeToViaHoleEdgeClearance="0.2mm"
      minPlatedHoleDrillEdgeToDrillEdgeClearance="0.3mm" minPadEdgeToPadEdgeClearance="0.1mm"
      minBoardEdgeClearance="0.2mm" minViaHoleDiameter="0.3mm" minViaPadDiameter="0.45mm"
      isViaInPadAllowed
      autorouterVersion="latest"
      autorouter={{ preset: "default", allowViaInPad: false, traceClearance: "0.1mm" }}
      pcbStyle={{ viaHoleDiameter: "0.3mm", viaPadDiameter: "0.45mm" }}>
      <schematicsheet name={schematicSheets.power} displayName="1. USB-C PD and power" sheetSize="A4" sheetIndex={1}>
        <schematicsection name={schematicSections.powerInput} displayName="USB-C PD input and protection" />
        <schematicsection name={schematicSections.logicPower} displayName="3.3 V logic supply" />
        <schematictext schX={-13} schY={8.5} anchor="top_left" fontSize={0.22}
          text="POWER INPUT — USB-C PD motor input; the CH32X035 on Sheet 2 negotiates 15 V." />
        <schematictext schX={-13} schY={8} anchor="top_left" fontSize={0.19}
          text="F1: 1.1 A resettable fuse. D_BLOCK: reverse-current barrier. D_VM_TVS: 16 V standoff TVS." />
        <schematictext schX={1} schY={8.5} anchor="top_left" fontSize={0.22}
          text="LOGIC POWER — U_3V3 regulates diode-ORed VM or DATA USB 5 V to 3.3 V." />
        <schematictext schX={1} schY={8} anchor="top_left" fontSize={0.19}
          text="U_3V3 powers the MCU, USB ESD bias, and TMC2209 VIO." />
      </schematicsheet>
      <schematicsheet name={schematicSheets.control} displayName="2. USB programming and controller" sheetSize="A4" sheetIndex={2}>
        <schematicsection name={schematicSections.usbData} displayName="USB-C programming interface" />
        <schematicsection name={schematicSections.controller} displayName="CH32X035 control" />
        <schematictext schX={-13} schY={8.5} anchor="top_left" fontSize={0.22}
          text="DATA USB-C — USB 2.0 programming/data and optional 5 V logic power." />
        <schematictext schX={-13} schY={8} anchor="top_left" fontSize={0.19}
          text="Hold BOOT while connecting the port to enter ROM USB ISP." />
        <schematictext schX={-13} schY={7.5} anchor="top_left" fontSize={0.19}
          text="U_USB_ESD — 5.25 V low-capacitance ESD protection; 27 ohm D+/D- series resistors." />
        <schematictext schX={1} schY={8.5} anchor="top_left" fontSize={0.22}
          text="U_MCU — CH32X035F8U6 USB-PD controller operating at 3.3 V." />
        <schematictext schX={1} schY={8} anchor="top_left" fontSize={0.19}
          text="Negotiates PD and drives STEP, DIR, ENN, UART, and STDBY." />
        <schematictext schX={7} schY={-5.1} anchor="top_left" fontSize={0.18}
          text="SW_BOOT — Hold while connecting DATA USB-C to enter ROM USB ISP." />
      </schematicsheet>
      <schematicsheet name={schematicSheets.driver} displayName="3. TMC2209 motor stage" sheetSize="A4" sheetIndex={3}>
        <schematicsection name={schematicSections.driverCore} displayName="TMC2209 driver and current regulation" />
        <schematictext schX={-13} schY={8.5} anchor="top_left" fontSize={0.22}
          text="U_DRV — TMC2209-LA-T stepper driver; nominal VM 15 V and 0.60 A/phase maximum." />
        <schematictext schX={-13} schY={8} anchor="top_left" fontSize={0.19}
          text="UART configures IRUN/IHOLD; STEP, DIR, ENN, and STDBY control motion." />
        <schematictext schX={1} schY={8.5} anchor="top_left" fontSize={0.22}
          text="MOTOR — 8HS15-0604S: 11 ohm, 5.5 mH; connector order A-, A+, B+, B-." />
        <schematictext schX={1} schY={8} anchor="top_left" fontSize={0.19}
          text="CURRENT SET — 0.33 ohm sense resistors and the VREF divider set the ceiling." />
      </schematicsheet>
      {nets.map((name) => <Fragment key={name}><net name={name}
        nominalTraceWidth="0.15mm"
        routingPhaseIndex={useCleanAutoroute
          ? useFinalAutoroute
            ? useMonolithicAutoroute
              ? name === "GND" ? null : 70
              : (fabricationRoutingPhaseByNet[name] ?? 200)
            : (["GND", "VM", "VIO"] as readonly string[]).includes(name) ? null
            : (["PD_VBUS_RAW", "PD_VBUS_FUSED"] as readonly string[]).includes(name) ? 18
            : name.startsWith("SENSE_") ? 19
            : name.startsWith("MOTOR_") ? 20
            : name === "VREF" ? 21
            : name === "VBUS_ADC" ? 22
            : name === "STDBY" ? 23
            : (["DATA_CC1", "DATA_CC2"] as readonly string[]).includes(name) ? 24
            : name === "ENN" ? 25
            : name === "CP_LO" ? 26
            : name === "CP_HI" ? 27
            : name === "VCP" ? 28
            : name === "USB_DP" ? 33
            : name === "USB_DM" ? 34
            : name === "UART_DRV" ? 42
            : name === "USB_5V" ? 43
            : name === "V5_DRV" ? 55 : (cleanFinalRoutingPhaseByNet[name] ?? 60)
          : (routingPhaseByNet[name] ?? 40)} /></Fragment>)}
      {driverGroundRoutes.map(({ connection, x, y }) => (
        <Fragment key={connection}>
          <trace name={`LOCAL_${connection}`} from={connection} to="net.GND" thickness="0.15mm"
            pcbPath={[{ x, y }]} routingPhaseIndex={null} />
        </Fragment>
      ))}
      {<trace name="LOCAL_U_DRV_EP" from=".U_DRV > .EP" to="net.GND" thickness="0.15mm"
        pcbPathRelativeTo=".U_DRV > .EP" pcbPath={[".U_DRV > .EP"]} routingPhaseIndex={null} />
      }
      {false && <>
      <autoroutingphase name="DRV_GND_TO_BOTTOM_PLANE" phaseIndex={1}
        connections={[
          ".U_DRV > .GND2", ".U_DRV > .SPREAD", ".U_DRV > .MS1_AD0",
          ".U_DRV > .MS2_AD1", ".U_DRV > .CLK", ".U_DRV > .GND1",
          ".U_DRV > .UNUSED", ".U_DRV > .EP",
        ]}
        autorouter="fanout" fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]}
        pcbTracePaths={[
          { connection: ".U_DRV > .GND2", route: [
            { route_type: "wire", x: -3, y: -1.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: -3, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "via", x: -3, y: -2.2, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .SPREAD", route: [
            { route_type: "wire", x: -1, y: -1.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "via", x: -1, y: -2.2, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .MS1_AD0", route: [
            { route_type: "wire", x: 0, y: 0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.55, y: 0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.8, y: -0.2, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.8, y: -0.2, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .MS2_AD1", route: [
            { route_type: "wire", x: 0, y: 0.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.55, y: 0.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 1.2, y: 0.7, width: 0.15, layer: "top" },
            { route_type: "via", x: 1.2, y: 0.7, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .CLK", route: [
            { route_type: "wire", x: 0, y: 2, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.55, y: 2, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.9, y: 2.2, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.9, y: 2.2, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .GND1", route: [
            { route_type: "wire", x: -2.5, y: 3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: -2.5, y: 4.25, width: 0.15, layer: "top" },
            { route_type: "wire", x: -3.2, y: 4.25, width: 0.15, layer: "top" },
            { route_type: "via", x: -3.2, y: 4.25, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .UNUSED", route: [
            { route_type: "wire", x: -5, y: 1, width: 0.15, layer: "top" },
            { route_type: "wire", x: -5.6, y: 1, width: 0.15, layer: "top" },
            { route_type: "via", x: -5.6, y: 1, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .EP", route: [
            { route_type: "wire", x: -2.5, y: 1, width: 0.15, layer: "top" },
            { route_type: "via", x: -2.5, y: 1, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
        ]} />
      </>}
      {false && <>
      <autoroutingphase name="TOP_GND_TO_BOTTOM_PLANE" phaseIndex={2}
        connections={[
          ".C_5V > .pin2", ".C_VIO > .pin2",
          ".R_VREF_BOTTOM > .pin2", ".C_VREF > .pin2",
          ".R_SENSE_A > .pin2", ".R_SENSE_B > .pin2",
        ]}
        autorouter="fanout" fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]}
        pcbTracePaths={[
          { connection: ".C_5V > .pin2", route: [
            { route_type: "wire", x: 6.525, y: 0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 7.5, y: 0.5, width: 0.15, layer: "top" },
            { route_type: "via", x: 7.5, y: 0.5, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VIO > .pin2", route: [
            { route_type: "wire", x: 3.41, y: 4.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.41, y: 5.15, width: 0.15, layer: "top" },
            { route_type: "via", x: 3.41, y: 5.15, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".R_VREF_BOTTOM > .pin2", route: [
            { route_type: "wire", x: 7.41, y: 4.4, width: 0.15, layer: "top" },
            { route_type: "wire", x: 7.41, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "via", x: 7.41, y: 3.7, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VREF > .pin2", route: [
            { route_type: "wire", x: 9.41, y: 4.4, width: 0.15, layer: "top" },
            { route_type: "wire", x: 9.41, y: 3.6, width: 0.15, layer: "top" },
            { route_type: "via", x: 9.41, y: 3.6, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".R_SENSE_A > .pin2", route: [
            { route_type: "wire", x: -8.4788, y: 5.42, width: 0.3, layer: "top" },
            { route_type: "wire", x: -9.1, y: 5.42, width: 0.3, layer: "top" },
            { route_type: "via", x: -9.1, y: 5.42, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".R_SENSE_B > .pin2", route: [
            { route_type: "wire", x: -8.5, y: -0.9788, width: 0.3, layer: "top" },
            { route_type: "wire", x: -9.1, y: -0.9788, width: 0.3, layer: "top" },
            { route_type: "via", x: -9.1, y: -0.9788, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
        ]} />
      <autoroutingphase name="LOGIC_POWER" phaseIndex={3}
        autorouter="fanout" fanoutPourNetMap={{ inner1: "VIO" }}
        fanoutRoutingLayers={["top", "bottom", "inner1"]}
        pcbTracePaths={[
          { connection: ".U_USB_ESD > .VBUS", route: [
            { route_type: "wire", x: 1.6491, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.4, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.4, y: -0.7, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_3V3 > .OUT", route: [
            { route_type: "wire", x: 7.73, y: 3.75, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 8.5, y: 3.75, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 8.5, y: 3.75, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_LDO_OUT > .pin1", route: [
            { route_type: "wire", x: 5.675, y: 7.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.675, y: 6.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 5.675, y: 6.5, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_MCU > .VDD", route: [
            { route_type: "wire", x: 3.3, y: -1.1, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.8, y: -1.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.8, y: -1.5, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_MCU_HF > .pin1", route: [
            { route_type: "wire", x: 8.61, y: -1.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 9.3, y: -1.3, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 9.3, y: -1.3, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_MCU_BULK > .pin1", route: [
            { route_type: "wire", x: 8, y: 1.525, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 8.7, y: 1.525, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 8.7, y: 1.525, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".R_EN_PU > .pin1", route: [
            { route_type: "wire", x: -4.11, y: 5.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -4.8, y: 5.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: -4.8, y: 5.5, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .VCC_IO", route: [
            { route_type: "wire", x: -1, y: 3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1, y: 4.3, width: 0.15, layer: "top" },
            { route_type: "via", x: -1, y: 4.3, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VIO > .pin1", route: [
            { route_type: "wire", x: 2.39, y: 4.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.39, y: 5.15, width: 0.15, layer: "top" },
            { route_type: "via", x: 2.39, y: 5.15, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".TP_PROG_VIO > .pin1", route: [
            { route_type: "wire", x: 5.4, y: 8.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.8, y: 8, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 4.8, y: 8, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
        ]} />
      <autoroutingphase name="DRIVER_STEP_DIR" phaseIndex={5}
        pcbTracePaths={[
          { connection: ".U_MCU > .STEP_OUT", route: [
            { route_type: "wire", x: 3.3, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.2, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.2, y: -0.7, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.2, y: 4.6, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -1.7, y: 4.6, width: 0.15, layer: "inner2" },
            { route_type: "via", x: -1.7, y: 4.6, from_layer: "inner2", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.5, y: 3.5, width: 0.15, layer: "top" },
          ] },
          { connection: ".U_MCU > .DIR_OUT", route: [
            { route_type: "wire", x: 3.3, y: -0.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.8, y: 0.2, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.8, y: 0.2, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.8, y: 5.8, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -2.4, y: 5.8, width: 0.15, layer: "inner2" },
            { route_type: "via", x: -2.4, y: 5.8, from_layer: "inner2", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3, y: 3.5, width: 0.15, layer: "top" },
          ] },
        ]} />
      <autoroutingphase name="VM_DISTRIBUTION" phaseIndex={4}
        autorouter="fanout" fanoutPourNetMap={{ top: "VM" }}
        fanoutRoutingLayers={["top", "bottom"]}
        pcbTracePaths={[
          { connection: ".D_BLOCK > .cathode", route: [
            { route_type: "wire", x: -6.65, y: -2.6076, width: 1, layer: "top" },
            { route_type: "wire", x: -7.5, y: -2.6076, width: 1, layer: "top" },
          ] },
          { connection: ".U_3V3 > .IN", route: [
            { route_type: "wire", x: 5.27, y: 4.7, width: 1, layer: "bottom" },
            { route_type: "wire", x: 5.3, y: 5.5, width: 1, layer: "bottom" },
            { route_type: "via", x: 5.3, y: 5.5, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_LDO_IN > .pin1", route: [
            { route_type: "wire", x: 3.5, y: 5.525, width: 1, layer: "bottom" },
            { route_type: "wire", x: 3.5, y: 6.2, width: 1, layer: "bottom" },
            { route_type: "via", x: 3.5, y: 6.2, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".R_VBUS_TOP > .pin1", route: [
            { route_type: "wire", x: 9, y: 4.49, width: 1, layer: "bottom" },
            { route_type: "wire", x: 9.3, y: 3.2, width: 1, layer: "bottom" },
            { route_type: "via", x: 9.3, y: 3.2, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".D_VM_TVS > .CATHODE_TVS", route: [
            { route_type: "wire", x: 2.5913, y: 8.6, width: 1, layer: "bottom" },
            { route_type: "wire", x: 2.5913, y: 9.3, width: 1, layer: "bottom" },
            { route_type: "via", x: 2.5913, y: 9.3, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VM_BULK1 > .pin1", route: [
            { route_type: "wire", x: -8.5, y: -6.075, width: 1, layer: "bottom" },
            { route_type: "wire", x: -9.2, y: -6.075, width: 1, layer: "bottom" },
            { route_type: "via", x: -9.2, y: -6.075, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VM_BULK2 > .pin1", route: [
            { route_type: "wire", x: -8.5, y: -2.975, width: 1, layer: "bottom" },
            { route_type: "wire", x: -9.2, y: -2.975, width: 1, layer: "bottom" },
            { route_type: "via", x: -9.2, y: -2.975, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VM_BULK3 > .pin1", route: [
            { route_type: "wire", x: -6.5, y: -2.975, width: 1, layer: "bottom" },
            { route_type: "wire", x: -5.5, y: -3.3, width: 1, layer: "bottom" },
            { route_type: "via", x: -5.5, y: -3.3, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VM_HF1 > .pin1", route: [
            { route_type: "wire", x: -7.175, y: -0.7, width: 1, layer: "bottom" },
            { route_type: "wire", x: -7.5, y: -1.5, width: 1, layer: "bottom" },
            { route_type: "via", x: -7.5, y: -1.5, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".C_VM_HF2 > .pin1", route: [
            { route_type: "wire", x: -7.175, y: 2.6, width: 1, layer: "bottom" },
            { route_type: "wire", x: -7.5, y: 3.3, width: 1, layer: "bottom" },
            { route_type: "via", x: -7.5, y: 3.3, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ] },
          { connection: ".U_DRV > .VS2", route: [
            { route_type: "wire", x: -5, y: 2.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -5.8, y: 2.5, width: 0.3, layer: "top" },
          ] },
          { connection: ".U_DRV > .VS1", route: [
            { route_type: "wire", x: -5, y: -0.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -5.8, y: -0.5, width: 0.3, layer: "top" },
          ] },
          { connection: ".C_VCP > .pin2", route: [
            { route_type: "wire", x: 6.525, y: 1.6, width: 1, layer: "top" },
            { route_type: "wire", x: 7.2, y: 1.6, width: 1, layer: "top" },
          ] },
        ]} />
      <autoroutingphase name="PROGRAMMING_DCK" phaseIndex={6}
        pcbTracePaths={[
          { connection: ".U_MCU > .DCK", route: [
            { route_type: "wire", x: 5.6, y: -1.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.6, y: -2.4, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 6.6, y: -2.4, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 8, y: -2.4, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 8, y: 8, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 8, y: 8, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.8, y: 8.6, width: 0.15, layer: "bottom" },
          ] },
        ]} />
      <autoroutingphase name="PROGRAMMING_DIO" phaseIndex={7}
        pcbTracePaths={[
          { connection: ".U_MCU > .DIO", route: [
            { route_type: "wire", x: 6.3, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 7, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 7, y: -0.7, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 6.6, y: 7.8, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 6.6, y: 7.8, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 6.6, y: 8.6, width: 0.15, layer: "bottom" },
          ] },
        ]} />
      <autoroutingphase name="DEFAULT_REMAINING_ROUTES" phaseIndex={10} />
      </>}
      {false && <autoroutingphase name="GROUND_DRIVER_FANOUT" phaseIndex={1} autorouter="fanout"
        connections={[
          ".U_DRV > .GND2", ".U_DRV > .SPREAD", ".U_DRV > .MS1_AD0",
          ".U_DRV > .MS2_AD1", ".U_DRV > .CLK", ".U_DRV > .GND1",
          ".U_DRV > .UNUSED", ".U_DRV > .EP",
        ]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]} />}
      {!useCleanAutoroute && <>
      <autoroutingphase name="GROUND_USB_FANOUT" phaseIndex={2} autorouter="fanout"
        connections={[
          ".J_USB_PD > .EH1", ".J_USB_PD > .EH2", ".J_USB_PD > .EH3", ".J_USB_PD > .EH4",
          ".J_USB_PD > .GND1", ".J_USB_PD > .GND2",
        ]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]} />
      <autoroutingphase name="GROUND_5V_FANOUT" phaseIndex={3} autorouter="fanout"
        connections={[".C_5V > .pin2"]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]} />
      <autoroutingphase name="GROUND_VIO_STITCH" phaseIndex={4} autorouter="fanout"
        connections={[".C_VIO > .pin2"]}
        fanoutPourNetMap={{ bottom: "GND" }} fanoutRoutingLayers={["top", "bottom"]}
        pcbTracePaths={[{
          connection: ".C_VIO > .pin2",
          route: [
            { route_type: "wire", x: 3.01, y: 4.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.2, y: 4.2, width: 0.15, layer: "top" },
            { route_type: "via", x: 3.2, y: 4.2, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ],
        }]} />
      <autoroutingphase name="GROUND_VREF_DIV_FANOUT" phaseIndex={5} autorouter="fanout"
        connections={[".R_VREF_BOTTOM > .pin2"]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]} />
      <autoroutingphase name="GROUND_VREF_CAP_FANOUT" phaseIndex={6} autorouter="fanout"
        connections={[".C_VREF > .pin2"]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]}
        pcbTracePaths={[{
          connection: ".C_VREF > .pin2",
          route: [
            { route_type: "wire", x: 6.61, y: 3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 6.0, y: 4.1, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.6, y: 4.5, width: 0.15, layer: "top" },
            { route_type: "via", x: 5.6, y: 4.5, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
          ],
        }]} />
      <autoroutingphase name="GROUND_SENSE_FANOUT" phaseIndex={7} autorouter="fanout"
        connections={[".R_SENSE_A > .pin2", ".R_SENSE_B > .pin2"]}
        fanoutPourNetMap={{ bottom: "GND" }}
        fanoutRoutingLayers={["top", "bottom"]} />
      <autoroutingphase name="VIO_PRIORITY" phaseIndex={1} />
      <autoroutingphase name="STEP_PRIORITY" phaseIndex={8}
        pcbTracePaths={[{
          connection: ".U_MCU > .STEP_OUT",
          route: [
            { route_type: "wire", x: 3.3, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.8, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.8, y: -2.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.8, y: -2.5, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.8, y: 4.2, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 1.3, y: 4.2, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 1.3, y: 4.2, from_layer: "inner2", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 0.5, y: 3.0, width: 0.15, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="UART_MCU_PRIORITY" phaseIndex={9}
        pcbTracePaths={[{
          connection: ".U_MCU > .UART1",
          route: [
            { route_type: "wire", x: 3.3, y: 0.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.8, y: 0.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.8, y: 0.5, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.8, y: 4.4, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -1.2, y: 4.4, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -1.2, y: 4.7, width: 0.15, layer: "inner2" },
            { route_type: "via", x: -1.2, y: 4.7, from_layer: "inner2", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -0.51, y: 4.7, width: 0.15, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="PD_CC2_PRIORITY" phaseIndex={10} />
      <autoroutingphase name="USB_DP_ESD_PRIORITY" phaseIndex={11}
        pcbTracePaths={[{
          connection: ".U_USB_ESD > .DP_OUT",
          route: [
            { route_type: "wire", x: 1.6491, y: -1.05, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.8, y: -0.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.8, y: 1.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.09, y: 2.2, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DIR_PRIORITY" phaseIndex={12} />
      <autoroutingphase name="USB_DP_PRIORITY" phaseIndex={13}
        pcbTracePaths={[{
          connection: ".R_USB_DP > .pin2",
          route: [
            { route_type: "wire", x: 2.11, y: 2.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 3.2, y: 2.2, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 3.2, y: 2.2, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -2.6, width: 0.15, layer: "inner1" },
            { route_type: "wire", x: 5.2, y: -2.6, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 5.2, y: -2.6, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.8, y: -1.8, width: 0.15, layer: "bottom" },
          ],
        }, {
          connection: ".SW_BOOT > .pin102",
          route: [
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.4, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.4, y: -3.5, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.5, y: -2.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.8, y: -1.8, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="PD_AND_VM_POWER" phaseIndex={14} />
      <autoroutingphase name="ROUTE_MOTOR_A_NEG" phaseIndex={15}
        pcbTracePaths={[{
          connection: ".U_DRV > .OA2",
          route: [
            { route_type: "wire", x: -2.0, y: 3.0, width: 0.6, layer: "top" },
            { route_type: "wire", x: -2.0, y: 4.1, width: 0.6, layer: "top" },
            { route_type: "wire", x: -1.5, y: 5.4, width: 0.6, layer: "top" },
            { route_type: "wire", x: 1.5, y: 5.4, width: 0.6, layer: "top" },
            { route_type: "wire", x: 1.499997, y: 6.2749963, width: 0.6, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="ROUTE_MOTOR_A_POS" phaseIndex={16} />
      <autoroutingphase name="ROUTE_MOTOR_B_POS" phaseIndex={17} />
      <autoroutingphase name="ROUTE_MOTOR_B_NEG" phaseIndex={18}
        pcbTracePaths={[{
          connection: ".U_DRV > .OB2",
          route: [
            { route_type: "wire", x: -2.0, y: -2.0, width: 0.6, layer: "top" },
            { route_type: "wire", x: -2.0, y: -2.6, width: 0.6, layer: "top" },
            { route_type: "wire", x: -5.65, y: -2.6, width: 0.6, layer: "top" },
            { route_type: "via", x: -5.65, y: -2.6, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -5.65, y: 6.8, width: 0.6, layer: "bottom" },
            { route_type: "via", x: -5.65, y: 6.8, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.8, y: 6.8, width: 0.6, layer: "top" },
            { route_type: "wire", x: -1.499997, y: 6.2749963, width: 0.6, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="SENSE_PATHS" phaseIndex={19}
        pcbTracePaths={[{
          connection: ".U_DRV > .BRA",
          route: [
            { route_type: "wire", x: -3.0, y: 1.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -4.8, y: 1.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -5.2, y: 2.0, width: 0.3, layer: "top" },
            { route_type: "wire", x: -5.2, y: 5.42, width: 0.3, layer: "top" },
            { route_type: "wire", x: -6.0212, y: 5.42, width: 0.3, layer: "top" },
          ],
        }, {
          connection: ".U_DRV > .BRB",
          route: [
            { route_type: "wire", x: -3.0, y: -0.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -4.2, y: -0.5, width: 0.3, layer: "top" },
            { route_type: "wire", x: -6.0, y: -1.0, width: 0.3, layer: "top" },
            { route_type: "wire", x: -8.5, y: -0.9788, width: 0.3, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="USB_5V_POWER" phaseIndex={20}
        pcbTracePaths={[{
          connection: ".J_USB_DATA > .VBUS1",
          route: [
            { route_type: "wire", x: 2.4, y: 3.776, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 3.2, y: 3.776, width: 0.4, layer: "bottom" },
          ],
        }, {
          connection: ".J_USB_DATA > .VBUS2",
          route: [
            { route_type: "wire", x: 3.2, y: 3.776, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 3.5, y: 3.4, width: 0.4, layer: "bottom" },
            { route_type: "via", x: 3.5, y: 3.4, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 9.5, y: 1.6, width: 0.4, layer: "inner2" },
            { route_type: "via", x: 9.5, y: 1.6, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 9.0, y: 2.910048, width: 0.4, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="PD_CC1_PRIORITY" phaseIndex={21}
        pcbTracePaths={[{
          connection: ".J_USB_PD > .CC1",
          route: [
            { route_type: "wire", x: -2.4, y: -3.826, width: 0.15, layer: "top" },
            { route_type: "wire", x: -2.4, y: -3.2, width: 0.15, layer: "top" },
            { route_type: "via", x: -2.4, y: -3.2, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.4, y: -3.1, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 4.4, y: -3.1, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.4, y: -1.8, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DATA_CC" phaseIndex={22} />
      <autoroutingphase name="USB_CONNECTOR_DATA" phaseIndex={23} />
      <autoroutingphase name="USB_DM_CHAIN" phaseIndex={24}
        pcbTracePaths={[{
          connection: ".U_USB_ESD > .DM_OUT",
          route: [
            { route_type: "wire", x: 1.6491, y: -2.95, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.5, y: -3.0, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.5, y: -3.0, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 1.8, y: -3.5, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -4.2, y: -3.5, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: -4.2, y: 1.8, width: 0.15, layer: "inner2" },
            { route_type: "via", x: -4.2, y: 1.8, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.01, y: 2.2, width: 0.15, layer: "bottom" },
          ],
        }, {
          connection: ".R_USB_DM > .pin2",
          route: [
            { route_type: "wire", x: 0.01, y: 2.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 0.0, y: 2.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -4.8, y: 2.8, width: 0.15, layer: "bottom" },
            { route_type: "via", x: -4.8, y: 2.8, from_layer: "bottom", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.2, y: 2.8, width: 0.15, layer: "inner1" },
            { route_type: "wire", x: 7.2, y: -2.0, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 7.2, y: -2.0, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.2, y: -1.8, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="BOOT_AND_VBUS_SENSE" phaseIndex={25}
        pcbTracePaths={[{
          connection: ".R_BOOT > .pin2",
          route: [
            { route_type: "wire", x: 7.41, y: -1.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 7.0, y: -1.6, width: 0.15, layer: "top" },
            { route_type: "wire", x: 6.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.849508, y: -3.5, width: 0.15, layer: "top" },
          ],
        }, {
          connection: ".R_VBUS_TOP > .pin2",
          route: [
            { route_type: "wire", x: 8.8, y: -1.31, width: 0.15, layer: "top" },
            { route_type: "wire", x: 9.4, y: -1.31, width: 0.15, layer: "top" },
            { route_type: "wire", x: 9.4, y: 1.71, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.8, y: 1.71, width: 0.15, layer: "top" },
          ],
        }, {
          connection: ".R_VBUS_BOTTOM > .pin1",
          route: [
            { route_type: "wire", x: 8.8, y: 1.71, width: 0.15, layer: "top" },
            { route_type: "wire", x: 7.2, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 6.8, y: 1.7, width: 0.15, layer: "top" },
            { route_type: "via", x: 6.8, y: 1.7, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.2, y: 1.2, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_DIAG" phaseIndex={26}
        pcbTracePaths={[{
          connection: ".U_DRV > .DIAG",
          route: [
            { route_type: "wire", x: 2.0, y: 0.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.9, y: 0.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.9, y: 2.9, width: 0.15, layer: "top" },
            { route_type: "wire", x: 4.5, y: 2.9, width: 0.15, layer: "top" },
            { route_type: "via", x: 4.5, y: 2.9, from_layer: "top", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.4, y: 1.2, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_UART" phaseIndex={27}
        pcbTracePaths={[{
          connection: ".U_DRV > .PDN_UART",
          route: [
            { route_type: "wire", x: 2.0, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.4, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.4, y: 3.75, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.6, y: 3.75, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.51, y: 4.7, width: 0.15, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_5V" phaseIndex={28} />
      <autoroutingphase name="DRIVER_CP_HI" phaseIndex={29}
        pcbTracePaths={[{
          connection: ".U_DRV > .CPO",
          route: [
            { route_type: "wire", x: -0.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -0.8, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: -0.8, y: -2.8, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.8, y: -0.4, width: 0.15, layer: "inner1" },
            { route_type: "via", x: -3.8, y: -0.4, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.21, y: -1.0, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_CP_LO" phaseIndex={30}
        pcbTracePaths={[{
          connection: ".U_DRV > .CPI",
          route: [
            { route_type: "wire", x: 0.0, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.2, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.2, y: -2.8, from_layer: "top", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.7, y: -1.0, width: 0.15, layer: "inner2" },
            { route_type: "via", x: -1.7, y: -1.0, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -2.19, y: -1.0, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_VCP" phaseIndex={31}
        pcbTracePaths={[{
          connection: ".U_DRV > .VCP",
          route: [
            { route_type: "wire", x: 0.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.8, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.8, y: -2.8, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.2, y: -3.1, width: 0.15, layer: "inner1" },
            { route_type: "via", x: -3.2, y: -3.1, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.175, y: -2.5, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_VREF" phaseIndex={32}
        pcbTracePaths={[{
          connection: ".U_DRV > .VREF",
          route: [
            { route_type: "wire", x: 0.0, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.0, y: 3.6, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.0, y: 3.6, from_layer: "top", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.0, y: 2.6, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 4.0, y: 2.6, from_layer: "inner2", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.31, y: 2.0, width: 0.15, layer: "top" },
          ],
        }, {
          connection: ".R_VREF_BOTTOM > .pin1",
          route: [
            { route_type: "wire", x: 5.390000000000001, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 4.31, y: 2.0, width: 0.15, layer: "top" },
          ],
        }, {
          connection: ".C_VREF > .pin1",
          route: [
            { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 4.31, y: 2.0, width: 0.15, layer: "top" },
          ],
        }]} />
      <autoroutingphase name="LOGIC_INPUT_POWER" phaseIndex={33}
        pcbTracePaths={[{
          connection: ".D_LOGIC_USB > .cathode",
          route: [
            { route_type: "wire", x: 9.0, y: 5.189952, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 7.0, y: 5.189952, width: 0.4, layer: "bottom" },
          ],
        }, {
          connection: ".U_3V3 > .IN",
          route: [
            { route_type: "wire", x: 8.5, y: 9.23, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 7.9, y: 9.2, width: 0.4, layer: "bottom" },
            { route_type: "via", x: 7.9, y: 9.2, from_layer: "bottom", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 8.7, y: 5.7, width: 0.4, layer: "inner2" },
            { route_type: "via", x: 8.7, y: 5.7, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.0, y: 5.189952, width: 0.4, layer: "bottom" },
          ],
        }, {
          connection: ".C_LDO_IN > .pin1",
          route: [
            { route_type: "wire", x: 3.575, y: 0.0, width: 0.4, layer: "top" },
            { route_type: "wire", x: 3.3, y: -0.5, width: 0.4, layer: "top" },
            { route_type: "via", x: 3.3, y: -0.5, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 6.5, y: 5.7, width: 0.4, layer: "inner1" },
            { route_type: "via", x: 6.5, y: 5.7, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.0, y: 5.189952, width: 0.4, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_ENABLE" phaseIndex={34}
        pcbTracePaths={[{
          connection: ".U_DRV > .ENN",
          route: [
            { route_type: "wire", x: -1.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.2, y: -2.7, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.2, y: -2.7, from_layer: "top", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.7, y: -0.1, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 2.7, y: -0.1, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.3, y: 0.1, width: 0.15, layer: "bottom" },
          ],
        }, {
          connection: ".R_EN_PU > .pin2",
          route: [
            { route_type: "wire", x: -6.91, y: 3.8, width: 0.15, layer: "top" },
            { route_type: "wire", x: -7.2, y: 3.1, width: 0.15, layer: "top" },
            { route_type: "via", x: -7.2, y: 3.1, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.6, y: 0.5, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 2.6, y: 0.5, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.3, y: 0.10000000000000031, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DRIVER_STANDBY" phaseIndex={35}
        pcbTracePaths={[{
          connection: ".U_DRV > .STDBY",
          route: [
            { route_type: "wire", x: -1.5, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.5, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.5, y: 3.7, from_layer: "top", to_layer: "inner2", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.5, y: 1.2, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 3.5, y: 1.2, from_layer: "inner2", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.0, y: 1.2, width: 0.15, layer: "bottom" },
          ],
        }, {
          connection: ".R_STDBY_PD > .pin1",
          route: [
            { route_type: "wire", x: -6.91, y: 2.4, width: 0.15, layer: "top" },
            { route_type: "wire", x: -6.5, y: 1.8, width: 0.15, layer: "top" },
            { route_type: "via", x: -6.5, y: 1.8, from_layer: "top", to_layer: "inner1", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.5, y: 1.7, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 3.5, y: 1.7, from_layer: "inner1", to_layer: "bottom", via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.0, y: 1.2, width: 0.15, layer: "bottom" },
          ],
        }]} />
      <autoroutingphase name="DEFAULT_ALL_NETS" phaseIndex={40} />
      </>}
      {useCleanAutoroute && !useFinalAutoroute && <>
        {groundFanoutConnections.map((connection, index) => (
          <Fragment key={`ground-fanout-${connection}`}>
            <autoroutingphase name={`GROUND_FANOUT_${index + 1}`} phaseIndex={index + 1}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ bottom: "GND" }} fanoutRoutingLayers={["top", "bottom"]} />
          </Fragment>
        ))}
        <autoroutingphase name="GROUND_C_VREF" phaseIndex={15} autorouter="fanout"
          connection=".C_VREF > .pin2" fanoutPourNetMap={{ bottom: "GND" }}
          fanoutRoutingLayers={["top", "bottom"]} pcbTracePaths={[{
            connection: ".C_VREF > .pin2",
            route: [
              { route_type: "wire", x: 6.61, y: 3.5, width: 0.15, layer: "top" },
              { route_type: "wire", x: 6.0, y: 4.1, width: 0.15, layer: "top" },
              { route_type: "wire", x: 5.6, y: 4.5, width: 0.15, layer: "top" },
              { route_type: "via", x: 5.6, y: 4.5, from_layer: "top", to_layer: "bottom",
                via_diameter: 0.45, via_hole_diameter: 0.3 },
            ],
          }]} />
        <autoroutingphase name="GROUND_C_VIO" phaseIndex={16} autorouter="fanout"
          connection=".C_VIO > .pin2" fanoutPourNetMap={{ bottom: "GND" }}
          fanoutRoutingLayers={["top", "bottom"]} pcbTracePaths={[{
            connection: ".C_VIO > .pin2",
            route: [
              { route_type: "wire", x: 3.01, y: 4.7, width: 0.15, layer: "top" },
              { route_type: "wire", x: 3.2, y: 4.2, width: 0.15, layer: "top" },
              { route_type: "via", x: 3.2, y: 4.2, from_layer: "top", to_layer: "bottom",
                via_diameter: 0.45, via_hole_diameter: 0.3 },
            ],
          }]} />
        <autoroutingphase name="VM_TO_TOP_POUR" phaseIndex={17} autorouter="fanout"
          connections={[
            ".D_LOGIC_PD > .anode", ".R_VBUS_TOP > .pin1", ".D_BLOCK > .cathode",
            ".D_VM_TVS > .CATHODE_TVS", ".C_VM_BULK1 > .pin1", ".C_VM_BULK2 > .pin1",
            ".C_VM_HF1 > .pin1", ".U_DRV > .VS2", ".U_DRV > .VS1", ".C_VCP > .pin2",
          ]}
          fanoutPourNetMap={{ top: "VM" }} fanoutRoutingLayers={["top", "bottom"]}
          pcbTracePaths={[
            { connection: ".D_LOGIC_PD > .anode", route: [
              { route_type: "wire", x: 7.0, y: 2.910048, width: 0.4, layer: "bottom" },
              { route_type: "wire", x: 6.5, y: 2.91, width: 0.4, layer: "bottom" },
              { route_type: "via", x: 6.5, y: 2.91, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            ] },
            { connection: ".R_VBUS_TOP > .pin1", route: [
              { route_type: "wire", x: 8.8, y: -0.29, width: 0.8, layer: "top" },
              { route_type: "wire", x: 8.3, y: -0.29, width: 0.8, layer: "top" },
            ] },
            { connection: ".D_BLOCK > .cathode", route: [
              { route_type: "wire", x: -6.65, y: -2.6076, width: 0.8, layer: "top" },
              { route_type: "wire", x: -6.1, y: -2.608, width: 0.8, layer: "top" },
            ] },
            { connection: ".D_VM_TVS > .CATHODE_TVS", route: [
              { route_type: "wire", x: 8.5, y: 3.5087, width: 0.8, layer: "top" },
              { route_type: "wire", x: 7.9, y: 3.509, width: 0.8, layer: "top" },
            ] },
            { connection: ".C_VM_BULK1 > .pin1", route: [
              { route_type: "wire", x: -8.5, y: -6.075, width: 0.8, layer: "bottom" },
              { route_type: "wire", x: -7.7, y: -6.075, width: 0.8, layer: "bottom" },
              { route_type: "via", x: -7.7, y: -6.075, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            ] },
            { connection: ".C_VM_BULK2 > .pin1", route: [
              { route_type: "wire", x: -8.5, y: -2.975, width: 0.8, layer: "bottom" },
              { route_type: "wire", x: -7.7, y: -2.975, width: 0.8, layer: "bottom" },
              { route_type: "via", x: -7.7, y: -2.975, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            ] },
            { connection: ".C_VM_HF1 > .pin1", route: [
              { route_type: "wire", x: -7.175, y: -0.7, width: 0.4, layer: "bottom" },
              { route_type: "wire", x: -6.6, y: -0.7, width: 0.4, layer: "bottom" },
              { route_type: "via", x: -6.6, y: -0.7, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            ] },
            { connection: ".U_DRV > .VS2", route: [
              { route_type: "wire", x: -3.0, y: 2.0, width: 0.8, layer: "top" },
              { route_type: "wire", x: -3.7, y: 2.0, width: 0.8, layer: "top" },
            ] },
            { connection: ".U_DRV > .VS1", route: [
              { route_type: "wire", x: -3.0, y: -1.0, width: 0.8, layer: "top" },
              { route_type: "wire", x: -3.7, y: -1.0, width: 0.8, layer: "top" },
            ] },
            { connection: ".C_VCP > .pin2", route: [
              { route_type: "wire", x: -4.825, y: -2.5, width: 0.4, layer: "bottom" },
              { route_type: "wire", x: -4.825, y: -3.1, width: 0.4, layer: "bottom" },
              { route_type: "via", x: -4.825, y: -3.1, from_layer: "bottom", to_layer: "top", via_diameter: 0.45, via_hole_diameter: 0.3 },
            ] },
          ]} />
        <autoroutingphase name="ROUTE_POWER_INPUT_OUTER" phaseIndex={18} />
        <autoroutingphase name="ROUTE_SENSE_OUTER" phaseIndex={19} pcbTracePaths={[
          { connection: ".U_DRV > .BRA", route: [
            { route_type: "wire", x: -3.0, y: 1.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -4.2, y: 1.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -5.0, y: 2.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -5.0, y: 4.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -6.0212, y: 5.42, width: 0.6, layer: "top" },
          ] },
          { connection: ".U_DRV > .BRB", route: [
            { route_type: "wire", x: -3.0, y: -0.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -4.2, y: -0.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -7.5, y: -0.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -8.5, y: -0.9788, width: 0.6, layer: "top" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_MOTOR_OUTER" phaseIndex={20} />
        <autoroutingphase name="ROUTE_VREF_LOCAL" phaseIndex={21} pcbTracePaths={[
          { connection: ".U_DRV > .VREF", route: [
            { route_type: "wire", x: 0.0, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.0, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.0, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
          ] },
          { connection: ".R_VREF_TOP > .pin2", route: [
            { route_type: "wire", x: 4.31, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 4.31, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.0, y: 3.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
          ] },
          { connection: ".R_VREF_BOTTOM > .pin1", route: [
            { route_type: "wire", x: 5.39, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.39, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.59, y: 3.5, width: 0.15, layer: "top" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_VBUS_ADC_LOCAL" phaseIndex={22}
          connections={["net.VBUS_ADC"]} pcbTracePaths={[
          { connection: ".R_VBUS_TOP > .pin2", route: [
            { route_type: "wire", x: 8.8, y: -1.31, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.1, y: -1.31, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.1, y: 0.4, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.1, y: 0.4, from_layer: "top", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.1, y: -0.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".R_VBUS_BOTTOM > .pin1", route: [
            { route_type: "wire", x: 8.8, y: 1.71, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.0, y: 1.71, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.0, y: 1.2, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.0, y: 1.2, from_layer: "top", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.6, y: 0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 7.1, y: -0.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_STDBY_LOCAL" phaseIndex={23}
          connections={["net.STDBY"]} pcbTracePaths={[
          { connection: ".U_DRV > .STDBY", route: [
            { route_type: "wire", x: -1.5, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.5, y: 3.4, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.5, y: 3.4, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.8, y: 3.4, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 5.8, y: 0.5, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 5.8, y: 0.5, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.9, y: -0.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".R_STDBY_PD > .pin1", route: [
            { route_type: "wire", x: -4.81, y: 3.8, width: 0.15, layer: "top" },
            { route_type: "wire", x: -4.4, y: 4.4, width: 0.15, layer: "top" },
            { route_type: "via", x: -4.4, y: 4.4, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.5, y: 4.4, width: 0.15, layer: "inner1" },
            { route_type: "wire", x: 5.5, y: 0.8, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 5.5, y: 0.8, from_layer: "inner1", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.9, y: -0.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_DATA_CC_LOCAL" phaseIndex={24}
          connections={["net.DATA_CC1", "net.DATA_CC2"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .CC1", route: [
            { route_type: "wire", x: -2.4, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.0, y: 4.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.0, y: 4.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.5, y: 4.81, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .CC2", route: [
            { route_type: "wire", x: 0.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.2, y: 4.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.5, y: 4.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -7.5, y: 4.81, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_ENABLE_LOCAL" phaseIndex={25}
          connections={["net.ENN"]} pcbTracePaths={[
          { connection: ".U_DRV > .ENN", route: [
            { route_type: "wire", x: -1.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.3, y: -2.7, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.3, y: -2.7, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.8, y: -2.7, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 3.8, y: -2.7, from_layer: "inner1", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.3, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".R_EN_PU > .pin2", route: [
            { route_type: "wire", x: -5.31, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "wire", x: -4.9, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: -4.9, y: -2.8, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.4, y: -3.2, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 3.4, y: -2.3, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 3.4, y: -2.3, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.3, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_CP_LO_LOCAL" phaseIndex={26}
          connections={["net.CP_LO"]} pcbTracePaths={[
          { connection: ".U_DRV > .CPI", route: [
            { route_type: "wire", x: 0.0, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.0, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.0, y: -2.8, from_layer: "top", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -2.0, y: -2.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.19, y: -1.0, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_CP_HI_LOCAL" phaseIndex={27}
          connections={["net.CP_HI"]} pcbTracePaths={[
          { connection: ".U_DRV > .CPO", route: [
            { route_type: "wire", x: -0.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -0.8, y: -2.4, width: 0.15, layer: "top" },
            { route_type: "via", x: -0.8, y: -2.4, from_layer: "top", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -2.8, y: -2.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.21, y: -1.0, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_VCP_LOCAL" phaseIndex={28}
          connections={["net.VCP"]} pcbTracePaths={[
          { connection: ".U_DRV > .VCP", route: [
            { route_type: "wire", x: 0.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.7, y: -3.4, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.7, y: -3.4, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.175, y: -3.4, width: 0.15, layer: "inner1" },
            { route_type: "via", x: -3.175, y: -3.4, from_layer: "inner1", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.175, y: -2.5, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        {cleanFinalRouteOrder.map((name, index) => (
          <Fragment key={`clean-route-${name}`}>
            <autoroutingphase name={`ROUTE_${name}`}
              phaseIndex={index < 4 ? 29 + index : index <= 10 ? 31 + index : 33 + index}
              connections={[`net.${name}`]} />
          </Fragment>
        ))}
        {vioFanoutRoutes.map(({ connection, layer, padX, padY, viaX, viaY }, index) => (
          <Fragment key={`vio-fanout-${connection}`}>
            <autoroutingphase name={`VIO_FANOUT_${index + 1}`} phaseIndex={45 + index}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ inner1: "VIO" }}
              fanoutRoutingLayers={["top", "bottom", "inner1"]}
              pcbTracePaths={[{
                connection,
                route: [
                  { route_type: "wire", x: padX, y: padY, width: 0.15, layer },
                  { route_type: "wire", x: viaX, y: viaY, width: 0.15, layer },
                  { route_type: "via", x: viaX, y: viaY,
                    from_layer: layer, to_layer: layer === "top" ? "bottom" : "top",
                    via_diameter: 0.45, via_hole_diameter: 0.3 },
                ],
              }]} />
          </Fragment>
        ))}
        <autoroutingphase name="ROUTE_USB_DP_LOCAL" phaseIndex={33}
          connections={["net.USB_DP"]} pcbTracePaths={[
          { connection: ".R_USB_DP > .pin2", route: [
            { route_type: "wire", x: 1.51, y: 0.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.0, y: -0.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 3.0, y: -3.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.2, y: -3.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".SW_BOOT > .pin102", route: [
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.4, y: -3.9, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.4, y: -3.9, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 6.2, y: -3.9, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 6.2, y: -3.9, from_layer: "inner1", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 6.2, y: -3.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_USB_DM_LOCAL" phaseIndex={34}
          connections={["net.USB_DM"]} pcbTracePaths={[
          { connection: ".R_USB_DM > .pin2", route: [
            { route_type: "wire", x: -0.49, y: 0.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: -0.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.7, y: -4.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.8, y: -4.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 7.1, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_UART_DRIVER_LOCAL" phaseIndex={42}
          connections={["net.UART_DRV"]} pcbTracePaths={[
          { connection: ".R_UART > .pin2", route: [
            { route_type: "wire", x: 0.51, y: 4.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.7, y: 4.1, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.7, y: 4.1, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.7, y: 2.7, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 2.7, y: 2.7, from_layer: "inner1", to_layer: "top",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.0, y: 2.0, width: 0.15, layer: "top" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_USB_5V_LOCAL" phaseIndex={43}
          connections={["net.USB_5V"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .VBUS1", route: [
            { route_type: "wire", x: 2.4, y: 3.776, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 3.2, y: 3.776, width: 0.4, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .VBUS2", route: [
            { route_type: "wire", x: 3.2, y: 3.776, width: 0.4, layer: "bottom" },
            { route_type: "wire", x: 3.5, y: 3.4, width: 0.4, layer: "bottom" },
            { route_type: "via", x: 3.5, y: 3.4, from_layer: "bottom", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 9.5, y: 1.6, width: 0.4, layer: "inner2" },
            { route_type: "via", x: 9.5, y: 1.6, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 9.0, y: 2.910048, width: 0.4, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="ROUTE_DRIVER_5V_LOCAL" phaseIndex={55}
          connections={["net.V5_DRV"]} pcbTracePaths={[
          { connection: ".U_DRV > .5VOUT", route: [
            { route_type: "wire", x: 2.0, y: -1.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.5, y: -1.3, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.49, y: -2.3, width: 0.15, layer: "top" },
          ] },
          { connection: ".R_VREF_TOP > .pin1", route: [
            { route_type: "wire", x: 3.29, y: 2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.7, y: 1.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.7, y: -1.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 3.49, y: -2.3, width: 0.15, layer: "top" },
          ] },
        ]} />
      </>}
      {useCleanAutoroute && useFinalAutoroute && <>
        {false && useMonolithicAutoroute && <autoroutingphase name="BOOT_SWITCH_LINKS" phaseIndex={8}
          connections={["net.BOOT_SWITCH_BIAS_LOCAL", "net.BOOT_SWITCH_DP_LOCAL"]}
          pcbTracePaths={[
          { connection: ".R_SW_BIAS > .pin1", route: [
            { route_type: "wire", x: 5.85, y: -3.01, width: 0.15, layer: "top" },
            { route_type: "wire", x: 5.849508, y: -3.5, width: 0.15, layer: "top" },
          ] },
          { connection: ".R_SW_DP > .pin1", route: [
            { route_type: "wire", x: 9.15, y: -3.01, width: 0.15, layer: "top" },
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="PD_VBUS_RAW_FIXED" phaseIndex={9}
          connections={["net.PD_VBUS_RAW"]} pcbTracePaths={[
          { connection: ".F1 > .pin1", route: [
            { route_type: "wire", x: -6.055, y: -8.0, width: 0.6, layer: "top" },
            { route_type: "wire", x: -5.2, y: -7.55, width: 0.6, layer: "top" },
            { route_type: "wire", x: 3.2, y: -7.55, width: 0.6, layer: "top" },
            { route_type: "wire", x: 3.2, y: -5.0, width: 0.6, layer: "top" },
            { route_type: "wire", x: 2.4, y: -3.826, width: 0.6, layer: "top" },
          ] },
          { connection: ".J_USB_PD > .B4A9", route: [
            { route_type: "wire", x: 2.4, y: -3.826, width: 0.6, layer: "top" },
            { route_type: "wire", x: 3.2, y: -3.826, width: 0.6, layer: "top" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="STEP_FIXED" phaseIndex={12}
          connections={["net.STEP"]} pcbTracePaths={[
          { connection: ".U_DRV > .STEP", route: [
            { route_type: "wire", x: 0.5, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.8, y: 2.3, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.8, y: 2.3, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 1.5, y: 1.5, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 2.4, y: -1.4, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 2.4, y: -1.4, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.4, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="DIR_FIXED" phaseIndex={13}
          connections={["net.DIR"]} pcbTracePaths={[
          { connection: ".U_DRV > .DIR", route: [
            { route_type: "wire", x: -1.0, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.4, y: 2.3, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.4, y: 2.3, from_layer: "top", to_layer: "inner3",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -0.5, y: 1.8, width: 0.15, layer: "inner3" },
            { route_type: "wire", x: 2.4, y: -0.7, width: 0.15, layer: "inner3" },
            { route_type: "via", x: 2.4, y: -0.7, from_layer: "inner3", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.0, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="ENABLE_FIXED" phaseIndex={14}
          connections={["net.ENN"]} pcbTracePaths={[
          { connection: ".U_MCU > .ENABLE_OUT", route: [
            { route_type: "wire", x: 3.2, y: -0.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 2.4, y: -0.1, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 2.4, y: -0.1, from_layer: "bottom", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.0, y: -1.8, width: 0.15, layer: "inner4" },
            { route_type: "via", x: -1.0, y: -1.8, from_layer: "inner4", to_layer: "top",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.5, y: -2.0, width: 0.15, layer: "top" },
          ] },
          { connection: ".R_EN_PU > .pin2", route: [
            { route_type: "wire", x: -5.31, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "wire", x: -5.8, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "via", x: -5.8, y: -2.2, from_layer: "top", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -3.0, y: -1.8, width: 0.15, layer: "inner4" },
            { route_type: "wire", x: -1.0, y: -1.8, width: 0.15, layer: "inner4" },
            { route_type: "via", x: -1.0, y: -1.8, from_layer: "inner4", to_layer: "top",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.5, y: -2.0, width: 0.15, layer: "top" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="USB_DM_MCU_FIXED" phaseIndex={15}
          connections={["net.USB_DM"]} pcbTracePaths={[
          { connection: ".U_MCU > .PC16", route: [
            { route_type: "wire", x: 5.1, y: -2.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.4, y: -3.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 6.4, y: -7.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 3.71, y: -7.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 3.71, y: -6.5, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="USB_DP_CONNECTOR_FIXED" phaseIndex={16}
          connections={["net.USB_DP_CONN"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .A6", route: [
            { route_type: "wire", x: -1.25, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.25, y: 3.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.4, y: 2.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -5.5, y: 1.45, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.1491, y: 1.45, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .B6", route: [
            { route_type: "wire", x: -0.25, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.25, y: 3.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.2, y: 1.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -5.5, y: 1.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.1491, y: 1.45, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="USB_DM_CONNECTOR_FIXED" phaseIndex={17}
          connections={["net.USB_DM_CONN"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .A7", route: [
            { route_type: "wire", x: -0.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.75, y: 2.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.2, y: 1.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -5.5, y: -0.45, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.1491, y: -0.45, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .B7", route: [
            { route_type: "wire", x: -1.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.75, y: 2.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.8, y: 0.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -5.5, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.1491, y: -0.45, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="SENSE_A_FIXED" phaseIndex={18}
          connections={["net.SENSE_A"]} pcbTracePaths={[
          { connection: ".U_DRV > .BRA", route: [
            { route_type: "wire", x: -3.0, y: 1.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -3.8, y: 1.5, width: 0.6, layer: "top" },
            { route_type: "wire", x: -4.2, y: 2.3, width: 0.6, layer: "top" },
            { route_type: "wire", x: -4.2, y: 4.8, width: 0.6, layer: "top" },
            { route_type: "wire", x: -6.0212, y: 5.42, width: 0.6, layer: "top" },
          ] },
        ]} />}
        {useMonolithicAutoroute && <autoroutingphase name="MCU_ESCAPE" phaseIndex={10}
          autorouter="fanout" connections={[...mcuBreakoutConnections]}
          fanoutRoutingLayers={["bottom", "inner3", "inner4"]} />}
        {useMonolithicAutoroute && <autoroutingphase name="DRIVER_CONTROL_ESCAPE" phaseIndex={11}
          autorouter="fanout" connections={[...driverControlBreakoutConnections]}
          fanoutRoutingLayers={["top", "inner1", "inner2"]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="USB_MCU_FIXED" phaseIndex={12}
          connections={["net.USB_DM", "net.USB_DP"]} pcbTracePaths={[
          { connection: ".R_USB_DM > .pin2", route: [
            { route_type: "wire", x: 3.71, y: -6.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.6, y: -6.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.6, y: -3.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.1, y: -2.5, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".R_USB_DP > .pin2", route: [
            { route_type: "wire", x: 4.79, y: -6.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.79, y: -7.2, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 4.79, y: -7.2, from_layer: "bottom", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.8, y: -6.0, width: 0.15, layer: "inner4" },
            { route_type: "wire", x: 5.8, y: -3.4, width: 0.15, layer: "inner4" },
            { route_type: "wire", x: 4.7, y: -3.4, width: 0.15, layer: "inner4" },
            { route_type: "via", x: 4.7, y: -3.4, from_layer: "inner4", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.7, y: -2.5, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".U_MCU > .USB_DP", route: [
            { route_type: "wire", x: 4.7, y: -2.5, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.2, y: -3.4, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 5.2, y: -3.4, from_layer: "bottom", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 7.0, y: -3.4, width: 0.15, layer: "inner4" },
            { route_type: "wire", x: 8.5, y: -3.5, width: 0.15, layer: "inner4" },
            { route_type: "via", x: 8.5, y: -3.5, from_layer: "inner4", to_layer: "top",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="UART_MCU_FIXED" phaseIndex={13}
          connections={["net.UART_MCU"]} pcbTracePaths={[
          { connection: ".R_UART > .pin1", route: [
            { route_type: "wire", x: -0.51, y: 4.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: -0.5, y: 4.0, width: 0.15, layer: "top" },
            { route_type: "via", x: -0.5, y: 4.0, from_layer: "top", to_layer: "inner3",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.0, y: -0.5, width: 0.15, layer: "inner3" },
            { route_type: "via", x: 3.0, y: -0.5, from_layer: "inner3", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -0.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="STEP_FIXED" phaseIndex={14}
          connections={["net.STEP"]} pcbTracePaths={[
          { connection: ".U_DRV > .STEP", route: [
            { route_type: "wire", x: 0.5, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: 1.2, y: 3.0, width: 0.15, layer: "top" },
            { route_type: "via", x: 1.2, y: 3.0, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.7, y: 2.8, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 2.7, y: -1.4, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 2.7, y: -1.4, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.4, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && fabricationGroundConnections.map((connection, index) => (
          <Fragment key={`fab-ground-${connection}`}>
            <autoroutingphase name={`FAB_GND_FANOUT_${index + 1}`} phaseIndex={index + 1}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ bottom: "GND" }}
              fanoutRoutingLayers={["top", "bottom"]} />
          </Fragment>
        ))}
        {false && useMonolithicAutoroute && fabricationManualTopGroundRoutes.map(({ connection, padX, padY, viaX, viaY }, index) => (
          <Fragment key={`fab-ground-local-${connection}`}>
            <autoroutingphase name={`FAB_GND_LOCAL_${index + 1}`} phaseIndex={20 + index}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ bottom: "GND" }}
              fanoutRoutingLayers={["top", "bottom"]}
              pcbTracePaths={[{
                connection,
                route: [
                  { route_type: "wire", x: padX, y: padY, width: 0.15, layer: "top" },
                  { route_type: "wire", x: viaX, y: viaY, width: 0.15, layer: "top" },
                  { route_type: "via", x: viaX, y: viaY, from_layer: "top", to_layer: "bottom",
                    via_diameter: 0.45, via_hole_diameter: 0.3 },
                ],
              }]} />
          </Fragment>
        ))}
        {false && groundManualFanoutRoutes.map(({ connection, padX, padY, viaX, viaY }, index) => (
          <Fragment key={`fab-ground-manual-${connection}`}>
            <autoroutingphase name={`FAB_GND_MANUAL_${index + 1}`} phaseIndex={220 + index}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ inner1: "GND" }}
              fanoutRoutingLayers={["top", "bottom", "inner1"]}
              pcbTracePaths={[{
                connection,
                route: [
                  { route_type: "wire", x: padX, y: padY, width: 0.15, layer: "bottom" },
                  { route_type: "wire", x: viaX, y: viaY, width: 0.15, layer: "bottom" },
                  { route_type: "via", x: viaX, y: viaY, from_layer: "bottom", to_layer: "inner1",
                    via_diameter: 0.45, via_hole_diameter: 0.3 },
                ],
              }]} />
          </Fragment>
        ))}
        {false && vmFanoutRoutes.map(({ connection, padX, padY, viaX, viaY }, index) => (
          <Fragment key={`fab-vm-${connection}`}>
            <autoroutingphase name={`FAB_VM_FANOUT_${index + 1}`} phaseIndex={40 + index}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ top: "VM" }}
              fanoutRoutingLayers={["top", "bottom"]}
              pcbTracePaths={[{
                connection,
                route: [
                  { route_type: "wire", x: padX, y: padY, width: 0.4, layer: "bottom" },
                  { route_type: "wire", x: viaX, y: viaY, width: 0.4, layer: "bottom" },
                  { route_type: "via", x: viaX, y: viaY, from_layer: "bottom", to_layer: "top",
                    via_diameter: 0.45, via_hole_diameter: 0.3 },
                ],
              }]} />
          </Fragment>
        ))}
        {false && vioFanoutRoutes.map(({ connection, layer, padX, padY, viaX, viaY }, index) => (
          <Fragment key={`fab-vio-${connection}`}>
            <autoroutingphase name={`FAB_VIO_FANOUT_${index + 1}`} phaseIndex={60 + index}
              autorouter="fanout" connection={connection}
              fanoutPourNetMap={{ inner4: "VIO" }}
              fanoutRoutingLayers={["top", "bottom", "inner4"]}
              pcbTracePaths={[{
                connection,
                route: [
                  { route_type: "wire", x: padX, y: padY, width: 0.15, layer },
                  { route_type: "wire", x: viaX, y: viaY, width: 0.15, layer },
                  { route_type: "via", x: viaX, y: viaY,
                    from_layer: layer, to_layer: layer === "top" ? "bottom" : "top",
                    via_diameter: 0.45, via_hole_diameter: 0.3 },
                ],
              }]} />
          </Fragment>
        ))}
        {!useMonolithicAutoroute && <>
        <autoroutingphase name="FAB_ROUTE_PD_CC1_LOCAL" phaseIndex={75}
          connections={["net.PD_CC1"]} pcbTracePaths={[
          { connection: ".J_USB_PD > .CC1", route: [
            { route_type: "wire", x: -2.4, y: -3.826, width: 0.15, layer: "top" },
            { route_type: "wire", x: -2.4, y: -3.2, width: 0.15, layer: "top" },
            { route_type: "via", x: -2.4, y: -3.2, from_layer: "top", to_layer: "inner3",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.3, y: -3.9, width: 0.15, layer: "inner3" },
            { route_type: "via", x: 4.3, y: -3.9, from_layer: "inner3", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.3, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_PD_CC2_LOCAL" phaseIndex={76}
          connections={["net.PD_CC2"]} pcbTracePaths={[
          { connection: ".J_USB_PD > .CC2", route: [
            { route_type: "wire", x: 0.75, y: -3.826, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.75, y: -3.3, width: 0.15, layer: "top" },
            { route_type: "via", x: 0.75, y: -3.3, from_layer: "top", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.9, y: -4.2, width: 0.15, layer: "inner4" },
            { route_type: "via", x: 3.9, y: -4.2, from_layer: "inner4", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.9, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_DATA_CC1_LOCAL" phaseIndex={77}
          connections={["net.DATA_CC1"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .CC1", route: [
            { route_type: "wire", x: -2.4, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.2, y: 4.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -6.5, y: 4.81, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_DATA_CC2_LOCAL" phaseIndex={78}
          connections={["net.DATA_CC2"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .CC2", route: [
            { route_type: "wire", x: 0.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.2, y: 4.5, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 1.2, y: 4.5, from_layer: "bottom", to_layer: "inner4",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -7.5, y: 5.2, width: 0.15, layer: "inner4" },
            { route_type: "via", x: -7.5, y: 5.2, from_layer: "inner4", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -7.5, y: 4.81, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DP_CONN_LOCAL" phaseIndex={79}
          connections={["net.USB_DP_CONN"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .DP1", route: [
            { route_type: "wire", x: -1.25, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.25, y: 3.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.2, y: 2.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.6491, y: 1.75, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .DP2", route: [
            { route_type: "wire", x: -0.25, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.25, y: 3.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.0, y: 2.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.6491, y: 1.75, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DM_CONN_LOCAL" phaseIndex={80}
          connections={["net.USB_DM_CONN"]} pcbTracePaths={[
          { connection: ".J_USB_DATA > .DN1", route: [
            { route_type: "wire", x: -0.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.75, y: 3.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.6, y: 1.8, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.5, y: 0.6, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.6491, y: -0.15, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".J_USB_DATA > .DN2", route: [
            { route_type: "wire", x: -1.75, y: 3.776, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -1.75, y: 3.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -2.7, y: 2.4, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.4, y: 1.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -3.6491, y: -0.15, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DP_ESD_LOCAL" phaseIndex={81}
          connections={["net.USB_DP_ESD"]} pcbTracePaths={[
          { connection: ".U_USB_ESD > .DP_OUT", route: [
            { route_type: "wire", x: -1.3509, y: 1.75, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.31, y: 1.75, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DM_ESD_LOCAL" phaseIndex={82}
          connections={["net.USB_DM_ESD"]} pcbTracePaths={[
          { connection: ".U_USB_ESD > .DM_OUT", route: [
            { route_type: "wire", x: -1.3509, y: -0.15, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: -0.31, y: -0.15, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DM_LOCAL" phaseIndex={83}
          connections={["net.USB_DM"]} pcbTracePaths={[
          { connection: ".R_USB_DM > .pin2", route: [
            { route_type: "wire", x: 0.71, y: -0.15, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.2, y: -0.7, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 1.2, y: -0.7, from_layer: "bottom", to_layer: "inner3",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.8, y: -4.0, width: 0.15, layer: "inner3" },
            { route_type: "via", x: 5.8, y: -4.0, from_layer: "inner3", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.1, y: -4.0, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 5.1, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_USB_DP_LOCAL" phaseIndex={84}
          connections={["net.USB_DP"]} pcbTracePaths={[
          { connection: ".R_USB_DP > .pin2", route: [
            { route_type: "wire", x: 1.01, y: 1.75, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: 1.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".SW_BOOT > .pin102", route: [
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.3, y: -4.0, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.3, y: -4.0, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.8, y: -4.5, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 5.8, y: -4.5, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_UART_MCU_LOCAL" phaseIndex={85}
          connections={["net.UART_MCU"]} pcbTracePaths={[
          { connection: ".R_UART > .pin1", route: [
            { route_type: "wire", x: -0.51, y: 4.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: -0.8, y: 4.0, width: 0.15, layer: "top" },
            { route_type: "via", x: -0.8, y: 4.0, from_layer: "top", to_layer: "inner3",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 2.65, y: -0.9, width: 0.15, layer: "inner3" },
            { route_type: "via", x: 2.65, y: -0.9, from_layer: "inner3", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -0.9, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_UART_DRV_LOCAL" phaseIndex={86}
          connections={["net.UART_DRV"]} pcbTracePaths={[
          { connection: ".R_UART > .pin2", route: [
            { route_type: "wire", x: 0.51, y: 4.7, width: 0.15, layer: "top" },
            { route_type: "wire", x: 0.8, y: 4.2, width: 0.15, layer: "top" },
            { route_type: "wire", x: 1.0, y: 3.4, width: 0.15, layer: "top" },
            { route_type: "wire", x: 2.0, y: 2.0, width: 0.15, layer: "top" },
          ] },
        ]} />
        <autoroutingphase name="FAB_ROUTE_ENABLE_LOCAL" phaseIndex={87}
          connections={["net.ENN"]} pcbTracePaths={[
          { connection: ".U_DRV > .ENN", route: [
            { route_type: "wire", x: -1.5, y: -2.0, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.3, y: -2.7, width: 0.15, layer: "top" },
            { route_type: "via", x: -1.3, y: -2.7, from_layer: "top", to_layer: "inner1",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.8, y: -2.7, width: 0.15, layer: "inner1" },
            { route_type: "via", x: 3.8, y: -2.7, from_layer: "inner1", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.3, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".R_EN_PU > .pin2", route: [
            { route_type: "wire", x: -5.31, y: -2.2, width: 0.15, layer: "top" },
            { route_type: "wire", x: -4.9, y: -2.8, width: 0.15, layer: "top" },
            { route_type: "via", x: -4.9, y: -2.8, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.4, y: -3.2, width: 0.15, layer: "inner2" },
            { route_type: "wire", x: 3.4, y: -2.3, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 3.4, y: -2.3, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 3.2, y: -1.3, width: 0.15, layer: "bottom" },
          ] },
        ]} />
        </>}
        {false && <autoroutingphase name="FAB_ROUTE_USB_DP_ESCAPE" phaseIndex={60}
          connections={["net.USB_DP"]} pcbTracePaths={[
          { connection: ".R_USB_DP > .pin2", route: [
            { route_type: "wire", x: 1.01, y: 1.75, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: 1.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".SW_BOOT > .pin102", route: [
            { route_type: "wire", x: 8.150492, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 7.6, y: -4.0, width: 0.15, layer: "top" },
            { route_type: "via", x: 7.6, y: -4.0, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.8, y: -4.5, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 5.8, y: -4.5, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {false && <autoroutingphase name="FAB_ROUTE_STDBY_FIXED" phaseIndex={40}
          connections={["net.STDBY"]} pcbTracePaths={[
          { connection: ".R_STDBY_PD > .pin1", route: [
            { route_type: "wire", x: -4.29, y: 3.8, width: 0.15, layer: "top" },
            { route_type: "wire", x: -3.5, y: 3.8, width: 0.15, layer: "top" },
            { route_type: "wire", x: -2.3, y: 3.3, width: 0.15, layer: "top" },
            { route_type: "wire", x: -1.5, y: 3.0, width: 0.15, layer: "top" },
          ] },
          { connection: ".U_MCU > .STDBY_OUT", route: [
            { route_type: "wire", x: 3.9, y: -0.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.5, y: 0.4, width: 0.15, layer: "bottom" },
            { route_type: "via", x: 4.5, y: 0.4, from_layer: "bottom", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 0.5, y: 3.7, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 0.5, y: 3.7, from_layer: "inner2", to_layer: "top",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: -1.5, y: 3.0, width: 0.15, layer: "top" },
          ] },
        ]} />}
        {false && useMonolithicAutoroute && <autoroutingphase name="FAB_ROUTE_USB_DP_FIXED" phaseIndex={50}
          connections={["net.USB_DP"]} pcbTracePaths={[
          { connection: ".R_USB_DP > .pin2", route: [
            { route_type: "wire", x: 1.01, y: 1.75, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: 1.3, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 1.6, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
          { connection: ".SW_BOOT > .pin102", route: [
            { route_type: "wire", x: 9.150492, y: -3.5, width: 0.15, layer: "top" },
            { route_type: "wire", x: 8.3, y: -4.0, width: 0.15, layer: "top" },
            { route_type: "via", x: 8.3, y: -4.0, from_layer: "top", to_layer: "inner2",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 5.8, y: -4.5, width: 0.15, layer: "inner2" },
            { route_type: "via", x: 5.8, y: -4.5, from_layer: "inner2", to_layer: "bottom",
              via_diameter: 0.45, via_hole_diameter: 0.3 },
            { route_type: "wire", x: 4.7, y: -4.2, width: 0.15, layer: "bottom" },
            { route_type: "wire", x: 4.7, y: -3.2, width: 0.15, layer: "bottom" },
          ] },
        ]} />}
        {fabricationRoutingGroups.map((group) => (
          <Fragment key={`fab-route-${group.name}`}>
            <autoroutingphase name={`FAB_ROUTE_${group.name}`}
              phaseIndex={group.phase}
              connections={group.nets.map((name) => `net.${name}`)}
              fanoutPourNetMap={{ bottom: "GND" }}
              pcbTracePaths={fabricationRoutes as any} />
          </Fragment>
        ))}
        {useMonolithicAutoroute && <autoroutingphase name="FAB_GROUND_TO_BOTTOM_POUR" phaseIndex={69}
          connections={fabricationEnabledTopGroundRoutes.map(({ connection }) => connection)}
          autorouter="fanout" fanoutPourNetMap={{ bottom: "GND" }}
          fanoutRoutingLayers={["top", "bottom"]}
          pcbTracePaths={fabricationEnabledTopGroundRoutes.map((groundRoute) => ({
            connection: groundRoute.connection,
            route: [
              { route_type: "wire", x: groundRoute.padX, y: groundRoute.padY, width: 0.15, layer: "top" },
              ...("waypoints" in groundRoute ? groundRoute.waypoints : []).map(({ x, y }) =>
                ({ route_type: "wire" as const, x, y, width: 0.15, layer: "top" as const })),
              { route_type: "wire", x: groundRoute.viaX, y: groundRoute.viaY, width: 0.15, layer: "top" },
              { route_type: "via", x: groundRoute.viaX, y: groundRoute.viaY, from_layer: "top", to_layer: "bottom",
                via_diameter: 0.45, via_hole_diameter: 0.3 },
              { route_type: "wire", x: groundRoute.viaX, y: groundRoute.viaY, width: 0.15, layer: "bottom" },
            ],
          })) as any} />}
      </>}
      {false && <><copperpour name="VM_POUR_TOP" layer="top" connectsTo="net.VM"
        padMargin="0.2mm" traceMargin="0.2mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />
      <copperpour name="VIO_POUR_INNER1" layer="inner1" connectsTo="net.VIO"
        padMargin="0.2mm" traceMargin="0.2mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />
      {!debugNoGroundPour && <copperpour name="GND_POUR_BOTTOM" layer="bottom" connectsTo="net.GND"
        padMargin="0.2mm" traceMargin="0.2mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />}</>}
      {!debugNoGroundPour && !useFinalAutoroute && <copperpour name="GND_POUR_BOTTOM" layer="bottom" connectsTo="net.GND"
        padMargin="0.5mm" traceMargin="0.5mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />}
      {useCleanAutoroute && !useFinalAutoroute && <copperpour name="VM_POUR_TOP" layer="top" connectsTo="net.VM"
        padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />}
      {useCleanAutoroute && !useFinalAutoroute && <copperpour name="VIO_POUR_INNER1" layer="inner1" connectsTo="net.VIO"
        padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
        useThermalReliefs />}
      {!useMonolithicAutoroute && useCleanAutoroute && useFinalAutoroute && !debugNoGroundPour &&
        <copperpour name="GND_POUR_BOTTOM" layer="bottom" connectsTo="net.GND"
          padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />}
      {false && useMonolithicAutoroute && useCleanAutoroute && useFinalAutoroute && !debugNoGroundPour && <>
        <copperpour name="GND_POUR_TOP_FINAL" layer="top" connectsTo="net.GND"
          padMargin="0.5mm" traceMargin="0.5mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />
        <copperpour name="GND_POUR_BOTTOM_FINAL" layer="bottom" connectsTo="net.GND"
          padMargin="0.5mm" traceMargin="0.5mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />
      </>}
      {useMonolithicAutoroute && useCleanAutoroute && useFinalAutoroute && !debugNoGroundPour &&
        <copperpour name="GND_PLANE_INNER6" layer="inner6" connectsTo="net.GND"
          padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm" />}
      {useMonolithicAutoroute && useCleanAutoroute && useFinalAutoroute && !debugNoGroundPour &&
        <copperpour name="GND_POUR_BOTTOM" layer="bottom" connectsTo="net.GND"
          padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />}
      {useCleanAutoroute && useFinalAutoroute &&
        <copperpour name="VIO_POUR_INNER4" layer="inner4" connectsTo="net.VIO"
          padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />}
      {useCleanAutoroute && useFinalAutoroute &&
        <copperpour name="VM_POUR_TOP" layer="top" connectsTo="net.VM"
          padMargin="0.4mm" traceMargin="0.4mm" boardEdgeMargin="0.2mm"
          useThermalReliefs />}
      <TYPE_C_31_M_12 name="J_USB_PD" pcbX={0} pcbY={-6.0} pcbRotation={0}
        schSectionName={schematicSections.powerInput} schSheetName={schematicSheets.power}
        schX={-11} schY={3}
        noConnect={["DP1", "DP2", "DN1", "DN2", "SBU1", "SBU2"]}
        connections={{ EH1: "net.GND", EH2: "net.GND", EH3: "net.GND", EH4: "net.GND",
          GND1: "net.GND", GND2: "net.GND",
          VBUS1: "net.PD_VBUS_RAW", VBUS2: "net.PD_VBUS_RAW",
          CC1: "net.PD_CC1", CC2: "net.PD_CC2" }} />

      <TYPE_C_31_M_12 name="J_USB_DATA" layer="bottom" pcbX={0} pcbY={5.95} pcbRotation={180}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-11} schY={3} noConnect={["SBU1", "SBU2"]}
        connections={{ EH1: "net.GND", EH2: "net.GND", EH3: "net.GND", EH4: "net.GND",
          GND1: "net.GND", GND2: "net.GND", VBUS1: "net.USB_5V", VBUS2: "net.USB_5V",
          CC1: "net.DATA_CC1", CC2: "net.DATA_CC2",
          DP1: "net.USB_DP_CONN", DP2: "net.USB_DP_CONN",
          DN1: "net.USB_DM_CONN", DN2: "net.USB_DM_CONN" }} />

      <R name="R_DATA_CC1" resistance="5.1k" layer="bottom" pcbX={-6.5} pcbY={4.3} pcbRotation={90}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-10} schY={-2}
        connections={{ pin1: "net.DATA_CC1", pin2: "net.GND" }} />
      <R name="R_DATA_CC2" resistance="5.1k" layer="bottom" pcbX={-7.5} pcbY={4.3} pcbRotation={90}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-7} schY={-2}
        connections={{ pin1: "net.DATA_CC2", pin2: "net.GND" }} />

      <USBLC6_2SC6 name="U_USB_ESD" layer="bottom" pcbX={-5.0} pcbY={0.5} pcbRotation={270}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-5} schY={3}
        connections={{ pin401: "net.USB_DM_CONN", pin403: "net.USB_DP_CONN",
          pin406: "net.USB_DM_ESD", pin404: "net.USB_DP_ESD",
          pin405: "net.VIO", pin402: "net.GND" }} />
      <R name="R_USB_DM" resistance="27" layer="bottom" pcbX={3.2} pcbY={-6.5} pcbRotation={180}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-1} schY={4}
        connections={{ pin1: "net.USB_DM_ESD", pin2: "net.USB_DM" }} />
      <R name="R_USB_DP" resistance="27" layer="bottom" pcbX={5.2} pcbY={-6.5} pcbRotation={0}
        schSectionName={schematicSections.usbData} schSheetName={schematicSheets.control}
        schX={-1} schY={2}
        connections={{ pin1: "net.USB_DP_ESD", pin2: "net.USB_DP" }} />

      <BAT54KFILM name="D_LOGIC_PD" layer="bottom" pcbX={6.2} pcbY={2.55} pcbRotation={90}
        schSectionName={schematicSections.logicPower} schSheetName={schematicSheets.power}
        schX={-4} schY={-3}
        connections={{ anode: "net.VM", cathode: "net.LOGIC_IN" }} />
      <BAT54WS name="D_LOGIC_USB" layer="bottom" pcbX={9.0} pcbY={2.5} pcbRotation={90}
        schSectionName={schematicSections.logicPower} schSheetName={schematicSheets.power}
        schX={0} schY={-3}
        connections={{ anode: "net.USB_5V", cathode: "net.LOGIC_IN" }} />
      <CJ6330A33M name="U_3V3" layer="bottom" pcbX={8.5} pcbY={8.0} pcbRotation={90}
        schSectionName={schematicSections.logicPower} schSheetName={schematicSheets.power}
        schX={5} schY={-3} schWidth={3} schHeight={3}
        schPinArrangement={{
          leftSide: { pins: [3], direction: "top-to-bottom" },
          rightSide: { pins: [2], direction: "top-to-bottom" },
          bottomSide: { pins: [1], direction: "left-to-right" },
        }}
        connections={{ IN: "net.LOGIC_IN", OUT: "net.VIO", GND: "net.GND" }} />
      <C name="C_LDO_IN" value="2.2uF" layer="bottom" pcbX={6.7} pcbY={5.2} pcbRotation={0}
        schSectionName={schematicSections.logicPower} schSheetName={schematicSheets.power}
        schX={3} schY={-5.5}
        connections={{ pin1: "net.LOGIC_IN", pin2: "net.GND" }} />
      <C name="C_LDO_OUT" value="2.2uF" layer="bottom" pcbX={5.93} pcbY={8.3} pcbRotation={270}
        schSectionName={schematicSections.logicPower} schSheetName={schematicSheets.power}
        schX={8} schY={-5.5}
        connections={{ pin1: "net.VIO", pin2: "net.GND" }} />

      <CH32X035F8U6 name="U_MCU" layer="bottom" pcbX={4.7} pcbY={-1.0} pcbRotation={180}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={4.5} schY={2} schWidth={4} schHeight={5}
        noConnect={["PA6", "PB0", "PB1", "PB3", "PB11", "PB12", "PC18", "PC19"]}
        connections={{ VDD: "net.VIO", GND: "net.GND",
          STEP_OUT: "net.STEP", DIR_OUT: "net.DIR", ENABLE_OUT: "net.ENN",
          UART1: "net.UART_MCU", STDBY_OUT: "net.STDBY", DIAG_IN: "net.DIAG",
          VBUS_ADC: "net.VBUS_ADC", USB_DM: "net.USB_DM", USB_DP: "net.USB_DP",
          CC1: "net.PD_CC1", CC2: "net.PD_CC2" }} />
      <C name="C_MCU_HF" value="100nF" layer="bottom" pcbX={8.0} pcbY={-0.4}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={10} schY={4.5}
        connections={{ pin1: "net.VIO", pin2: "net.GND" }} />
      <C name="C_MCU_BULK" value="2.2uF" layer="bottom" pcbX={6.9} pcbY={-4.8} pcbRotation={90}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={10} schY={2.5}
        connections={{ pin1: "net.VIO", pin2: "net.GND" }} />
      <R name="R_VBUS_TOP" resistance="270k" layer="top" pcbX={8.8} pcbY={-0.8} pcbRotation={270}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={9} schY={-1}
        connections={{ pin1: "net.VM", pin2: "net.VBUS_ADC" }} />
      <R name="R_VBUS_BOTTOM" resistance="47k" layer="top" pcbX={8.8} pcbY={1.2} pcbRotation={90}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={12} schY={-1}
        connections={{ pin1: "net.VBUS_ADC", pin2: "net.GND" }} />

      <R name="R_BOOT" resistance="4.7k" layer="top" pcbX={6.9} pcbY={-1.0}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={4} schY={-4}
        connections={{ pin1: "net.VIO", pin2: "net.BOOT_BIAS" }} />
      <TL3780AF100QG name="SW_BOOT" layer="top" pcbX={7.5} pcbY={-3.5} pcbRotation={0}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={8} schY={-4}
        connections={{ pin101: "net.BOOT_BIAS", pin102: "net.USB_DP" }} />

      <BSMD1206_110_16V name="F1" pcbX={-7.5} pcbY={-8.0} pcbRotation={180}
        schSectionName={schematicSections.powerInput} schSheetName={schematicSheets.power}
        schX={-6} schY={4}
        connections={{ pin1: "net.PD_VBUS_RAW", pin2: "net.PD_VBUS_FUSED" }} />
      <PMEG6020ELRX name="D_BLOCK" pcbX={-6.65} pcbY={-4.3} pcbRotation={270}
        schSectionName={schematicSections.powerInput} schSheetName={schematicSheets.power}
        schX={-2} schY={4}
        connections={{ anode: "net.PD_VBUS_FUSED", cathode: "net.VM" }} />
      <SMBJ16A name="D_VM_TVS" layer="top" pcbX={8.5} pcbY={6.1} pcbRotation={90}
        schSectionName={schematicSections.powerInput} schSheetName={schematicSheets.power}
        schX={1} schY={1} schRotation={90}
        connections={{ pin201: "net.VM", pin202: "net.GND" }} />
      {[{ x: -8.5, y: -6.9 }, { x: -8.5, y: -3.8 }].map(({ x, y }, index) => (
        <C key={`bulk-${x}-${y}`} name={`C_VM_BULK${index + 1}`} value="10uF_25V"
          layer="bottom" pcbX={x} pcbY={y} pcbRotation={90}
          schSectionName={schematicSections.powerInput} schSheetName={schematicSheets.power}
          schX={4 + index * 3} schY={1}
          connections={{ pin1: "net.VM", pin2: "net.GND" }} />
      ))}
      <C name="C_VM_HF1" value="100nF_50V" layer="bottom" pcbX={-8.2} pcbY={-0.7} pcbRotation={180}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={-10} schY={4} connections={{ pin1: "net.VM", pin2: "net.GND" }} />
      <R name="R_EN_PU" resistance="100k" layer="top" pcbX={-4.8} pcbY={-2.2} pcbRotation={180}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={-1} schY={-4}
        connections={{ pin1: "net.VIO", pin2: "net.ENN" }} />
      <R name="R_STDBY_PD" resistance="100k" layer="top" pcbX={-6.0} pcbY={2.6} pcbRotation={180}
        schSectionName={schematicSections.controller} schSheetName={schematicSheets.control}
        schX={1.5} schY={-4}
        connections={{ pin1: "net.STDBY", pin2: "net.GND" }} />
      <TMC2209_LA_T name="U_DRV" pcbX={driverX} pcbY={driverY} pcbRotation={0}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={0} schY={1} schWidth={3.5} schHeight={5}
        noConnect={["INDEX", "UNUSED"]}
        connections={{
          OB2: "net.MOTOR_B_NEG", ENN: "net.ENN",
          GND2: "net.GND", CPO: "net.CP_HI", CPI: "net.CP_LO", VCP: "net.VCP",
          SPREAD: "net.GND", "5VOUT": "net.V5_DRV",
          MS1_AD0: "net.GND", MS2_AD1: "net.GND", DIAG: "net.DIAG",
          CLK: "net.GND",
          PDN_UART: "net.UART_MCU", VCC_IO: "net.VIO", STEP: "net.STEP",
          VREF: "net.VREF", GND1: "net.GND", DIR: "net.DIR",
          STDBY: "net.STDBY", OA2: "net.MOTOR_A_NEG", VS2: "net.VM",
          BRA: "net.SENSE_A", OA1: "net.MOTOR_A_POS",
          OB1: "net.MOTOR_B_POS",
          BRB: "net.SENSE_B", VS1: "net.VM", EP: "net.GND",
        }}
      />

      <C name="C_CP" value="22nF_50V" layer="bottom" pcbX={-1.45} pcbY={-2.0}
        pcbRotation={180} schSectionName={schematicSections.driverCore}
        schSheetName={schematicSheets.driver} schX={-6} schY={4}
        connections={{ pin1: "net.CP_HI", pin2: "net.CP_LO" }} />
      {<via name="U_DRV_EP_CENTER" pcbX={driverX} pcbY={driverY}
        fromLayer="top" toLayer="bottom" holeDiameter="0.3mm" outerDiameter="0.45mm"
        connectsTo="net.GND" tented="bottom_tented" />}
      <capacitor name="C_VCP" capacitance="100nF" footprint="0402" maxVoltageRating="50V"
        supplierPartNumbers={{ jlcpcb: ["C525226"] }} layer="bottom" pcbX={-4.0} pcbY={-3.0}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={-6} schY={2} connections={{ pin1: "net.VCP", pin2: "net.VM" }} />
      <C name="C_5V" value="2.2uF_10V" pcbX={4.0} pcbY={-2.3}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={-6} schY={0} connections={{ pin1: "net.V5_DRV", pin2: "net.GND" }} />
      <C name="C_VIO" value="100nF" pcbX={2.5} pcbY={4.7}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={-6} schY={-2}
        connections={{ pin1: "net.VIO", pin2: "net.GND" }} />
      <PT1206FR_7W0R33L name="R_SENSE_A" layer="top" pcbX={-7.5} pcbY={5.42} pcbRotation={180}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={4} schY={-3}
        connections={{ pin1: "net.SENSE_A", pin2: "net.GND" }} />
      <PT1206FR_7W0R33L name="R_SENSE_B" layer="top" pcbX={-8.5} pcbY={0.5} pcbRotation={90}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={7} schY={-3}
        connections={{ pin1: "net.SENSE_B", pin2: "net.GND" }} />
      <R name="R_VREF_TOP" resistance="12k" pcbX={3.8} pcbY={2.0}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={4} schY={4} connections={{ pin1: "net.V5_DRV", pin2: "net.VREF" }} />
      <R name="R_VREF_BOTTOM" resistance="10k" pcbX={5.9} pcbY={2.0}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={7} schY={4} connections={{ pin1: "net.VREF", pin2: "net.GND" }} />
      <C name="C_VREF" value="100nF" pcbX={6.1} pcbY={3.5}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={10} schY={4} connections={{ pin1: "net.VREF", pin2: "net.GND" }} />

      <BM04B_SRSS_TB_LF__SN_ name="J_MOTOR" pcbX={0} pcbY={7.6} pcbRotation={0}
        schSectionName={schematicSections.driverCore} schSheetName={schematicSheets.driver}
        schX={10} schY={0} noConnect={["pin5"]}
        connections={{ pin1: "net.MOTOR_A_NEG", pin2: "net.MOTOR_A_POS",
          pin3: "net.MOTOR_B_POS", pin4: "net.MOTOR_B_NEG" }}
        pcbPinLabels={{ pin1: "A-", pin2: "A+", pin3: "B+", pin4: "B-" }} />
      <bus name="MOTOR_OUTER" pcbTraceWidth="0.6mm"
        pcbAllowedLayers={["top", "bottom"]}
        connections={[".U_DRV > .OB2", ".U_DRV > .OB1", ".U_DRV > .OA1", ".U_DRV > .OA2"]} />
      <bus name="POWER_OUTER" pcbAllowedLayers={["top", "bottom"]}
        connections={[".J_USB_PD > .VBUS2", ".F1 > .pin2", ".D_BLOCK > .cathode"]} />
      <bus name="SENSE_OUTER" pcbAllowedLayers={["top", "bottom"]} pcbTraceWidth="0.6mm"
        connections={[".U_DRV > .BRA", ".U_DRV > .BRB"]} />

      {thermalViaOffsets.flatMap((x) => thermalViaOffsets.filter((y) => x !== 0 || y !== 0).map((y) => (
        <Fragment key={`thermal-${x}-${y}`}>
          <via name={`U_DRV_THERMAL_${x}_${y}`}
            pcbX={driverX + x} pcbY={driverY + y} fromLayer="top" toLayer="bottom"
            holeDiameter="0.3mm" outerDiameter="0.45mm" connectsTo="net.GND" tented="bottom_tented" />
        </Fragment>
      )))}

      {(!useFinalAutoroute ? (useCleanAutoroute ? bottomGroundConnections : [
        ".U_USB_ESD > .GND", ".U_3V3 > .GND", ".C_LDO_IN > .pin2",
        ".C_LDO_OUT > .pin2", ".C_MCU_HF > .pin2", ".C_MCU_BULK > .pin2", ".U_MCU > .GND",
        ".R_VBUS_BOTTOM > .pin2", ".D_VM_TVS > .ANODE_TVS", ".C_VM_BULK1 > .pin2",
        ".C_VM_BULK2 > .pin2", ".C_VM_HF1 > .pin2", ".R_STDBY_PD > .pin2",
      ]) : []).map((from, index) => (
        <Fragment key={`BOTTOM_GND_${index}`}>
          <trace name={`BOTTOM_GND_${index}`} from={from} to="net.GND" thickness="0.15mm"
            pcbPathRelativeTo={from} pcbPath={[from]} routingPhaseIndex={null} />
        </Fragment>
      ))}

      <hole name="MOTOR_M2_UPPER_LEFT" pcbX={-7.7} pcbY={7.7} diameter="2.2mm" />
      <hole name="MOTOR_M2_LOWER_RIGHT" pcbX={7.7} pcbY={-7.7} diameter="2.2mm" />
      <keepout shape="rect" pcbX={-9.8} pcbY={0}
        width="0.4mm" height="20mm" layers={["top", "bottom", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6"]}
        allowPlacements />
      <keepout shape="rect" pcbX={9.8} pcbY={0}
        width="0.4mm" height="20mm" layers={["top", "bottom", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6"]}
        allowPlacements />
      <keepout shape="rect" pcbX={0} pcbY={9.8}
        width="20mm" height="0.4mm" layers={["top", "bottom", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6"]}
        allowPlacements />
      <keepout shape="rect" pcbX={0} pcbY={-9.8}
        width="20mm" height="0.4mm" layers={["top", "bottom", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6"]}
        allowPlacements />
      {false && <keepout shape="circle" pcbX={4.0} pcbY={0.34}
        radius="0.35mm" layers={["top", "bottom", "inner1", "inner2"]}
        allowPlacements />}
      {false && <><keepout shape="circle" pcbX={-2.1} pcbY={4.2}
        radius="0.45mm" layers={["top", "bottom", "inner1", "inner2"]}
        allowPlacements />
      <keepout shape="circle" pcbX={6.3} pcbY={-1.1}
        radius="0.4mm" layers={["top", "bottom", "inner1", "inner2"]}
        allowPlacements />
      {false && [
        [-1.98, 2.75], [0.42, -0.42], [-3.54, 5.11],
        [-0.24, 4.02], [-0.16, -1.45], [1.12, -0.87],
      ].map(([x, y], index) => (
        <Fragment key={`SHORT_GUARD_${index}`}>
          <keepout shape="circle" pcbX={x} pcbY={y} radius="0.35mm"
            layers={["top", "bottom", "inner1", "inner2"]} allowPlacements />
        </Fragment>
      ))}</>}
      {[
        { x: 4.7, y: -0.2, w: 0.32, h: 0.9 },
        { x: 5.5, y: -0.2, w: 0.32, h: 0.9 },
        { x: 6.2, y: -0.9, w: 0.9, h: 0.32 },
        { x: 6.2, y: -1.3, w: 0.9, h: 0.32 },
        { x: 6.2, y: -1.7, w: 0.9, h: 0.32 },
        { x: 6.2, y: -2.1, w: 0.9, h: 0.32 },
        { x: 6.2, y: -2.5, w: 0.9, h: 0.32 },
        { x: 5.5, y: -3.2, w: 0.32, h: 0.9 },
      ].map(({ x, y, w, h }, index) => (
        <Fragment key={`MCU_NC_${index}`}>
          <keepout shape="rect" pcbX={x} pcbY={y}
            width={`${w}mm`} height={`${h}mm`} layers={["bottom"]}
            allowPlacements excludeRefs={[".U_MCU"]} />
        </Fragment>
      ))}
      <silkscreentext text="NEMA8 20x20" pcbX={5.7} pcbY={6.2} pcbRotation={90} fontSize="0.55mm" />
      <silkscreentext text="PWR PD" pcbX={0} pcbY={-6.2} fontSize="0.55mm" />
      <silkscreentext text="DATA" layer="bottom" pcbX={0} pcbY={6.2} pcbRotation={180} fontSize="0.55mm" />
      <silkscreentext text="BOOT" pcbX={5.4} pcbY={5.6} pcbRotation={90} fontSize="0.45mm" />
      <silkscreentext text="A- A+ B+ B-" pcbX={0} pcbY={5.9} fontSize="0.45mm" />
      <silkscreentext text="0.60A MAX" layer="bottom" pcbX={-5.2} pcbY={-8.7} pcbRotation={180} fontSize="0.5mm" />

    </board>
  )
}
