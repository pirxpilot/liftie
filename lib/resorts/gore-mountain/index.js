module.exports = {
  selector: '.lift-conditions-mountain-section-container .lift-label',
  parse: {
    name: '.',
    status: {
      child: '+/0',
      attribute: 'class',
      fn: s => s.split(' ').pop()
    }
  }
};

