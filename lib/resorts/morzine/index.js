var domutil = require("../../tools/domutil");
var select = require("../../select");

function parse(dom) {
  var liftStatus = domutil.collect(
    dom,
    ".remontees_secteur .row .col2",
    function (div) {
      return {
        name: domutil.findText(select(div, ".nomRemontee")[0]),
        status: domutil.findText(select(div, ".etatRemontee")[0]),
      };
    }
  );

  return liftStatus;
}

module.exports = parse;
