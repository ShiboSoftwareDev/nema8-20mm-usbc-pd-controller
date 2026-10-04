import { Circuit, type RootCircuit } from "@tscircuit/core"
import { convertCircuitJsonToPickAndPlaceRows } from "circuit-json-to-pnp-csv"
import Nema8TwentyMillimeterController from "../index.circuit"

type AuditedComponentName = "U_USB_ESD" | "D_VM_TVS" | "U_3V3"

const getComponentOutput = (
  circuit: RootCircuit,
  componentName: AuditedComponentName,
) => {
  const sourceComponent = circuit.db.source_component.getWhere({
    name: componentName,
  })!
  const pcbComponent = circuit.db.pcb_component.getWhere({
    source_component_id: sourceComponent.source_component_id,
  })!
  const cadComponent = circuit.db.cad_component.getWhere({
    source_component_id: sourceComponent.source_component_id,
  })!

  return { pcbComponent, cadComponent }
}

const getPcbPortPosition = (
  circuit: RootCircuit,
  componentName: "U_USB_ESD" | "D_VM_TVS",
  portAlias: "DM_IN" | "CATHODE_TVS",
) => {
  const sourceComponent = circuit.db.source_component.getWhere({
    name: componentName,
  })!
  const sourcePort = circuit.db.source_port
    .list({ source_component_id: sourceComponent.source_component_id })
    .find((port) => port.port_hints?.includes(portAlias))!
  const pcbPort = circuit.db.pcb_port.getWhere({
    source_port_id: sourcePort.source_port_id,
  })!

  return {
    x: Number(pcbPort.x.toFixed(4)),
    y: Number(pcbPort.y.toFixed(4)),
  }
}

const circuit = new Circuit({
  platform: {
    drcChecksDisabled: true,
    partsEngineDisabled: true,
  },
})
circuit.add(<Nema8TwentyMillimeterController />)
await circuit.renderUntilSettled()

const circuitJson = circuit.getCircuitJson()
const pnpRows = convertCircuitJsonToPickAndPlaceRows(circuitJson)
const usbEsd = getComponentOutput(circuit, "U_USB_ESD")
const vmTvs = getComponentOutput(circuit, "D_VM_TVS")
const u3v3 = getComponentOutput(circuit, "U_3V3")

const actual = {
  usbEsd: {
    pcbRotation: usbEsd.pcbComponent.rotation,
    pnpRotation: pnpRows.find((row) => row.designator === "U_USB_ESD")!
      .rotation,
    pin1Location: usbEsd.pcbComponent.pin1_location,
    electricalPin1Position: getPcbPortPosition(
      circuit,
      "U_USB_ESD",
      "DM_IN",
    ),
  },
  vmTvs: {
    pcbRotation: vmTvs.pcbComponent.rotation,
    pnpRotation: pnpRows.find((row) => row.designator === "D_VM_TVS")!
      .rotation,
    pin1Location: vmTvs.pcbComponent.pin1_location,
    cathodePosition: getPcbPortPosition(
      circuit,
      "D_VM_TVS",
      "CATHODE_TVS",
    ),
  },
  u3v3: {
    pcbRotation: u3v3.pcbComponent.rotation,
    cadRotation: u3v3.cadComponent.rotation,
  },
}

// The import fix restores the EasyEDA geometry without moving connected pads
// and verifies the actual PnP exporter, rather than only checking component
// props. U_3V3 remains here as downstream evidence for the independent core
// transform fix.
const correctedImportOutput = {
  usbEsd: {
    pcbRotation: 270,
    pnpRotation: 270,
    pin1Location: undefined,
    electricalPin1Position: { x: -6.1491, y: -0.45 },
  },
  vmTvs: {
    pcbRotation: 90,
    pnpRotation: 90,
    pin1Location: undefined,
    cathodePosition: { x: 8.5, y: 3.5087 },
  },
  u3v3: {
    pcbRotation: 90,
    cadRotation: { x: 0, y: 180, z: 180 },
  },
}

if (JSON.stringify(actual) !== JSON.stringify(correctedImportOutput)) {
  throw new Error(
    `Corrected output changed:\n${JSON.stringify(actual, null, 2)}`,
  )
}
