
3.15.5 / 2017-03-09
===================

 * update some deprecated dependencies

3.15.4 / 2017-02-24
===================

 * transfer repo to pirxpilot

3.15.2 / 2017-02-13
===================

 * change email to contact@liftie.info

3.15.1 / 2017-02-08
===================

 * upgrade connect-gzip-static to support brotli
 * upgrade connect-cachify-static to add `immutable` support

3.15.0 / 2017-02-04
===================

 * fix ellipsis styling
 * add St Anton Am Arlberg (thanks @srocki)

3.14.0 / 2017-01-22
===================

 * fix parkcity lift status
 * add support for POST rest requests

3.13.9 / 2017-01-10
===================

 * fix liftie widget

3.13.8 / 2016-12-17
===================

 * fix solitude resort
 * fix mthigh resort
 * fix chinapeak resort

3.13.7 / 2016-12-17
===================

 * fixes for intrawest resorts
 * stop decoding entities in resort parsers
 * make domutil.collect decode HTML entities in names

3.13.6 / 2016-12-15
===================

 * fix monarch resort
 * fix big-white resort
 * fix sun-peaks resort
 * ignore lifts with undefined name or status

3.13.5 / 2016-12-14
===================

 * fix Sierra at Tahoe status
 * add supports for >140 tweets

3.13.4 / 2016-12-10
===================

 * fix killington resort and webcams URLs

3.13.3 / 2016-12-02
===================

 * properly detect weather hold condition in Mammoth Lakes

3.13.2 / 2016-11-27
===================

 * remove body-parser middleware
 * upgrade express 3.x -> 4.x

3.13.1 / 2016-11-13
===================

 * prevent proxy caching for API calls and sw script
 * fix default SITE_URL value

3.13.0 / 2016-11-13
===================

 * update SunValley resort
 * trim lift names in domutils.collect
 * add basic service worker script
 * add hi-res apple icon
 * add web app manifest
 * Revert "use fastclick to help with iOS responsiveness"

3.12.5 / 2016-11-12
===================

 * fix Silver Star resort
 * use fastclick to help with iOS responsiveness
 * update user agent string for Liftie crawler
 * add fetch script used to retrieve HTML examples

3.12.4 / 2016-11-07
===================

 * fix Gunstock resort
 * fix Cranmore resort
 * fix Cannon resort

3.12.3 / 2016-11-06
===================

 * remove 'npm install' script
 * use clean-css to minimize stylesheets
 * use modern font-style syntax
 * replace stylus nib with postcss prefixer

3.12.2 / 2016-11-06
===================

 * hide webcams tile if there are no webcams to display
 * upgrade webcams.travel API

3.12.1 / 2016-11-06
===================

 * update opening dates for 2016

3.12.0 / 2016-11-05
===================

 * add Mammoth opening day
 * add June Mountain resort
 * fix generate script after lodash upgrade

3.11.0 / 2016-11-05
===================

 * update invalid twitter handles
 * fix stowe resort
 * switch from npm to yarn

3.10.4 / 2016-04-10
===================

 * fix wund logo URL to use TLS

3.10.3 / 2016-04-07
===================

 * serve webcam images over https

3.10.2 / 2016-03-24
===================

 * fix invalid height of embedded widgets when using https

3.10.0 / 2016-02-26
===================

 * add La Rosiere - France

3.9.2 / 2016-02-21
==================

 * fix ratings display in older browsers

3.9.0 / 2016-02-20
==================

 * use global fetch instead of superagent

3.8.5 / 2016-02-03
==================

 * fix Crystal Mountain

3.8.4 / 2015-11-28
==================

 * remove Canyons as its own resort (merged with Park City)
 * fix Park City - it joined the Vail mothership
 * fix Winterplace
 * fix BrianHead

3.8.3 / 2015-11-27
==================

 * fix Crested Butte
 * fix Sugarbush
 * fix Wildcat url
 * fix Mt Bachelor
 * mocha 2.1.0 → 2.3.4
 * should 4.6.3 → 7.1.1

3.8.2 / 2015-11-25
==================

 * fix Peak resorts
 * fix Pico
 * fix Mt. Rose
 * fix Loveland
 * fix Alta
 * fix Aspen

