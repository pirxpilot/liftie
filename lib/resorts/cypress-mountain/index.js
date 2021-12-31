module.exports = {
  selector: '[id^=conditions_lifts_] div.breakInsideAvoid',
  parse: {
    name: {
      child: '1'
    },
    status: {
      child: '0/0',
      attribute: 'alt'
    }
  }
};
