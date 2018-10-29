import EventEmitter from 'events'

const env = process.env.ENV || 'local'
const projectId = process.env.PROJECTID || 'phev-db3fa'

class DeviceEvents extends EventEmitter {
    constructor(deps) {
        super()
        this.store = deps.store
        this.pubsub = deps.pubsub
        this.event = this.event.bind(this)
    }
    subscribe(args) {
        const { callerId, deviceId, callback } = args
        const topicName = `projects/${projectId}/topics/my-device-events`
        const subscriptionName = `${env}-${callerId}-${deviceId}-subscription`

        this.pubsub
            .topic(topicName)
            .createSubscription(subscriptionName)
                .then(results => {
                    const subscription = results[0]
                    //this.event = this.event.bind(this)
                    subscription.on('message', this.event)
                    this.on(deviceId, callback)
                    //this.emitter.addListener("test", this.handleTestEvent)
                    this.store.set(subscriptionName, { deviceId, callback,  subscription, callerId})
                })
                .catch(err => {
                    console.error('ERROR:', err)
                })
    }
    event(message) {
        
        this.emit(message.attributes.deviceId,{ deviceId : message.attributes.deviceId,...JSON.parse(message.data) })
        message.ack()
    }
}

export default DeviceEvents