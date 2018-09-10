import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { google } from 'googleapis'
import PubSub from '@google-cloud/pubsub'
import { OAuth2Client } from 'google-auth-library'

const clientId = '557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)


const pubsub = new PubSub()

const topicName = 'config-change'

const verify = token => 
    client.verifyIdToken({
        idToken: token,
        audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })

const setCORSHeaders = res => {
    res.set('Content-Type', 'application/json')
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', '*')
    return res
}
const handleOptions = (req,res) => {
    if (req.method == 'OPTIONS') {
        res = setCORSHeaders(res)
        res.status(204).send('')
        res.end()
        return true
    } else{
        return false
    }
}
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

const operations = (req, res) => {
    
    setCORSHeaders(res)

    if(handleOptions(req,res)) return
    
    const authHeader = req.get('Authorization')
    const token = authHeader ? authHeader.split(' ')[1] : null
                
    if(token) {
        verify(token)
            .then(ticket => {
                sendConfigUpdate(req.body)
                    .then(messageId => {
                        res.status(200).send('Message sent ' + messageId)
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(500).send(err)
                    })
            })
            .catch(err => {
                console.error(err)
                res.status(401).send('Auth failed ' + err)
            })
    } else {
        res.status(401).send('No auth header')
    }
    
}

export default operations