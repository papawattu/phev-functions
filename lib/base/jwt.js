'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verify = token => _firebaseAdmin2.default.auth().verifyIdToken(token);

exports.verify = verify;