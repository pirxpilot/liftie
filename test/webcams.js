import test from 'node:test';
import { Agent, MockAgent, setGlobalDispatcher } from 'undici';
import webcams from '../lib/webcams.js';
import webcamsJson from './webcams.json' with { type: 'json' };

test('webcams should return no webcams if location is missing', (t, done) => {
  webcams({}, (err, webcams) => {
    t.assert.ifError(err);
    t.assert.ok(!webcams);
    done();
  });
});

test('webcams should return webcams', async t => {
  const mockAgent = new MockAgent();

  t.before(() => {
    process.env.WEBCAMS_API_KEY = 'TEST_KEY';
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
    mockAgent
      .get('https://api.windy.com')
      .intercept({
        path: '/webcams/api/v3/webcams?limit=5&nearby=46.54,7.98,5&include=images,urls'
      })
      .reply(200, webcamsJson);
  });

  t.after(async () => {
    delete process.env.WEBCAMS_API_KEY;
    await mockAgent.close();
    setGlobalDispatcher(new Agent());
  });

  await t.test('valid location', (t, done) => {
    webcams(
      {
        counter: 1,
        ll: [7.98, 46.54] // from API examples https://windy.com/webcams/1697038975'
      },
      (err, webcams) => {
        t.assert.ifError(err);
        t.assert.ok(webcams);
        t.assert.ok(webcams.length > 0);

        const webcam = webcams[0];

        t.assert.equal(webcam.name, 'Fieschertal: Jungfraujoch');
        t.assert.equal(webcam.source, 'https://windy.com/webcams/1697038975');
        t.assert.match(webcam.image, /^https:\/\/images-webcams.windy.com\//);
        t.assert.match(webcam.notice, /^Webcams provided by\n<a href="https:\/\/www.windy.com\/"/);

        done();
      }
    );
  });
});
