const traverseObject = require('./traverseObject');
const {cloneDeep} = require('lodash');

module.exports = function cleanSchema(config) {
  config = cloneDeep(config);

  traverseObject(config, {
    enter(object) {
      delete object.env;
      delete object.envSeparator;
    }
  });

  return config;
};
