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
  $.fn.breakpoints = function(breakpoints) {
    
    var oldBP, currentBP;
    
    function getCurrentBreakPoint() { 
      var w = $(window).width();
      for (var bp in breakpoints) {
        bp = parseInt(bp);
        if (w >= breakpoints[bp] && ( breakpoints.length == bp + 1 || w < breakpoints[bp+1] )) {
          return breakpoints[bp];
        }
      }
      return 0;
    }
    
    setInterval(function() {
      currentBP = getCurrentBreakPoint();
      if (oldBP != currentBP) {
        $(window).trigger('changeBreakpoint', {oldBP: oldBP, newBP: currentBP});
        oldBP = currentBP;
      }
    }, 200);
    
  };
})(jQuery);
