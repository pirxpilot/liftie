const coerce = require('./coerce');
// common parser for Intrawest http://www.intrawest.com/about-us/who-we-are.aspx
module.exports = parse;


function parse(lifts) {
  return lifts.reduce(function(ls, { Name, Status }) {
    ls[Name] = coerce(Status);
    return ls;
  }, {});
}