3.8.1 / 2015-11-23
==================

 * uglify-js 2.4.15 → 2.6.1

3.8.0 / 2015-11-23
==================

 * jade 1.9.1 → 1.11.0
 * superagent 0.18.2 → 1.4.0
 * fix template issues on sitemap
 * fix template issues on stats page
 * switch to browserify build
 * remove component related build tools

3.7.2 / 2015-06-17
==================

 * use SPDX license in package.json
 * prompt 0.2.13 → 0.2.14

3.7.0 / 2015-02-08
==================

 * add /api/meta end point for listing all resorts
 * replace in-house entities module with external lib
 * add verbier resort
 * add infosnow module for swiss resorts
 * upgrade qs 1.2.1 -> 1.2.2
 * commander 2.3.0 → 2.6.0
 * should 2.1.1 → 4.6.3
 * mocha 1.21.4 → 2.1.0
 * debug 0.8.1 → 2.1.1
 * express 3.16.3 → 3.19.2
 * connect-gzip-static 0.3.1 → 1.0.0
 * connect-cachify-static 0.2.0 → 1.0.0
 * jade 1.5.0 → 1.9.1
 * fix laplagne
 * fix laplagne

3.6.19 / 2015-02-01
==================

 * fix parser for Crans Montana
 * updated url for french resorts
 * fix whereshouldiski links

3.6.18 / 2015-01-31
==================

 * hack: work around for invalid opensnow API response

3.6.17 / 2015-01-30
==================

 * fix Crans-Montana location
 * add `Alps` tag
 * fix Kitzbuehel link

3.6.16 / 2015-01-30
==================

 * increase lift container max-height
 * add European Resorts: courchevel, laplagne, lesmenuires, megeve, meribel
 * fix generate script
 * fix npm-shrinkwrap again

3.6.15 / 2014-11-23
==================

 * update resort URL for Canyons
 * fix Kirkwood tests
 * trim resort names in vail parser

3.6.14 / 2014-11-20
==================

 * temporarily switch off canyons and kirkwood tests
 * switch Canyouns and Kirkwood to vail parser

3.6.13 / 2014-11-19
==================

 * supress About text when in iframe
 * fix footer

3.6.12 / 2014-11-19
==================

 * fix Bretton Woods for the new season
 * fix Hunter for new season

3.6.11 / 2014-11-18
==================

 * fix Mount Hood for the new season
 * fix Brian Head for the new season
 * fix Snowshoe Mountain for new season
 * intrawest resorts: switch to common parser

3.6.10 / 2014-11-18
==================

 * fix Heavenly opening day
 * update Beaver Creek for the new season
 * update Northstar for new season
 * update vail parser

3.6.8 / 2014-11-09
==================

 * fix Alpine/Squaw for new season

3.6.7 / 2014-11-08
==================

 * fix twitter account for Brighton Resort
 * stop checking SSL certs

3.6.6 / 2014-11-08
==================

 * fix Brighton for new season
 * fix Snowbasin for new season

3.6.5 / 2014-11-07
==================

 * yet another change to opensnow API

3.6.4 / 2014-11-06
==================

 * fix Mt. Tremblant for new season
 * fix Hoodoo for new season
 * fix Mount Snow for new season

3.6.3 / 2014-11-06
==================

 * fix Crystal Mountain for new season
 * fix Bromley Mountain for new season
 * fix Red Mountain for new season
 * fix Boreal for new season

3.6.2 / 2014-11-05
==================

 * fix Loon for new season
 * fix Jackson Hole for new season
 * fix Mammoth Lakes for new season
 * add typical colors to be coerced as status

3.6.1 / 2014-11-05
==================

 * fix opensnow API after updrade to 1.0
 * use new official twitter account for Squaw & Alpine

3.6.0 / 2014-08-09
==================

 * remove deprecated app.configure
 * remove deprecated jade doctype
 * update qs and other libraries

3.5.16 / 2014-07-21
==================

 * update code42day/tweet-html to 1.0.0

3.5.15 / 2014-07-15
==================

 * update components to remove moment dependency
 * link to about page and mailto: in footer
 * no follow deal links
 * no follow footer links
 * shieldify badges in Readme

