const _ = require('lodash');

module.exports = markOpen;

function getOpenResorts(cookie) {
  const open = cookie['resorts-open'];
  if (open !== undefined) {
    return open.split(',');
  }
}

function sortByOpen(resorts) {
  const open = [];
  const closed = [];
  resorts = _.sortBy(resorts, (r) => r.name);
  resorts.forEach((r) => {
    const arr = r.open ? open : closed;
    arr.push(r);
  });
  return open.concat(closed);
}

function markOpen(resorts, cookie) {
  let openList = getOpenResorts(cookie);
  if (!openList && resorts.length > 5) {
    // no cookie and a lot of resorts - display everything as closed
    openList = [];
  }
  resorts.forEach((resort) => {
    resort.open = !openList || openList.indexOf(resort.id) > -1;
  });
  if (openList) {
    resorts = sortByOpen(resorts);
  }
  return resorts;
}
