import fetch from 'node-fetch'

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

const alexa = (req, res) => {
    
    fetch(baseUri + '/operations', {
        method: 'POST',
        body: JSON.stringify(message),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    res.status(200).send(response)
}

export default alexa