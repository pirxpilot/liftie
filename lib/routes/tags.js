const canonical = require('./canonical');

module.exports = tags;

/**
 * Converts an array of objects into tags structure.
 *
 * Each object in the array needs to have 'id' field, and (optionally) tags array
 * Resulting object contains array of 'id' fields for each tag.
 *
 *  @param {Object} objects to be converted
 */
function tags(objects) {
  const result = Object.create(null);

  Object.keys(objects).forEach((n) => {
    const o = objects[n];
    if (!o.tags) {
      return;
    }
    o.tags.forEach((tag) => {
      if (!tag) {
        return;
      }
      const label = tag;
      tag = canonical(tag);
      result[tag] = result[tag] || {
        slug: tag,
        label,
        members: []
      };
      result[tag].members.push(o.id);
    });
  });

  // resort keys lexicographically
  return Object.keys(result).sort().reduce((memo, key) => {
    memo[key] = result[key];
    return memo;
  }, Object.create(null));
}
