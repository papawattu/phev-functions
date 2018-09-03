'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _googleapis = require('googleapis');

var _pubsub = require('@google-cloud/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _googleAuthLibrary = require('google-auth-library');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientId = '557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com';
const client = new _googleAuthLibrary.OAuth2Client(clientId);

const pubsub = new _pubsub2.default();

const topicName = 'config-change';

const verify = token => client.verifyIdToken({
    idToken: token,
    audience: clientId // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
});

const setCORSHeaders = res => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', '*');
    return res;
};
const handleOptions = (req, res) => {
    if (req.method == 'OPTIONS') {
        res = setCORSHeaders(res);
        res.status(204).send('');
        res.end();
        return true;
    } else {
        return false;
    }
};
const sendConfigUpdate = (req, res) => {
    const dataBuffer = Buffer.from(JSON.stringify(req.body));

    pubsub.topic(topicName).publisher().publish(dataBuffer).then(results => {
        const messageId = results[0];
        res.status(200).send(JSON.stringify({ status: "ok", messageId: messageId }));
    }).catch(err => {
        console.error('ERROR:', err);
        res.status(500).send(JSON.stringify(err));
    });
};

const operations = (req, res) => {

    setCORSHeaders(res);

    if (handleOptions(req, res)) return;

    const authHeader = req.get('Authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (token) {
        verify(token).then(ticket => {
            sendConfigUpdate(req, res);
            console.log(JSON.stringify(ticket));
            res.status(200).send('OK');
        }).catch(err => {
            console.error(err);
            res.status(401).send('Auth failed ' + err);
        });
    } else {
        res.status(401).send('No auth header');
    }
};

exports.default = operations;