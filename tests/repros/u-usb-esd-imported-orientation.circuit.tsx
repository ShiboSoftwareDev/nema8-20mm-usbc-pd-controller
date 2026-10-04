import { USBLC6_2SC6 } from "../../imports/USBLC6_2SC6"

/**
 * The ring marks the wrapper's emitted DM_IN/pin401 pad. It must coincide with
 * the package's molded dot. The imported wrapper uses non-canonical 401-406
 * numbers, so this is the electrical pin that represents physical pin 1.
 */
export default () => (
  <board width={8} height={7} routingDisabled>
    <USBLC6_2SC6 name="U_USB_ESD" pcbX={0} pcbY={0} />
    <silkscreencircle pcbX={1.1491} pcbY={-0.95} radius={0.42} />
    <silkscreenpath
      route={[
        { x: -3.1, y: -2.7 },
        { x: 1.1491, y: -0.95 },
      ]}
    />
    <silkscreentext
      text="PIN 1 / MOLDED DOT"
      pcbX={-1.7}
      pcbY={-2.9}
      fontSize={0.34}
    />
  </board>
)
