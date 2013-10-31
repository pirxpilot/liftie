var fs = require('fs');

module.exports = load;

function load(fn) {
  fs.readdir(__dirname + '/resorts', function(err, names) {
    if(err) {
      return fn(err);
    }
    var data = names.reduce(function (data, id) {
      var resort = require('./resorts/' + id + '/resort.json');

      resort.id = id;
      data[id] = resort;

      return data;
    }, Object.create(null));
    fn(null, data);
  });
}
