import fs from 'node:fs/promises';

export default async function load() {
  const names = await fs.readdir(`${import.meta.dirname}/resorts`);
  const entries = names.map(entry);
  return Object.fromEntries(await Promise.all(entries));
}

async function entry(id) {
  const { default: resort } = await import(`./resorts/${id}/resort.json`, { with: { type: 'json' } });
  return [id, { id, ...resort }];
}
