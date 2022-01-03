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
  },
  conditions: {
    // filter: el => {
    //   console.log(el);
    //   return true;
    // },
    selector: '[id^=conditions_area_] .js-measurement[data-metric]',
    parse: {
      base: 4,
      season: 3,
      twentyfour_hours: 0,
      fortyeight_hours: 1,
      seven_days: 2,
    }
  }
};
