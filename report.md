move original project documents to src folder in git repository
install gulp file build system

Part 1: Optimize PageSpeed Insights score for index.html

Following PageInsights recommendations:


Auto Build
- resize src/views/images/pizzeria.jpg to closely match its display size (i.e. resize from 2048x1536 to 100x75)
- compress/optimize all images that are part of the project (including the resized src/views/images/pizzeria.jpg)

TODO:
- minify HTML, CSS, JS
- what else????? see gulp book on what other autobuild actions you could implement
- implements the action in gulp files

Manual

Remove render-blocking JavaScript:

- use async attribute with script tag for http://www.google-analytics.com/analytics.js

Optimize CSS Delivery of the following:

- remove CSS, http://fonts.googleapis.com/css?family=Open+Sans:400,700 , from CRP by adding this style sheet dynamically using js. So, this stylesheet is loaded after first render

- inline CSS, http://aa852760.ngrok.io/css/style.css ; this stylesheet is critical for the above the fold content; inlining this CSS eliminates a network round trip 

- use media="print" attribute on link tag for http://aa852760.ngrok.io/css/print.css 

Part 2: Optimize Frames per Second in pizza.html

1) 60 FPS on scroll

- on scroll, cache results of document.body.scrollTop outside of the for loop over .mover elements
- reduce # of moving pizzas from 200 to 50
- promote all .mover elements to their own layer - style.css
- on DOM load, cache img element of moving pizzas in an array for later use on scroll

2) Time to resize pizza less than 5 ms

- cache results of document.querySelectorAll(".randomPizzaContainer") in the changePizzaSizes function
- the determinDx function adds no value, therefore eliminate it
- for loop in changePizzaSizes funtion is causing FSL, get desired pizza width outside of the for loop, then batch 
style updates of pizza widths inside of the for loop

3) Go through TO DO section of implementation notes and see what else needs to be done; i.e. measure timeline and take screen shots for images to add to writeup