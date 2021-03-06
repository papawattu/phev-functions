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
    let jwtDifferentUser = { verify : () => null }

    beforeEach(() => {
        store = new Cache()
        
        sandbox = sinon.createSandbox();

        sandbox.stub(jwt,'verify').returns({sub : 123})
        sandbox.stub(jwtDifferentUser,'verify').returns({sub : 124})
        sandbox.stub(jwtInvalid,'verify').rejects({error : 'Not authorised'})
        
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
        deps.store.set('123', { deviceId : '123', uid : 123 })
        
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
    it('Should reject if user not allowed to control device', done => {
    
        const deps = {
            jwt : jwtDifferentUser,
            store
        }
    
        deps.store.set('123', { deviceId : '123', uid : 123 })

        const deviceRegistry = new DeviceRegistry(deps)
        
        try {
            deviceRegistry.get({ deviceId : '123', jwt : 'yyyyy' })
                .then(x => {
                    assert.fail('Should not get here and returned ' + JSON.stringify(x))
                    done()
                })
                .catch(err => {
                    assert.deepEqual(err,{ error : 'Not Authorised'})
                    done()
                })
        } catch (err) {
            assert.fail('Should not get here and returned ' + JSON.stringify(err))
            done()
        }
        
    })
})