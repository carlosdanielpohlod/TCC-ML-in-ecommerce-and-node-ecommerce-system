const LogController = require('./LogController')
class PurchaseLogController extends LogController{

    async error(origin, log){
        
        return await this.log.create({idLogType:this.type["purchase_error_500"].value, origin:origin || null,log:log})
    }
    async activity(origin, log){
        return await this.log.create({idLogType:this.type["purchase_activity"].value, origin:origin || null,log:log})
    }
    
}

module.exports = new PurchaseLogController()