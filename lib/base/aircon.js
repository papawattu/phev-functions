'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class AirCon extends _events.EventEmitter {
    constructor(deps) {
        super();
        this.device = deps.device;
        this.events = deps.events;
        this.store = deps.store;
        this.handleEvent = this.handleEvent.bind(this);
    }
    status(args) {
        var _this = this;

        return _asyncToGenerator(function* () {
            const { jwt, deviceId } = args;

            try {
                const device = yield _this.device.get({ jwt, deviceId });

                if (!device) {
                    return { response: 'device not found' };
                }

                const isCached = yield _this.store.has(deviceId);

                if (isCached) {
                    return _this.store.get(deviceId);
                } else {
                    _this.subscribe({ deviceId });
                    return { status: null };
                }
            } catch (err) {
                return err;
            }
        })();
    }
    subscribe(args) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const { deviceId } = args;

            const deviceAlreadySubscribed = yield _this2.store.has(deviceId);

            if (!deviceAlreadySubscribed) {

                _this2.store.set(deviceId, { status: null });
                _this2.events.subscribe({ deviceId: deviceId, callback: _this2.handleEvent });
                _this2.events.on(deviceId, _this2.handleEvent);
            }
        })();
    }
    handleEvent(event) {

        const { deviceId, register, data } = event;
        if (register === 26) {
            if (data[1] === 1) {
                this.store.set(deviceId, { status: 'on' });
                this.emit('aircon', { status: 'on' });
            } else {
                this.store.set(deviceId, { status: 'off' });
                this.emit('aircon', { status: 'off' });
            }
        }
    }
    update(args) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const { status, jwt, deviceId } = args;

            try {
                const device = yield _this3.device.get({ jwt, deviceId });

                if (!device) {
                    return { response: 'device not found' };
                }
            } catch (err) {
                return { error: err };
            }
        })();
    }
}

exports.default = AirCon;