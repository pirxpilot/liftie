var path = require('path');
var fs = require('fs');
var mkdir = fs.mkdirSync;
var writeFile = fs.writeFileSync;
var readFile = fs.readFileSync;
var exists = fs.existsSync;
var readdir = fs.readdirSync;
var stat = fs.statSync;

var prefix = './resorts';

function update(name) {
  var
    descriptor = require([prefix, name].join('/')),
    parse = descriptor.parse,
    filename = path.resolve(__dirname, prefix, name + '.js'),
    dir = path.resolve(__dirname, prefix, name),
    js;

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


var dir = path.resolve(__dirname, prefix);

readdir(dir)
  .filter(function(fname) {
    return stat(path.resolve(dir, fname)).isFile();
  })
  .map(function(fname) {
    return fname.slice(0, -3);
  })
  .forEach(function(resort) {
    update(resort);
  });
