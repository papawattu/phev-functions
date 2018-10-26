//import firebase from 'firebase'
import firebase from 'firebase-admin'

firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
    databaseURL: 'https://phev-db3fa.firebaseio.com',
    projectId: 'phev-db3fa',
  })
  
const RegisterStore = (auth, register) => {
    const store = new Array(255)

    
    return {
        set: register => {
            firebase.database()
                .ref('registers')
                .child(register.register)
                .set({ data: register.data, updated: new Date().toJSON() })
            
            store[register.register] = { data: register.data }
        },   
        get: id => Promise.resolve(store[id]),
    }
}

export default RegisterStore