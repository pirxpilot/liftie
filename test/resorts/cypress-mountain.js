const lifts = require('../lifts');
const conditions = require('../conditions');

lifts('cypress-mountain', 'html', {
  'Eagle Express': 'open',
  'Lions Express': 'open',
  'Raven Ridge': 'open',
  'Easy Rider': 'open',
  'Sky Chair': 'open',
  'Midway Chair': 'open',
});

conditions('cypress-mountain', 'html', {
  'base': '245',
  'season': '386',
  'twentyfour_hours': '55',
  'fortyeight_hours': '55',
  'seven_days': '78'
});