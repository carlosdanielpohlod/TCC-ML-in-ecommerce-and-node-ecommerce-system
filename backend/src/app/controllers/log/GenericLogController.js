const LogController = require('./LogController')
class GenericLogController extends LogController{

    async error(origin, log, idUser = null){
        
        return await this.log.create({idUser:idUser,idLogType:this.type["generic_error_500"].value, origin:origin || null,log:log})
    }
    async activity(origin, log, idUser= null){
        return await this.log.create({idUser:idUser, idLogType:this.type["generic_activity"].value, origin:origin || null,log:log})
    }
    
}

module.exports = new GenericLogController()