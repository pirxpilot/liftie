import { readFileSync } from 'node:fs';
import { program } from 'commander';
import curl from './curl.js';
import { descriptorPath } from './dirs.js';

let done;

async function fetchExample(resortId) {
  try {
    const resort = JSON.parse(readFileSync(descriptorPath(resortId), 'utf8'));
    done = true;
    await curl(resort.dataUrl || resort.api || resort.url, resortId);
  } catch (e) {
    console.error(resortId, 'is not a valid resort ID', e);
    process.exit(1);
  }
}

program.arguments('<resort-id>').action(fetchExample).parse(process.argv);

if (!done) {
  program.outputHelp();
  process.exit(1);
}
