var canonical = require('./canonical');

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
  var result = {};

  objects.names.forEach(function(n) {
    var o = objects.data[n];
    if (!o.tags) {
      return;
    }
    o.tags.forEach(function(tag) {
      var label;
      if (!tag) {
        return;
      }
      label = tag;
      tag = canonical(tag);
      result[tag] = result[tag] || {
        label: label,
        members: []
      };
      result[tag].members.push(o.id);
    });
  });

  // resort keys lexicographically
  return Object.keys(result).sort().reduce(function(memo, key) {
    memo[key] = result[key];
    return memo;
  }, {});
}