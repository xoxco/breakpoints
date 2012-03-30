(function(){
  // Adapted from Dustin Diaz Code:
  function getElementsByClass(searchClass,node,tag) {
    if ( node == null ) node = document;
    if ( tag == null ) tag = '*';
    if ( document.getElementsByClassName ) {
      return node.getElementsByClassName(searchClass);
    } else {
      var els = node.getElementsByTagName(tag);
      var classElements = new Array();
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (i = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
          classElements.push(els[i]);
        }
      }
      return classElements;
    }
  }

  moveElements = function(breakPoint, destinationElement, sourceClassName, sourceWrapperElement, sourceTagName) {
    var elements = getElementsByClass(sourceClassName, sourceWrapperElement, sourceTagName);
    var placeHolders = [];
    breakpoints.bind(function(oldPoint, newPoint) {
      if (oldPoint < newPoint && newPoint == breakPoint) {
        for (var i = elements.length-1; i >= 0; i--) {
          var parentEl = elements[i].parentElement;
          if (placeHolders[i] === undefined) {
            placeHolders[i] = document.createElement("span");
            parentEl.insertBefore(placeHolders[i], elements[i]);
          }
          var el = parentEl.removeChild(elements[i]);
          destinationElement.insertBefore(el, destinationElement.firstChild);
        }
      }
      if (oldPoint > newPoint && oldPoint == breakPoint) {
        var l = elements.length-1;
        var removedEls = [];
        for (var i = l; i >= 0; i--) {
          var parentEl = elements[i].parentElement;
          removedEls[i] = parentEl.removeChild(elements[i]);
        }
        for (var i = l; i >= 0; i--) {
          placeHolders[i].parentElement.insertBefore(removedEls[i], placeHolders[i]);
        }
      }
    });
  }

})();
