const qs = require("qs");

module.exports = addToTrip;

function addToTrip(resort) {
  return qs.stringify({
    stop: {
      name: resort.name,
      coordinates: { lon: resort.ll[0], lat: resort.ll[1] },
      url: resort.href,
      duration: 7 * 60 * 60 * 1000
    }
  });
}
