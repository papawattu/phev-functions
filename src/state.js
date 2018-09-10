
const State = data => {
    
    console.log(data)
    const state = JSON.parse(Buffer.from(data.data.data, 'base64').toString())

    console.log(state)

}

export default State