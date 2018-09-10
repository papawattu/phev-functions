'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _pubsub = require('@google-cloud/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const topicName = 'config-change';

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

const sendConfigUpdate = config => pubsub.topic(topicName).publisher().publish(Buffer.from(JSON.stringify(config))).then(results => {
    return results[0];
}).catch(err => {
    console.error('ERROR:', err);
});

const alexa = (req, res) => {

    sendConfigUpdate(message).then(() => res.status(200).send(response));
};

exports.default = alexa;