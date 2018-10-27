import chai from 'chai'
import aircon from './aircon'
import sinon from 'sinon'

const assert = chai.assert

describe('Air Con', () => {
    let sandbox = null;
    let device = { get : () => null }
    let events = { subscribe : () => null }

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        sandbox.stub(device,'get').resolves({ status: null })
        sandbox.stub(events,'subscribe').resolves(true)

    })
    afterEach(() => {
        sandbox.restore()
    })
    it('Should bootstrap', () => {
        assert.isNotNull(aircon())
    })
    it('Should call get device', async () => {
        const request = {
            jwt : '1234',
            device: '123'
        }
        const deps = {
            device
        }
        
        await aircon(deps).status(request)
        
        assert(deps.device.get.calledOnce,'Should call get device')
        
    })
    it('Should call get device with correct args', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device
        }
        
        await aircon(deps).status(request)
        
        assert(deps.device.get.calledWith({ jwt : '1234', deviceId : '123'}),'Should call get device with correct args')
        
    })
    it('Should return null status', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device
        }
        
        const response = await aircon(deps).status(request)
        
        assert.deepEqual(response, { status : null})
    })
    it('Should add device event listener', async () => {
        const request = {
            jwt : '1234',
            deviceId: '123'
        }
        const deps = {
            device,
            events
        }
        
        const response = await aircon(deps).status(request)
        
        assert(deps.events.subscribe.calledWith({ deviceId : '123', eventCallback : aircon(deps).eventCallback }))
    })
})

