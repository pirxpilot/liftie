PROJECT=liftie

NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
CSS_DIR=public/stylesheets
SRC = $(wildcard lib/client/*/*.js)
TESTS = $(filter-out test/replay/%, $(wildcard test/*.js test/*/*.js))

LINT_SRC = app.js bin/generate lib test

PLUGINS = lifts twitter weather webcams snow

ifndef TAP_REPORTER
	ifneq (, $(shell which tap-difflet))
		TAP_REPORTER = tap-difflet --pessimistic
	else
		TAP_REPORTER = cat
	endif
endif

all: lint test build

# common rules

%.br: %
	brotli --best --force $<

%.gz: %
	gzip --best --force --keep $<

%.min.js: %.js
	$(NODE_BIN)/terser \
		--define DEBUG=false \
		--ecma 2018 \
		--mangle \
		--compress warnings=false \
		--compress drop_console \
		--output $@ \
		-- $<

%.styl.css: %.styl
	$(NODE_BIN)/stylus $<

%.css: %.styl.css
	$(NODE_BIN)/postcss \
		--use postcss-cachify \
		--postcss-cachify.baseUrl /stylesheets \
		--postcss-cachify.basePath public \
		--output $@ $@

%.min.css: %.css
	$(NODE_BIN)/cleancss -O1 --output $@ $<

node_modules: package.json $(wildcard yarn.lock)
	yarn --cwd $(@D) --no-progress --frozen-lockfile --silent
	touch $@

lint: | node_modules
	$(NODE_BIN)/jshint $(LINT_SRC)

test: | node_modules
	$(NODE_BIN)/tape $(TESTS) | $(TAP_REPORTER)

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
	rm -rf $(BUILD_DIR) $(CSS_DIR)/style.css* $(CSS_DIR)/style.min.css*

distclean: clean
distclean:
	rm -rf node_modules

.PHONY: all test build dist clean distclean
