SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

all: lib
	node ./bin/www

lib: $(LIB)
lib/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	./node_modules/babel-cli/bin/babel.js  $< -o $@

test: all
	testcafe chrome tests/

setup:
	yarn install
	sh db.sh
