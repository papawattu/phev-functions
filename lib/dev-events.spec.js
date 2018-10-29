'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _devEvents = require('./dev-events');

var _devEvents2 = _interopRequireDefault(_devEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assert = _chai2.default.assert;

describe('Dev Events', () => {
    it('Should bootstrap', done => {
        //    const handler = messageHandler(Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff, 0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]) , () => {
        (0, _devEvents2.default)();
        done();
        //    })
    });
});