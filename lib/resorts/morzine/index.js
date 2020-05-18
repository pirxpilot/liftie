var domutil = require("../../tools/domutil");
var select = require("../../select");

function parse(dom) {
  // Only pick the first intermaps-list element
  //  var parentDiv = select(dom, ".remontees_secteur")[0];
  //  var liftStatus = domutil.collect(parentDiv, ".row .col2", function (div) {
  var liftStatus = domutil.collect(
    dom,
    ".remontees_secteur .row .col2",
    function (div) {
      //    console.log(div);
      return {
        name: domutil.findText(select(div, ".nomRemontee")[0]),
        status: domutil.findText(select(div, ".etatRemontee")[0]),
      };
    }
  );

  return liftStatus;
}

module.exports = parse;
