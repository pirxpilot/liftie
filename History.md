
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
