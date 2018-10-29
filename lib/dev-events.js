'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { getRegister } = (0, _store2.default)();

const devEvents = data => {

    getRegister(1).then(data => {
        console.log(data);
    });
};

exports.default = devEvents;