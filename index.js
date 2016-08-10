var fs = require('fs')

var environmentName = process.env.NODE_ENV || 'development'
var filename = './' + environmentName + '.json'

var exists = fs.existsSync(filename)

if (!exists) throw new Error('No environment file for ' + environmentName)

var environment = require(filename)
Object.keys(environment).forEach(function (key) {
  process.env[key] = environment[key]
})
