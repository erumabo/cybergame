import { calcAPCA } from "apca-w3";
import { hsl } from "culori";
import _ from "underscore";
import {MINLC, GRAYSCALE} from "./globals.js";

function getAPCARatio(fg, bg) {
  return Math.floor(calcAPCA(fg, bg) * 100) / 100.0;
}

function paletteGenerate(bg, colors) {
  const palette = {};
  palette["background"] = { ...hsl(bg), color: bg, Lc: 0 };
  switch (colors.length) {
    case 1:
      palette["text"] = colors[0];
      palette["accent"] = colors[0];
      palette["primary"] = colors[0];
      palette["secondary"] = colors[0];
      break;
    case 2:
      palette["text"] = colors[0];
      palette["accent"] = colors[1];
      palette["primary"] = colors[1];
      palette["secondary"] = colors[0];
      break;
    case 3:
      palette["text"] = colors[1];
      palette["accent"] = colors[0];
      palette["primary"] = colors[0];
      palette["secondary"] = colors[2];
      break;
    default:
      palette["text"] = colors[1];
      palette["accent"] = colors[0];
      palette["primary"] = colors[2];
      palette["secondary"] = colors[3];
      break;
  }
  return palette;
}

function generatePosiblePallets(contrasts) {
  const palletes = [];
  for (let bi in contrasts[0]) {
    if (bi == 0) continue;
    const bg = contrasts[0][bi];
    const colors = [];

    for (let fi in contrasts) {
      if (fi == 0) continue;
      const fg = contrasts[fi][0],
        lc = contrasts[fi][bi];

      if (Math.abs(lc) >= MINLC) {
        colors.push({
          ...hsl(fg),
          color: fg,
          Lc: lc
        });
      }
    }

    if (colors.length == 0) continue;

    colors.sort(({ Lc: a }, { Lc: b }) => Math.abs(b) - Math.abs(a));
    const palette = paletteGenerate(bg, colors);

    palletes.push(palette);
  }

  return palletes;
}

export default async function analysis(fcolors, hide) {
  const colors = fcolors
    .map((s) => s.trim())
    .filter((s) => !!s)
    .map((c) => "#" + c);
    
  let contrast = colors.map((fg) => colors.map((bg) => getAPCARatio(fg, bg)));

  // Sum arrays for sorting the matrix
  let sumofRows = colors.map((_) => 0);
  let sumofCols = colors.map((_) => 0);

  for (let i in contrast) {
    for (let j in contrast) {
      sumofRows[i] += contrast[i][j];
      sumofCols[j] += contrast[i][j];
    }
  }

  // Normalize to negative range
  let max = 0;
  sumofRows.forEach((r) => (max = Math.max(max, r)));
  sumofRows = sumofRows.map((r) => r - max);

  max = 0;
  sumofCols.forEach((r) => (max = Math.max(max, r)));
  sumofCols = sumofCols.map((r) => r - max);

  // Add headers
  contrast.unshift(colors);
  contrast.unshift(sumofCols);
  contrast = _.unzip(contrast);
  contrast.unshift(["10", ""].concat(colors));
  contrast.unshift(["20", "10"].concat(sumofRows));

  // remove empty rows
  if (hide) {
    const filterEmpty = (row, i) =>
      i <= 1 || row.some((c, ci) => ci > 1 && Math.abs(c) >= MINLC);
    contrast = _.unzip(contrast.filter(filterEmpty)).filter(filterEmpty);
  }

  // Sort rows by total sum
  contrast.sort(([a], [b]) => b - a);
  contrast = _.unzip(contrast);
  contrast.shift(); // remove totals

  // Sort cols by totao sum
  contrast.sort(([a], [b]) => b - a);
  contrast = _.unzip(contrast);
  contrast.shift(); // remove totals

  const posiblePalletes = generatePosiblePallets(contrast);

  return {
    colors,
    palettes: posiblePalletes,
    contrast,
    hide
  };
}
