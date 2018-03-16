/**
 * Created by Aashish on 5/13/2017.
 */
var domUtility = (function () {
  'use strict';

  var getAncestorBySelector = function (node, selectors) {
    var possibleAncestors = document.querySelectorAll(selectors);

    for (var index = 0; index < possibleAncestors.length; index++) {
      var walker = document.createTreeWalker(possibleAncestors[index], NodeFilter.SHOW_ELEMENT, null);
      while (walker.nextNode()) {
        if (walker.currentNode === node) {
          return possibleAncestors[index];
        }
      }
    }

    return null; // default fallback
  };

  var getSiblingsBySelector = function (node, selectors) {
    var nodeParent = node.parentNode;
    var possibleSiblings = nodeParent.querySelectorAll(selectors);

    // below statement filters and returns the array of siblings
    return [].filter.call(possibleSiblings, function (psNode) {
      return (psNode.parentNode === nodeParent && psNode !== node);
    });
  };

  var insertAfter = function (newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextElementSibling);
  };

  var swapElements = function (element1, element2) {
    var cloneElement1 = element1.cloneNode(true);
    var cloneElement2 = element2.cloneNode(true);

    var parentElement1 = element1.parentNode;
    var parentElement2 = element2.parentNode;

    var replacedElement1 = parentElement1.replaceChild(cloneElement2, element1);
    var replacedElement2 = parentElement2.replaceChild(cloneElement1, element2);
    return (replacedElement1 === element1 && replacedElement2 === element2);
  };

  var removeAll = function (selectors) {
    var elements = document.querySelectorAll(selectors);
    return [].map.call(elements, function (toRemove) {
      return toRemove.parentNode.removeChild(toRemove);
    });
  };

  return {
    getAncestorBySelector: getAncestorBySelector,
    getSiblingsBySelector: getSiblingsBySelector,
    insertAfter: insertAfter,
    swapElements: swapElements,
    removeAll: removeAll
  };

})();