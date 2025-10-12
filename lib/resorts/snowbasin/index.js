export default {
  selector: '.mc-lifts__table tbody tr',
  parse: {
    name: 0,
    status: {
      child: '2/0',
      attribute: 'class',
      regex: /-(open|closed)/i
    }
  }
};