3.5.14 / 2014-05-16
==================

 * use make-component-shrinkwrap
 * use make-jshint

3.5.13 / 2014-05-16
==================

 * use component-shrinkwrap to install components
 * update component and component-shrinkwrap
 * fix Alta twitter handle

3.5.12 / 2014-02-25
==================

 * temporary fix for github redirects

3.5.11 / 2014-02-25
==================

 * fix Boreal resort
 * fix Big Sky resort

3.5.10 / 2014-02-25
==================

 * fix webcams: killington, pico

3.5.9 / 2014-02-18
==================

 * fix Hoodoo parser

3.5.8 / 2014-02-18
==================

 * fix Cataloochee parser
 * fix Brian Head parser
 * swich King Pine resort to XML parser

3.5.7 / 2014-01-26
==================

 * fix Hoodoo lift status
 * fix Mount Snow lift status
 * webcams for Killington and Pico

3.5.6 / 2014-01-03
==================

 * fix Snow Valley resort
 * fix Jackson Hole resort
 * fix Sunday River resort

3.5.5 / 2014-01-03
==================

 * upgrade tweet-html

3.5.4 / 2013-12-29
==================

 * stop using furkot-trip component
 * add generating `plan trips` links directly to jade

3.5.3 / 2013-12-23
==================

 * remove date parameter from Where Should I Ski links
 * generate static links to referenced services
 * reduce size of main page by removing hidden panels

3.5.2 / 2013-12-21
==================

 * fix Jiminy Peak resort
 * migrate to tweet-html component
 * add Burke resort

3.5.1 / 2013-12-18
==================

 * add Ischgl resort

3.5.0 / 2013-12-17
==================

 * set size and style of the video
 * hack: escape apos in the camera titles
 * add swipe and pager components for webcams
 * allow for multiple webcams to be returned by the API

3.4.11 / 2013-12-13
==================

 * fix Alpine Meadows resort
 * fix Cataloochee resort
 * update Mount Rose resort

3.4.10 / 2013-12-13
==================

 * update Bolton Valley opening date
 * add Cranmore resort
 * widget: send height on window resize

3.4.9 / 2013-12-12
==================

 * add multicolumn widget
 * add naked widget (no padding, transparent background)

3.4.8 / 2013-12-11
==================

 * switch to universal analytics

3.4.7 / 2013-12-10
==================

 * fix CSS syntax errors
 * add vine videos in twitter feed
 * improve embedding youtube videos

3.4.6 / 2013-12-08
==================

 * add Mount Sunapee resort
 * update Smuggler's Notch status indication

3.4.5 / 2013-12-07
==================

 * display vimeo videos in twitter feed
 * update Diamond Peak resort for the new season

3.4.4 / 2013-12-06
==================

 * liftie link is now rendered outside of the widget iframe
 * add Ragged Mountain resort
 * add Sunshine Village resort
 * add Mt. Spokane resort

3.4.3 / 2013-12-05
==================

 * make resort link in a widget external
 * add script that allows to embed liftie widgets
 * add widget support for iframe resizing
 * use stylus-font-face to properly define and embed fonts
 * all fonts formats are kept as external files
 * updated stylus and nib

3.4.2 / 2013-12-03
==================

 * add snow forecast to weather display
 * use common limiter API

3.4.1 / 2013-12-02
==================

 * add weather forecast from OpenSnow
 * use forecast font from icon vault instead of weather icon set from wunderground

3.4.0 / 2013-12-02
==================

 * add link to 'Embed Liftie' in the footer
 * display powder rating from Where Should I Ski

3.3.19 / 2013-11-30 
==================

 * display youtube videos in twitter feed
 * add Caberfae Peaks resort
 * fix Pats Peak - and other prism resorts

3.3.18 / 2013-11-28 
==================

 * fix Mad River Glen; add opening day
 * fix `Object.keys called on non-object` error in stats calculation

3.3.17 / 2013-11-27 
==================

 * fix Devil's Head
 * fix Big White for the new season

3.3.16 / 2013-11-22 
==================

 * adjust opening days for attitash, smuggs, and wildcat

3.3.15 / 2013-11-20 
==================

 * fix Snowmass for the new season
 * remove ugly outline
 * add Kitzbühel resort
 * add Sun Peaks resort

