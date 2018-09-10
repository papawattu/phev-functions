'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iot = require('@google-cloud/iot');

var _iot2 = _interopRequireDefault(_iot);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPayLoad = event => event.data.data;

const getPayLoadObject = event => JSON.parse(Buffer.from(getPayLoad(event), 'base64').toString());

const configChange = (event, cb) => {

    const client = new _iot2.default.v1.DeviceManagerClient({});
    const formattedName = client.devicePath('phev-db3fa', 'us-central1', 'my-registry', 'my-device2');

    client.listDeviceConfigVersions({ name: formattedName }).then(responses => {
        const response = responses[0];
        const config = JSON.parse(Buffer.from(response.deviceConfigs[0].binaryData, 'base64').toString());
        config.state = {};
        config.state.connectedClients = 1;
        const updatedConfig = _lodash2.default.merge({}, getPayLoadObject(event), config);

        // console.log(JSON.stringify(updatedConfig))

        const data = Buffer.from(JSON.stringify(updatedConfig, null, 2));

        const request = {
            name: formattedName,
            binaryData: data
        };
        client.modifyCloudToDeviceConfig(request).then(responses => {
            const response = responses[0];
            cb();
        });
    }).catch(err => {
        console.error(err);
        cb();
    });
};

exports.default = configChange;