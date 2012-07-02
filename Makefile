all: clean
	./node_modules/.bin/eco layouts/* -o public/js/layouts/
	./node_modules/.bin/eco sections/* -o public/js/sections/
clean:
	rm public/js/layouts/*
	rm public/js/sections/*
