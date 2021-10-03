module.exports = {
  selector: '.skiing-entry',
  parse: {
    filter: node => node?.children?.[1]?.attribs?.title,
    name: 3,
    status: {
      child: 0,
      attribute: 'alt',
      regex: /\s([a-z]+)$/
    }
  }
};
