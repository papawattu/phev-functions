'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const airConEvent = (event, cb) => {

    const update = JSON.parse(Buffer.from(event.data.data, 'base64').toString());

    if (update.register === 26) {
        if (update.data[1] === 1) {
            console.log('Air con on');
        } else {
            console.log('Air con off');
        }
    }
    cb();
};

exports.default = airConEvent;