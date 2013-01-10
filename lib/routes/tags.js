var canonical = require('./canonical');

module.exports = tags;

/**
 * Converts an array of objects into tags structure.
 *
 * Each object in the array needs to have 'id' field, and (optionally) tags array
 * Resulting object contains array of 'id' fields for each tag.
 *
 *  @param {Array} names of object to be converted
 *  @param {function} fnMap - function the loads the object based on a name
 */
function tags(names, fnMap) {
  var result = {
    all: {
      members: names,
      label: 'All'
    }
  };

  names.map(fnMap).forEach(function(o) {
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

  return result;
}