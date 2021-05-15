const checkoutController = require('./checkout/CheckoutController')
const purchaseController = require('../../purchase/PurchaseController')
const purchaseStatus = require('../../enum/purchaseStatus')
const mercadopago = require('./checkout/MercadoPago')
const mercadoPagoNotification = require('../../log/NotificationLogController')
const checkout = new checkoutController(mercadopago)
const {log} = require('../../../models')
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
        
        res.status(200)
        const data = checkout.formatRequestData(await checkout.getPayment({url:req.params.resource})) 
        
        if(req.params.topic == "payment"){
            
            if(data.idPurchaseStatus == purchaseStatus["sucesso"].value || purchaseStatus["aguardando_pagamento"].value){
                return purchaseController.changeStatus({email:response.payer.email, idPurchaseStatus:data.idPurchaseStatus})
            }
            if(data.idPurchaseStatus == purchaseStatus["cancelado"].value || data.idPurchaseStatus == purchaseStatus["rejeitado"].value){
                return purchaseController.failPayment({email:response.payer.email, idPurchaseStatus:data.idPurchaseStatus})
            }

        }else{
            if(req.params.topic == "merchant_order"){
                
            }
        }
        
    }
}

module.exports = new MercadoPagoNotificationController()