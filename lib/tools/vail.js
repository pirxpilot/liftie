var vm = require('vm');
var debug = require('debug')('liftie:resort:vail');

var domutil = require('./domutil');
var select = require('../select');

module.exports = parse;



var statuses = ['closed', 'open', 'hold'];

function extractLiftData(script) {
  function evalHelper(_, fn) {
    var data = {};
    fn(data);
    return data;
  }

  var data = vm.runInNewContext(script, { require: evalHelper });
  return data && data.TerrainStatusFeed && data.TerrainStatusFeed.Lifts || [];
}


// common parser for Vail Resorts lift status
function parse(dom) {
  var dataScript = select(dom, 'script')
    .map(script => domutil.allText(script).trim())
    .find(script => script.includes('TerrainStatusFeed = {'));

  var liftStatus = extractLiftData(dataScript)
    .reduce(function(liftStatus, lift) {
      liftStatus[lift.Name.trim()] = statuses[lift.Status];
      return liftStatus;
    }, {});

  debug('vail Lift Status:', liftStatus);
  return liftStatus;
}
