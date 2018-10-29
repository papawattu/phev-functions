'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class DeviceRegistry {
    constructor(deps) {
        //super()
        this.store = deps.store;
        this.jwt = deps.jwt;
    }
    get(args) {
        var _this = this;

        return _asyncToGenerator(function* () {

            const { deviceId, jwt } = args;

            const deviceExists = yield _this.store.has(deviceId);

            if (!deviceExists) {
                return undefined;
            }

            try {
                const decodedJWT = yield _this.jwt.verify(jwt);

                const device = yield _this.store.get(deviceId);

                if (device.uid === decodedJWT.sub) {
                    return device;
                } else {
                    return Promise.reject({ error: 'Not Authorised' });
                }
            } catch (err) {
                return Promise.reject({ error: 'Not Authorised' });
            }
        })();
    }
}

exports.default = DeviceRegistry;