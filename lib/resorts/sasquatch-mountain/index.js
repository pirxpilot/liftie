const code2status = {
  // TODO: other status codes needed
  '169': 'closed',
  '94': 'closed'    // ???
};

module.exports = {
  selector: 'ELEMENTGROUP ELEMENT',
  parse: {
    // HACK: `ELEMENTGROUP[NAME="LIFT"]` should work instead of this
    filter: element => element.parent.attribs.NAME === 'LIFT',
    name: 2,
    status: {
      child: 4,
      fn: s => code2status[s]
    }
  }
};

