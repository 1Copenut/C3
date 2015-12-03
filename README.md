# C3
This used to be my attempt to force a personal site rebuild&mdash;which failed because it wasn&rsquo;t a priority. So in the name of getting real, this repo is pivoting to that which it was actually intended: **to be an opinionated, [Gulp-driven](http://gulpjs.com) front-end toolchain.**

## C3 Modules 
You'll need Node 0.12 at the minimum; I use Gulp-PostCSS for a final coat, and it doesn't like older versions of Node. Node stable is v4.1.0, so consider taking this opportunity to upgrade.

When you have Node installed, clone C3, and run:

```javascript
$ npm install
```

### Start App Server and Watch Files 
After the NPM modules are installed, you&rsquo;ll see the standard prompt. At that time, run:

```javascript
$ gulp
```

Yep, just **gulp**. The server will start automatically, and the terminal will message Nodemon and Browsersync are listening. A Google Chrome window will open, and Browsersync will confirm window sync is live.

Saving any **.scss** files will kick off the sass task to lint, concat into a main.css file, and reload your browser window. Same for **.js** files in app/scripts/src: Build, lint, and reload the browser.

## Karma Test Runner
I&rsquo;m using Karma for a UI unit test runner. There are a lot of tutorials and offerings for server-side (Node) unit testing, but not as many for client-side UI code. I gleaned a lot from [this article by Zsolt Nagy](http://www.zsoltnagy.eu/asynchronous-tests-and-fixtures-with-mocha-and-chaijs/) but wasn't satisifed with the co-mingling of fixtures and unit tests.

I am using [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and [Browserify](http://browserify.org/) to manage TDD unit tests. These libraries were installed in the initial **npm install**. 

Further abstractions were made for Karma fixtures, and loading them into an index.html file for parsing. I [used this article by Bradley Braithwaite](http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/) for proper creation of fixtures and eventually a config file to load tests in PhantomJS during normal development, and multiple browsers with coverage reporting as a separate command.

### Install the Karma CLI &amp; Start The Server 
```javascript
$ (sudo) npm install -g karma-cli
```

Run the following command each time you want to listen and run the TDD test suite:

```javascript
$ karma start karma.conf.js
``` 

This is a sketchy index.html file and test suite--C3 started out a personal site rebuild, and turned into something else entirely. I&rsquo;ll be updating tasks and the test suite with more front-end dev items, so stay tuned.

## Feedback
I welcome constructive criticism and improvements. In keeping with a personal theory, I&rsquo;m not providing a contact link. Where there&rsquo;s a will, there&rsquo;s a way. 
