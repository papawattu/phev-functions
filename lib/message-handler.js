'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _encoder_decoder = require('./encoder_decoder');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { setRegister } = (0, _store2.default)();

const messageHandler = (message, cb) => {
    (0, _encoder_decoder.toMessageArray)(message).map(_encoder_decoder.decode).map(setRegister);
    cb();
};

exports.default = messageHandler;