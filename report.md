
Part 1: Optimize PageSpeed Insights score for index.html

a) Remove render-blocking JavaScript:
- use async attribute with script tag for http://www.google-analytics.com/analytics.js

b) Optimize CSS Delivery of the following:
- remove CSS, http://fonts.googleapis.com/css?family=Open+Sans:400,700 , from CRP by adding this style sheet dynamically using js. So, this stylesheet is loaded after first render
- inline CSS, /css/style.css; this stylesheet is critical for the above the fold content; inlining this CSS eliminates a network round trip 
- use media="print" attribute on link tag for /css/print.css 

c) Optimize Images 
- optimize images used on index.html page; see Part 3 below for details.

d) Results - PageSpeed Insights score
- mobile: 95/100
- desktop: 96/100

Part 2: Optimize Frames per Second in pizza.html

Edit src/views/js/main.js as described below

a) 60 FPS on scroll

- in DOMContentLoaded event handler, reduce number of moving pizzas from 200 to 50
- in DOMContentLoaded event handler, cache img element of moving pizzas in an array for later use in scroll event handler (updatePositions)
- in scroll event handler (updatePositions), cache results of document.body.scrollTop outside of the for-loop over .mover elements
- in src/views/css/style.css promote, add style "will-change: transform;" to .mover selector to put .mover elements on their own layer

b) Time to resize pizza less than 5 ms

- the determinDx function adds no value, therefore eliminate it; determine size of pizza with switch statement in changePizzaSizes function
- in the changePizzaSizes function, cache results of document.querySelectorAll(".randomPizzaContainer") outside of the for-loop
- in changePizzaSizes funtion, the for-loop is causing FSL, get desired pizza width outside of the for loop, then batch 
style updates of pizza widths inside of the for loop

c) Results

- Below is a before and after screenshots of timeline traces during scrolling on pizza.html
- pizza.html achieves 60 FPS after the improvements in step (a) have been applied

<<before image>>

<<after image>>

- time to resize pizzas was reduced from ### ms to 1.23 ms after the improvements in step (b) have been applied

Part 3: Automate Build with Gulp

a) Setup
- clone the project repository (https://github.com/otori23/fend-web-optimization)
- install nodejs (https://nodejs.org/)
- install gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- install ImageMagick (http://www.imagemagick.org/script/binary-releases.php)
(the gulp plugins for image manipulation use ImageMagick)
- note that the src folder at the root of project's main folder, contains the original project documents
- run npm install from the project's main folder; this gets all the node modules used by gulp
- build with gulp --environment production

b) Build Actions
- resize src/views/images/pizzeria.jpg to closely match its display size (i.e. resize from 2048x1536 to 100x75)
- compress/optimize all images that are part of the project (including the resized src/views/images/pizzeria.jpg)
- minify HTML, CSS, JS resources

c) Build Output
- the build output is placed in project's main folder