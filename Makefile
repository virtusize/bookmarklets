define HELP_MESSAGE
Usage: make [COMMAND]

Commands:
	all    Build the project. (default)
	test   Run the tests.
	clean  Remove the build folder.
	watch  Watch for changed files and rebuild.
	serve  Run server to serve the files.
	help   Display this help message.
endef

export HELP_MESSAGE



.PHONY: all test serve watch clean help


all:

	grunt


test:

	@echo 'LGTM'


serve: all

	grunt connect:server


watch: all

	grunt watch


clean:

	rm -rf build


help:

	@echo "$$HELP_MESSAGE"
