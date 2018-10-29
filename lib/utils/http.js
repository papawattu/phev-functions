'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
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

exports.handleOptions = handleOptions;
exports.setCORSHeaders = setCORSHeaders;