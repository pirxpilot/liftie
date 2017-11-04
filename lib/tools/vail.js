var safeEval = require('safe-eval');
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

  var data = safeEval(script, { require: evalHelper });
  return data && data.TerrainStatusFeed && data.TerrainStatusFeed.Lifts || [];
}


// common parser for Vail Resorts lift status
function parse(dom) {
  var dataScript = select(dom, 'script')
    .map(function(script) {
      return domutil.allText(script).trim();
    })
    .filter(function(script) {
      return script.startsWith('require');
    })[0];


  var liftStatus = extractLiftData(dataScript)
    .reduce(function(liftStatus, lift) {
      liftStatus[lift.Name.trim()] = statuses[lift.Status];
      return liftStatus;
    }, {});

  debug('vail Lift Status:', liftStatus);
  return liftStatus;
}
