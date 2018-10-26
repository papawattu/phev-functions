'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin2.default.initializeApp({
    credential: _firebaseAdmin2.default.credential.applicationDefault(),
    databaseURL: 'https://phev-db3fa.firebaseio.com',
    projectId: 'phev-db3fa'
}); //import firebase from 'firebase'


const RegisterStore = (auth, register) => {
    const store = new Array(255);

    return {
        set: register => {
            _firebaseAdmin2.default.database().ref('registers').child(register.register).set({ data: register.data, updated: new Date().toJSON() });

            store[register.register] = { data: register.data };
        },
        get: id => Promise.resolve(store[id])
    };
};

exports.default = RegisterStore;