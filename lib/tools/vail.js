var vm = require('vm');
var debug = require('debug')('liftie:resort:vail');

var domutil = require('./domutil');
var select = require('../select');

var request = require('../lifts/request');
var htmlparser = require('htmlparser2');


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

function parseLiftStatus(dom) {
  var dataScript = select(dom, 'script')
      .map(script => domutil.allText(script).trim())
      .find(script => script.includes('TerrainStatusFeed = {'));

  var liftStatus = extractLiftData(dataScript)
      .reduce(function (liftStatus, lift) {
        liftStatus[lift.Name.trim()] = statuses[lift.Status];
        return liftStatus;
      }, {});

  debug('vail Lift Status:', liftStatus);
  return liftStatus;
}

function followWaitingRoom(waitingRoom) {
  var pathParts = waitingRoom.split("'");
  var redirectUrl = {
    host: "https://waitingroom.snow.com",
    pathname: pathParts[1]
  };

  return request(redirectUrl)
      .on('error', function() { return {}; })
      .then(function (res) {
        if (!res.text) {
          return {};
        }
        return parseLiftStatus(htmlparser.parseDOM(res.text));
      });
}

// common parser for Vail Resorts lift status
function parse(dom) {

  var waitingRoom = select(dom, 'script')
      .map(script => domutil.allText(script).trim())
      .find(script => script.includes("document.location.href = '/?c=vailresorts"));

  if (waitingRoom) {
    return followWaitingRoom(waitingRoom);
  } else {
    return parseLiftStatus(dom);
  }
}
