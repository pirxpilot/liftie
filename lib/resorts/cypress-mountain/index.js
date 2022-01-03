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
    base: '[id^=conditions_area_] li:nth-child(5) .js-measurement[data-metric]',
    season: '[id^=conditions_area_] li:nth-child(4) .js-measurement[data-metric]',
    twentyfour_hours: '[id^=conditions_area_] li:nth-child(1) .js-measurement[data-metric]',
    fortyeight_hours: '[id^=conditions_area_] li:nth-child(2) .js-measurement[data-metric]',
    seven_days: '[id^=conditions_area_] li:nth-child(3) .js-measurement[data-metric]',
  }
};
