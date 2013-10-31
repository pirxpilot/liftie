var fs = require('fs');

module.exports = load;

// TODO: move to a separate plugin
function ifNotOpenYet(opening) {
  var match;
  if (opening) {
    match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(opening);
    if (match && new Date(match[1], match[2] - 1, match[3]).getTime() > Date.now()) {
      return opening;
    }
  }
}

function load(fn) {
  fs.readdir(__dirname + '/resorts', function(err, names) {
    if(err) {
      return fn(err);
    }
    var data = names.reduce(function (data, id) {
      var resort = require('./resorts/' + id + '/resort.json');

      resort.id = id;
      resort.opening = ifNotOpenYet(resort.opening);

      data[id] = resort;

      return data;
    }, Object.create(null));
    fn(null, data);
  });
}
