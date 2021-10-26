module.exports = {
  selector: '[id^="conditions_lifts"] .breakInsideAvoid',
  parse: {
    name: '1',
    status: {
      child: '0/0',
      attribute: 'alt',
      // regex: /(?:-|icon-?)(\w+)\.(?:png|svg)$/i
    }
  }
};


/*
module.exports = {
  selector: '[id^="conditions_lifts"] li > div',
  parse: {
    name: 1,
    status: {
      child: '0/0',
      attribute: 'src',
      regex: /(?:-|icon-?)(\w+)\.(?:png|svg)$/i
    }
  }
};
*/
