[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependencies][deps-image]][deps-url]

# liftie.info

Clean, simple, easy to read, fast ski resort lift status.

## Features

- Displays multiple resorts on a single page.
- Refreshes automatically every 65 seconds.
- Index page displays all supported resorts but it's possible to specify (and bookmark) a subset:

        https://liftie.info?resorts=alpine,palisades

- REST type API returns a status of each resort.

        GET https://liftie.info/api/resort/<resort>

- Status is cached on a server side. Regardless of the number of browser request, server will
retrieve (and parse) the resort pages only once per minute.

## How to run liftie locally

Clone this repo (or your fork)

    git clone git@github.com:pirxpilot/liftie.git && cd liftie

Build client side scripts: `make` will install all external components and trigger component build for you.

    make

Run and profit (liftie binds to port 3000 by default)

    node app

## How to add your favorite  ```acme.com``` resort

### Generate resort scaffolding

The easiest way to start working on a new resort is to run `generate` script.

    $./bin/generate

The script expects the short (one word, dashes OK) identifier of the ski resort, the human readable name and
the URL of the page with lift status. It also asks for resort geographical coordinates.

The following files are generated for a newly added resort:

- resort descriptor `lib/resort/acme/resort.json`,
- parser `lib/resort/acme/index.js`,
- and a test for a parsing function `test/resort/acme.js`.
- lift status page retrieved from internet `test/resort/example/acme.html` 

You can check [this commit][commit-scaffold] to see what you can expect after this page is completed.

Newly added resort is displayed automatically on liftie index page, but it won't have any lifts at this stage.

### Update test

Now you can flesh out the test by adding expected list of ski lifts. See [this commit][commit-test].

```javascript
var expected = {
  'Super Express Lift': 'closed',
  'Magic Carpet': 'open',
  'Ultra Gondola': 'hold',
  'T-Bar': 'scheduled'
};

```

At this point you should probably run the tests: since parsing function is not implemented the test
will fail.

You can run only the specific resort test by running:

   make test TESTS="**/*/acme.js"

### Implement parser

`lib/resorts/acme/index.js` exports the following object


```javascript
module.exports = {
  selector: '.lifts',                // selector for lift information
  parse: {
    filter: node => node.children,   // if present skips nodes for which filter is falsy
    name: '0/1',            // example of a simple path descriptor (second child of the first child)
    status: {               // example of a compound descriptor
      child: '+/1',
      attribute: 'alt',
      regex: /-([a-z]+)$/,
      fn: s => s.slice(0, -3)
    }
  }
};
```

You need to adjust it to find the lift names and their statuses:
- `selector` is a CSS selector that should locate the parent of the `name` and `status` elements
- `parse` needs to contain 2 descriptors - one for `name` and the other for `status`
- `name` and `status` descriptors have the following properties
  - `child` - dash-separated path to the name or status HTML element - `index`, `,`, `..`, `+`, `-` are supported
  - `attribute` - optional - if specified the value of the attribute instead of the contents of the element is used
  - `regex` - optional - if specified the regex is executed and the value of the first matching group is used
  - `fn` - optional - if specified the function is called that can be used to convert the value

If `child` is the only part of the descriptor it can be used directly. In other words:

```
name: {
  child: '0/3'
}
```

is the same as

```
name: '0/3'
```

Check out [this commit][commit-parse] to see the simple parser implemented.

Once parser is ready the tests should succeed.

### Improvements

- [improve weather][commit-noaa] - US resorts can have more precise weather forecast,
if there is a NOAA station nearby: run `bin/fetch-noaa --overwrite <resort-name>` to find it
- [add webcams][commit-webcams] - normally just specifying position would add some webcams
to the liftie page but you can also just add links to the webcams in resort.json descriptor

### Alternative status source

In some cases the lift status info is not directly accessible on the web page to which
liftie should be redirecting its users. For example lift status might be contained in an
invisible iframe or retrieved from a 3rd party server. In such cases specify `dataUrl` in
addition to the `url` entry in the resort descriptor.

Liftie will always use `url` to construct the link to the relevant resort page, and - if
present - it will use `dataUrl` to retrieve the page that is subsequently parsed to obtain
lift information.

### Resort JSON API

In addition to parsing lift status pages Liftie supports resorts that make their lift status
available through REST API. In such cases you need to specify `api` element in resort descriptor.

```json
"api": {
  "host": "http://api.acme.com",
  "pathname": "/api/status"
}
```

If `api` is specified Liftie will retrieve status info through HTTP GET. The resort `parse` function
will receive parsed json instead of the dom tree. Please note that you still need to configure `url` -
it is used on Liftie pages to send users to official resort page. Check out [this implementation](https://github.com/pirxpilot/liftie/blob/master/lib/resorts/pats-peak/index.js), if you are looking for an example.

## Credits

Icon Font generated with [IconMoon App](http://icomoon.io)

- Icon Set: [Broccolidry][1] -- License: [Aribitrary][2]
- Icon Set: [IcoMoon - Free][3] -- License: [CC BY-SA 3.0][4]
- Icon Set: [Dollar][5] by [The Morning Son][6] from The Noun Project -- License: [CC BY-SA 3.0][4]

Forecast Font from [Icon Vault][9] -- SIL Open Font License

Tags CSS (stylus) is a simplified version of [Sliding Tags][7] by [Thibaut Courouble][8] -- License MIT

## License

[3-Clause BSD License][BSD-3-Clause]

[BSD-3-Clause]: https://opensource.org/licenses/BSD-3-Clause

[1]: http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons
[2]: http://licence.visualidiot.com
[3]: http://keyamoon.com/icomoon
[4]: http://creativecommons.org/licenses/by-sa/3.0
[5]: http://thenounproject.com/noun/dollar/#icon-No6883
[6]: http://thenounproject.com/The%20Morning%20Son
[7]: http://www.webinterfacelab.com/snippets/sliding-tags
[8]: http://thibaut.me
[9]: http://forecastfont.iconvau.lt

[commit-scaffold]: https://github.com/pirxpilot/liftie/commit/fe6185890b18d7496ce7090e0f63af1ae824257c
[commit-test]: https://github.com/pirxpilot/liftie/commit/6d2b62823e8a19abd022facf0b18c9d4b755e85f
[commit-parse]: https://github.com/pirxpilot/liftie/commit/8a2baede3d536193b61d787f0333bb53de89efe6
[commit-noaa]: https://github.com/pirxpilot/liftie/commit/da1756d86ce9506a73e2cd274919e54a6f4bcfbf
[commit-webcams]: https://github.com/pirxpilot/liftie/commit/de0951ef963732cea7858d7fd8db07f6ac8592ec

[npm-image]: https://img.shields.io/npm/v/liftie
[npm-url]: https://npmjs.org/package/liftie

[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/liftie/check.yaml?branch=main
[build-url]: https://github.com/pirxpilot/liftie/actions/workflows/check.yaml

[deps-image]: https://img.shields.io/librariesio/release/npm/liftie
[deps-url]: https://libraries.io/npm/liftie
