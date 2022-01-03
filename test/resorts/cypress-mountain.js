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
  'base': '230',
  'twelve_hours': '22',
  'twentyfour_hours': '60',
  'fortyeight_hours': '62',
  'seven_days': '65'
});