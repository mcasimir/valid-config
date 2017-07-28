const Ajv = require('ajv');
const Confine = require('confine');
const {merge} = require('lodash');
const getEnvObject = require('./getEnvObject');
const cleanSchema = require('./cleanSchema');

module.exports = function validConfig(schema, ...objects) {
  const confine = new Confine();
  const jsonSchema = cleanSchema(schema);

  if (!confine.validateSchema(jsonSchema)) {
    throw new Error('Invalid configuration schema');
  }

  const envObject = getEnvObject(schema);

  const configuration = merge(
    merge(...objects),
    envObject
  );

  const normalized = confine.normalize(configuration, jsonSchema);
  const ajv = new Ajv();

  if (!ajv.validate(jsonSchema, normalized)) {
    throw new Error(`Invalid config: ${ajv.errorsText()}`);
  }

  return normalized;
};
