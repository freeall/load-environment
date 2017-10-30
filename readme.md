# load-environment

A secure way of setting and loading environment variables in your projects. In this way source code can always assume that environemt variables have been set and don't need to check which environment it is in.

* Put your environment variables into files named after your environment like `development.json`, `staging.json`, `production.json`, etc. These files should be committed into your repository. Do *NOT* put sensitive information into those files.

* Sensitive information goes into `local.json`. This file should be ignored from your repository. Send it around to others by means other than source control.

* In your non-development environments it is assumed that secrets have been put into environment variables in some other (secure) way.

`load-environment` works similar to the way `node_modules` works, by moving upwards the folder structure until it reaches the root. On the way it loads all `local.json` files. It also looks into `process.env.NODE_ENV` and loads files named `${process.env.NODE_ENV}.json`. It defaults to `development.json`.

No environment variables already set will be overwritten.

There will be no errors if no environment files are found.

## Installation

```
$ npm install load-environment --save
```

## Usage

``` js
require('load-environment')
```

At require-time it will load all the environment files it can find.


## Example

In this example a server which will have different host and ports depending on the environment. When developing locally there is a `local.json` which include secrets we don't want to add to our source control.

**development.json**
``` json
{
  "NODE_ENV": "development",
  "HOST": "localhost",
  "PORT": 3000
}
```

**staging.json**
``` json
{
  "HOST": "myapp-staging.herokuapp.com",
  "PORT": 80
}
```

**production.json**
``` json
{
  "HOST": "myapp.com",
  "PORT": 80
}
```

**local.json**
``` json
{
  "AWS_ACCESS_KEY_ID": "abc123123123",
  "AWS_SECRET_ACCESS_KEY": "9234ksdfkj4asdfghjkl"
}
```


### Code example

``` js
console.log(process.env.PORT) // undefined
require('load-environment')
console.log(process.env.PORT) // 3000 or 80, depending on the environment
```
