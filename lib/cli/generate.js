const { program } = require('commander');
const prompt = require('prompt');
const url = require('node:url');
const fs = require('node:fs');
const path = require('node:path');
const template = require('lodash').template;
const curl = require('./curl');
const dirs = require('./dirs');

let fname;
const schema = [{
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
    name: 'coordinates',
    description: 'Resort location [longitude, latitude]',
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
  fs.readFile(fname, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    const conf = JSON.parse(data);
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
} else {
  execute();
}

function generate(resort) {
  console.log('Generating files for %s', resort.name);
  const resortDir = path.join(dirs.lib, resort.id);

  fs.mkdirSync(resortDir);
  copy(path.join(dirs.templates, 'index.js'), path.join(resortDir, 'index.js'), resort);
  const json = {
    name: resort.name,
    url: {
      host: resort.host,
      pathname: resort.pathname
    },
    tags: resort.tags,
    ll: resort.coordinates
  };
  if (resort.opening) {
    json.opening = resort.opening;
  }
  write(path.join(resortDir, 'resort.json'), json);
  copy(path.join(dirs.templates, 'test.js'), path.join(dirs.test, `${resort.id}.js`), resort);
  curl(json.url, resort.id);
}


function write(dst, json) {
  console.log('Generating %s...', dst);
  fs.writeFileSync(dst, JSON.stringify(json, null, 2));
}

function copy(src, dst, params) {
  console.log('Generating %s...', dst);
  fs.readFile(src, 'utf8', (_err, data) => {
    data = template(data)(params);
    fs.writeFileSync(dst, data);
  });
}

function execute(conf) {
  function splitHost(v) {
    const resortUrl = url.parse(v, true);
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
  prompt.addProperties(conf, schema, (err) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    const resortUrl = url.parse(conf.host + conf.pathname);

    conf.tags = conf.tags.split(/\s*,\s*/);
    conf.coordinates = conf.coordinates.split(/\s*,\s*/).map(Number.parseFloat);
    conf.host = [resortUrl.protocol, resortUrl.host].join('//');
    conf.pathname = [resortUrl.pathname, resortUrl.search, resortUrl.hash].join('');
    process.stdin.destroy();
    generate(conf);
  });
}
