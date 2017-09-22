const messageHandler = require('./lib/message-handler').default

exports.receiveMessages = (event, callback) => {
  messageHandler(event.data.message,callback)
}