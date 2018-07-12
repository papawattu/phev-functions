import RegisterStore from "./store"

const store = RegisterStore()

const App = (data) => {
    
    const register = JSON.parse(Buffer.from(data.data, 'base64').toString())

    store.set(register)

}

export default App