3.3.14 / 2013-11-19 
==================

 * add 'application-name' to make IE happy
 * disable onclick wait on touch enabled platforms
 * make external `social` links to open a new window/tab
 * external link to Furkot trips

3.3.13 / 2013-11-19 
==================

 * update Whistler Blackcomb opening date

3.3.12 / 2013-11-18 
==================

 * remove extra footer padding
 * support instagram photos in twitter feeds

3.3.11 / 2013-11-17 
==================

 * adjust opening date for Crystal Mtn
 * fix Crystal Mountain parser

3.3.10 / 2013-11-17 
==================

 * Big White is open
 * Stevens Pass is open
 * keyboard shortcuts
 * add /confused route
 * add /closed page
 * fix Brian Head parser
 * simplify routes module
 * switch to non-gradient background
 * header/footer padding fix

3.3.9 / 2013-11-16 
==================

 * shorten Schweitzer resorn name
 * remove ellipsis - breaks Firefox

3.3.8 / 2013-11-16 
==================

 * check openning once an hour for active resorts

3.3.7 / 2013-11-16 
==================

 * ask for more tweets - filter later
 * fix header margin nad padding
 * update opening day for Snowmass
 * update opening day for Aspen Mountain
 * switch to XML parsing for Aspen Mountain

3.3.6 / 2013-11-15 
==================

 * fix Okemo
 * add Gore Mountain resort

3.3.5 / 2013-11-14 
==================

 * adjust Whiteface opening day
 * fix Big Sky resort
 * add Shawnee Peak resort

3.3.4 / 2013-11-14 
==================

 * add Tahoe Donner resort
 * add Hoodoo resort
 * add Crystal Mountain resort
 * add Bolton Valley resort
 * add Silver Star resort
 * add Shawnee Mountain resort
 * add Red Mountain resort
 * add Red Lodge Mountain resort
 * add King Pine resort
 * add Pats Peak resort
 * add Devils Head resort
 * add Cataloochee resort
 * enhance generate script
 * parse entities in status before coercing

3.3.3 / 2013-11-13 
==================

 * add Bromley Mountain resort
 * add 49 Degrees North resort
 * Webcam image larger and up-to-date

3.3.2 / 2013-11-13 
==================

 * add Alyeska resort
 * change bin/generate: create resort parser skeleton from json descriptor

3.3.1 / 2013-11-12 
==================

 * stop displaying deals in single resort header
 * move deals to a separate panel
 * add more detailed listing of discounted lift tickets

3.3.0 / 2013-11-12 
==================

 * change okemo opening date
 * add support for the client side snow conditions plugin

3.2.4 / 2013-11-11 
==================

 * updated opening dates
 * add geo coordinates of Hochfuegen resort

3.2.3 / 2013-11-09 
==================

 * add Taos Ski Valley
 * add Monarch Mountain
 * extract common XML parsing code to tools/rixml
 * modernize generate script

3.2.2 / 2013-11-08 
==================

 * fix long lift names overflow
 * fix Smuggler's Notch for the new season
 * add lift stats fpr all resorts and per tag

3.2.1 / 2013-11-07 
==================

 * add section borders in extras panel
 * rewrite tweet entity parsing to reduce code duplication
 * rewrite resort parsing using new domutil

3.2.0 / 2013-11-06 
==================

 * add webcam plugin that queries webcams.travel
 * update Twitter handles
 * fix Twitter date format string when parsing
 * renderPlugins is now responsible for showing/hiding plugin section
 * refactor client plugins: pass specific section to client plugin
 * Change '.twitter-timeline' to '.twitter'
 * Bretton Woods opening date

3.1.1 / 2013-11-06 
==================

 * query Wunderground less often
 * Special handling of Loveland Chair 2
 * add Twitter follow button
 * add more twitter handles

3.1.0 / 2013-11-05 
==================

 * add list of lifts to the page description of a single resort page
 * stop qurying lift status immediately after an error
 * fixed opening date test after certain time
 * add twitter plugin
 * add twitter handles to resort data
 * add weather plugin using wunderground API
 * display resort extras in a second column
 * disable closing of single resort
 * add client side plugin support
 * extract common dom related methods

