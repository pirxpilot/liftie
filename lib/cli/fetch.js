const { program } = require('commander');
const curl = require('./curl');

let done;

function fetchExample(resortId) {
  let resort;

  try {
    resort = require(`../resorts/${resortId}/resort.json`);
    curl(resort.dataUrl || resort.api || resort.url, resortId);
    done = true;
  } catch {
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
