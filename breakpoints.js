/*
	Breakpoints.js
	version 2.0
	
	Creates handy events for your responsive design breakpoints
	
	Copyright 2011-2012 XOXCO, Inc
	http://xoxco.com/

	Version 2.0 rewrite by Eike Send
	http://eike.se/nd

	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

*/
(function($) {
  
  $.getCurrentBreakPoint = function(breakpoints, width) {
    for (var bp in breakpoints) {
      bp = parseInt(bp);
      if (width >= breakpoints[bp] && ( breakpoints.length == bp + 1 || width < breakpoints[bp+1] )) {
        return breakpoints[bp];
      }
    }
    return 0;
  };
  
  $.fn.breakpoints = function(breakpoints) {
    
    var oldBP = currentBP = -1; 
    breakpoints = breakpoints.sort(function(a,b){return a-b});
    
    var lastCall = 0,
      resizeDefer, 
      resizeThrottle = 30;
    
    var checkBreakPoints = function(fromResize) {
      
      // This throttles the calls to this function and still allows immediate reaction
      var now = (new Date()).getTime();
      if( fromResize && lastCall && now - lastCall < resizeThrottle ){
        clearTimeout( resizeDefer );
        resizeDefer = setTimeout( checkBreakPoints, resizeThrottle );
        return;
      }
      else {
        lastCall = now;
      }
      
      // This checks if breakpoints have changed and triggers accordingly
      var width = $(window).width();
      currentBP = $.getCurrentBreakPoint(breakpoints, width);
      if (oldBP != currentBP) {
        var inBetweenBreakPoints = $.map(breakpoints, function(el) {
          if (el >= oldBP && el <= currentBP || el >= currentBP && el <= oldBP) {
            return el;
          }
          return null
        });
        if (currentBP < oldBP) {
          inBetweenBreakPoints = inBetweenBreakPoints.reverse();
        }
        if (inBetweenBreakPoints.length > 1) { 
          for (var i = 0; i < inBetweenBreakPoints.length-1; i++ ) {
            var bp1 = inBetweenBreakPoints[i]
                bp2 = inBetweenBreakPoints[i+1];
            $(window).trigger('changeBreakpoint', {oldBP: bp1, newBP: bp2 });
            $(window).trigger('changeBreakpoint-' + bp1 + "-" + bp2);
          }
        } else {
          $(window).trigger('changeBreakpoint', {oldBP: 0, newBP: currentBP });
          $(window).trigger('changeBreakpoint-' + 0 + "-" + currentBP);
        }
        oldBP = currentBP;
      }
    }

    function resizeBreakPoints(){
      checkBreakPoints(true);
    }

    $(window).bind("resize", resizeBreakPoints).resize();
    
  };
})(jQuery);
