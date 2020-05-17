const program = require('commander');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const forEachResort = require('./for-each-resort');

let done = false;

function points([ lon, lat ]) {
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
  const url = `https://api.weather.gov/points/${points(ll)}/forecast`;
  superagent(url)
    .redirects(0)
    .accept('application/geo+json')
    .ok(({ status }) => status === 301)
    .then(function({ headers: { location } }) {
      let match = location.match(/^\/gridpoints\/(\S+)\/forecast$/);
      if (match) {
        let noaa = match[1];
        if (overwrite) {
          descriptor.noaa = noaa;
          writeDescriptor(resortId, descriptor);
        }
        console.log(resortId, match[1]);
      } else {
        console.log('Invalid redirection', resortId, location);
      }
    }, function() {
      console.error('Cannot find NOAA station for:', resortId);
    });
}

function descriptorPath(resortId, absolute) {
  let p = `../resorts/${resortId}/resort.json`;
  return absolute ? resolve(__dirname, p) : p;
}

function writeDescriptor(resortId, descriptor) {
  const filename = descriptorPath(resortId, true);
  writeFileSync(filename, JSON.stringify(descriptor, null, 2) + '\n');
}

function readDescriptor(resortId) {
  try {
    return require(`../resorts/${resortId}/resort.json`);
  }
  catch (e) {
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
