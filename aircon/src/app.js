import express from 'express'

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const App = () => {
    const http = express()

    http.get('/', (req, res) => res.send('Hello'))
    
    http.listen(PORT, HOST)

    console.log(`Running on http://${HOST}:${PORT}`)

}

export default App