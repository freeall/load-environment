var fs = require('fs')
var path = require('path')

var initFilename;
var environmentName = process.env.NODE_ENV || 'development'
var dirname = path.dirname(require.main.filename)
load(dirname, 'local')
load(dirname, environmentName)

function load (dirname, environmentName) {
  var filename = path.join(dirname, environmentName + '.json')
  var exists = fs.existsSync(filename)

  if (!initFilename) initFilename = filename;
  if (exists) {
    var environment = require(filename)
    Object.keys(environment).forEach(function (key) {
      if (process.env[key]) return // Ignore if already set

      process.env[key] = environment[key]
    })
  } else {
    var parentDir = path.dirname(dirname)
    if (dirname === parentDir) throw new Error('No environment file: ' + initFilename + ' (Also checked all parent folders)')
    load(parentDir, environmentName)
  }
}
