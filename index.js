var fs = require('fs')
var path = require('path')

var environmentName = process.env.NODE_ENV || 'development'
var dirname = path.dirname(module.parent.filename)
load(dirname)

function load (p) {
  var dirname = path.dirname(p)
  var filename = dirname + '/' + environmentName + '.json'
  var exists = fs.existsSync(filename)

  if (exists) {
    var environment = require(filename)
    Object.keys(environment).forEach(function (key) {
      process.env[key] = environment[key]
    })
  } else {
    if (dirname === p) throw new Error('No environment file for ' + environmentName)
    load(dirname)
  }
}
