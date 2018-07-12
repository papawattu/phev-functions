import { encode, decode, toMessageArray } from './encoder_decoder'
import Store from './store'

const { setRegister } = Store()

const messageHandler = (message, cb) => {
    toMessageArray(message).map(decode).map(setRegister)
    cb()
}

export default messageHandler