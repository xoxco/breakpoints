# Breakpoints.js

Define breakpoints for your responsive design, and Breakpoints.js will fire custom events when the browser enters and/or exits that breakpoint.

## Instructions

Initialize the plugin with an array of widths or an individual width in pixels where breakpoints should be triggered
and pass a callback that is triggered. It gets information about what breakpoint was left and which was entered:

    breakpoints(600, function(oldPoint, newPoint) {
      console.log(oldPoint, newPoint);
    });
    
    breakpoints([0, 160, 320, 480, 768, 1024], function(oldPoint, newPoint) {
      console.log(oldPoint, newPoint);
    });

Alternatively bind your callbacks at another time:

    var myPoints = breakpoints([0, 160, 320, 480, 768, 1024]);
    
    myPoints.bind(function (oldPoint, newPoint) {
      console.log("after", oldPoint, newPoint);
    });

## Relocate.js

    var elements = document.getElementsByClassName("movethis");
    relocate(480, document.getElementById("sidebar"), elements);

To use this in IE8 or less you can use this [getElementsByClassName polyfill](https://gist.github.com/2299607)

## Credit

Breakpoints.js was originally created by [XOXCO](http://xoxco.com)

Version 2.0 and 3.0 have been rewritten by [Eike Send](http://eike.se/nd)

Version 2.0 removed dependencies on DOM classes and fixed bugs

Version 3.0 removed jQuery dependency and introduced relocate.js
