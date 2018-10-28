class DeviceRegistry {
    constructor(deps) {
        //super()
        this.store = deps.store
    }
    async get(deviceId) {
        return await this.store.get(deviceId)
    }
}

export default DeviceRegistry