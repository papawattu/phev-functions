import { EventEmitter } from 'events'

class AirCon extends EventEmitter {
    constructor(deps) {
        super()
        this.device = deps.device
        this.events = deps.events
        this.store = deps.store
    }
    async status(args) {
        const { jwt, deviceId } = args
        
        const device = await this.device.get({jwt , deviceId})

        if(!device) {
            return { error : 'device not found'}
        }

        const isCached = await this.store.has(deviceId)

        if(isCached) {
            return this.store.get(deviceId)
        }
        return { status : null }
    }
    async subscribe(args) {
        const { deviceId } = args
        
        const deviceAlreadySubcribed = await this.store.has(deviceId)
        
        if(!deviceAlreadySubcribed)
        {
            return this.events.subscribe({ deviceId : deviceId, aircon : this })
        }
    }
    handleEvent(event) {
        
        const { deviceId, register, data } = event

        if(register === 26) {
            if(data[1] === 1) {
                this.store.set(deviceId, { status : 'on'})
            } else {
                this.store.set(deviceId, { status : 'off'})
            }
        }
    } 
}

export default AirCon 