const path = require('path');
const fs = require('fs');
const mkdir = fs.mkdirSync;
const writeFile = fs.writeFileSync;
const readFile = fs.readFileSync;
const exists = fs.existsSync;
const readdir = fs.readdirSync;
const stat = fs.statSync;

const prefix = './resorts';

function update(name) {
  let descriptor = require([prefix, name].join('/'));
  const parse = descriptor.parse;
  const filename = path.resolve(__dirname, prefix, name + '.js');
  const dir = path.resolve(__dirname, prefix, name);
  let js;

  delete descriptor.parse;

  descriptor = JSON.stringify(descriptor, null, 2);

  js = readFile(filename).toString('utf8');

  if (parse.name != 'parse') {
    console.error('Cannot convert %s automatically.', name);
    return;
  }
  js = js.replace(/module.exports[\s\S]+$/m, 'module.exports = parse;\n');

  if (!exists(dir)) {
    mkdir(dir);
  }
  writeFile(path.join(dir, 'resort.json'), descriptor);
  writeFile(path.join(dir, 'index.js'), js);
}


const dir = path.resolve(__dirname, prefix);

readdir(dir)
  .filter(function (fname) {
    return stat(path.resolve(dir, fname)).isFile();
  })
  .map(function (fname) {
    return fname.slice(0, -3);
  })
  .forEach(function (resort) {
    update(resort);
  });
