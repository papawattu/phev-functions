import chai from 'chai'
import DeviceRegistry from './device-registry'
import sinon from 'sinon'
import Cache from 'cache-base'


const assert = chai.assert

describe('Device Registry', () => {
    let sandbox = null
    let store = null 
    let jwt = { verify : () => null }
    let jwtInvalid = { verify : () => null }

    beforeEach(() => {
        store = new Cache()
        
        sandbox = sinon.createSandbox();

        sandbox.stub(jwt,'verify').returns(true)
        sandbox.stub(jwtInvalid,'verify').returns(false)
        
        //sandbox.stub(deviceNoDevice,'get').resolves(null)
        //sandbox.stub(events,'subscribe').resolves(true)

    })
    afterEach(() => {
        sandbox.restore()
    })
    it('Should bootstrap', () => {
        
        assert.isNotNull(new DeviceRegistry({ store }))
    })
    it('Should get device', async () => {
        const deps = {
            jwt,
            store
        }
        
        const deviceRegistry = new DeviceRegistry(deps)
        
        const device = deviceRegistry.get({ deviceId : '123', jwt : 'xxxx' })
        
        assert.isNotNull(device)

    })
    it('Should get device details', async () => {
    
        const deps = {
            jwt,
            store
        }
    
        const deviceRegistry = new DeviceRegistry(deps)
        deps.store.set('123', { deviceId : '123' })
        
        const device = await deviceRegistry.get({ deviceId : '123', jwt : 'xxxx' })
        
        assert.deepInclude(device, { deviceId : '123' })
        
    })
    it('Should return undefined if not found', async () => {
    
        const deps = {
            jwt,
            store
        }
    
        const deviceRegistry = new DeviceRegistry(deps)
        
        const device = await deviceRegistry.get({ deviceId : '123', jwt : 'xxxx' })
        
        assert.isUndefined(device)
        
    })
    it('Should reject if invalid JWT', async () => {
    
        const deps = {
            jwt : jwtInvalid,
            store
        }
    
        const deviceRegistry = new DeviceRegistry(deps)
        
        try {
            await deviceRegistry.get({ deviceId : '123', jwt : 'yyyyy' })
            throw new Error('Should not get here')
        } catch (err) {
            
            assert.isNotNull(err)
        }
        
    })
})