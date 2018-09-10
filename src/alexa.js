import fetch from 'node-fetch'
import PubSub from '@google-cloud/pubsub'

const topicName = 'config-change'

const response = {
    version: "1.0",
    response: {
        outputSpeech: {
            type: "PlainText",
            text: "Lights On",
        },
        shouldEndSession: true,
    }
}
const message = { state: { headLightsOn: true } }

const baseUri = 'https://us-central1-phev-db3fa.cloudfunctions.net'

const sendConfigUpdate = config => pubsub
        .topic(topicName)
        .publisher()
        .publish(Buffer.from(JSON.stringify(config)))
            .then(results => {
                return results[0]
            })
            .catch(err => {
                console.error('ERROR:', err)
            })

const alexa = (req, res) => {
    
    sendConfigUpdate(message)
        .then(() => res.status(200).send(response))
}

export default alexa