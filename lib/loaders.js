import { callbackify, promisify } from 'node:util';
import Debug from 'debug';

const debug = Debug('liftie:loaders');

const loaders = [];

export function register(loader) {
  // promisify functions that take callback arg
  loaders.push(loader.length > 0 ? promisify(loader) : loader);
}

function appendResorts(data, resorts) {
  Object.entries(resorts).forEach(([id, resort]) => (data[id] ||= resort));
  return data;
}

export const load = callbackify(asyncLoad);

async function asyncLoad() {
  debug('Loading resorts...');
  const results = await Promise.all(loaders.map(fn => fn()));
  const data = results.reduce(appendResorts, Object.create(null));
  debug('Loaded %d resorts.', Object.keys(data).length);
  return data;
}
