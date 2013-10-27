var dataset = require('dataset');
var events = require('event');
var furkot = require('furkot-trip')();
var defDur = 7 * 60 * 60 * 1000;

module.exports = trip;

function coordinates(ll) {
  ll = ll.split(',');
  return {
    lon: ll[0],
    lat: ll[1]
  };
}

function url(node) {
  node = node.querySelector('.resort-link');
  if (node) {
    return node.getAttribute('href');
  }
}

function trip(node) {
  var btn = node.querySelector('.add-to-trip');
  if (btn) {
    events.bind(btn, 'click', function () {
      var ds = dataset(node);
      furkot.plan([{
        name: ds.get('name'),
        coordinates: coordinates(ds.get('ll')),
        url: url(node),
        duration: defDur
      }]);
    });
  }
}
