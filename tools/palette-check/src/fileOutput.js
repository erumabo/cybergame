import fs from "node:fs";
import path from "node:path";
import { MINLC, LcLEYEND, GLOBALSTYLE } from "./globals.js";

function formatColor(color) {
  const [int, dec] = ("" + color.Lc).split(".");
  const Lc_f =
    int.padStart(4, " ") + (!!dec ? "." + dec.padEnd(2, "0") : ".00");

  let hue = ("" + Math.floor(color.h ?? "?")).padStart(3, " ");
  let sat = ("" + Math.floor(color.s * 100)).padStart(2, " ");
  let lum = ("" + Math.floor(color.l * 100)).padStart(2, " ");

  return `${color.color};  /* Lc ${Lc_f}  H${hue}  S${sat}  L${lum} */`;
}

function contrastTable(contrast, hide) {
  return contrast
    .toSpliced(
      1,
      0,
      contrast[0].map((_) => "------:")
    )
    .map(
      (row) =>
        "| " +
        row
          .map((c) =>
            (hide && Math.abs(c) < MINLC ? "" : "" + c).padStart(7, " ")
          )
          .join(" | ") +
        " |"
    )
    .join("\n");
}

function formatPalette(palette) {
  let out = "";
  for (let prop in palette) {
    if (prop === "filename") continue;
    const color = formatColor(palette[prop]);
    out += `  --${(prop + ":").padEnd(14, " ")}${color}\n`;
  }
  return "{\n" + out + "}";
}

function colorMap(palette) {
  let svg = "";
  for (let prop in palette) {
    const color = palette[prop];
    let x, y;
    if (!!color.h) {
      let ang = (color.h * Math.PI) / 180;
      y = color.s * Math.sin(ang) * 90 + 100;
      x = color.s * Math.cos(ang) * 90 + 100;
    } else {
      x = 100;
      y = 100;
    }
    svg += `    <circle cx="${x}" cy="${y}" r="7" stroke="${palette["background"].color}" stroke-width="3" fill="${color.color}"/>\n`;
  }
  return svg;
}

function paletteSample(style, palette, filename, i) {
  return `<div class="p${filename}_${i}">
  <h3><span class="icon">&#9632;</span>Palette ${filename} #${i}</h3>
  ${Object.values(palette)
    .map(({ color }) => color && colorIcon(color))
    .filter((i) => !!i)
    .join(" | ")}<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
${style}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
${colorMap(palette)}
  </svg>
</div>
<hr/>
`;
}

function colorIcon(color) {
  return `<span style="color:${color}">&#9632;</span>${color}`;
}

export async function generateFile(file, { colors, palettes, contrast, hide }) {
  let { dir, name: filename, base: basename } = path.parse(file);

  let fileContent = `# Palette ${filename}

${colors.map(colorIcon).join("\n\n")}

## APCA Lc Background (X) vs Foreground (Y)

${contrastTable(contrast, hide)}${
    hide && "\n\nValues less than " + MINLC + " are ommited"
  }

${LcLEYEND}

## Posible Palletes:

`;

  const palettesStrings = palettes.map(formatPalette);

  fileContent +=
    "<style>\n" +
    GLOBALSTYLE +
    "\n" +
    palettesStrings
      .map((palette, i) => `.p${filename}_${i} ${palette}`)
      .join("\n") +
    "\n</style>\n\n";

  palettesStrings.forEach((palette, i) => {
    fileContent += paletteSample(palette, palettes[i], filename, i);
  });

  const outFile = path.join(dir, "results", basename + ".md");
  console.log(outFile);
  fs.writeFileSync(outFile, fileContent);
}

export async function generateSwatch(file, palettes) {
  let { dir } = path.parse(file);
  let fileContent = "";
  fileContent += "<style>\n" + GLOBALSTYLE + "\n";

  const palettesStrings = palettes.map(formatPalette);
  fileContent +=
    palettesStrings
      .map((palette, i) => `.p${palettes[i].filename}_${i} ${palette}`)
      .join("\n") + "\n</style>\n\n";

  palettesStrings.forEach((palette, i) => {
    fileContent += paletteSample(palette, palettes[i], palettes[i].filename, i);
  });

  const outFile = path.join(dir, "results", "all.html");
  console.log(outFile);
  fs.writeFileSync(outFile, fileContent);
}
