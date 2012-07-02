all: clean
	eco layouts/* -o public/js/layouts/
	eco sections/* -o public/js/sections/
clean:
	rm public/js/layouts/*
	rm public/js/sections/*
