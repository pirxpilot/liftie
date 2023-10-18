const fs = require('node:fs/promises');

module.exports = load;

async function load() {
  const names = await fs.readdir(`${__dirname}/resorts`);
  const entries = names.map(
    id => [
      id,
      {
        id,
        ...require(`./resorts/${id}/resort.json`)
      }
    ]
  );
  return Object.fromEntries(entries);
}
