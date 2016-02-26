# C3
Continuum Design -- version 3.0 -- now with old skool static site HTML, CSS, &amp; JS

## Gulp Workflow
In an attempt to better keep up with current technology and build techniques, I am moving from a Grunt to Gulp workflow.

Additionally, I am going to switch from Require.js to Browserify or Webpack for my Javascript dependency management.

## Accessibility
This site serves two purposes. The first is to highlight my skills. The second is to showcase accessible design of
Javascript-centric web pages. I am a firm believer in progressive enhancement, and access for all.

## Useage
You'll need to be running Node 0.12 at a minimum; I use Gulp-PostCSS for a finishing touch, and it doesn't like older versions. Though honestly, Node stable is v4.1.0, so why not take this opportunity to upgrade.

When you have Node where you want it, cd to the directory where you downloaded C3, and run:

```javascript
npm install
```

After a bit of time and a lot of NPM modules, you'll be presented with a standard prompt again. At that time, run:

```javascript
gulp
```

Yep, just *gulp*. The server will start automatically, and the console will let you know that Nodemon and Browsersync are running. A Google Chrome window will open, and Browsersync will confirm the window is listening for scroll events.

Saving any *.scss* files will kick off the sass task to lint, concat into a main.css file, and reload your browser window. Same for any *.js* files in app/scripts/src. Lint, concat, and run the test suite. You should see 7 passing tests and the Nodemon server should restart.

Admittedly, this is a sketchy index.html file and test suite--this started out as a personal site rebuild, and turned into a build process. I'll be updating tasks and test suites later with more front-end dev specific items, so be on the lookout.
