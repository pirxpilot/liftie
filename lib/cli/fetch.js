var program = require('commander');
var curl = require('./curl');


var done;

function fetchExample(resortId) {
  var resort;

  try {
    resort = require('../resorts/' + resortId + '/resort.json');
    curl(resort.url, resortId);
    done = true;
  }
  catch (e) {
    console.error(resortId, 'is not a valid resort ID');
    process.exit(1);
  }
}

program
  .arguments('<resort-id>')
  .action(fetchExample)
  .parse(process.argv);

if (!done) {
  program.outputHelp();
  process.exit(1);
}
