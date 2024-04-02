const { program } = require('commander');
const { writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const superagent = require('superagent');

const forEachResort = require('./for-each-resort');

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
  const url = `https://api.weather.gov/points/${points(ll)}`;
  superagent(url)
    .accept('application/geo+json')
    .set('User-Agent', userAgent)
    .then((res) => {
      const { body: { properties: { gridId, gridX, gridY } } } = res;
      const noaa = `${gridId}/${gridX},${gridY}`;
      if (overwrite) {
        descriptor.noaa = noaa;
        writeDescriptor(resortId, descriptor);
      }
      console.log(resortId, noaa);
    }, (e) => {
      console.error('Cannot find NOAA station for:', resortId, e.response.text);
    });
}

function descriptorPath(resortId, absolute) {
  const p = `../resorts/${resortId}/resort.json`;
  return absolute ? resolve(__dirname, p) : p;
}

function writeDescriptor(resortId, descriptor) {
  const filename = descriptorPath(resortId, true);
  writeFileSync(filename, `${JSON.stringify(descriptor, null, 2)}\n`);
}

function readDescriptor(resortId) {
  try {
    return require(`../resorts/${resortId}/resort.json`);
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
