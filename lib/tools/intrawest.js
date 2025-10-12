import coerce from './coerce.js';

// common parser for Intrawest http://www.intrawest.com/about-us/who-we-are.aspx

export default function parse(lifts) {
  return lifts.reduce((ls, { Name: name, StatusEnglish: status }) => {
    ls[name] = coerce(status);
    return ls;
  }, {});
}
