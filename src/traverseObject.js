const {forIn, isObject, isArray} = require('lodash');
const noop = function() {};

function traverseObject(node, visit, key, parent) {
  const enter = visit.enter || noop;
  const leave = visit.leave || noop;

  enter(node, key, parent);

  if (node && isArray(node) || isObject(node)) {
    forIn(node, function(child, childKey) {
      if (Array.isArray(node)) {
        childKey = parseInt(childKey, 10);
      }
      traverseObject(child, visit, childKey, node);
    });
  }

  leave(node, key, parent);
}

module.exports = traverseObject;
