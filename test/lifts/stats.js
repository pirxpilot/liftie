const test = require('node:test');
const assert = require('node:assert/strict');
const stats = require('../../lib/lifts/stats');

test('stats should report 0 for empty', () => {
  assert.deepEqual(stats({}), {
    open: 0,
    closed: 0,
    hold: 0,
    scheduled: 0,
    percentage: {
      open: 25,
      closed: 25,
      hold: 25,
      scheduled: 25
    }
  });
});

test('stats should count all status', () => {
  const status = {
    'n1': 'open',
    'n2': 'open',
    'n3': 'closed',
    'n4': 'open',
    'n5': 'open',
    'n6': 'scheduled',
    'n7': 'open',
    'n8': 'closed',
    'n9': 'closed',
    'n11': 'hold',
    'n12': 'hold',
    'n13': 'closed',
    'n14': 'scheduled',
    'n17': 'scheduled'
  };
  assert.deepEqual(stats(status), {
    open: 5,
    closed: 4,
    hold: 2,
    scheduled: 3,
    percentage: {
      open: 35.7,
      closed: 28.5,
      hold: 14.2,
      scheduled: 21.4
    }
  });
});

test('stats.summary should calculate summary for empty stats', () => {
  assert.deepEqual(stats.summary([]), {
    open: 0,
    closed: 0,
    hold: 0,
    scheduled: 0,
    percentage: {
      open: 25,
      closed: 25,
      hold: 25,
      scheduled: 25
    }
  });
});

test('stats.summary should calculate summary for array of stats', () => {
  assert.deepEqual(stats.summary([{
      open: 5,
      closed: 4,
      hold: 2,
      scheduled: 3
    },
    {
      open: 10,
      closed: 1
    },
    null,
    {},
    {
      open: 1,
      closed: 2,
      hold: 3,
      scheduled: 4
    }
  ]), {
    open: 16,
    closed: 7,
    hold: 5,
    scheduled: 7,
    percentage: {
      open: 45.7,
      closed: 20,
      hold: 14.2,
      scheduled: 20
    }
  });
});