3.0.4 / 2013-11-02 
==================

 * fix problem with host that require Accept header

3.0.3 / 2013-11-01 
==================

 * add Pico Mountain
 * rewrite opening as a liftie plugin

3.0.2 / 2013-10-31 
==================

 * fix About page

3.0.1 / 2013-10-31 
==================

 * add Mad River Glen
 * add Peak Resorts tag

3.0.0 / 2013-10-30 
==================

 * add `absent` listing all resorts that should but don't have lift status
 * updated jshint: 2.0 -> 2.3
 * add Arapahoe Basin
 * add Geo position of Beaver Creek & Kirkwood
 * add support for lift ticket deals plugin
 * add plugins for fetching data and loaders for loading/finding resorts
 * change data format in resort API from respose.status to response.lifts.status

2.1.1 / 2013-10-30 
==================

 * add Vail / Epic tag
 * fix Mt Rose for the new season, again

2.1.0 / 2013-10-28 
==================

 * generate sitemap with all resorts
 * add basic support for resorts without lift status or official website

2.0.4 / 2013-10-27 
==================

 * add `Plan trip to resort` shortcut

2.0.3 / 2013-10-26 
==================

 * fix Killington for the new season
 * add widget jade and style
 * add explicit text to footer

2.0.2 / 2013-10-20 
==================

 * fix Schweitzer for the new season
 * fix Kirkwood for the new season
 * fix Jiminy Peak for the new season
 * fix Mt Rose status for new season
 * fix Crested Butte for the new season
 * fix Copper for the new season
 * fix Big Sky for the new season
 * fix Beaver Creek for the new season
 * fix Soelden for the new season
 * fix Brian Head for the new season
 * Removed Moonlight Basin after it merged with Big Sky
 * Page description more detailed and more specific

2.0.1 / 2013-10-20 
==================

 * fix hide opening dates when they passed without server restart
 * fix empty responses problem
 * fix requery after error

2.0.0 / 2013-10-20 
==================

 * add resort opening dates
 * fix Steve's pass status for new season
 * fix SugarLoaf status for new season
 * fix invalid og:image property
 * switch to 2 file (json descriptor + js parser) format to describe resorts

1.13.2 / 2013-10-19 
==================

 * change listen message
 * generate self-executing script
 * pin component versions

0.13.1 / 2013-09-21 
==================

 * Update htmlparser2 2.x -> 3.2
 * Replace cheerio-select with CSSselect
 * switch to common select method for all parsing

1.13.0 / 2013-09-20 
==================

 * update component 0.17 -> 0.17.6
 * express 3.3.7 -> 3.4
 * connect-gzip-static middleware
 * Generate gzipped files for gzip-static
 * replace `connect-cachify` with `connect-cachify-static`

1.12.0 / 2013-08-31 
==================

 * Update dependencies
 * npmignore test directory
 * Add npm version from badge.fury.io

1.11.14 / 2013-04-16 
==================

 * add apple-mobile-web-app-capable declaration
 * Add Gemnasium dependency status

1.11.13 / 2013-03-12 
==================

 * Fix Mt. Bachelor status
 * Winterplace

1.11.12 / 2013-03-06 
==================

 * safety -> hold for Kirkwood
 * Sugar Bowl parsing fix

1.11.11 / 2013-03-05 
==================

 * Fix for latest Alpine Meadows updates

1.11.10 / 2013-02-18 
==================

 * Fix: displaying sugarloaf on-hold lifts

1.11.9 / 2013-02-18 
==================

 * Snowshoe Mountain

1.11.8 / 2013-02-17 
==================

 * Cannon

1.11.7 / 2013-02-13 
==================

 * Schweitzer Mountain

1.11.6 / 2013-02-08 
==================

 * Hunter Mountain
 * Windham Mountain

1.11.5 / 2013-02-07 
==================

 * Bretton Woods

1.11.4 / 2013-02-06 
==================

 * Brighton Resort UT

1.11.3 / 2013-02-05 
==================

 * Fix Squaw after webpage upates

1.11.2 / 2013-02-04 
==================

 * Revert "Use kirkwood mobile website"

