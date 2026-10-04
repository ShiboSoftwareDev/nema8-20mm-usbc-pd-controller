import { SMBJ16A } from "../../imports/SMBJ16A"

/**
 * The ring marks the wrapper's emitted CATHODE_TVS/pin201 pad. It must
 * coincide with the package's black cathode stripe.
 */
export default () => (
  <board width={10} height={7} routingDisabled>
    <SMBJ16A name="D_VM_TVS" pcbX={0} pcbY={0} />
    <silkscreencircle pcbX={-2.5913} pcbY={0} radius={0.58} />
    <silkscreenpath
      route={[
        { x: -2.8, y: -2.75 },
        { x: -2.5913, y: 0 },
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
