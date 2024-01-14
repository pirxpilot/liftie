module.exports = checkNames;

/**
 * Converts comma separated list of resort names to an array of valid resort names
 * Filters out the names that are not supported
 */
function checkNames(requested, valid, all) {
  if (!requested) {
    return all;
  }
  if (typeof requested === 'string') {
    requested = requested.split(',');
  }
  return requested.filter((item) => valid[item]);
}
