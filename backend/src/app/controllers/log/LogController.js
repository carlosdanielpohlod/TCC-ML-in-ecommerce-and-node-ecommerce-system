const {log} = require('../../models')
const logtype = require('../enum/logType')
class LogController{
    constructor(){    
       this.log = log
       this.type = logtype
    }
    
}

module.exports = LogController