var Replay = require('@pirxpilot/replay');
Replay.fixtures = __dirname;

// default replay mode is 'replay'
// change it by setting REPLAY environment variable:
// REPLAY=record make

Replay.passThrough('api.wunderground.com');
Replay.passThrough('api.twitter.com');
Replay.passThrough('opensnow.com');
