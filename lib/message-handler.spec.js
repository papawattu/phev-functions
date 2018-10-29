'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _messageHandler = require('./message-handler');

var _messageHandler2 = _interopRequireDefault(_messageHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assert = _chai2.default.assert;

describe('Message Handler', () => {
    it('Should bootstrap', done => {
        const handler = (0, _messageHandler2.default)(Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff, 0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]), () => {
            done();
        });
    });
    it('Should bootstrap', done => {
        const handler = (0, _messageHandler2.default)(Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff, 0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]), () => {
            done();
        });
    });
});