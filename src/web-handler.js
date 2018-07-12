import Store from './store'

const { getRegister } = Store()

const webHandler = () => ({
    get: register => getRegister(register)
})

export default webHandler