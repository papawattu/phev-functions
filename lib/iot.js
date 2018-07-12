'use strict';

var _googleapis = require('googleapis');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;
console.log('hello');

const setDeviceConfig = (client, deviceId, registryId, projectId, cloudRegion, config) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;

    const binaryData = Buffer.from(JSON.stringify(config, null, '\t')).toString('base64');
    const request = {
        name: `${registryName}/devices/${deviceId}`,
        versionToUpdate: 0,
        binaryData: binaryData
    };

    client.projects.locations.registries.devices.modifyCloudToDeviceConfig(request).then(() => console.log('config updated'));
};

const getDeviceConfigs = (client, deviceId, registryId, projectId, cloudRegion) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const request = {
        name: `${registryName}/devices/${deviceId}`
    };

    return client.projects.locations.registries.devices.configVersions.list(request).then(data => JSON.parse(Buffer.from(data.data.deviceConfigs[0].binaryData, 'base64')));
};

const serviceAccount = JSON.parse(_fs2.default.readFileSync('./phev-db3fa-489da8aa24fc.json'));
const jwtAccess = new _googleapis.google.auth.JWT();
jwtAccess.fromJSON(serviceAccount);
// Note that if you require additional scopes, they should be specified as a
// string, separated by spaces.
jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
// Set the default authentication to the above JWT access.
_googleapis.google.options({ auth: jwtAccess });

_googleapis.google.discoverAPI(discoveryUrl, {}).then(client => {
    console.log('Here');
    getDeviceConfigs(client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1').then(config => {
        console.log('Lights on ' + config.status.lightsOn);
        config.status.lightsOn = true;

        setDeviceConfig(client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1', config).then(() => {
            console.log('Config changed');
            getDeviceConfigs(client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1').then(config => {
                console.log('Lights on ' + config.status.lightsOn);
            });
        });
    });
}).catch(err => console.log(err));