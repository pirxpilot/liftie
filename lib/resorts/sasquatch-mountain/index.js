const code2status = {
  // see: `DecodeStatus` in https://skiron.intermaps.com/js/sdds_data.js
  '7': 'closed',
  '94': 'closed',
  '169': 'open',
  '126': 'hold',
  '205': 'open',
  '412': 'open',
  '128': 'closed',
  '229': 'closed',
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
