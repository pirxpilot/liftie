import { readFileSync, writeFileSync } from 'node:fs';
import { program } from 'commander';
import { descriptorPath } from './dirs.js';
import forEachResort from './for-each-resort.js';

let done = false;

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

function points([lon, lat]) {
  function shorten(n) {
    return n.toFixed(4).replace(/0+$/, '');
  }

  return `${shorten(lat)},${shorten(lon)}`;
}

function fetchNoaa(resortId, options) {
  done = true;

  if (resortId) {
    noaaForResort(resortId, options);
  } else {
    forEachResort(resortId => noaaForResort(resortId, options));
  }
}

function noaaForResort(resortId, { overwrite }) {
  const descriptor = readDescriptor(resortId);

  const { ll } = descriptor;
  fetch(`https://api.weather.gov/points/${points(ll)}`, {
    headers: {
      'User-Agent': userAgent,
      Accept: 'application/geo+json'
    }
  })
    .then(res => res.json())
    .then(body => {
      const {
        properties: { gridId, gridX, gridY }
      } = body;
      const noaa = `${gridId}/${gridX},${gridY}`;
      if (overwrite) {
        descriptor.noaa = noaa;
        writeDescriptor(resortId, descriptor);
      }
      console.log(resortId, noaa);
    })
    .catch(e => console.error('Cannot find NOAA station for:', resortId, e));
}

function writeDescriptor(resortId, descriptor) {
  const filename = descriptorPath(resortId);
  writeFileSync(filename, `${JSON.stringify(descriptor, null, 2)}\n`);
}

function readDescriptor(resortId) {
  try {
    const filename = descriptorPath(resortId);
    return JSON.parse(readFileSync(filename, 'utf8'));
  } catch {
    console.error(resortId, 'is not a valid resort ID');
    process.exit(1);
  }
}

program
  .option('--overwrite', 'overwrite resort descriptor with new value')
  .arguments('[resort-id]')
  .action(fetchNoaa)
  .parse(process.argv);

if (!done) {
  program.outputHelp();
  process.exit(1);
}
