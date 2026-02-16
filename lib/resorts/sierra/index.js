export default {
  selector: '[data-panel="lift-status"] h4',
  parse: {
    name: '.',
    status: '../+'
  }
};
