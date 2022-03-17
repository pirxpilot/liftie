module.exports = {
  selector: '.namemobile',
  parse: {
    name: '.',
    status: {
      child: '../6/1/0',
      attribute: 'class',
      regex: /\s([a-z]+)$/
    }
  }
};
