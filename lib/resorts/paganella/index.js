module.exports = {
  selector: '.intabellaimpianti .irow',
  parse: {
    name: 2,
    status: {
      child: 1,
      attribute: 'class',
      regex: /fa-([a-z]+)/
    }
  }
};
