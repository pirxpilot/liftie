/* global options, URL, caches, Promise, fetch, self */
/* jslint bitwise: true */

var CURRENT_CACHES = {
  cf: 'liftie-cache-first-' + options.version,
  nf: 'liftie-network-first-' + options.version
};

// keeps the handlers for each host that we deal with this service worker
var HOSTNAME_2_CACHENAME = Object.create(null);

// helps us decide what we are going to do with the URL
// if falsy value is returned we are letting browser handle the request
// if cache name is returned we follow cache-then-network strategy
function getCacheName(url) {
  var handler = HOSTNAME_2_CACHENAME[url.hostname];
  if (handler) {
    // if handler is the function call it, otherwise return it as a cachename
    return (typeof handler === 'function') ? handler(url) : handler;
  }
}

// register liftie hosts
HOSTNAME_2_CACHENAME[new URL(options.liftieHost).hostname] = liftieHostHandler;
HOSTNAME_2_CACHENAME['cdn.polyfill.io'] = CURRENT_CACHES.cf;

function liftieHostHandler(url) {
  if (url.pathname.startsWith('/api/')) {
    // let app handle API failures
    return;
  }

  if (options.prefetch.includes(url.pathname)) {
    return CURRENT_CACHES.cf;
  }

  // some other things that we can try in cache first
  if (url.pathname.startsWith('/apple-touch-icon')
    || url.pathname.startsWith('/img/')
    || url.pathname === '/favicon.ico') {
    return CURRENT_CACHES.cf;
  }

  // for everything else try network first strategy
  return CURRENT_CACHES.nf;
}

self.addEventListener('install', function(event) {
  var urlsToPrefetch = options.prefetch;

  console.log('Handling install event. Resources to pre-fetch:', urlsToPrefetch);

  event.waitUntil(
    caches
      .open(CURRENT_CACHES.cf)
      .then(function(cache) {
        return cache
          .addAll(urlsToPrefetch)
          .then(function() {
            console.log('All resources have been fetched and cached.');
            return self.skipWaiting();
          });
      })
      .catch(function(error) {
        console.error('Pre-fetching failed:', error);
      })
  );
});

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES)
  .reduce(function(names, key) {
    names[CURRENT_CACHES[key]] = true;
    return names;
  }, Object.create(null));

  event.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!expectedCacheNames[cacheName]) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
      .then(self.clients.claim());
    })
  );
});


function addToCache(request, response, url, cacheName) {

  // check if it's OK to cache response
  // we only cache 2xx responses, opaque responses don't have status but we can check their type
  function okToCache() {
    if (response.status >= 200 && response.status < 300) {
      // standard response OK
      return true;
    }
    // console.log('Not 200 response', response.type, url.href);
    if (cacheName === CURRENT_CACHES.cf) {
      // .js and .css files should not be opaque - too risky to cache invalid responses
      return !(url.pathname.endsWith('js') || url.pathname.endsWith('css'));
    }

    // opaque response - NOT a redirect
    return response.type === 'opaque';
  }

  if (!okToCache()) {
    return response;
  }
  var responseToCache = response.clone();
  return caches.open(cacheName).then(function(cache) {
    // console.log('Caching the response to', request.url);
    cache.put(request, responseToCache);
  });
}

function cacheFirst(event, url, cacheName) {
  return caches
  .match(event.request)
  .then(function(response) {
    var request = event.request;

    if (response) {
      // console.log('Found response in cache:', response);
      return response;
    }

    // console.log('No response found in cache. About to fetch from network...');
    return fetch(request).then(function(response) {
      // console.log('Response from network is:', response);
      addToCache(event.request, response, url, cacheName);
      // console.log('Not caching the response to', event.request.url);
      return response;
  })
  .catch(function(error) {
      console.error('Fetching failed:', error);
      throw error;
    });
  });
}

function networkFirst(event, url, cacheName) {
  return fetch(event.request)
  .then(function(response) {
    addToCache(event.request, response, url, cacheName);
    return response;
  })
  .catch(function(error) {
    console.error('Fetching failed:', error);
    return caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        throw error;
      }
    });
  });
}

var FETCH_HANDLERS = {};

FETCH_HANDLERS[CURRENT_CACHES.cf] = cacheFirst;
FETCH_HANDLERS[CURRENT_CACHES.nf] = networkFirst;

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    // only handle GET requests
    return;
  }

  var url = new URL(event.request.url);

  console.log('Looking at...', url.host, url.pathname);

  var cacheName = getCacheName(url);

  console.log('Cache name is', cacheName);

  if (!cacheName) {
    // let browser handle this one
    return;
  }

  var handler = FETCH_HANDLERS[cacheName];

  // handle all other cases
  event.respondWith(handler(event, url, cacheName));
});
