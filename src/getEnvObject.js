const jsonSchemaDefaults = require('json-schema-defaults');
const {cloneDeep} = require('lodash');
const traverseObject = require('./traverseObject');

module.exports = function getEnvObject(config) {
  config = cloneDeep(config);

  traverseObject(config, {
    enter(object) {
      if (!object) {
        return;
      }

      if (object.env) {
        const {env, envSeparator} = object;
        let value = (process.env[env] || '').trim();

        if (value && object.type === 'array') {
          const separator = envSeparator || ',';
          value = value.split(separator);
        }

        object.default = value || object.default;
      }

      delete object.env;
      delete object.envSeparator;
    }
  });

  return jsonSchemaDefaults(config);
};
