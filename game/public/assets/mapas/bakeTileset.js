import { program } from "commander";
import { Jimp } from "jimp";
import { promises as fs } from "fs";

function isSizeValid(size, tileSize) {
  if (size % tileSize) return false;
  if ((size / tileSize) % 4) return false;
  return true;
}

function numberToBaseN(num, base) {
  let a, b, c, d;
  a = num % base;
  num = Math.floor(num / base);
  b = num % base;
  num = Math.floor(num / base);
  c = num % base;
  num = Math.floor(num / base);
  d = num % base;
  return [a, b, c, d];
}

let terrainChunkIndex;
function sourceCoords(terrain, tilesetWidth, tileSize) {
  let x, y;
  if (terrainChunkIndex[terrain]) {
    const chunk = terrainChunkIndex[terrain];
    x = chunk.x;
    y = chunk.y;
  } else {
    const chunks = tilesetWidth / 4;
    x = (terrain % chunks) * tileSize * 4;
    y = Math.floor(terrain / chunks) * tileSize * 4;
    terrainChunkIndex[terrain] = { x, y };
  }

  return { source: terrain, x, y };
}

async function main(argv) {
  program
    .requiredOption("-i, --input <file>", "File input")
    .requiredOption("-o, --output <file>", "File output")
    .option("--tile-width <size>", "Tile Size (Default 32)", 32)
    .option("--tile-height <size>", "Tile Size (Default 32)")
    .parse(argv);

  const { input, output, ...options } = program.opts();
  const tileWidth = +options.tileWidth,
    tileHeight = +(options.tileHeight ?? options.tileWidth);

  const image = await Jimp.read(input);
  const { width, height } = image.bitmap;

  if (!isSizeValid(width, tileWidth) || !isSizeValid(height, tileHeight)) {
    throw new Error(
      `Image size (${width}x${height}) is not in multiple of Tile Size (${tileSize})`
    );
  }

  const vtiles = height / tileHeight,
    htiles = width / tileWidth;
  let terrains = (vtiles / 4) * (htiles / 4);
  terrainChunkIndex = new Array(terrains).fill(undefined);
  console.log(`Size: ${width}x${height}`);
  console.log(`Size (in tiles): ${htiles}x${vtiles}`);
  console.log(`Number of expected terrains: ${terrains}`);
  if(terrains > 32) {
    console.log(`Clip number of terrains to 32`);
    terrains = 32;
  }

  const finalWidth = terrains * terrains;
  const outputImage = new Jimp({
    width: finalWidth * tileWidth,
    height: finalWidth * tileWidth
  });
  console.log(outputImage.bitmap.width, outputImage.bitmap.height);

  const maxTiles = terrains * terrains * terrains * terrains;
  let progress = 0,
    percent = 100.0 / maxTiles,
    totalProgress = 0;

  const tstart = process.hrtime()[0];

  for (let tileIndex = 0; tileIndex < maxTiles; ++tileIndex) {
    const tileX = tileIndex % finalWidth,
      tileY = Math.floor(tileIndex / finalWidth);

    let tileComposition = numberToBaseN(tileIndex, terrains);
    tileComposition = [
      ...tileComposition
        .reduce((acc, s) => {
          if (acc.has(s)) return acc;
          let a, b, coords;
          a = +(tileComposition[0] == s);
          b = +(tileComposition[1] == s);
          a = (a << 1) + +(tileComposition[2] == s);
          b = (b << 1) + +(tileComposition[3] == s);
          coords = sourceCoords(s, htiles, tileWidth);
          coords.x = coords.x + a * tileWidth;
          coords.y = coords.y + b * tileWidth;
          acc.set(s, coords);
          return acc;
        }, new Map())
        .values()
    ];

    for (let _y = 0; _y < tileHeight; _y++) {
      for (let _x = 0; _x < tileWidth; _x++) {
        let pixel = 0;
        for (let source of tileComposition) {
          const idx =
            (image.bitmap.width * (_y + source.y) + (_x + source.x)) << 2;
          pixel = image.bitmap.data.readUInt32BE(idx);
          if (pixel) break;
        }
        const didx =
          (outputImage.bitmap.width * (_y + tileY * tileWidth) +
            _x +
            tileX * tileHeight) <<
          2;
        outputImage.bitmap.data.writeUInt32BE(pixel, didx);
      }
    }

    progress += percent;
    if (!(tileIndex % 100000)) {
      console.log(
        `${progress}%, ${tileIndex}, ${process.hrtime()[0] - tstart}s`
      );
      if (tileIndex != 0 && !(tileIndex % 1000000)) {
        await outputImage.write(output);
        console.log("image progress saved");
        //return;
      }
    }
  }
  await outputImage.write(output);
}
main(process.argv);
