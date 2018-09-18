import { OAuth2Client } from 'google-auth-library'

const clientId = '557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

const verify = token => 
    client.verifyIdToken({
        idToken: token,
        audience: clientId,  
    })

export { verify }