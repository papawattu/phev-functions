"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = (0, _store2.default)();

const App = data => {

    const register = JSON.parse(Buffer.from(data.data, 'base64').toString());

    store.set(register);
};

exports.default = App;