# Breakpoints.js

Define breakpoints for your responsive design, and Breakpoints.js will fire custom events when the browser enters and/or exits that breakpoint.

[Get it from Github](https://github.com/eikes/breakpoints)

## Instructions

Initialize the plugin with an array of widths in pixels where breakpoints should be triggered
and pass a callback that is triggered. It gets information about what breakpoint was left and which was entered:

    breakpoints([0, 160, 320, 480, 768, 1024], function (oldPoint, newPoint) {
      console.log(oldPoint, newPoint);
    });

Alternatively bind your callbacks at another time:
    
    breakpoints.bind(function (oldPoint, newPoint) {
      console.log("after", oldPoint, newPoint);
    });

    breakpoints([0, 160, 320, 480, 768, 1024]);

    breakpoints.bind(function (oldPoint, newPoint) {
      console.log("before", oldPoint, newPoint);
    });

Originally created by [XOXCO](http://xoxco.com)
