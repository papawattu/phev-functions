'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const airConHttp = (req, res) => {

    switch (req.method) {
        case 'GET':
            {
                res.status(200).send(JSON.stringify({ "airConOn": false }));
            }
        default:
            {
                res.status(400).send(JSON.stringify({ error: 'unsupported http method for this uri' }));
            }
    }
};

exports.default = airConHttp;