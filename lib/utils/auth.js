'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verify = token => _firebaseAdmin2.default.auth().verifyIdToken(token); /*
                                                                             import { OAuth2Client } from 'google-auth-library'
                                                                             
                                                                             const clientId = '557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com'
                                                                             const client = new OAuth2Client(clientId)
                                                                             
                                                                             const verify = token => 
                                                                                 client.verifyIdToken({
                                                                                     idToken: token,
                                                                                     audience: clientId,  
                                                                                 })
                                                                             */

exports.verify = verify;