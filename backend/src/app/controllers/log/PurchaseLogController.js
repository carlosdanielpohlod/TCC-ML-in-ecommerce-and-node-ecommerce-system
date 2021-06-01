const LogController = require('./LogController')
class PurchaseLogController extends LogController{

    async error(origin, log, idUser = null){
        
        return await this.log.create({idUser:idUser,idLogType:this.type["purchase_error_500"].value, origin:origin || null,log:log})
    }
    async activity(origin, log, idUser= null){
        return await this.log.create({idUser:idUser, idLogType:this.type["purchase_activity"].value, origin:origin || null,log:log})
    }
    
}

module.exports = new PurchaseLogController()