const ICON_MAP = {
  check_circle: 'open',
  remove_circle: 'close'
};

module.exports = {
  selector: 'h2 + table tbody tr',
  parse: {
    name: 3,
    status: {
      child: '0/0',
      fn: s => ICON_MAP[s]
    }
  }
};
