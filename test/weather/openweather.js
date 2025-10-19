import test from 'node:test';
import { Agent, MockAgent, setGlobalDispatcher } from 'undici';
import openweather from '../../lib/weather/openweather.js';
import responseJson from './openweather.json' with { type: 'json' };

test('openweather should return forecast', async t => {
  const mockAgent = new MockAgent();
  t.before(() => {
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
    mockAgent
      .get('https://api.openweathermap.org')
      .intercept({
        path: '/data/2.5/forecast?lon=-72.7933&lat=43.6647&appid=testkey'
      })
      .reply(200, responseJson);
  });
  t.after(async () => {
    await mockAgent.close();
    setGlobalDispatcher(new Agent());
  });

  await t.test('Killington, VT', (t, done) => {
    openweather(
      {
        ll: [-72.7933, 43.6647]
      },
      'testkey',
      (err, forecast) => {
        t.assert.ifError(err);
        t.assert.ok(forecast);
        t.assert.deepEqual(forecast.icon, ['basenone', 'icon-moon']);
        t.assert.equal(forecast.date, '2019-01-05');
        t.assert.equal(forecast.text, 'clear sky');
        t.assert.equal(forecast.conditions, 'Clear');
        t.assert.equal(forecast.snow, 0);
        t.assert.equal(typeof forecast.temperature, 'object');
        t.assert.equal(forecast.temperature.max, 26);
        t.assert.equal(forecast.temperature.min, 26);
        t.assert.deepEqual(forecast.notice, {
          href: 'https://openweathermap.org/city/5234158',
          img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg',
          width: 160,
          site: 'openweathermap.org'
        });
        done();
      }
    );
  });
});
