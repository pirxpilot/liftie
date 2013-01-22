NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
CSS_DIR=public/stylesheets
SRC = $(wildcard lib/client/*/*.js)

all: lint test build

%.min.js: %.js
	$(NODE_BIN)/uglifyjs $< --mangle --output $@

%.css: %.styl
	$(NODE_BIN)/stylus --compress --use ./node_modules/nib/lib/nib.js $<

lint:
	$(NODE_BIN)/jshint *.js lib test

test:
	$(NODE_BIN)/mocha --recursive

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/liftie.js: $(BUILD_DIR) components $(SRC)
	$(NODE_BIN)/component build --out $(BUILD_DIR) --name liftie

build: $(BUILD_DIR)/liftie.min.js $(CSS_DIR)/style.css

components: component.json
	$(NODE_BIN)/component install

clean:
	rm -rf $(BUILD_DIR) components $(CSS_DIR)/style.css

.PHONY: all lint test build clean
