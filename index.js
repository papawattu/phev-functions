const devEvents = require('./lib/app').default

exports.dev_events = (event, callback) => {

  require('./lib/app').default(event.data)

  callback()
}
exports.operations = require('./lib/operations').default
exports.configChange = require('./lib/config-change').default
exports.alexa  = require('./lib/alexa').default
exports.auth = require('./lib/auth').default
exports.state = require('./lib/state').default