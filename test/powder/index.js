var should = require('should');
var powder = require('../../lib/powder');

/*global describe, it*/

describe('powder', function() {

  it('should return powder rating for unsupported resorts', function(done) {
    powder({
      id: 'not a valid resort'
    }, function(err, rating) {
      should.not.exist(err);
      should.not.exist(rating);
      done();
    });
  });


  it('should return powder rating for valid resort', function(done) {
    powder({
      id: 'hoodoo'
    }, function(err, rating) {
      should.not.exist(err);
      should.exist(rating);
      rating.should.have.property('id', 'hoodoo');
      rating.should.have.property('date').with.match(/\d{4}-\d\d-\d\d/);
      rating.should.have.property('rating').with.within(0, 100);
      done(err);
    });
  });

});