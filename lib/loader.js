const fs = require('fs');

module.exports = load;

function load(fn) {
  fs.readdir(__dirname + '/resorts', (err, names) => {
    if (err) {
      return fn(err);
    }
    const data = names.reduce((data, id) => {
      const resort = require('./resorts/' + id + '/resort.json');

      resort.id = id;
      data[id] = resort;

      return data;
    }, Object.create(null));
    fn(null, data);
  });
}
