# load-environment

Very often have the environment variables for a specific environment in json files named after the environment, e.g. `development.json`, `staging.json`, `production.json`, etc. 

This module takes whatever is in `process.env.NODE_ENV` and uses that to load the appropriate environment file. If `NODE_ENV` is not set it defaults to `development`.

Before even loading the environment file, it tries to load `local.json`. The reason is that in many cases `local.json` would be in `.gitignore` and contain environment variables you are not keen on sharing.

If the environment file is not found in the current folder it will keep looking in all ancestral folders, similar to the way node loads modules.

No environment variables already set will be overwritten.

There will be no errors if no environment files are found.

## Installation

```
$ npm install load-environment --save
```

## Usage



### For development

If `process.env.NODE_ENV` is not set `load-environment` defaults to `development.json` so it's not needed to be set. It can also be convenient to *not* store somewhat sensitive data in github. These variables should go to `local.json` which you should put in your `.gitignore`.

Note that `local.json` is loaded before `development.json`.

**local.json**

``` json
{
  "SECRET_TOKEN": "yoyoma",
  "SOME_KEY": "text1"
}
```

**development.json**

``` json
{
  "FOO": "bar",
  "SOME_KEY": "text2" // SOME_KEY already exists, so will be ignore
}
```

** index.js ***

``` js
console.log(process.env.FOO) // undefined
require('load-environment')
console.log(process.env.FOO) // "bar"
console.log(process.env.SECRET_TOKEN) // "yoyoma"
console.log(process.env.SOME_KEY) // "text1" - from local.json
```

### For other environments

Assumes the `NODE_ENV` environment variable is set, and loads from that one. Will still try to load `local.json`.

