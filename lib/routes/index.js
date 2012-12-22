
/*
 * GET home page.
 */


// http://www.skialpine.com/mountain/snow-report



function getLiftStatus(fn) {
  fn(null, [
    {
      name: 'lift1',
      status: 'open'
    },
    {
      name: 'lift2',
      status: 'onhold'
    },
  ]);
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