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

## Nunjucks Templates
I opted to split app HTML files into smaller templates, and Nunjucks was the best fit. The gulp nunjucks task has been added to the default task to create three basic HTML files (index, about, contact) on first run. Further changes to .nunjucks files in the /app/templates directory will automatically rebuild the HTML files, and Browsersync will reload the browser window(s).

## Karma Test Runner
I&rsquo;m using Karma for a UI unit test runner. There are a lot of tutorials and offerings for server-side (Node) unit testing, but not as many for client-side UI code. I gleaned a lot from [this article by Zsolt Nagy](http://www.zsoltnagy.eu/asynchronous-tests-and-fixtures-with-mocha-and-chaijs/) but wasn't satisifed with the co-mingling of fixtures and unit tests.

I am using [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and [Browserify](http://browserify.org/) to manage TDD unit tests. These libraries were installed in the initial **npm install**. 

Further abstractions were made for Karma fixtures, and loading them into an index.html file for parsing. I [used this article by Bradley Braithwaite](http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/) for proper creation of fixtures. Eventually this branch will include a config file to load tests in PhantomJS during normal development, and multiple browsers with coverage reporting as a separate command.

### Install the Karma CLI 
```javascript
$ (sudo) npm install -g karma-cli
```

### Start the Karma Server -- PhantomJS 

```javascript
$ npm run test 
``` 

Karma will announce itself on the Terminal and open a new PhantomJS instance. Karma listens for any changes to the test/scripts/src/unit/ and app/scripts/src/ folders, and reloads automatically when matching files are saved.

### Run the Karma Server Once -- Chrome and Coverage

```javascript
$ npm run full-test
```

Karma will announce itself on the Terminal and open a new Chrome window. Karma will run all tests once, and create an Istanbul coverage report in a new folder /coverage. This test will only run once, and is recommended as a last feature step. Could also be merged into the gulp build task.

## Feedback
I welcome constructive criticism and improvements. In keeping with a personal theory, I&rsquo;m not providing a contact link. Where there&rsquo;s a will, there&rsquo;s a way. 
