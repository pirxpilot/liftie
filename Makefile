NODE_BIN=./node_modules/.bin
BUILD_DIR=public/scripts
SRC = $(wildcard lib/client/*/*.js)

all: lint test build

%.min.js: %.js
	$(NODE_BIN)/uglifyjs $< --output $@

lint:
	$(NODE_BIN)/jshint *.js lib test

test:
	$(NODE_BIN)/mocha --recursive

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/liftie.js: $(BUILD_DIR) components $(SRC)
	$(NODE_BIN)/component build --out $(BUILD_DIR) --name liftie

build: $(BUILD_DIR)/liftie.min.js

components: component.json
	$(NODE_BIN)/component install

clean:
	rm -rf $(BUILD_DIR) components

.PHONY: all lint test build clean
