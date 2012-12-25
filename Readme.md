[![Build Status](https://secure.travis-ci.org/code42day/liftie.png)](http://travis-ci.org/code42day/liftie)

#liftie.info

Clean, simple, easy to read, fast lift status for all ski resort.

## How to add your favorite  ```acme.com``` resort

- get status page

    curl http://acme.com/lift/status > test/resort/examples/acme.html

- write parser and parsing test

    lib/resorts/acme.js
    test/resorts/acme.js

```lib/resorts/acme.js``` needs to export the followin object

    {
    	name: 'Acme Ski Resort',
    	url: {
    		host: 'http://acme.com',
    		pathname: '/lift/status'
    	}
    	parse: function(dom) {}
    }

parse function will need to return lift status object which will look something like that

    {
    	'Super Express Lift': 'closed',
    	'Magic Carpet': 'open',
    	'Ultra Gondola': 'hold',
    	'T-Bar': 'scheduled'
    }

- add acme to the resort list in the ```routes/index.js``` module

## TODO

- one page per resort view
- throttle and cache status request to resort page (1 per minute)
- autorefresh page (REST API? web sockets?)
- detect changes and enable change notifications (HTML5 notifications)
- tweet on change support
- add conditions, snow information

## Credits

Icon Font generated with [IconMoon App](http://icomoon.io)
Icon Set: [Broccolidry][1] -- License: [Aribitrary][2]

[1]: http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons
[2]: http://licence.visualidiot.com