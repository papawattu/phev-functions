import chai from 'chai'
import DeviceEvents from './device-event'
import sinon from 'sinon'
import Cache from 'cache-base'


const assert = chai.assert

describe('Device Events', () => {
    let sandbox = null
    let store = null 
    let pubsub = { topic : () => ({ createSubscription : () => Promise.resolve([{ on : ()=> undefined}])}) }
    //let jwtInvalid = { verify : () => null }
    //let jwtDifferentUser = { verify : () => null }

    beforeEach(() => {
        store = new Cache()
        
        sandbox = sinon.createSandbox()

    //    sandbox.stub(jwt,'verify').returns({sub : 123})
    //    sandbox.stub(jwtDifferentUser,'verify').returns({sub : 124})
    //    sandbox.stub(jwtInvalid,'verify').rejects({error : 'Not authorised'})
        
        //sandbox.stub(deviceNoDevice,'get').resolves(null)
        //sandbox.stub(events,'subscribe').resolves(true)

    })
    afterEach(() => {
        sandbox.restore()
    })
    it('Should bootstrap', () => {
        
        assert.isNotNull(new DeviceEvents({ store, pubsub }))
    })
    it('Should subscribe to device', async () => {
        
        const deviceEvents = new DeviceEvents({ store, pubsub })
        const func = () => null

        await deviceEvents.subscribe({callerId : 'aircon', deviceId : '123', callback : func})

        assert.isTrue(store.has('local-aircon-123-subscription'))
        assert.equal(func, store.get('local-aircon-123-subscription').callback)
    })
})
