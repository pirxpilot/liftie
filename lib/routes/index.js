// http://www.skialpine.com/mountain/snow-report

var pipe = require('../pipe');
var select = require('cheerio-soupselect').select;

function getLiftStatus(fn) {
  function parse(cts, dom, $, fn) {
    var liftStatus = [];

    $('.lift_header').forEach(function(node) {
      var name = select(node, 'h4')[0];
      liftStatus.push({
        name: name.children[0].data,
        status: name.next.attribs['class'].slice('lift_status_'.length)
      });
    });
    fn(null, liftStatus);

  }
  pipe('http://www.skialpine.com',
    '/mountain/snow-report',
    null,
    parse,
    fn);
}


exports.index = function(req, res, next){
  getLiftStatus(function(err, liftStatus) {
    if(err) {
      return next(err);
    }
    res.render('index', {
      title: 'Liftie',
      liftStatus: liftStatus
    });
  });
};