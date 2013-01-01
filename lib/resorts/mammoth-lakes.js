var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {},
    statusConverter = {
      'Expected': 'scheduled',
      'WeatherHold': 'hold',
      'MaintenanceHold': 'hold',
      'Open':'open',
      'Closed': 'closed'
    };

  select(dom, '#mcLifts img.status').forEach(function(img) {
    var name = img.parent.next.children[0].data,
      src = img.attribs.src,
      status = src.slice(src.lastIndexOf('/') + 1, -4);
    liftStatus[name] = statusConverter[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Mammoth Lakes',
  url: {
    host: 'http://www.mammothmountain.com',
    pathname: '/Mountain/Conditions/LiftStatus/'
  },
  tags: ['California'],
  parse: parse
};
