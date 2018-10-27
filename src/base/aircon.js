export default (deps) => ({
    status : async args => {
        const { device } = deps
        const { jwt, deviceId } = args
        
        const response = await device.get({jwt , deviceId})

        return response
    },
    subscribe : async deviceId => {
        const { events } = deps

        return events.subscribe(deviceId)
    }
})