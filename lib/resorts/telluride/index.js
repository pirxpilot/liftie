module.exports = {
  selector: '.sectionLiftsAndAreas tbody tr',
  parse: {
    name: 1,
    status: {
      child: '2/0',
      attribute: 'class',
      fn: s => s.slice('icon-key'.length)
    }
  }
};
