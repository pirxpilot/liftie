var should = require('should');
var webcams = require('../lib/webcams');

/*global describe, it*/

describe('webcams', function() {

  it('should return no webcams if location is missing', function(done) {
    webcams({}, function(err, webcams) {
      should.not.exist(err);
      should.not.exist(webcams);
      done();
    });
  });


  if (!process.env.WEBCAMS_API_KEY) {
    it.skip('should return webcams for valid location');
  } else{
    it('should return webcams for valid location', function(done) {
      webcams({
        counter: 1,
        ll: [ 7.98, 46.54 ] // from API examples https://developers.webcams.travel/#webcams/examples
      }, function(err, webcams) {
        var webcam, mobile;

        should.not.exist(err);
        should.exist(webcams);

        webcams.should.not.be.empty();

        webcam = webcams[0];

        webcam.should.have.property('name', 'Fieschertal: Jungfrau - Wengen - Interlaken');
        webcam.should.have.property('source').with.startWith('https://www.windy.com/webcams/1329413077');
        webcam.should.have.property('image').with.startWith('https://images-webcams.windy.com');
        webcam.should.have.property('notice').with.startWith('Webcams provided by\n<a href="https://www.windy.com/"');

        webcam.should.have.property('mobile').with.type('object');
        mobile = webcam.mobile;

        mobile.should.have.property('name', 'Fieschertal: Jungfrau - Wengen - Interlaken');
        mobile.should.have.property('source').with.startWith('https://www.windy.com/webcams/1329413077');
        mobile.should.have.property('image').with.startWith('https://images-webcams.windy.com');
        mobile.should.have.property('notice').with.startWith('Webcams provided by\n<a href="https://www.windy.com/"');

        done(err);
      });
    });
  }

});
