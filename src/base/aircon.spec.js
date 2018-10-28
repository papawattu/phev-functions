import chai from 'chai'
import AirCon from './aircon'
import sinon from 'sinon'
import Cache from 'cache-base'


const assert = chai.assert

describe('Air Con', () => {
    let sandbox = null;
    let device = { get : () => null }
    let deviceNoDevice = { get : () => null }
    let events = { subscribe : () => null }
    let store = null 
    let storeHasDevice = { has : () => null }


    beforeEach(() => {
        store = new Cache()
        
        sandbox = sinon.createSandbox();

        sandbox.stub(device,'get').resolves({ deviceId: '123' })
        sandbox.stub(deviceNoDevice,'get').resolves(null)
        sandbox.stub(events,'subscribe').resolves(true)

    })
    afterEach(() => {
        sandbox.restore()
    })
    it('Should bootstrap', () => {
        
        //assert.isNotNull(aircon())
    })
    it('Should call get device', async () => {
        const request = {
            jwt : '1234',
            device: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        aircon.status(request)
        
        assert(deps.device.get.calledOnce,'Should call get device')
        
    })
    it('Should handle no device', async () => {
        const request = {
            jwt : '1234',
            device: '1234'
        }
        const deps = {
            device : deviceNoDevice,
            store
        }
        
        const aircon = new AirCon(deps)
        
        aircon.status(request)
        
        assert(deps.device.get.calledOnce,'Should call get device')
        
    })
    it('Should call get device with correct args', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        await aircon.status(request)
        
        assert(deps.device.get.calledWith({ jwt : '1234', deviceId : '123'}),'Should call get device with correct args')
        
    })
    it('Should return null status', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        const response = await aircon.status(request)
        
        assert.deepEqual(response, { status : null})
    })
    it('Should handle event', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        await aircon.handleEvent({ deviceId : '123', register : 26, data : [0,1]})
        
    })
    it('Should return on status', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        aircon.handleEvent({ deviceId : '123', register : 26, data : [0,1]})

        const response = await aircon.status(request)
        
        assert.deepEqual(response, { status : 'on'})
    })
    it('Should return off status', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        aircon.handleEvent({ deviceId : '123', register : 26, data : [0,0]})

        const response = await aircon.status(request)
        
        assert.deepEqual(response, { status : 'off'})
    })
    it('Should only handle aircon registers', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            store
        }
        
        const aircon = new AirCon(deps)
        
        aircon.handleEvent({ deviceId : '123', register : 27, data : [0,0]})

        const response = await aircon.status(request)
        
        assert.deepEqual(response, { status : null})
    })
    it('Should add device event listener', async () => {
        const deps = {
            device,
            events,
            store
        }
        
        const aircon = new AirCon(deps)

        await aircon.subscribe({ deviceId : '123' })
        
        assert(deps.events.subscribe.calledWith({ deviceId : '123', aircon : aircon }))
    })
    it('Should not subscribe twice', async () => {
        const deps = {
            device,
            events,
            store
        }
        
        store.set('123', {status : 'off'})

        store.get('123')
        const aircon = new AirCon(deps)
     
        await aircon.subscribe({ deviceId : '123' })
        
        assert(deps.events.subscribe.notCalled,'Should not call subscribe twice')
    })
    
})

