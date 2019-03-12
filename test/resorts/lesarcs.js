var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('lesarcs');

/*global describe, it */
describe('parse lesarcs', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/lesarcs.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'ARC EN CIEL': 'scheduled',
  'ARPETTE': 'scheduled',
  'CACHETTE': 'scheduled',
  'MONT BLANC': 'scheduled',
  'CLOCHERET': 'scheduled',
  'COMBETTES': 'scheduled',
  'MILLERETTE': 'closed',
  'SNOWPARK': 'scheduled',
  'TOMMELET': 'scheduled',
  'VEZAILE': 'scheduled',
  'AIGUILLE ROUGE..': 'closed',
  'VARET': 'scheduled',
  'CABRIOLET': 'open',
  'ARCABULLE': 'scheduled',
  'PRE ST ESPRIT': 'scheduled',
  'BOIS DE L\'OURS': 'scheduled',
  'COMBORCIERE': 'scheduled',
  'MARMOTTES.': 'scheduled',
  'PLAGNETTES.': 'scheduled',
  'GRAND COL.': 'scheduled',
  'LANCHETTES': 'scheduled',
  'ST JACQUES.': 'scheduled',
  'LAC COMBES 1': 'scheduled',
  'RHODOS': 'scheduled',
  'PLAN VERT.': 'scheduled',
  'ELDORADOR.': 'scheduled',
  'ETERLOU': 'scheduled',
  'FLAMME OLYMPIQUE': 'scheduled',
  'LONZAGNE': 'scheduled',
  'DERBY': 'scheduled',
  'GRIZZLY': 'scheduled',
  'PEISEY': 'scheduled',
  'VALLANDRY': 'scheduled',
  '2300': 'scheduled',
  'PARCHEY': 'scheduled',
  'CABRI.': 'scheduled',
  'COMBE.': 'closed',
  'FLOCON.': 'scheduled',
  'DAHU': 'open',
  'TRANSARC 1': 'scheduled',
  'TRANSARC 2': 'scheduled',
  'VILLARDS': 'scheduled',
  'CARRELEY.': 'scheduled',
  'VAGERE.': 'scheduled',
  'CHARMETTOGER.': 'scheduled',
  'JARDIN ALPIN': 'scheduled',
  'MUR ESCALADE': 'scheduled',
  'DROSET': 'scheduled',
  'PLAN DES VIOLETTES': 'scheduled',
  'REPLAT.': 'scheduled',
  'RHONAZ.': 'closed',
  'TETRAS': 'scheduled'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
