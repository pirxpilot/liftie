var path = require('path');
var fs = require('fs');
var request = require('../lifts/request');
var dirs = require('./dirs');

module.exports = curl;

function curl(url, resortId) {
  var dst = path.join(dirs.test, 'example', resortId + '.html'),
    dstStream = fs.createWriteStream(dst);

  console.log('Fetching %s to %s...', url.host + url.pathname, dst);
  request(url).pipe(dstStream);
}
