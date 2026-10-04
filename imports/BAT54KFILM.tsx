import type { DiodeProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode", "neg"],
  pin2: ["anode", "pos"],
} as const

export const BAT54KFILM = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props

  return (
    <diode
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C283259"
  ]
}}
      manufacturerPartNumber="BAT54KFILM"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} points={[{x: "-1.016mm", y: "0.2463038mm"}, {x: "-0.4064mm", y: "0.2463038mm"}, {x: "-0.4064mm", y: "-0.2362962mm"}, {x: "-1.016mm", y: "-0.2362962mm"}]} shape="polygon" />
<smtpad portHints={["pin2"]} points={[{x: "0.4064mm", y: "0.2362962mm"}, {x: "1.016mm", y: "0.2362962mm"}, {x: "1.016mm", y: "-0.2463038mm"}, {x: "0.4064mm", y: "-0.2463038mm"}]} shape="polygon" />
<silkscreenpath route={[{"x":0.6602730000000037,"y":-0.3261614000000037},{"x":0.6602730000000037,"y":-0.43185080000000653},{"x":-0.6605270000000019,"y":-0.43185080000000653},{"x":-0.6603999999999814,"y":-0.43180000000000973}]} />
<silkscreenpath route={[{"x":-0.6603999999999814,"y":0.4317999999999955},{"x":-0.6603999999999814,"y":0.4317999999999955},{"x":0.6604000000000099,"y":0.4317999999999955},{"x":0.6604000000000099,"y":0.3301999999999907}]} />
<silkscreentext text="{NAME}" pcbX="-0.000127mm" pcbY="1.4866386mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-0.8889999999999816,"y":0.10563859999999181},{"x":-0.4825999999999908,"y":0.10563859999999181},{"x":-0.4825999999999908,"y":0.004038599999987014},{"x":-0.8889999999999816,"y":0.004038599999987014},{"x":-0.8889999999999816,"y":0.10563859999999181}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.5588000000000051,"y":0.08023859999998706},{"x":0.9906000000000148,"y":0.08023859999998706},{"x":0.9906000000000148,"y":0.004038599999987014},{"x":0.5588000000000051,"y":0.004038599999987014},{"x":0.5588000000000051,"y":0.08023859999998706}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.7239000000000146,"y":-0.1864614000000131},{"x":0.7239000000000146,"y":0.24533859999999663},{"x":0.8001000000000147,"y":0.24533859999999663},{"x":0.8001000000000147,"y":-0.1864614000000131},{"x":0.7239000000000146,"y":-0.1864614000000131}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-1.2661269999999973,"y":0.736638599999992},{"x":1.2658730000000133,"y":0.736638599999992},{"x":1.2658730000000133,"y":-0.728561400000018},{"x":-1.2661269999999973,"y":-0.728561400000018},{"x":-1.2661269999999973,"y":0.736638599999992}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C283259.obj?uuid=84cf6c2b182949329e473e9158b1fb00",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C283259.step?uuid=84cf6c2b182949329e473e9158b1fb00",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.0040386000000012245, z: 0 },
      }}
      {...restProps}
    />
  )
}
