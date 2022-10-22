PROJECT=liftie

NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
CSS_DIR=public/stylesheets
SRC = $(wildcard lib/client/*/*.js)
TESTS = $(filter-out test/replay/%, $(wildcard test/*.js test/*/*.js))

LINT_SRC = app.js bin/generate lib test

PLUGINS = lifts weather webcams snow

ESBUILD_FORMAT = esm

ESBUILD_OPTS += \
	--bundle \
	--log-level=warning \
	--color=false \
	--tree-shaking=true \
    --format=${ESBUILD_FORMAT} \
	--target=es2018

ESBUILD_MIN_OPTS += \
	--define:DEBUG=false \
	--drop:console \
	--drop:debugger \
	--minify

define RUN_ESBUILD
	$(NODE_BIN)/esbuild $< \
		$(ESBUILD_OPTS) \
		--sourcemap=linked \
		--outfile=$@
endef

define RUN_ESBUILD_MIN
	$(NODE_BIN)/esbuild $< \
		$(ESBUILD_OPTS) \
		$(ESBUILD_MIN_OPTS) \
		--sourcemap=external \
		--sources-content=false \
		--outfile=$@
endef

all: lint test build

# common rules

%.br: %
	brotli --best --force $<

%.gz: %
	gzip --best --force --keep $<

%.styl.css: %.styl
	$(NODE_BIN)/stylus $<

%.css: %.styl.css
	$(NODE_BIN)/postcss \
		--use postcss-cachify \
		--postcss-cachify.baseUrl /stylesheets \
		--postcss-cachify.basePath public \
		--postcss-cachify.format name \
		--output $@ $@

%.min.css: %.css
	$(NODE_BIN)/esbuild \
		--log-level=warning \
		--color=false \
		--minify \
		--external:*.woff2 \
		--sourcemap=external \
		--sources-content=false \
		--bundle $< \
		--outfile=$@

node_modules: package.json pnpm-lock.yaml
	pnpm install -C $(@D) --silent --frozen-lockfile
	touch $@

.NOTPARALLEL: node_modules

lint: | node_modules
	$(NODE_BIN)/biome ci $(LINT_SRC)

format: | node_modules
	$(NODE_BIN)/biome check --write $(LINT_SRC)

test: | node_modules
	node --test $(TESTS)

$(BUILD_DIR):
	mkdir -p $@

$(BUILD_DIR)/$(PROJECT).js: lib/client/boot/index.js $(SRC) node_modules | $(BUILD_DIR)
	$(RUN_ESBUILD)

$(BUILD_DIR)/$(PROJECT).min.js: lib/client/boot/index.js $(SRC) node_modules | $(BUILD_DIR)
	$(RUN_ESBUILD_MIN)

$(BUILD_DIR)/$(PROJECT)-embed.js: ESBUILD_FORMAT=iife
$(BUILD_DIR)/$(PROJECT)-embed.js: lib/embed/index.js | $(BUILD_DIR)
	$(RUN_ESBUILD)

$(BUILD_DIR)/$(PROJECT)-embed.min.js: ESBUILD_FORMAT=iife
$(BUILD_DIR)/$(PROJECT)-embed.min.js: lib/embed/index.js | $(BUILD_DIR)
	$(RUN_ESBUILD_MIN)

# stylus for CSS

$(CSS_DIR)/style.css: $(wildcard $(CSS_DIR)/*.styl) | node_modules

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

.PHONY: all test build dist clean distclean lint format
