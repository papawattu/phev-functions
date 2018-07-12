import Store from './store'

const { getRegister } = Store()

const devEvents = (data) => {

    getRegister(1).then((data) => {
        console.log(data)
    })
}

export default devEvents