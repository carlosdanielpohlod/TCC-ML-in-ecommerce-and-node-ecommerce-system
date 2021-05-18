const {paymentinfo, purchase} = require('../../models')
const purchaseStatus = require('../enum/purchaseStatus')
const mercadopago = require('../api/payment/checkout/MercadoPago')
const checkout = require('../api/payment/checkout/CheckoutController')
const systemLog = require('../log/PurchaseLogController')
class PaymentController{
    async onSuccess(data){
        try{
            
            const response = await this.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})  
            purchase.update({idPurchaseStatus:purchaseStatus["pagamento_efetuado"].value},{where:{idPaymentInfo:response.dataValues["paymentinfo"].idPaymentInfo }})
            paymentinfo.update({client_id:data.client_id,payment_id:data.payment_id, payment_type:data.payment_type, merchant_order_id:data.merchant_order_id},{where:{idPaymentInfo:response.dataValues["paymentinfo"].idPaymentInfo}})
         
        }
        catch(err){
            systemLog.error("onSuccessPayment",err.message)
        }
    }

    async onFailure(data){
        try{
            const response = await this.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})
            purchase.undoPurchase({idPurchase:response.idPurchase, idPurchaseStatus:purchaseStatus["pagamento_falhou"].value})
        }
        catch(err){
            systemLog.error("onFailure",err.message)
        }
    }

    async onPending(data){
        try{
            const response = await this.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})
            purchase.changeStatus({idPurchase:response.idPurchase, idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value})
    
        }
        catch(err){
            systemLog.error("onPending",err.message)
        }
    }
    
    async onChangePaymentStatus(data){
        try{
            
            const checkoutController = new checkout(mercadopago)
            const response = await checkoutController.getPayment({url:data.resource})
            const purchaseInfo = await this.getPaymentInfoByQuery({query:{payment_id:response.id}})

            if(response.status == "success" || response.status == "pending" || response.status == "opened" || response.status == "in_process" || response.status == "authorized"){
                return purchase.changeStatus({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.status]})
            }
            if(response.status == "failure" || response.status == "rejected" || response.status == "cancelled"){
                return purchase.undoPurchase({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.status]})
            }

        }
        catch(err){
            systemLog.error("PaymentController.onChangePaymentStatus",err.message)
        }
        
        
    }

    async getPaymentInfoByQuery(data){
        
        return await purchase.findOne({
            attributes:['idPurchase'],
            
            include: [
                { 
                    model:paymentinfo,
                    attributes:['idPaymentInfo'],
                    where:data.query
                }
            ]
        })

    }

    
}

module.exports = new PaymentController()