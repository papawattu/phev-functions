'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //import firebase from 'firebase'


_firebaseAdmin2.default.initializeApp({
    credential: _firebaseAdmin2.default.credential.applicationDefault(),
    databaseURL: 'https://phev-db3fa.firebaseio.com',
    projectId: 'phev-db3fa'
});

const RegisterStore = (auth, register) => {
    const store = new Array(255);

    return {
        set: register => {
            _firebaseAdmin2.default.database().ref('registers').child(register.register).set({ data: register.data, updated: new Date().toJSON() });

            store[register.register] = { data: register.data };
        },
        get: id => Promise.resolve(store[id]),
        has: (() => {
            var _ref = _asyncToGenerator(function* (id) {
                return (yield get(id)) !== undefined;
            });

            return function has(_x) {
                return _ref.apply(this, arguments);
            };
        })()
    };
};

exports.default = RegisterStore;