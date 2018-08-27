'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setDeviceConfig = exports.getDeviceConfigs = undefined;

var _googleapis = require('googleapis');

var _googleAuthLibrary = require('google-auth-library');

//import fs from 'fs'

const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;

const setDeviceConfig = (client, deviceId, registryId, projectId, cloudRegion, config) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;

    const binaryData = Buffer.from(JSON.stringify(config, null, '\t')).toString('base64');
    const request = {
        name: `${registryName}/devices/${deviceId}`,
        versionToUpdate: 0,
        binaryData: binaryData
    };

    return client.projects.locations.registries.devices.modifyCloudToDeviceConfig(request);
};

const getDeviceConfigs = (client, deviceId, registryId, projectId, cloudRegion) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const request = {
        name: `${registryName}/devices/${deviceId}`
    };

    return client.projects.locations.registries.devices.configVersions.list(request).then(data => JSON.parse(Buffer.from(data.data.deviceConfigs[0].binaryData, 'base64')));
};
/*
const serviceAccount = JSON.parse(fs.readFileSync('./phev-appspot.json'))
const jwtAccess = new google.auth.JWT();
jwtAccess.fromJSON(serviceAccount);
// Note that if you require additional scopes, they should be specified as a
// string, separated by spaces.
jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
// Set the default authentication to the above JWT access.
google.options({ auth: jwtAccess });

const getIOTClient = (deviceId, registryId, projectId, region) => {
    google.discoverAPI(discoveryUrl, {})
        .then(client => {
            console.log('Here')
            getDeviceConfigs(client, deviceId, registryId, projectId, region)
                .then(config => {
                    console.log('Lights on ' + config.state.headLightsOn)

                    config.state.headLightsOn = !config.state.headLightsOn

                    setDeviceConfig(client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1', config)
                        .then(() => {
                            console.log('Config changed')
                            getDeviceConfigs(client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1')
                                .then(config => {
                                    console.log('Lights on ' + config.state.headLightsOn)
                                })
                        })
                })
        }).catch(err => console.log(err))
}
*/
exports.getDeviceConfigs = getDeviceConfigs;
exports.setDeviceConfig = setDeviceConfig;