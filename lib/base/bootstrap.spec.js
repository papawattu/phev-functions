'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _bootstrap = require('./bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _deviceEvent = require('./device-event');

var _deviceEvent2 = _interopRequireDefault(_deviceEvent);

var _deviceRegistry = require('./device-registry');

var _deviceRegistry2 = _interopRequireDefault(_deviceRegistry);

var _cacheBase = require('cache-base');

var _cacheBase2 = _interopRequireDefault(_cacheBase);

var _pubsub = require('@google-cloud/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _aircon = require('./aircon');

var _aircon2 = _interopRequireDefault(_aircon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const assert = _chai2.default.assert;

describe('Bootstrap', () => {
    it('Should bootstrap', done => {
        (0, _bootstrap2.default)().start();
        done();
    });
    it('Should receive event', _asyncToGenerator(function* () {
        //this.timeout(5000)
        const jwt = { verify: function () {
                return Promise.resolve({ sub: 1 });
            } };
        const deviceEventStore = new _cacheBase2.default();
        const deviceRegistryStore = new _cacheBase2.default();
        const airconStore = new _cacheBase2.default();
        const pubsub = new _pubsub2.default();
        const deviceEvents = new _deviceEvent2.default({ pubsub, store: deviceEventStore });
        const deviceRegistry = new _deviceRegistry2.default({ store: deviceRegistryStore, jwt });
        const aircon = new _aircon2.default({ store: airconStore, device: deviceRegistry, events: deviceEvents });

        //deviceEventStore.set('my-device2',{ uid : 1})
        deviceRegistryStore.set('my-device2', { uid: 1 });

        //const response = await aircon.status(request)
        //deviceEvents.subscribe({callerId : 'aircon', deviceId : 'my-device', callback : message => console.log(JSON.stringify(message))})

        //setInterval(async () => {
        //    const response = await aircon.status({ deviceId : 'my-device2', jwt: 'xxx'})
        //    console.log(response)

        //},1000)
    }));
});