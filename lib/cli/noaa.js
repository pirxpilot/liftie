import { readFile, writeFile } from 'node:fs/promises';
import { program } from 'commander';
import { descriptorPath } from './dirs.js';
import forEachResort from './for-each-resort.js';

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

function points([lon, lat]) {
  function shorten(n) {
    return n.toFixed(4).replace(/0+$/, '');
  }

  return `${shorten(lat)},${shorten(lon)}`;
}

function fetchNoaa(resortId, options) {
  if (resortId) {
    noaaForResort(resortId, options);
  } else {
    forEachResort(resortId => noaaForResort(resortId, options).catch(e => console.error(resortId, e)));
  }
}

async function noaaForResort(resortId, { overwrite }) {
  const descriptor = await readDescriptor(resortId);

  const { ll } = descriptor;
  const res = await fetch(`https://api.weather.gov/points/${points(ll)}`, {
    headers: {
      'User-Agent': userAgent,
      Accept: 'application/geo+json'
    }
  });
  if (res.status !== 200) {
    console.error('Cannot find NOAA station for:', resortId);
    return;
  }
  const {
    properties: { gridId, gridX, gridY }
  } = await res.json();
  const noaa = `${gridId}/${gridX},${gridY}`;
  if (overwrite) {
    descriptor.noaa = noaa;
    await writeDescriptor(resortId, descriptor);
  }
  console.log(resortId, noaa);
}

function writeDescriptor(resortId, descriptor) {
  const filename = descriptorPath(resortId);
  return writeFile(filename, `${JSON.stringify(descriptor, null, 2)}\n`);
}

async function readDescriptor(resortId) {
  try {
    const filename = descriptorPath(resortId);
    return JSON.parse(await readFile(filename, 'utf8'));
  } catch {
    console.error(resortId, 'is not a valid resort ID');
    process.exit(1);
  }
}

program
  .option('--overwrite', 'overwrite resort descriptor with new value')
  .arguments('[resort-id]')
  .action(fetchNoaa)
  .parse();
