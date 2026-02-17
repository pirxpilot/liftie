export default {
  selector: '.mc-lifts__table tbody tr',
  parse: {
    name: '0',
    status: {
      child: '2',
      attribute: 'class',
      regex: /mc__icon-(\w+)/
    }
  }
};
