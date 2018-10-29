'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _deviceRegistry = require('./device-registry');

var _deviceRegistry2 = _interopRequireDefault(_deviceRegistry);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _cacheBase = require('cache-base');

var _cacheBase2 = _interopRequireDefault(_cacheBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const assert = _chai2.default.assert;

describe('Device Registry', () => {
    let sandbox = null;
    let store = null;
    let jwt = { verify: () => null };
    let jwtInvalid = { verify: () => null };
    let jwtDifferentUser = { verify: () => null };

    beforeEach(() => {
        store = new _cacheBase2.default();

        sandbox = _sinon2.default.createSandbox();

        sandbox.stub(jwt, 'verify').returns({ sub: 123 });
        sandbox.stub(jwtDifferentUser, 'verify').returns({ sub: 124 });
        sandbox.stub(jwtInvalid, 'verify').rejects({ error: 'Not authorised' });

        //sandbox.stub(deviceNoDevice,'get').resolves(null)
        //sandbox.stub(events,'subscribe').resolves(true)
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should bootstrap', () => {

        assert.isNotNull(new _deviceRegistry2.default({ store }));
    });
    it('Should get device', _asyncToGenerator(function* () {
        const deps = {
            jwt,
            store
        };

        const deviceRegistry = new _deviceRegistry2.default(deps);

        const device = deviceRegistry.get({ deviceId: '123', jwt: 'xxxx' });

        assert.isNotNull(device);
    }));
    it('Should get device details', _asyncToGenerator(function* () {

        const deps = {
            jwt,
            store
        };

        const deviceRegistry = new _deviceRegistry2.default(deps);
        deps.store.set('123', { deviceId: '123', uid: 123 });

        const device = yield deviceRegistry.get({ deviceId: '123', jwt: 'xxxx' });

        assert.deepInclude(device, { deviceId: '123' });
    }));
    it('Should return undefined if not found', _asyncToGenerator(function* () {

        const deps = {
            jwt,
            store
        };

        const deviceRegistry = new _deviceRegistry2.default(deps);

        const device = yield deviceRegistry.get({ deviceId: '123', jwt: 'xxxx' });

        assert.isUndefined(device);
    }));
    it('Should reject if invalid JWT', _asyncToGenerator(function* () {

        const deps = {
            jwt: jwtInvalid,
            store
        };

        const deviceRegistry = new _deviceRegistry2.default(deps);

        try {
            yield deviceRegistry.get({ deviceId: '123', jwt: 'yyyyy' });
            throw new Error('Should not get here');
        } catch (err) {

            assert.isNotNull(err);
        }
    }));
    it('Should reject if user not allowed to control device', done => {

        const deps = {
            jwt: jwtDifferentUser,
            store
        };

        deps.store.set('123', { deviceId: '123', uid: 123 });

        const deviceRegistry = new _deviceRegistry2.default(deps);

        try {
            deviceRegistry.get({ deviceId: '123', jwt: 'yyyyy' }).then(x => {
                assert.fail('Should not get here and returned ' + JSON.stringify(x));
                done();
            }).catch(err => {
                assert.deepEqual(err, { error: 'Not Authorised' });
                done();
            });
        } catch (err) {
            assert.fail('Should not get here and returned ' + JSON.stringify(err));
            done();
        }
    });
});