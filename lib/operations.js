'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _googleapis = require('googleapis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

const express = (0, _express2.default)();

express.use(_bodyParser2.default.json());
express.use(_bodyParser2.default.urlencoded({ extended: true }));
express.use((0, _cors2.default)());

const getAuthClient = client => new Promise((resolve, reject) => {
  _googleapis.google.auth.getApplicationDefault((err, authClient) => {
    if (err) {
      console.log(`getAuthClient ERR ${err}`);
      reject(err);
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      authClient = authClient.createScoped(['https://www.googleapis.com/auth/cloud-platform']);
    }
    const data = {
      client: client,
      auth: authClient
    };
    resolve(data);
  });
});

const getClient = auth => new Promise((resolve, reject) => {
  const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;
  _googleapis.google.discoverAPI(discoveryUrl, {}).then(client => {
    resolve(client);
  });
});
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

const getDevice = (clientAndAuth, deviceName) => new Promise((resolve, reject) => {
  const requestDevice = {
    name: deviceName,
    auth: clientAndAuth.auth
  };
  clientAndAuth.client.projects.locations.registries.devices.get(requestDevice, (err, data) => {
    if (err) {
      console.log(`getDevice ERR ${err}`);
      reject(err);
    }
    const returnData = {
      client: clientAndAuth.client,
      auth: clientAndAuth.auth,
      device: data
    };
    resolve(returnData);
  });
});
const getDeviceConfigs = (clientAndAuthAndDevice, deviceName) => {

  const request = {
    name: deviceName,
    auth: clientAndAuthAndDevice.auth
  };

  return clientAndAuthAndDevice.client.projects.locations.registries.devices.configVersions.list(request).then(data => JSON.parse(Buffer.from(data.data.deviceConfigs[0].binaryData, 'base64')));
};
const sendDataToDevice = (clientAndAuthAndDevice, deviceName, config) => new Promise((resolve, reject) => {

  const binaryData = Buffer.from(JSON.stringify(config, null, '\t')).toString('base64');

  const request = {
    name: deviceName,
    versionToUpdate: 0,
    binaryData: binaryData,
    auth: clientAndAuthAndDevice.auth
  };

  clientAndAuthAndDevice.client.projects.locations.registries.devices.modifyCloudToDeviceConfig(request);
});
const operations = (req, res) => {

  //   console.log('Head lights ' + JSON.stringify(req.body.headLightsOn))
  //  console.log('Value ' + req.body.value)

  const projectId = 'phev-db3fa';

  const deviceId = 'my-device2';
  const registryId = 'my-registry';
  const cloudRegion = 'us-central1';

  const parentName = `projects/${projectId}/locations/${cloudRegion}`;
  const registryName = `${parentName}/registries/${registryId}`;
  const deviceName = `${registryName}/devices/${deviceId}/`;

  const config = JSON.parse('{"connectedClients":1,"latestBuild":1531252279,"update":{"overGsm":false,"ssid":"BTHub6-P535","password":"S1mpsons","host":"storage.googleapis.com","port":80,"path":"/espimages/develop/"},"carConnection":{"ssid":"REMOTE45cfsc","password":"fhcm852767","host":"192.168.8.46","port":8080},"status":{"lightsOn":true,"airConOn":false}}');

  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', '*');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  } else {

    getClient().then(client => {
      return getAuthClient(client);
    }).then(clientAndAuth => {
      return getDevice(clientAndAuth, deviceName);
    }).then(clientAndAuthAndDevice => {
      getDeviceConfigs(clientAndAuthAndDevice, `${registryName}/devices/${deviceId}`).then(config => {
        config.status = _extends({}, req.body.update.operation, config.status);
        sendDataToDevice(clientAndAuthAndDevice, deviceName, config);
        res.status(200).send('{ "status": "OK" }');
      });
    }).catch(err => {
      res.status(400).send(`${err}`);
    });
  }
};

exports.default = operations;