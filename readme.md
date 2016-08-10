# load-environment

Very often your environment variables are saved in json files named after the environment like `development.json`, `staging.json`, `production.json`, etc.

This module takes whatever is in `process.env.NODE_ENV` and uses that to load the appropriate json file. If `process.env.NODE_ENV` is not set it uses `development`.

If environment file is not found in current folder the module will go up to the parent folder, etc, etc, until it is found. If not found `load-environment` will throw an error.

## Installation

```
$ npm install load-environment --save
```

## Usage

### For development

Normally the `NODE_ENV` environment variable wouldn't be set in development, but `load-environment` tries to load `development.json`.

**development.json**

``` json
{
  "foo": "bar"
}
```

** index.js ***

``` js
console.log(process.env.foo) // undefined
require('load-environment')
console.log(process.env.foo) // "bar"
```

### For other environments

Assumes the `NODE_ENV` environment variable is set, and loads from that one.
