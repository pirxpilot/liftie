PROJECT=liftie

NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
CSS_DIR=public/stylesheets
SRC = $(wildcard lib/client/*/*.js)
LINT_SRC = app.js bin/generate lib test

PLUGINS = lifts twitter weather webcams snow powder

all: lint test build

# common rules

%.br: %
	bro --input $< --output $@

%.gz: %
	gzip --best --stdout $< > $@

%.min.js: %.js
	$(NODE_BIN)/uglifyjs $< --mangle --no-copyright --compress --output $@

%.css: %.styl
	$(NODE_BIN)/stylus $<
	$(NODE_BIN)/postcss \
		--use postcss-cachify \
		--postcss-cachify.baseUrl /stylesheets \
		--postcss-cachify.basePath public \
		--use autoprefixer \
		--autoprefixer.browsers 'last 2 versions, Explorer >= 11, Safari >= 8, Firefox ESR' \
		--output $@ $@

%.min.css: %.css
	$(NODE_BIN)/cleancss --skip-import --skip-rebase --s0 --output $@ $<

lint:
	$(NODE_BIN)/jshint $(LINT_SRC)

test:
	$(NODE_BIN)/mocha --recursive --require should

$(BUILD_DIR):
	mkdir -p $@

$(BUILD_DIR)/$(PROJECT).js: $(SRC) node_modules | $(BUILD_DIR)
	NODE_PATH=lib/client:node_modules \
	$(NODE_BIN)/browserify \
	--require resort/lifts \
	--require resort/twitter \
	--require resort/weather \
	--require resort/webcams \
	--require resort/snow \
	--require resort/powder \
	--entry lib/client/boot/index.js \
	--outfile $@

$(BUILD_DIR)/$(PROJECT)-embed.js: lib/embed/index.js | $(BUILD_DIR)
	echo '(function(){' > $@
	cat $< >> $@
	echo '}());' >> $@

# stylus for CSS

$(CSS_DIR)/style.css: $(wildcard $(CSS_DIR)/*.styl)

build: $(BUILD_DIR)/$(PROJECT).js $(CSS_DIR)/style.css $(BUILD_DIR)/$(PROJECT)-embed.js

# minized and compressed version for deployment
DIST = $(BUILD_DIR)/$(PROJECT).min.js $(CSS_DIR)/style.min.css $(BUILD_DIR)/$(PROJECT)-embed.min.js

.PRECIOUS: $(DIST)
dist: $(DIST:%=%.gz)
dist: $(DIST:%=%.br)

# cleaning

clean:
	rm -rf $(BUILD_DIR) $(CSS_DIR)/style.css*

distclean: clean
distclean:
	rm -rf components

.PHONY: all test build dist clean distclean
