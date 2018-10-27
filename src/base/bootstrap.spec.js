import chai from 'chai'
import bootstrap from './bootstrap'

const assert = chai.assert

describe('Bootstrap', () => {
    it('Should bootstrap', done => {
        bootstrap().start()
        done()
    })
})