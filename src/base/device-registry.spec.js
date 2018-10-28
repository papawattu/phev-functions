import chai from 'chai'
import DeviceRegistry from './device-registry'
import sinon from 'sinon'
import Cache from 'cache-base'


const assert = chai.assert

describe('Device Registry', () => {
    let sandbox = null;
    let store = null 
    

    beforeEach(() => {
        store = new Cache()
        
        sandbox = sinon.createSandbox();

        //sandbox.stub(device,'get').resolves({ deviceId: '123' })
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
            store
        }
        
        const deviceRegistry = new DeviceRegistry(deps)
        
        const device = deviceRegistry.get('123')
        
        assert.isNotNull(device)

    })
    it('Should get device details', async () => {
    
        const deps = {
            store
        }
    
        store.set('123', { deviceId : '123' })
        const deviceRegistry = new DeviceRegistry(deps)
    
        const device = deviceRegistry.get('123')
        
        console.log(JSON.stringify(device))
        assert.deepEqual(device, { deviceId : '123' })
        
    })
})