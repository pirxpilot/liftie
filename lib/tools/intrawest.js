const coerce = require('./coerce');
// common parser for Intrawest http://www.intrawest.com/about-us/who-we-are.aspx
module.exports = parse;


function parse(lifts) {
  return lifts.reduce((ls, { Name: name, StatusEnglish: status }) => {
    ls[name] = coerce(status);
    return ls;
  }, {});
}
