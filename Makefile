BUILD_DIR=public/scripts
COMPONENT=./node_modules/.bin/component
SRC = $(wildcard lib/boot/*.js lib/boot/*/*.js)

all: lint test build

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	./node_modules/.bin/mocha --recursive

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/liftie.js: $(BUILD_DIR) components $(SRC)
	$(COMPONENT) build --out $(BUILD_DIR) --name liftie

build: $(BUILD_DIR)/liftie.js

components: component.json
	$(COMPONENT) install

clean:
	rm -rf $(BUILD_DIR) components

.PHONY: all lint test build clean