1.11.1 / 2013-02-04 
==================

 * Owl's Head
 * Mont Tremblant

1.11.0 / 2013-02-02 
==================

 * Update dependencies
 * Persistent cache for status to limit requests on restart

1.10.9 / 2013-02-01 
==================

 * Update 'Saddleback' tag - 'New England'
 * Snow Valley
 * China Peak

1.10.8 / 2013-02-01 
==================

 * Saddleback

10.1.7 / 2013-01-31 
==================

 * Fix squaw parsing

1.10.6 / 2013-01-30 
==================

 * Improve Mount Snow parsing
 * Angel Fire

1.10.5 / 2013-01-29 
==================

 * Adjust social icons colors
 * Moonlight Basin

1.10.4/ 2013-01-27 
==================

 * Fix for BrianHead - 'delay' means 'hold'

1.10.3 / 2013-01-27 
==================

 * Use kirkwood mobile website
 * Add precomposed icon for older Androids
 * Link 57 icon to base icon
 * Optimize png files

1.10.2 / 2013-01-26 
==================

 * Hochfügen
 * Better coerce

1.10.1 / 2013-01-25 
==================

 * Mountain High
 * Telluride

1.10.0 / 2013-01-24 
==================

 * Sort tags in alphabetical order

1.9.10 / 2013-01-23 
==================

 * Add 'Nevada' tag
 * Diamond Peak

1.9.9 / 2013-01-22 
==================

 * Fix parsing Aspen resorts
 * Compile style.css before launching liftie
 * Beaver Creek

1.9.8 / 2013-01-22 
==================

 * Allow uglify to mangle source
 * Fix issue with disappearing stars

1.9.7 / 2013-01-22 
==================

 * Whiteface
 * Use component/enumerable instead of local/nodelist

1.9.6 / 2013-01-19 
==================

 * Brian Head
 * Snowbasin
 * Use code42day/ga component for Google Analytics

1.9.5 / 2013-01-18 
==================

 * Mount Snow
 * Jiminy Peak
 * Typo in google analytics queue name (qaq -> gaq)

1.9.4 / 2013-01-17 
==================

 * Prevent parsing errors from breaking liftie
 * Use code42day/dataset component instead of defining our own
 * Kirkwood
 * Let resort recalculate URL before status request

1.9.2 / 2013-01-17 
==================

 * Boreal
 * Sugar Bowl

1.9.1 / 2013-01-16 
==================

  * Loveland

1.9.0 / 2013-01-16 
==================

  * Client side of about component
  * Include /about link in the sitemap
  * About page for liftie
  * Google Analytics

1.8.1 / 2013-01-15 
==================

  * Minor color adjustment (darker links, blue background)
  * Auto-hiding tags counters
  * Remove parens around tag count
  * Waterville Valley
  * Gunstock
  * Wildcat
  * Attitash

1.8.0 / 2013-01-13 
==================

  * Display status-color bar instead of footer border
  * Percentage color bar for each resort
  * Calculate percentage as part of stats
  * Add margins to summary counters
  * Stevens Pass
  * Sun Valley

1.7.0 / 2013-01-12 
==================

  * Display 'next update' indicator for each resort
  * Add timestamp to lift status

1.6.3 / 2013-01-12 
==================

  * Mt. Hood
  * Fix redirect handling
  * Mt. Bachelor

1.6.2 / 2013-01-11 
==================

  * Fix title for a single resort and tag pages

1.6.1 / 2013-01-11 
==================

  * Aspen Mountain
  * Aspen Highlands
  * Buttermilk
  * Extract aspen status parsing to a separate module
  * Snowmass
  * Big Sky

1.6.0 / 2013-01-10 
==================

  * Preserve 'open' state for resorts
  * tag component can update the tag counter
  * Remove 'all' from tags structure
  * /stars URL displays stars resorts only
  * Properly update starred items cookie
  * Allow users to star resorts
  * Add star to icon font

1.5.0 / 2013-01-10 
==================

  * Explain how to run liftie locally
  * 301 redirect to canonical form of the tag
  * Convert tag names to URL friendly form
  * Support dataUrl in resort descriptor
  * Whistler-Blackcomb
  * Grouse Mountain
  * Big White, BC

