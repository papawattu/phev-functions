'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.ENV || 'local';
const projectId = process.env.PROJECTID || 'phev-db3fa';

class DeviceEvents extends _events2.default {
    constructor(deps) {
        super();
        this.store = deps.store;
        this.pubsub = deps.pubsub;
        this.event = this.event.bind(this);
    }
    subscribe(args) {
        const { callerId, deviceId, callback } = args;
        const topicName = `projects/${projectId}/topics/my-device-events`;
        const subscriptionName = `${env}-${callerId}-${deviceId}-subscription`;

        this.pubsub.topic(topicName).createSubscription(subscriptionName).then(results => {
            const subscription = results[0];
            //this.event = this.event.bind(this)
            subscription.on('message', this.event);
            //this.emitter.addListener("test", this.handleTestEvent)
            this.store.set(subscriptionName, { deviceId, callback, subscription, callerId });
        }).catch(err => {
            console.error('ERROR:', err);
        });
    }
    event(message) {

        this.emit(message.attributes.deviceId, _extends({ deviceId: message.attributes.deviceId }, JSON.parse(message.data)));
        message.ack();
    }
}

exports.default = DeviceEvents;