var program = require('commander');
var prompt = require('prompt');
var url = require('url');
var fs = require('fs');
var path = require('path');
var template = require('lodash').template;
var curl = require('./curl');
var dirs = require('./dirs');

var fname;
var schema = [
  {
    name: 'id',
    description: 'Short name of the resort [acme]',
    type: 'string',
    required: true
  },
  {
    name: 'name',
    description: 'Human readable name of the resort [Acme Ski]',
    type: 'string',
    required: true
  },
  {
    name: 'host',
    description: 'URL of the resort website [http://acme.com]',
    type: 'string',
    required: true
  },
  {
    name: 'pathname',
    description: 'Relative URL of the page with lift status [/lift/status]',
    type: 'string',
    required: true
  },
  {
    name: 'tags',
    description: 'Comma separated list of tags [Colorado, Vail, New Hampshire]',
    type: 'string',
    default: ''
  },
  {
    name: 'twitter',
    description: 'Twitter handle (without @) [acme]',
    type: 'string'
  },
  {
    name: 'coordinates',
    description: 'Resort location [latitude, longitude]',
    type: 'string',
    default: ''
  },
  {
    name: 'opening',
    description: 'Opening date [YYYY-MM-DD]',
    type: 'string'
  }
];

program
  .option('-j, --json <file>', 'JSON file with resort data', String)
  .parse(process.argv);

if (program.json) {
  fname = path.resolve(program.json);
  fs.readFile(fname, function (err, data) {
    var conf;
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    conf = JSON.parse(data);
    conf.id = path.basename(fname, '.json');
    if (conf.url) {
      conf.host = conf.url.host;
      conf.pathname = conf.url.pathname;
      if (conf.host && !conf.pathname) {
        console.log('Resort website:', conf.host);
      }
    }
    if (Array.isArray(conf.tags)) {
      conf.tags = conf.tags.join(',');
    }
    if (Array.isArray(conf.ll)) {
      conf.coordinates = conf.ll.join(',');
    }
    execute(conf);
  });
}
else {
  execute();
}

function generate(resort) {
  console.log('Generating files for %s', resort.name);
  var resortDir = path.join(dirs.lib, resort.id),
    json;

  fs.mkdirSync(resortDir);
  copy(path.join(dirs.templates, 'index.js'), path.join(resortDir, 'index.js'), resort);
  json = {
    name: resort.name,
    url: {
      host: resort.host,
      pathname: resort.pathname
    },
    tags: resort.tags,
    ll: resort.coordinates
  };
  if (resort.twitter) {
    json.twitter = resort.twitter;
  }
  if (resort.opening) {
    json.opening = resort.opening;
  }
  write(path.join(resortDir, 'resort.json'), json);
  copy(path.join(dirs.templates, 'test.js'), path.join(dirs.test, resort.id + '.js'), resort);
  curl(json.url, resort.id);
}


function write(dst, json) {
  console.log('Generating %s...', dst);
  fs.writeFile(dst, JSON.stringify(json, null, 2));
}

function copy(src, dst, params) {
  console.log('Generating %s...', dst);
  fs.readFile(src, 'utf8', function(err, data) {
    data = template(data)(params);
    fs.writeFile(dst, data);
  });
}

function execute(conf) {
  function splitHost(v) {
    var resortUrl = url.parse(v, true);
    if (resortUrl.pathname) {
      conf.pathname = resortUrl.pathname;
    }
    return url.format({
      protocol: resortUrl.protocol,
      hostname: resortUrl.hostname
    });
  }

  schema[2].before = splitHost;
  conf = conf || {};
  prompt.override = conf;
  prompt.addProperties(conf, schema, function(err) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    var resortUrl = url.parse(conf.host + conf.pathname);

    conf.tags = conf.tags.split(/\s*,\s*/);
    conf.coordinates = conf.coordinates.split(/\s*,\s*/).map(parseFloat);
    conf.host = [resortUrl.protocol, resortUrl.host].join('//');
    conf.pathname = [resortUrl.pathname, resortUrl.search, resortUrl.hash].join('');
    process.stdin.destroy();
    generate(conf);
  });
}
