#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import path from "node:path";
import fs from "node:fs";
import ParseTilemap from "./src/OpenMap.js";

function saveTilemap(name, outfile, tilemap) {
  const fullpath = path.join(process.cwd(), outfile);
  console.log(
    `Saving compiled map ${chalk.green(name)} to ${chalk.blue(
      fullpath
    )}`
  );
  fs.writeFileSync(
    fullpath,
    JSON.stringify(tilemap, null, 1).replace(
      /("data": \[)([^\]]+)/g,
      (_, a, b) => a + b.replace(/\s+/g, "")
    ) + "\n"
  );
}

function main(argv) {
  program
    .requiredOption("-n, --name <map name>")
    .option(
      "-i, --input <file name>",
      "Input file to process. If none it creates an empty map"
    )
    .option(
      "-o, --output <file name>",
      "Output file to save tilemap. Default <Map Name>.json"
    )
    .version("0.0.1")
    .parse(argv);

  let { name, input, output } = program.opts();
  let tilemap = ParseTilemap(name, input);
  
  if(!output) output = name + '.json';
  saveTilemap(name, output, tilemap);
}
main(process.argv);
