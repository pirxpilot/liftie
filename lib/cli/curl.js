const path = require('node:path');
const fs = require('node:fs');
const request = require('../lifts/request');
const dirs = require('./dirs');

module.exports = curl;

function curl(url, resortId) {
  const dst = path.join(dirs.test, 'example', `${resortId}.html`);
  const dstStream = fs.createWriteStream(dst);

  console.log('Fetching %s to %s...', url.host + url.pathname, dst);
  request(url).pipe(dstStream);
}
