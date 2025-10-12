import { resolve } from 'node:path';

export const templates = resolve(import.meta.dirname, '../../templates');
export const lib = resolve(import.meta.dirname, '../resorts');
export const test = resolve(import.meta.dirname, '../../test/resorts');

export function descriptorPath(resortId) {
  return resolve(import.meta.dirname, '..', 'resorts', resortId, 'resort.json');
}
