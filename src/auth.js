import { OAuth2Client } from 'google-auth-library'

const clientId = '557258334399-k6u903i01e5b6uksqjf3q4n41okocu5n.apps.googleusercontent.com'
const client = new OAuth2Client(clientId);

const verify = token => 
    client.verifyIdToken({
        idToken: token,
        audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })

const auth = (req, res) => {

    console.log('Token ' + req.body.token)
    
    verify(req.body.token)
        .then(ticket => {
            const payload = ticket.getPayload()
            const userid = payload['sub']
            console.log('userId ' + userid + ' payload ' + JSON.stringify(payload))
    
            res.status(200).send('User ID ' + userid)
        })
        .catch (err => {
            console.error(err)
            res.status(401)
        })
}

export default auth