import { EventEmitter } from 'events'

class AirCon extends EventEmitter {
    constructor(deps) {
        super()
        this.device = deps.device
        this.events = deps.events
        this.store = deps.store
        this.handleEvent = this.handleEvent.bind(this)
    }
    async status(args) {
        const { jwt, deviceId } = args
        
        try {
            const device = await this.device.get({jwt , deviceId})

            if(!device) {
                return { response : 'device not found'}
            }
    
            const isCached = await this.store.has(deviceId)
    
            if(isCached) {
                return this.store.get(deviceId)
            } else {
                this.subscribe({ deviceId })
                return { status : null }
            }
            
        } catch (err) {
            return err
        }

    }
    async subscribe(args) {
        const { deviceId } = args
        
        const deviceAlreadySubscribed = await this.store.has(deviceId)
        
        if(!deviceAlreadySubscribed)
        {
            
            this.store.set(deviceId, { status : null})
            this.events.subscribe({ deviceId : deviceId, callback : this.handleEvent })
           // this.events.on(deviceId, this.handleEvent)
            
        }
    }
    handleEvent(event) {
        
        const { deviceId, register, data } = event
        if(register === 26) {
            if(data[1] === 1) {
                this.store.set(deviceId, { status : 'on'})
                this.emit('aircon',{ status : 'on' })
            } else {
                this.store.set(deviceId, { status : 'off'})
                this.emit('aircon',{ status : 'off' })
            }
        }
    }
    async update(args) {
        const { status, jwt, deviceId } = args

        try {
            const device = await this.device.get({jwt , deviceId})

            if(!device) {
                return { response : 'device not found'}
            }


        } catch (err) {
            return { error : err}
        }
    
    } 
}

export default AirCon 