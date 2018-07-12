const devEvents = require('./lib/app').default

exports.dev_events = (event, callback) => {

  require('./lib/app').default(event.data)

  callback()
}
exports.operations = require('./lib/operations').default