import iot from '@google-cloud/iot'
import _ from 'lodash'

const getPayLoad = event => event.data.data

const getPayLoadObject = event => JSON.parse(Buffer.from(getPayLoad(event), 'base64').toString()) 

const configChange = (event, cb) => {
    
    const client = new iot.v1.DeviceManagerClient({})
    const formattedName = client.devicePath('phev-db3fa', 'us-central1', 'my-registry', 'my-device2')
    
    client.listDeviceConfigVersions({name: formattedName})
        .then(responses => {
            const response = responses[0]
            const config = JSON.parse(Buffer.from(response.deviceConfigs[0].binaryData, 'base64').toString())
            config.state = {}
            config.state.connectedClients = 1 
            const updatedConfig = _.merge({},getPayLoadObject(event),config)
            
            // console.log(JSON.stringify(updatedConfig))
            
            const data = Buffer.from(JSON.stringify(updatedConfig,null,2))
            
            const request = {
                name: formattedName,
                binaryData: data
            }
            //client.sendCommandToDevice(request)
            //    .then(response => {
            //        cb()
            //    })
            client.modifyCloudToDeviceConfig(request)
                .then(responses => {
                    const response = responses[0]
                    cb()
             })
    })
    .catch(err => {
        console.error(err)
        cb()
    })
}

export default configChange