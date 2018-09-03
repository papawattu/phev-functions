"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = {
    version: "1.0",
    response: {
        outputSpeech: {
            type: "PlainText",
            text: "Lights On"
        },
        shouldEndSession: true
    }
};
const message = { state: { headLightsOn: true } };

const baseUri = 'https://us-central1-phev-db3fa.cloudfunctions.net';

const alexa = (req, res) => {

    (0, _nodeFetch2.default)(baseUri + '/operations', {
        method: 'POST',
        body: JSON.stringify(message),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    res.status(200).send(response);
};

exports.default = alexa;