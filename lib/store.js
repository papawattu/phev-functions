'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp({
    apiKey: 'AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE',
    authDomain: 'phev-db3fa.firebaseapp.com',
    databaseURL: 'https://phev-db3fa.firebaseio.com',
    projectId: 'phev-db3fa',
    storageBucket: 'phev-db3fa.appspot.com',
    messagingSenderId: '557258334399'
});

const RegisterStore = register => {
    const store = new Array(255);

    return {
        set: register => {
            _firebase2.default.database().ref('registers').child(register.register).set({ data: register.data, updated: new Date().toJSON() });

            store[register.register] = { data: register.data };
        },
        get: id => Promise.resolve(store[id])
    };
};

exports.default = RegisterStore;