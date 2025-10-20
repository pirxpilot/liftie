import { readdirSync } from 'node:fs';
import { lib } from './dirs.js';
export default forEachResort;

function forEachResort(fn) {
  console.log('Reading:', lib);
  readdirSync(lib, { withFileTypes: true }).forEach(dirent => dirent.isDirectory() && fn(dirent.name));
}
