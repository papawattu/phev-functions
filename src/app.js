import RegisterStore from "./store"

const App = (firebase,data) => {
    const store = RegisterStore(firebase)
    
    const register = JSON.parse(Buffer.from(data.data, 'base64').toString())

    store.set(register)

}

export default App