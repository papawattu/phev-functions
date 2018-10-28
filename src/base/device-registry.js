class DeviceRegistry {
    constructor(deps) {
        //super()
        this.store = deps.store
        this.jwt = deps.jwt
    }
    async get(args) {
        
        const { deviceId, jwt } = args

        const deviceExists = await this.store.has(deviceId)
        if(!deviceExists) {
            return undefined
        }
        
        const validJWT = await this.jwt.verify(jwt)
        if(validJWT) {
            return await this.store.get(deviceId)
        } else {
            return Promise.reject({ error : 'invalid JWT'})
        }
    }
}

export default DeviceRegistry