module.exports = {
  selector: '.table:first-of-type th',
  filter: node => node.children.length >= 2,
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      regex: /\s+([a-z]+)$/
    }
  }
};
