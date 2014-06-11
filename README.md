# Virtusize Bookmarklets

[VS Bookmarklet](javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'https://rawgit.com/virtusize/bookmarklets/master/build/override.min.js');element.setAttribute('id',%20'vs-bookmarklet');%20document.body.appendChild(element)})()))

[VS Bookmarklet (Dev)](javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'https://rawgit.com/virtusize/bookmarklets/develop/build/override.min.js');element.setAttribute('id',%20'vs-bookmarklet');%20document.body.appendChild(element)})()))

## Getting set up 

Node and NPM need to be installed. Install the Grunt commandline tools
globally:

    npm install -g grunt-cli

Then install all required dependencies:
    
    npm install

## Building the project

To build the project you need to run:

    grunt

That command concatenates the files, uglifies them and puts them in a new
directory called build.

## Watch the project and build continuously

    grunt watch

## Update Gist
For updating butschis gist, you got to be butschi. Next install gist gem "gem
install gist". Then run the following command:

    gist build/override.min.js -u <hash-of-gist>

## Bookmarklet
The bookmarklet has a few more requirements. First, it has a special format,
since it should be URL encoded. It looks like this:

    javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'https://rawgit.com/butschi/<hash-of-gist>/raw');element.setAttribute('id',%20'vs-bookmarklet');%20document.body.appendChild(element)})())

You notice that it is not referencing the raw gist file directly, but is going
through a proxy: rawgit.com. This is due to the fact that gist does not set the
content type of the file correctly, which results in WebKIT and other browsers
not being able to inject the file correctly into the page.
