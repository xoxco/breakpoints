/*
 * Breakpoints.js
 * Version 3.0
 * 
 * Creates handy events for your responsive design breakpoints.
 * Use it like this to bind to certain breakpoint changes:
 * 
 * breakpoints([0, 480, 960], function(oldP, newP) { 
 *   console.log(oldP, newP)
 * });
 * 
 * Version 1.0 written and copyright by XOXCO, Inc
 * http://xoxco.com/
 * 
 * Version 2.0 and 3.0 rewrite and copyright by Eike Send
 * http://eike.se/nd
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function(){
  var oldBP, currentBP,
      breakpointArray;
  
  // This is the function that is exported into the global namespace
  breakpoints = function(userBreakpoints, callback) {
    // just in case, sort the given breakpoints
    breakpointArray = userBreakpoints.sort(function(a, b) { return a - b } );
    // Bind to the resize event, but don't remove other bindings
    if (window.addEventListener) {
      window.addEventListener("resize", checkBreakPoints, false);
    } else if (window.attachEvent) {
      window.attachEvent("onresize", checkBreakPoints);
    }
    if (callback) {
      breakpoints.bind(callback);
    }
    checkBreakPoints();
  }
  
  // Does the actual work:
  var checkBreakPoints = function() {
    
    // Get window width, code stolen from jQuery
    var docwindowProp = document.documentElement["clientWidth"];
    var width = document.compatMode === "CSS1Compat" && docwindowProp 
                || document.body && document.body["clientWidth"] 
                || docwindowProp;
    
    // This checks if breakpoints have changed and triggers accordingly
    currentBP = breakpoints.getCurrentBreakPoint(breakpointArray, width);
    if (oldBP != currentBP) {
      var inBetweenBreakPoints = [];
      // Find all the breakpoints that have been crossed and trigger the event as well
      for (var i = 0; i < breakpointArray.length; i++) {
        var el = breakpointArray[i]; 
        if (el >= oldBP && el <= currentBP || el >= currentBP && el <= oldBP) {
          inBetweenBreakPoints.push(el);
        }
      }
      if (currentBP < oldBP) {
        inBetweenBreakPoints = inBetweenBreakPoints.reverse();
      }
      for (var i = 0; i < inBetweenBreakPoints.length; i++) {
        trigger(inBetweenBreakPoints[i]);
      }
      oldBP = currentBP;
    }
  }
  
  // Utility function to get the value that is the highest in an array below or equal the given value
  // Defaults to 0
  // breakpoints.getCurrentBreakPoint([100, 200, 300, 400], 250) -> 200
  // breakpoints.getCurrentBreakPoint([100, 200, 300, 400], 25)  -> 0
  breakpoints.getCurrentBreakPoint = function(breakpoints, width) {
    for (var bp in breakpoints) {
      bp = parseInt(bp);
      if (width >= breakpoints[bp] && ( breakpoints.length == bp + 1 || width < breakpoints[bp+1] )) {
        return breakpoints[bp];
      }
    }
    return 0;
  };
  
  var breakpointsHistory = [], boundFunctions = [];
  // These functions are are used to bind and trigger callbacks of breakpoint events
  breakpoints.bind = function(func) {
    boundFunctions.push(func);
    if (breakpointsHistory.length) {
      for (var i = 1; i < breakpointsHistory.length; i++) {
        func(breakpointsHistory[i-1], breakpointsHistory[i])
      }
    }
  }
  
  var trigger = function(value) {
    for (var i = 0; i < boundFunctions.length; i++) {
      var func = boundFunctions[i];
      if (breakpointsHistory.length > 0 
          && breakpointsHistory[breakpointsHistory.length-1] != value) {
        func(breakpointsHistory[breakpointsHistory.length-1], value)
      }
    }
    breakpointsHistory.push(value);
  }
})();
