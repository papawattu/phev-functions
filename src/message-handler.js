const messageHandler = (message, cb) => {
    console.log('Data ' + message)
    cb()
}

export default messageHandler