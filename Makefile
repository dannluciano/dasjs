SRC = $(wildcard src/**/*.js src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

all: build
	node ./lib/www.js

build: $(LIB)
lib/%.js: src/%.js .babelrc
	@mkdir -p $(@D)
	./node_modules/babel-cli/bin/babel.js  $< -o $@

test:
	testcafe chromium tests/

setup: package.json db.sh
	yarn install
	sh db.sh

clean:
	rm -rf lib
