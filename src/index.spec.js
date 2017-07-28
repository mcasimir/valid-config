const {deepEqual, throws} = require('assert');
const validConfig = require('.');

describe('valid-config', function() {
  beforeEach(function() {
    delete process.env.FOO;
  });

  it('normalizes config from env', function() {
    process.env.FOO = 'bar';

    const config = validConfig({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          env: 'FOO'
        }
      }
    });

    deepEqual(config, {
      foo: 'bar'
    });
  });

  it('normalizes config from env array', function() {
    process.env.FOO = 'bar,baz';

    const config = validConfig({
      type: 'object',
      properties: {
        foo: {
          type: 'array',
          items: {
            type: 'string'
          },
          env: 'FOO'
        }
      }
    });

    deepEqual(config, {
      foo: ['bar', 'baz']
    });
  });

  it('validates config (arrays)', function() {
    throws(function() {
      validConfig({
        type: 'object',
        properties: {
          foo: {
            type: 'array',
            items: {
              type: 'string'
            },
            env: 'FOO',
            minItems: 1
          }
        }
      });
    });
  });

  it('validates config (string)', function() {
    throws(function() {
      validConfig({
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            env: 'FOO'
          }
        },
        required: [
          'foo'
        ]
      });
    });
  });
});
