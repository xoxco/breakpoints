# Breakpoints.js

Define breakpoints for your responsive design, and Breakpoints.js will fire custom events when the browser enters and/or exits that breakpoint.

[Get it from Github](https://github.com/eikes/breakpoints)

Created by [XOXCO](http://xoxco.com)

## Instructions

Initialize the plugin with an array of widths in pixels where breakpoints should be triggered

    $(window).breakpoints([320, 480, 768, 1024]);

Then bind to the general "changeBreakpoint" event on the window object. The info object, that 
gets passed in, contains information about what breakpoint was left and which was entered:

    $(window).bind('changeBreakpoint', function(event, info) {
      alert("Old:" + info.oldBP + " New: " + info.newBP);
    });

Alternatively bind to specific events which are fired for each transition between breakpoints:

    $(window).bind('changeBreakpoint-480-768', function(event) {
      alert("Old: 480 New: 768");
    });

