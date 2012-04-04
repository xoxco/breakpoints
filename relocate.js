// Move Elements in the DOM when a certain breakpoint is crossed
// Requires breakpoints.js
// Copyright: Eike Send http://eike.se/nd
// License: MIT License

function relocate(breakPoint, destinationElement, elements) {
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
