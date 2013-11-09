var entities = require('../../lib/tools/entities');

/*global describe, it*/
describe('entites', function() {
  it('should leave text without entites unchanged', function() {
    entities('abc def').should.eql('abc def');
  });

  it('should parse decimal entities', function() {
    entities('abc&#39;def').should.eql('abc\'def');
    entities('What&#39;s a black star &#9733;').should.eql('What\'s a black star ★');
  });

  it('should parse hex entities', function() {
    entities('What&#39;s a black star &#x2605;').should.eql('What\'s a black star ★');
  });
});