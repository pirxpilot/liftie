const { readdir } = require('fs');
const { lib } = require('./dirs');

module.exports = forEachResort;

function forEachResort(fn) {
  console.log('Reading:', lib);
  readdir(lib, { withFileTypes: true }, function (err, dirents) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dirents
      .filter(dirent => dirent.isDirectory())
      .forEach(({ name }) => fn(name));
  });

}
