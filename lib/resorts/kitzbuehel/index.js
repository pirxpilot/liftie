const states = ['?', 'open', 'closed'];

export default {
  selector: '.lifts li[data-locationid] > a',
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      regex: /(\d)$/,
      fn: s => states[Number.parseInt(s, 10)]
    }
  }
};
