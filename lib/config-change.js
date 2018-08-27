'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

let configChange = (() => {
    var _ref = _asyncToGenerator(function* (event, cb) {

        const iot = require('@google-cloud/iot');

        var client = new iot.v1.DeviceManagerClient({
            // optional auth parameters.
        });
        var formattedParent = client.registryPath('phev-db3fa', 'us-central1', 'my-registry');

        client.listDevices({ parent: formattedParent }).then(function (responses) {
            const resources = responses[0];
            for (let i = 0; i < resources.length; i += 1) {
                console.log(resources[i]);
            }
            cb();
        }).catch(function (err) {
            console.error(err);
            cb();
        });
        //  const client = getIOTClient('my-device2', 'my-registry', 'phev-db3fa', 'us-central1')
        //      .then(client => {
        //          console.log('Client')
        //      })
        /*
            const client = await auth.getClient({
                scopes: 'https://www.googleapis.com/auth/cloud-platform'
            });
            const projectId = await auth.getDefaultProjectId();
            const url = `https://www.googleapis.com/dns/v1/projects/${projectId}`;
            const res = await client.request({ url });
            console.log(client)
            const config = getDeviceConfigs( client, 'my-device2', 'my-registry', 'phev-db3fa', 'us-central1')
        
            console.log('Config ' + JSON.stringify(config))
        */
    });

    return function configChange(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

var _iot = require('./iot');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { auth }  from 'google-auth-library'
const { auth } = require('google-auth-library');

const getPayLoad = event => event.data.data;

const getPayLoadObject = event => JSON.parse(Buffer.from(getPayLoad(event), 'base64').toString());

exports.default = configChange;