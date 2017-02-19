[![Build Status](https://img.shields.io/travis/pirxpilot/liftie.svg)](http://travis-ci.org/pirxpilot/liftie)
[![Dependency Status](https://img.shields.io/gemnasium/pirxpilot/liftie.svg)](https://gemnasium.com/pirxpilot/liftie)
[![NPM version](https://img.shields.io/npm/v/liftie.svg)](http://badge.fury.io/js/liftie)
[![Code Climate](https://img.shields.io/codeclimate/github/pirxpilot/liftie.svg)](https://codeclimate.com/github/pirxpilot/liftie)

#liftie.info

Clean, simple, easy to read, fast ski resort lift status.

## Features

- Displays multiple resorts on a single page.
- Refreshes automatically every 65 seconds.
- Index page displays all supported resorts but it's possible to specify (and bookmark) a subset:

        http://liftie.info?resorts=alpine,squaw

- REST type API returns a status of each resort.

        GET http://liftie.info/api/resort/<resort>

- Status is cached on a server side. Regardless of the number of browser request, server will
retrieve (and parse) the resort pages only once per minute.

## How to run liftie locally

Clone this repo (or your fork)

    git clone git@github.com:pirxpilot/liftie.git && cd liftie

Install dependencies with npm:

    npm install

Build client side scripts: liftie is using [component](https://github.com/component/component) -
make will install all external components and trigger component build for you.

    make

Run and profit (liftie binds to port 3000 by default)

    node app

## How to add your favorite  ```acme.com``` resort

The easiest way to start working on a new resort is to run `generate` script.

    $./bin/generate

    Short name of the resort [acme]:
    Human readable name of the resort [Acme Ski]:
    URL of the page with lift status [http://acme.com/lift/status]:

    Generating files for Acme Ski
    Generating lib/resorts/acme.js...
    Generating test/resorts/acme.js...
    Retrieving http://acme.com/lift/status to test/resorts/example/acme.html...

The script expects the short (one word) identifier of the ski resort, the human readable name and
the URL of the page with lift status. It generates resort module `lib/resort/acme.js` and a test for
a parsing function `test/resort/acme.js`. It also retrieves the lift status page and puts it in
`test/resort/example` directory.

At this point you should probably run the tests: since parsing function is not implemented the test
will fail.

`lib/resorts/acme.js` exports the following object

    {
      name: 'Acme Ski Resort',
      url: {
        host: 'http://acme.com',
        pathname: '/lift/status'
      },
      tags: ['state', 'area'], // optional
      parse: function(dom) {}
    }

Parse function needs to return a lift status object, which will look something like that:

    {
      'Super Express Lift': 'closed',
      'Magic Carpet': 'open',
      'Ultra Gondola': 'hold',
      'T-Bar': 'scheduled'
    }

Newly added resort is displayed automatically on liftie index page.

### Using resort API

In addition to parsing lift status pages Liftie supports resorts that make their lift status
available through REST API. In such cases you need to specify `api` element in resort descriptor.

    {
      name: 'Acme Ski Resort',
      url: {
        host: 'http://acme.com',
        pathname: '/lift/status'
      },
      api: {
        host: 'http://api.acme.com',
        pathname: '/api/status'
      },
      parse: function(json) {}
    }

If `api` is specified Liftie will retrieve status info through HTTP GET. The resort `parse` function
will receive parsed json instead of the dom tree. Please note that you still need to configure `url` -
it is used on Liftie pages to send users to official resort page. Check out [Steamboat](https://github.com/pirxpilot/liftie/blob/master/lib/resorts/steamboat.js) implementation, if you are looking for an example.

## Credits

Icon Font generated with [IconMoon App](http://icomoon.io)

- Icon Set: [Broccolidry][1] -- License: [Aribitrary][2]
- Icon Set: [IcoMoon - Free][3] -- License: [CC BY-SA 3.0][4]
- Icon Set: [Dollar][5] by [The Morning Son][6] from The Noun Project -- License: [CC BY-SA 3.0][4]

Forecast Font from [Icon Vault][9] -- SIL Open Font License

Tags CSS (stylus) is a simplified version of [Sliding Tags][7] by [Thibaut Courouble][8] -- License MIT

## License

BSD

## TODO

- refresh on change only (web sockets?)
- detect changes and enable change notifications (HTML5 notifications)
- tweet on change support

[1]: http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons
[2]: http://licence.visualidiot.com
[3]: http://keyamoon.com/icomoon
[4]: http://creativecommons.org/licenses/by-sa/3.0
[5]: http://thenounproject.com/noun/dollar/#icon-No6883
[6]: http://thenounproject.com/The%20Morning%20Son
[7]: http://www.webinterfacelab.com/snippets/sliding-tags
[8]: http://thibaut.me
[9]: http://forecastfont.iconvau.lt
