# C3
This used to be my attempt to force a personal site rebuild&mdash;which failed because it wasn&rsquo;t a priority. So in the name of getting real, this repo is pivoting to that which it was actually intended: **to be an opinionated, [Gulp-driven](http://gulpjs.com) frontend toolchain.**

## Useage
You'll need Node 0.12, at the bare minimum; I use Gulp-PostCSS for a finishing touch, and it doesn't like older versions. Though honestly, Node stable is v4.1.0, so why not take this opportunity to upgrade.

When you have Node where you want it, download or clone C3, cd to the directory where you downloaded the source files, and run:

```javascript
$ npm install
```

After a bit of time and a lot of NPM modules, you'll be presented with a standard prompt again. At that time, run:

```javascript
$ gulp
```

Yep, just **gulp**. The server will start automatically, and your terminal will let you know when Nodemon and Browsersync are listening. A Google Chrome window will open, and Browsersync will confirm the window sync is live.

Saving any **.scss** files will kick off the sass task to lint, concat into a main.css file, and reload your browser window. Same for any **.js** files in app/scripts/src: Lint, concat, run the test suite. You should see a passing smoke test and the Nodemon server should restart.

Admittedly, this is a sketchy index.html file and test suite--this started out as a personal site rebuild, and turned into something else entirely. I'll be updating tasks and the test suite with more front-end dev specific items, so stay tuned.

## Feedback
I welcome constructive criticism and improvements. In keeping with a personal theory, I&rquo;m not provinding a contact link. Where there&rsquo;s a will, there&rsquo;s a way. 
