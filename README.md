# NEMA 8 20 mm USB-C PD Controller

Eight-layer, 20 mm × 20 mm controller for the StepperOnline
[8HS15-0604S](https://www.omc-stepperonline.com/nema-8-bipolar-1-8deg-4ncm-5-7oz-in-0-6a-6v-20x20x38mm-4-wires-8hs15-0604s)
NEMA 8 bipolar stepper motor.

## Hardware

- CH32X035F8U6 MCU with native USB 2.0 and USB-PD CC interfaces
- TMC2209-LA-T stepper driver with STEP/DIR and UART current/mode control
- Two USB-C connectors: a dedicated USB-PD motor-power input and a separate
  USB 2.0 programming/data port
- Firmware-selectable USB-PD voltage on the power connector; the intended motor
  contract is 15 V
- 1.1 A resettable input fuse, reverse-current blocking diode, SMBJ16A TVS,
  and 20 uF of local 25 V bulk capacitance
- 3.3 V regulator for the MCU and driver I/O rail
- 0.33 ohm external phase-current sense resistors
- Fixed resistor VREF default near the motor's 0.60 A rating; operating current
  remains configurable through TMC2209 UART registers
- USB data-line ESD protection and local decoupling
- Four-pin JST-SH motor connector: B−, B+, A+, A−
- Boot pushbutton for the CH32 USB ROM-loader entry sequence

The target motor is rated 0.60 A/phase, 6 V, 11 ohm, and 5.5 mH ±20% per
phase. A chopper driver can operate it from the negotiated 15 V rail as long as
the phase current is limited correctly.

## Mechanical design

- Board: 20 mm × 20 mm, 1.6 mm FR-4, eight copper layers
- Mounting: two diagonal 2.2 mm holes at (−7.7, +7.7) and (+7.7, −7.7) mm
- Hole-center spacing: 15.4 mm in X and Y, matching the NEMA 8 face pattern
- The board is assembled on both sides. Use suitable spacers/standoffs so the
  bottom-side parts do not touch the motor face.

## Routing and thermal design

- Default tscircuit autorouter, latest pipeline, 10× effort, with the passing
  generated route frozen for repeatable fabrication output
- Motor phase routes are 0.25 mm and use top plus inner routing layers; this is
  the widest short-free result in the present 20 mm placement
- Both sense routes stay on the top layer; SENSE_A is 0.25 mm and the tightly
  constrained SENSE_B route is 0.15 mm
- USB-PD VBUS routes are 0.25 mm, with the fused segment at 0.40 mm. VM uses a
  top-layer copper pour and 0.15–0.25 mm branch routes
- All generated and explicit vias use a 0.30 mm drill and 0.45 mm outer diameter
- Nine ground/thermal vias connect the TMC2209 exposed-pad region through the
  stackup
- Eleven additional ground fan-outs connect all top-side ground pads into the
  ground system
- The active planes/pours are GND on inner 6 and bottom, VIO on inner 4, and VM
  on top

This is an extremely dense 20 mm layout. It meets the automated fabrication
checks, but it does not meet a hypothetical 0.6–1.0 mm, outer-layer-only motor
trace rule. Review the 0.25 mm phase routes against the intended duty cycle and
temperature rise before production release.

## Power-up notes

USB-PD negotiation is firmware-controlled by the CH32X035. Until firmware
requests and verifies the intended contract, a USB-C source may remain at 5 V.
Do not enable the motor stage on an unverified fallback supply. Confirm VM before
enabling the driver.

The local TVS and bulk capacitance reduce supply transients, but a USB-C source
normally cannot absorb returned motor energy. Verify VM overshoot during the
worst planned deceleration and add an external brake/clamp solution if required.

The PCB contains no application firmware. Firmware must negotiate the USB-PD
contract, verify VM before enabling the TMC2209, implement USB programming/data,
and configure TMC2209 current and mode over the single-wire UART.

## JLCPCB sourcing

Every fitted electrical component has a JLCPCB/LCSC catalog number in the
source. Catalog availability was rechecked before publication. Main parts:

| Function | Part | LCSC |
| --- | --- | --- |
| MCU / USB-PD | CH32X035F8U6 | C42442062 |
| Motor driver | TMC2209-LA-T | C2150710 |
| USB-C connector | TYPE-C-31-M-12 | C165948 |
| USB ESD array | USBLC6-2SC6 | C7519 |
| 3.3 V regulator | CJ6330A33M | C2829401 |
| Resettable fuse | BSMD1206-110-16V | C2803346 |
| Blocking diode | PMEG6020ELRX | C478000 |
| Logic-input isolation diode | BAT54KFILM | C283259 |
| Charge-pump capacitor | 100 nF, 50 V, 0402 | C525226 |
| 16 V TVS | SMBJ16A | C19077571 |
| Current sense | PT1206FR-7W0R33L | C858786 |
| Motor connector | BM04B-SRSS-TB(LF)(SN) | C160390 |

Confirm pick-and-place rotations and polarity markings against the JLCPCB
preview before ordering assembled boards.

## Verification

```sh
npm run typecheck
npm run build -- --autorouter-timeout 2m --ignore-warnings
tsci check placement index.circuit.tsx
tsci check source index.circuit.tsx
tsci check netlist index.circuit.tsx
tsci check pin_specification index.circuit.tsx
tsci check shorts index.circuit.tsx --mode gerber
tsci check shorts index.circuit.tsx --mode pcb
```

The release build, placement check, and the two independent shorts checks must
all pass before a new version is pushed. Pick-and-place rotations and the final
assembly preview still require a human review before ordering.
