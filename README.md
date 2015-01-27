# Virtusize Bookmarklets

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

## Development
Use the normal HubFlow commands to create a feature branch. After you push the
code to Github it will be available with a bookmarklet like this, if you change
the `<branch>` to your feature branch:

    javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','https://rawgit.com/virtusize/bookmarklets/<branch>/build/override.min.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())

Alternatively you can run a SimpleHTTPServer locally like this:

    sudo python -m SimpleHTTPServer 8001

After that the bookmarklet is available from your local environment, but it
will not run on HTTPS retailers. Change the URL inside the bookmarklet from
rawgit.com to your local machine, for example like this:

    javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','http://hsdev.virtusize.com:8001/build/override.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())

## Deployment
Use the normal HubFlow commands to create a release. As soon as the release is
finished and merged into master, the new version of the Bookmarklet will be
available.

## Bookmarklet
The bookmarklet has a few more requirements. First, it has a special format,
since it should be URL encoded. It looks like this:

    javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','https://rawgit.com/virtusize/bookmarklets/master/build/override.min.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())

You notice that it is not referencing the raw gist file directly, but is going
through a proxy: rawgit.com. This is due to the fact that gist does not set the
content type of the file correctly, which results in WebKIT and other browsers
not being able to inject the file correctly into the page.
