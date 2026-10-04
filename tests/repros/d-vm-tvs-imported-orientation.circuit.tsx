import { SMBJ16A } from "../../imports/SMBJ16A"

/**
 * The ring marks the wrapper's emitted CATHODE_TVS/pin201 pad. It must
 * coincide with the package's black cathode stripe.
 */
export default () => (
  <board width={10} height={7} routingDisabled>
    <SMBJ16A name="D_VM_TVS" pcbX={0} pcbY={0} />
    <silkscreencircle pcbX={0} pcbY={-2.5913} radius={0.58} />
    <silkscreenpath
      route={[
        { x: -2.8, y: -2.75 },
        { x: 0, y: -2.5913 },
      ]}
    />
    <silkscreentext
      text="PIN 1 / CATHODE / BLACK STRIPE"
      pcbX={0}
      pcbY={-3.05}
      fontSize={0.3}
    />
  </board>
)
