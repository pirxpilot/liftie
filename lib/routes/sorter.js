var _ = require('lodash');

module.exports = markOpen;

function getOpenResorts(cookie) {
  var open = cookie['resorts-open'];
  if (open !== undefined) {
    return open.split(',');
  }
}

function sortByOpen(resorts) {
  var open = [], closed = [];
  resorts = _.sortBy(resorts, function(r) {
    return r.name;
  });
  resorts.forEach(function (r) {
    var arr = r.open ? open : closed;
    arr.push(r);
  });
  return open.concat(closed);
}

function markOpen(resorts, cookie) {
  var openList = getOpenResorts(cookie);
  if (!openList && resorts.length > 5) {
    // no cookie and a lot of resorts - display everything as closed
    openList = [];
  }
  resorts.forEach(function(resort) {
    resort.open = !openList || openList.indexOf(resort.id) > -1;
  });
  if (openList) {
    resorts = sortByOpen(resorts);
  }
  return resorts;
}
