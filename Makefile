PROJECT=liftie

NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
CSS_DIR=public/stylesheets
SRC = $(wildcard lib/client/*/*.js)

all: lint test build

# common rules

%.gz: %
	gzip --best --stdout $< > $@

%.min.js: %.js
	$(NODE_BIN)/uglifyjs $< --mangle --no-copyright --compress --output $@

%.css: %.styl
	$(NODE_BIN)/stylus --include-css --compress --use ./node_modules/nib/lib/nib.js $<

lint:
	$(NODE_BIN)/jshint *.js lib test

test:
	$(NODE_BIN)/mocha --recursive

components: component.json
	$(NODE_BIN)/component install

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# component build to create .js and .css

$(BUILD_DIR)/$(PROJECT).js: components $(SRC)
	$(NODE_BIN)/component build --out $(BUILD_DIR) --use component-autoboot --name $(PROJECT)

# stylus for CSS

$(CSS_DIR)/style.css: $(wildcard $(CSS_DIR)/*.styl)

build: $(BUILD_DIR)/$(PROJECT).js $(CSS_DIR)/style.css

# minized and compressed version for deployment

.PRECIOUS: $(BUILD_DIR)/$(PROJECT).min.js
dist: $(BUILD_DIR)/$(PROJECT).min.js.gz $(CSS_DIR)/style.css.gz

# cleaning

clean:
	rm -rf $(BUILD_DIR) $(CSS_DIR)/style.css*

distclean: clean
distclean:
	rm -rf components

.PHONY: all lint test build dist clean distclean
