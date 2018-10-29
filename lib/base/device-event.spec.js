'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _deviceEvent = require('./device-event');

var _deviceEvent2 = _interopRequireDefault(_deviceEvent);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _cacheBase = require('cache-base');

var _cacheBase2 = _interopRequireDefault(_cacheBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const assert = _chai2.default.assert;

describe('Device Events', () => {
    let sandbox = null;
    let store = null;
    let pubsub = { topic: () => ({ createSubscription: () => Promise.resolve([{ on: () => undefined }]) })
        //let jwtInvalid = { verify : () => null }
        //let jwtDifferentUser = { verify : () => null }

    };beforeEach(() => {
        store = new _cacheBase2.default();

        sandbox = _sinon2.default.createSandbox();

        //    sandbox.stub(jwt,'verify').returns({sub : 123})
        //    sandbox.stub(jwtDifferentUser,'verify').returns({sub : 124})
        //    sandbox.stub(jwtInvalid,'verify').rejects({error : 'Not authorised'})

        //sandbox.stub(deviceNoDevice,'get').resolves(null)
        //sandbox.stub(events,'subscribe').resolves(true)
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('Should bootstrap', () => {

        assert.isNotNull(new _deviceEvent2.default({ store, pubsub }));
    });
    it('Should subscribe to device', _asyncToGenerator(function* () {

        const deviceEvents = new _deviceEvent2.default({ store, pubsub });
        const func = function () {
            return null;
        };

        yield deviceEvents.subscribe({ callerId: 'aircon', deviceId: '123', callback: func });

        assert.isTrue(store.has('local-aircon-123-subscription'));
        assert.equal(func, store.get('local-aircon-123-subscription').callback);
    }));
});