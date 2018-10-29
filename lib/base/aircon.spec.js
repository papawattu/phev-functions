'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _aircon = require('./aircon');

var _aircon2 = _interopRequireDefault(_aircon);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _cacheBase = require('cache-base');

var _cacheBase2 = _interopRequireDefault(_cacheBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const assert = _chai2.default.assert;

describe('Air Con', () => {
    let sandbox = null;
    let device = { get: () => null };
    let deviceNoDevice = { get: () => null };
    let deviceReject = { get: () => Promise.reject({ Error: 'some error' }) };
    let events = { subscribe: () => null, on: () => null };
    let store = null;

    beforeEach(() => {
        store = new _cacheBase2.default();

        sandbox = _sinon2.default.createSandbox();

        sandbox.stub(device, 'get').resolves({ deviceId: '123' });
        sandbox.stub(deviceNoDevice, 'get').resolves(null);
        sandbox.stub(events, 'subscribe').resolves(true);
        sandbox.stub(events, 'on'); //.resolves(true)
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should bootstrap', () => {

        //assert.isNotNull(aircon())
    });
    it('Should call get device', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            device: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        aircon.status(request);

        assert(deps.device.get.calledOnce, 'Should call get device');
    }));
    it('Should handle no device', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            device: '1234'
        };
        const deps = {
            device: deviceNoDevice,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        const response = yield aircon.status(request);

        assert.deepEqual(response, { response: 'device not found' });
        assert(deps.device.get.calledOnce, 'Should call get device');
    }));
    it('Should handle device rejection', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            device: '1234'
        };
        const deps = {
            device: deviceReject,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        try {
            aircon.status(request);

            throw new Error('Should not get here');
        } catch (err) {
            assert(err);
        }
    }));
    it('Should call get device with correct args', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        yield aircon.status(request);

        assert(deps.device.get.calledWith({ jwt: '1234', deviceId: '123' }), 'Should call get device with correct args');
    }));
    it('Should return null status', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        const response = yield aircon.status(request);

        assert.deepEqual(response, { status: null });
    }));
    it('Should handle event', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        yield aircon.handleEvent({ deviceId: '123', register: 26, data: [0, 1] });
    }));
    it('Should return on status', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        aircon.handleEvent({ deviceId: '123', register: 26, data: [0, 1] });

        const response = yield aircon.status(request);

        assert.deepEqual(response, { status: 'on' });
    }));
    it('Should return off status', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        aircon.handleEvent({ deviceId: '123', register: 26, data: [0, 0] });

        const response = yield aircon.status(request);

        assert.deepEqual(response, { status: 'off' });
    }));
    it('Should only handle aircon registers', _asyncToGenerator(function* () {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store,
            events
        };

        const aircon = new _aircon2.default(deps);

        aircon.handleEvent({ deviceId: '123', register: 27, data: [0, 0] });

        const response = yield aircon.status(request);

        assert.deepEqual(response, { status: null });
    }));
    it('Should add device event listener', _asyncToGenerator(function* () {
        const deps = {
            device,
            events,
            store
        };

        const aircon = new _aircon2.default(deps);

        yield aircon.subscribe({ deviceId: '123' });

        assert(deps.events.on.calledWith('123', aircon.handleEvent));
    }));
    it('Should not subscribe twice', _asyncToGenerator(function* () {
        const deps = {
            device,
            events,
            store
        };

        store.set('123', { status: 'off' });

        store.get('123');
        const aircon = new _aircon2.default(deps);

        yield aircon.subscribe({ deviceId: '123' });

        assert(deps.events.subscribe.notCalled, 'Should not call subscribe twice');
    }));
    it('Should emit status on event', done => {
        const request = {
            jwt: '1234',
            deviceId: '123'
        };
        const deps = {
            device,
            store
        };

        const aircon = new _aircon2.default(deps);

        aircon.on('aircon', x => {
            assert.deepEqual(x, { status: 'on' });
            done();
        });

        aircon.handleEvent({ deviceId: '123', register: 26, data: [0, 1] });

        aircon.status(request);
    });
});