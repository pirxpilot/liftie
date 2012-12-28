[![Build Status](https://secure.travis-ci.org/code42day/liftie.png)](http://travis-ci.org/code42day/liftie)

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
      }
      parse: function(dom) {}
    }

Parse function needs to return a lift status object, which will look something like that:

    {
      'Super Express Lift': 'closed',
      'Magic Carpet': 'open',
      'Ultra Gondola': 'hold',
      'T-Bar': 'scheduled'
    }

Once all tests are passing add acme to the resort list in the ```routes/index.js``` module.

## Credits

Icon Font generated with [IconMoon App](http://icomoon.io)
Icon Set: [Broccolidry][1] -- License: [Aribitrary][2]

## License

BSD

## TODO

- config UI - add/remove resorts on the index page
- refresh indicators - page refreshes approx. once per minute but it's hard to notice
- refresh on change only (web sockets?)
- detect changes and enable change notifications (HTML5 notifications)
- tweet on change support
- add conditions, snow information, resort twitter feeds

[1]: http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons
[2]: http://licence.visualidiot.com