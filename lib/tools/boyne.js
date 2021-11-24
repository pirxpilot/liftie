module.exports = {
  selector: '[id^="conditions_lifts"] .breakInsideAvoid',
  parse: {
    name: '1',
    status: {
      child: '0/0',
      attribute: 'src',
      regex: /(?:-|icon-?)(\w+)\.(?:png|svg)$/i
    }
  }
};
