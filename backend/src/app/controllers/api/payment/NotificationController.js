const paymentController = require('../../purchase/PaymentController')
const systemLog = require('../../log/NotificationLogController')

class NotificationController{

    async onSuccess(req, res){
        try{
            res.sendStatus(200)
             
            paymentController.onSuccess(req.body)
          
        }catch(err){
            systemLog.error('Notification.success', err.message)
        }
    }

    async onFailure(req, res){
        try{
            res.sendStatus(200)
            paymentController.onFailure(req.body)
        }
        catch(err){
            systemLog.error('Notification.failure', err.message)
        }
    }

    async onPending(req, res){
        try{
            res.sendStatus(200)           
            paymentController.onPending(req.body)
          
        }catch(err){
            systemLog.error('Notification.pending', err.message)
        }
    }
    
    async onNotification(req, res){
        try{
            res.sendStatus(200)
             
            
            if(req.body.topic == "payment"){
                return paymentController.onChangePaymentStatus(req.body)
                
            }
            else{
                if(req.body.topic == "merchant_order"){
                    return paymentController.onMerchantOrder(req.body)
                }
            }
            
            // systemLog.activity('NotificationController.onNotification',req.body.resource)
        }
        catch(err){
            // systemLog.error('NotificationController.onNotification',err.message)
            console.log(err.message)
        }
        
    }
}

module.exports = new NotificationController()