
Part 1: Optimize PageSpeed Insights score for index.html

a) Remove render-blocking JavaScript:
- use async attribute with script tag for http://www.google-analytics.com/analytics.js

b) Optimize CSS Delivery of the following:
- remove CSS, http://fonts.googleapis.com/css?family=Open+Sans:400,700 , from CRP by adding this style sheet dynamically using js. So, this stylesheet is loaded after first render
- inline CSS, /css/style.css; this stylesheet is critical for the above the fold content; inlining this CSS eliminates a network round trip 
- use media="print" attribute on link tag for /css/print.css 

c) Optimize images used on index.html page; see Part 3 below for details.

Part 2: Optimize Frames per Second in pizza.html (edit /views/js/main.js)

a) 60 FPS on scroll

- on scroll, cache results of document.body.scrollTop outside of the for loop over .mover elements
- reduce # of moving pizzas from 200 to 50
- promote all .mover elements to their own layer - style.css
- on DOM load, cache img element of moving pizzas in an array for later use on scroll

b) Time to resize pizza less than 5 ms

- cache results of document.querySelectorAll(".randomPizzaContainer") in the changePizzaSizes function
- the determinDx function adds no value, therefore eliminate it
- for loop in changePizzaSizes funtion is causing FSL, get desired pizza width outside of the for loop, then batch 
style updates of pizza widths inside of the for loop

c) << Go through TO DO section of implementation notes and see what else needs to be done; i.e. measure timeline and take screen shots for images to add to writeup >>

Part 3: Automate Build with gulp

a) Setup
- install nodejs (https://nodejs.org/)
- install gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- install ImageMagick (http://www.imagemagick.org/script/binary-releases.php)
(the gulp plugins for image manipulation use ImageMagick)
- note that the src folder at the root of project's main folder, contains the original project documents
<<keep going>>

b) Build Actions
- resize src/views/images/pizzeria.jpg to closely match its display size (i.e. resize from 2048x1536 to 100x75)
- compress/optimize all images that are part of the project (including the resized src/views/images/pizzeria.jpg)
- minify HTML, CSS, JS

c) Build Outputs 
- placed in project's main folder






TODO:
- what else????? see gulp book on what other autobuild actions you could implement
- implements the action in gulp files

QR Code Instrucations

Clone the repo
Install npm
Install Gulp
Run npm install in the QR Code App directory
Build and run with gulp serve
