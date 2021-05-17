const checkoutController = require('./checkout/CheckoutController')
const purchaseController = require('../../purchase/PurchaseController')
const purchaseStatus = require('../../enum/purchaseStatus')
const mercadopago = require('./checkout/MercadoPago')
const systemLog = require('../../log/NotificationLogController')
const checkout = new checkoutController(mercadopago)
// const {log} = require('../../../models')
class MercadoPagoNotificationController{

    async onSuccess(req, res){
        try{
            res.sendStatus(200)
            
            await purchaseController.onSuccessPayment(req.body)
            // await systemLog.activity('mercadoPagoNotification.success','notificação de pagamento com sucesso')
            // systemLog.activity('mercadoPagoNotification.success','notificação de pagamento com sucesso')
        }catch(err){
            systemLog.error('mercadoPagoNotification.success', err.message)
        }
    }
    async onFailure(req, res){
        try{
            res.sendStatus(200)
            await purchaseController.onFailurePayment(req.body)
        }
        catch(err){
            systemLog.error('mercadoPagoNotification.failure', err.message)
        }
    }
    async pending(){
        
    }
    
    async onNotification(req, res){
        try{
            res.status(200)
             
            
            if(req.body.topic == "payment"){
                const data = await checkout.getPayment({url:req.body.resource})
                systemLog.activity('Teste de get payment',data.data.status)
                console.log(data.data.status)
                res.send(data.data)
                // if(data.idPurchaseStatus == purchaseStatus["sucesso"].value || purchaseStatus["aguardando_pagamento"].value){
                //     return purchaseController.changeStatus({email:response.payer.email, idPurchaseStatus:data.idPurchaseStatus})
                // }
                // if(data.idPurchaseStatus == purchaseStatus["cancelado"].value || data.idPurchaseStatus == purchaseStatus["rejeitado"].value){
                //     return purchaseController.failPayment({email:response.payer.email, idPurchaseStatus:data.idPurchaseStatus})
                // }
                
            }else{
                if(req.params.topic == "merchant_order"){
                    
                }
            }
            
            systemLog.activity('MercadoPagoNotificationController.onNotification',req.body.resource)
        }
        catch(err){
            systemLog.error('MercadoPagoNotificationController.onNotification',err.message)
            res.send(err.message)
        }
        
    }
}

module.exports = new MercadoPagoNotificationController()