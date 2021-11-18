const lifts = require('../lifts');

lifts('devils-head', 'html', {
  'Sunkid (Short)': 'open',
  'Sunkid (Long)': 'scheduled',
  '00': 'scheduled',
  '000**': 'closed',
  '1 Quicksilver Express': 'open',
  '3 Glacial Express': 'open',
  '4': 'closed',
  '4 ¼**': 'closed'
});
