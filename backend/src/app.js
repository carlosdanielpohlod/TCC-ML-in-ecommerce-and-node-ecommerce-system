const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')()

class App {
    constructor(){
        this.express = express
        this.middlewares()
        this.routes()
    }
    middlewares(){
        this.express.use(bodyParser.json())
        
    }
    routes(){

        this.express.use(cors())
        this.express.use(require('./app/routes/public'))
     
        this.express.use(require('./app/routes/user'))

        this.express.use(require('./app/routes/admin'))
    }
}
module.exports = new App().express