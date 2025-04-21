#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { program } from "commander";

import analysis from "./src/analysis.js";
import { generateFile, generateSwatch } from "./src/fileOutput.js";

async function getLospecPalette(palette) {
  const url = `https://lospec.com/palette-list/${palette}.json`;
  let res = await fetch(url);
  res = await res.json();
  return res.colors;
}

async function main(argv) {
  program.option("-h, --hide").parse(argv);

  const { hide } = program.opts();
  const files = program.args;

  const palettes = [];

  for (let file of files) {
    const colors = fs.readFileSync(file, "utf-8").split("\r\n");

    const canalysis = await analysis(colors, hide);
    await generateFile(file, canalysis);
    let { name } = path.parse(file);
    canalysis.palettes.forEach((palette) =>
      palettes.push({
        filename: name,
        ...palette
      })
    );
  }
  generateSwatch(files[0], palettes);
}

main(process.argv);
