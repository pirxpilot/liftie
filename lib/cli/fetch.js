import { readFileSync } from 'node:fs';
import { program } from 'commander';
import curl from './curl.js';
import { descriptorPath } from './dirs.js';

async function fetchExample(resortId) {
  try {
    const resort = JSON.parse(readFileSync(descriptorPath(resortId), 'utf8'));
    await curl(resort.dataUrl || resort.api || resort.url, resortId);
  } catch {
    console.error(`"${resortId}" is not a valid resort ID`);
    process.exit(1);
  }
}

program
  .arguments('<resort-id>')
  .action(fetchExample)
  .parseAsync()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
