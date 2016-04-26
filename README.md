# This is whiteboard application
## [live version](http://mikhail-angelov.github.io/react-whiteboard/)
The purpose of this application was to practise with [react](https://facebook.github.io/react/) and [imutable.js](https://facebook.github.io/immutable-js/), the code was inspired by [this presentation (Russian)](https://youtu.be/lDkrXTDwbJQ)

If you like to play with application, there is brief instructions:

clone it
```
git clone https://github.com/mikhail-angelov/react-whiteboard.git
```
make sure you have nodejs and those packages (babel webpack webpack-dev-server) globally installed, if not, install fresh [node.js](https://nodejs.org), then
```
npm i babel webpack webpack-dev-server -g
```
to start application in development mode run
```
npm start
```
to build bundle for deploy run
```
webpack
```
**application structure**
* index.html - web page
* main.js - app entry point
* components/whiteBoard.js - main component
* store.js - main store

_it uses: React, SVG (to draw and graphical primitives), Immutable.js (to track history)_

License
----

MIT

