import { readdir } from 'node:fs';
import { lib } from './dirs.js';
export default forEachResort;

function forEachResort(fn) {
  console.log('Reading:', lib);
  readdir(lib, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dirents.filter(dirent => dirent.isDirectory()).forEach(({ name }) => fn(name));
  });
}
