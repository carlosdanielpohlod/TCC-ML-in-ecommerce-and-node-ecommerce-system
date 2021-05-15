const checkoutController = require('./checkout/CheckoutController')
const purchaseController = require('../../purchase/PurchaseController')
const purchaseStatus = require('../../enum/purchaseStatus')
const mercadopago = require('./checkout/MercadoPago')
const systemLog = require('../../log/NotificationLogController')
const checkout = new checkoutController(mercadopago)
// const {log} = require('../../../models')
class MercadoPagoNotificationController{

    async success(){

    }
    async failure(){

    }
    async pending(){
        
    }
    async teste(req, res){
       mercadoPagoNotification.activity('kk','kk')
        return res.send('ok')
    }
    async onNotification(req, res){
        try{
            res.status(200)
             
            
            if(req.body.topic == "payment"){
                const data = await checkout.getPayment({url:req.body.resource})
                systemLog.activity('Teste de get payment',data.data.status)
                console.log(data.data.status)
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
            
            // systemLog.activity('MercadoPagoNotificationController.onNotification',req.body.resource)
        }
        catch(err){
            systemLog.error('MercadoPagoNotificationController.onNotification',err.message)
            res.send(err.message)
        }
        
    }
}

module.exports = new MercadoPagoNotificationController()