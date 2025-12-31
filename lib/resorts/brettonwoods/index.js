export default {
  selector: '.trail-reports__lifts .trail-reports__table-item[data-status]',
  parse: {
    name: '0/0',
    status: {
      attribute: 'data-status'
    }
  }
};