1.4.1 / 2013-01-09 
==================

  * Improve Deer Valler status reporting
  * Define .left and .right CSS classes

1.4.0 / 2013-01-09 
==================

  * Merge branch 'open-close'
  * Merge branch 'jackson-hole'
  * Mark all resorts as closed in some cases
  * Sort resorts by name
  * Grand Targhee
  * Jackson Hole added

1.3.1 / 2013-01-08 
==================

  * npm install script added
  * Add .icon-style class to links rendered with icon font
  * Soelden - Austria

1.3.0 / 2013-01-08 
==================

  * Winter Park
  * Crested Butte
  * Copper Mountain
  * Steamboat
  * Support JSON REST API for status retrieval

1.2.2 / 2013-01-07 
==================

  * Solitude
  * Snowbird
  * Alta

1.2.1 / 2013-01-06 
==================

  * Center resort pages
  * Render title for resort and tag pages
  * Capability of decorating resort header
  * Export app object from app.js
  * Shrink wrap npm dependencies.

1.2.0 / 2013-01-06 
==================

  * Minor margin adjustments
  * External resort link and liftie page link
  * Social links: Facebook, Twitter, Google+
  * More icons added

1.1.4 / 2013-01-05 
==================

  * Canyons
  * Deer Valley
  * Generate tags attribute for new resorts
  * Park City
  * Smugglers' Notch
  * Added tags for Vermont, NH, Maine

1.1.3 / 2013-01-04 
==================

  * Okemo
  * Sunday River
  * Sugarbush

1.1.2 / 2013-01-04 
==================

  * Jay Peak
  * Stowe
  * Use common coerce module to convert status strings
  * common status coercer

1.1.1 / 2013-01-03 
==================

  * Stratton

1.1.0 / 2013-01-03 
==================

  * More efficient data prefetching
  * Sugarloaf
  * Keystone
  * Vail
  * Extract common parser for Vail resort websites
  * Breckenridge

1.0.0 / 2013-01-01 
==================

  * Use primitive 'dataset' polyfill
  * Use domready compponent to trigger init script

0.0.9 / 2013-01-01 
==================

  * Mammoth Lakes resort
  * Loon Mountain added
  * Killington added
  * Add 'Lake Tahoe' and 'California' tags
  * Display tag links on the page
  * Handle tag routes
  * Tags calculator
  * Prefetch the resort data
  * Simplified error handling

0.0.8 / 2012-12-31 
==================

  * Return only a subset of resorts as open
  * Save open resort state in a cookie
  * Subtle color change for :hover links
  * Style adjustement to allow for text-shadow
  * Make container responsible for top/bottom margin
  * Ease in open/close state
  * Added Mount Rose ski resort

0.0.7 / 2012-12-30 
==================

  * Open/close icons in icon file
  * open/close switch for each resort
  * Add open graph image parameter
  * sitemap.xml and robots.txt files added
  * Added Northstar California ski resort

0.0.6 / 2012-12-28 
==================

  * Add Sierra at Tahoe ski resort
  * Add support for a single resort URL
  * Automatically discover resorts modules
  * bin/generate script added
  * Adjustable CSS layout
  * Add Homewood Mountain support

0.0.5 / 2012-12-26 
==================

  * Use connect-cachify for cache busting on .js and .css
  * Uglify js in production environment
  * Run init only after readyState complete
  * Autorefresh resort data
  * Scaffolding for using component framework
  * Simple status REST API
  * Remap icon font to make it compatible with older browsers

0.0.4 / 2012-12-25 
==================

  * Support for 'resorts' parameter
  * Add Heavenly
  * Use async cache to store lift status

0.0.3 / 2012-12-25 
==================

  * Display status icons in resorts stats
  * Display footer with github and furkot links
  * Add favicons
  * Adjust status colors

0.0.2 / 2012-12-24 
==================

  * Replace text with icons representing status
  * Add missing squaw.html example
  * Add travis-ci build status
  * Simplify status object

0.0.1 / 2012-12-24 
==================

  * Fix squaw parser - standby => hold
  * Display mutliple resorts on index page
  * Calculate and display stats for each resort
  * Add Squaw Valley USA
  * Display data from Alpine Meadows
  * Basic page with fake status
