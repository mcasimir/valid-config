# valid-config

Define and validate configuration with an extended json schema.

## Install

```
npm install --save valid-config
```

## Usage

### Inject env

``` js
const validConfig = require('valid-config');
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
```

### Load and merge

``` js
const validConfig = require('valid-config');
process.env.FOO = 'bar';

const configFile1 = {
  baz: 'xyz'
};

const configFile2 = {
  baz: 'jkw'
};

const config = validConfig({
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      env: 'FOO'
    }
  }
}, configFile1, configFile2);

deepEqual(config, {
  foo: 'bar',
  baz: 'jkw'
});
```

### Defaults

``` js
const validConfig = require('valid-config');
const config = validConfig({
  type: 'object',
  properties: {
    port: {
      type: 'number',
      env: 'PORT',
      default: 3000
    }
  }
});

deepEqual(config, {
  port: 3000
});
```

### Env always takes precedence over the rest

``` js
process.env.PORT = '3001';

const configFile1 = {
  port: 8000
};

const validConfig = require('valid-config');
const config = validConfig({
  type: 'object',
  properties: {
    port: {
      type: 'number',
      env: 'PORT',
      default: 3000
    }
  }
});

deepEqual(config, {
  port: 3001
});
```

### Normalize types

``` js
const validConfig = require('valid-config');
process.env.PORT = '3000';

const config = validConfig({
  type: 'object',
  properties: {
    port: {
      type: 'number',
      env: 'PORT'
    }
  }
});

deepEqual(config, {
  port: 3000
});
```

### Load arrays from env

``` js
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
```

### Load arrays from env (specify the separator)

``` js
process.env.FOO = 'bar::baz';

const config = validConfig({
  type: 'object',
  properties: {
    foo: {
      type: 'array',
      items: {
        type: 'string'
      },
      env: 'FOO'
      envSeparator: '::'
    }
  }
});

deepEqual(config, {
  foo: ['bar', 'baz']
});
```

### Validating required properties

``` js
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
```

### Validating arrays

``` js
throws(function() {
  const configFile = {};

  validConfig({
    type: 'object',
    properties: {
      foo: {
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 1
      }
    }
  }, configFile);
});
```
