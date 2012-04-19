/*
 * Breakpoints.js
 * Version 3.5
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

(function(win){
  var doc = win.document;
  
  // This is the function that is exported into the global namespace
  breakpoints = function(userBreakpoints, callback) {
    return new Breakpoints(userBreakpoints, callback);
  }
  
  Breakpoints = function(userBreakpoints, callback) {
    this.arr = null; // The array of used breakpoints
    this.old = null; // Old breakpoint
    this.cur = null; // Current breakpoint
    this.hst = [];   // History of breakpoints
    this.fnc = [];   // List of functions bound to the breakpoints array
    
    // Create an array if it is not an Array(like) structure
    if (!(userBreakpoints instanceof Array )) userBreakpoints = [0, userBreakpoints];
    // just in case, sort the given breakpoints
    this.arr = userBreakpoints.sort(function(a, b) { return a - b } );
    var instance = this;
    // Bind to the resize event, but don't remove other bindings
    var resizeCallback = function(){
      instance.check.apply(instance)
    }
    if (win.addEventListener) {
      win.addEventListener("resize", resizeCallback, false);
    } else {
      win.attachEvent("onresize", resizeCallback);
    }
    if (callback) {
      instance.bind(callback);
    }
    instance.old = instance.arr[0];
    instance.check();
    
  }
  
  // Does the actual work:
  Breakpoints.prototype.check= function() {
    
    var instance = this;
    // Get window width, code stolen from jQuery
    var docwindowProp = doc.documentElement["clientWidth"];
    var width = doc.compatMode === "CSS1Compat" && docwindowProp 
                || doc.body && doc.body["clientWidth"] 
                || docwindowProp;
    
    // instance checks if breakpoints have changed and triggers accordingly
    instance.cur = breakpoints.getCurrentBreakPoint(instance.arr, width);
    if (instance.old != instance.cur) {
      var i, inBetweenBreakPoints = [];
      // Find all the breakpoints that have been crossed and trigger the event as well
      for (i = 0; i < instance.arr.length; i++) {
        var el = instance.arr[i]; 
        if (el >= instance.old && el <= instance.cur || el >= instance.cur && el <= instance.old) {
          inBetweenBreakPoints.push(el);
        }
      }
      if (instance.cur < instance.old) {
        inBetweenBreakPoints = inBetweenBreakPoints.reverse();
      }
      for (i = 0; i < inBetweenBreakPoints.length; i++) {
        instance.trigger(inBetweenBreakPoints[i]);
      }
      instance.old = instance.cur;
    }
  }
  
  // Utility function to get the value that is the highest in an array below or equal the given value
  // Defaults to 0
  // breakpoints.getCurrentBreakPoint([100, 200, 300, 400], 250) -> 200
  // breakpoints.getCurrentBreakPoint([100, 200, 300, 400], 25)  -> 0
  breakpoints.getCurrentBreakPoint = function(breakpoints, width) {
    for (var i = 0; i < breakpoints.length; i++) {
      if (width >= breakpoints[i] && ( breakpoints.length == i + 1 || width < breakpoints[i+1] )) {
        return breakpoints[i];
      }
    }
    return 0;
  };
  
  // These functions are are used to bind and trigger callbacks of breakpoint events
  Breakpoints.prototype.bind = function(func) {
    var instance = this;
    instance.fnc.push(func);
    if (instance.hst.length) {
      for (var i = 1; i < instance.hst.length; i++) {
        func(instance.hst[i-1], instance.hst[i])
      }
    }
  }
  
  Breakpoints.prototype.trigger = function(value) {
    var instance = this;
    for (var i = 0; i < instance.fnc.length; i++) {
      if (instance.hst.length > 0 
          && instance.hst[instance.hst.length-1] != value) {
        instance.fnc[i](instance.hst[instance.hst.length-1], value)
      }
    }
    if (instance.hst[instance.hst.length-1] != value) {
      instance.hst.push(value);
    }
  }
})(this);

// Move Elements in the DOM when a certain breakpoint is crossed

function relocate(breakPoint, destinationElement, elements) {
  // ensure that we use an array-like argument, NodeList and HTMLCollection work as well
  if (elements instanceof Element) elements = [elements];
  var placeHolders = [],
      els = [], 
      parentEl, el, i,
      l = elements.length;
  // first, create a non-live copy of the elements
  for (i = l-1; i >= 0; i--) {
    els.push(elements[i]);
  }
  // then create a Breakpoints object that operates on it:
  return breakpoints(breakPoint, function(oldPoint, newPoint) {
    if (oldPoint < newPoint && newPoint == breakPoint) {
      for (i = 0; i < l; i++) {
        parentEl = els[i].parentNode;
        if (placeHolders[i] === undefined) {
          placeHolders[i] = document.createElement("span");
          parentEl.insertBefore(placeHolders[i], els[i]);
        }
        el = parentEl.removeChild(els[i]);
        destinationElement.insertBefore(el, destinationElement.firstChild);
      }
    }
    if (oldPoint > newPoint && oldPoint == breakPoint) {
      for (i = 0; i < l; i++) {
        parentEl = els[i].parentNode;
        el = parentEl.removeChild(els[i]);
        placeHolders[i].parentNode.insertBefore(el, placeHolders[i]);
      }
    }
  });
}
