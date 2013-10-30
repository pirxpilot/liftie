var fs = require('fs');

module.exports = load;

function ifNotOpenYet(opening) {
  var match;
  if (opening) {
    match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(opening);
    if (match && new Date(match[1], match[2] - 1, match[3]).getTime() > Date.now()) {
      return opening;
    }
  }
}

function load() {
  var names = fs.readdirSync(__dirname + '/resorts'),
    data = {};
    names.forEach(function (id) {
      var dir = './resorts/' + id,
        parse = require(dir),
        resort = require(dir + '/resort.json');

      resort.id = id;
      resort.parse = parse;
      resort.href = resort.url.host + resort.url.pathname;
      resort.opening = ifNotOpenYet(resort.opening);
      data[id] = resort;
    });

  return {
    names: names,
    data: data
  };
}

