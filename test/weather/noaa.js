import test from 'node:test';
import { Agent, MockAgent, setGlobalDispatcher } from 'undici';
import noaa from '../../lib/weather/noaa.js';
import responseJson from './noaa.json' with { type: 'json' };

test('noaa should return empty forecast if location is missing', (t, done) => {
  noaa(
    {
      ll: [0, 0]
    },
    (err, forecast) => {
      t.assert.ifError(err);
      t.assert.ok(!forecast);
      done();
    }
  );
});

test('noaa should return forecast for valid location', async t => {
  const mockAgent = new MockAgent();
  t.before(() => {
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
    mockAgent
      .get('https://api.weather.gov')
      .intercept({
        path: '/gridpoints/BTV/107,21/forecast'
      })
      .reply(200, responseJson);
  });

  t.after(async () => {
    await mockAgent.close();
    setGlobalDispatcher(new Agent());
  });

  await t.test('Killington, VT', (t, done) => {
    noaa(
      {
        noaa: 'BTV/107,21',
        ll: [-72.7933, 43.6647]
      },
      (err, forecast) => {
        t.assert.ifError(err);
        t.assert.ok(forecast);
        t.assert.deepEqual(forecast.icon, ['icon-cloud', 'icon-sunny']);
        t.assert.equal(forecast.date, '2019-01-02');
        t.assert.equal(forecast.text, 'Partly sunny, with a high near 25. East wind around 3 mph.');
        t.assert.equal(forecast.conditions, 'Partly Sunny');
        t.assert.equal(typeof forecast.temperature, 'object');
        t.assert.equal(forecast.temperature.max, 25);
        done();
      }
    );
  });
});
