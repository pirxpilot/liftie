import toTitleCase from 'to-title-case';

export default {
  selector: 'item',
  parse: {
    name: {
      attribute: 'nom',
      fn: toTitleCase
    },
    status: {
      attribute: 'stat'
    }
  }
};
