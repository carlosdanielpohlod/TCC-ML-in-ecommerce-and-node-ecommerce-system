const {paymentinfo, purchase} = require('../../models')
const purchaseStatus = require('../enum/purchaseStatus')
const purchaseController = require('../purchase/PurchaseController')
const mercadopago = require('../api/payment/checkout/MercadoPago')
const checkout = require('../api/payment/checkout/CheckoutController')
const systemLog = require('../log/PurchaseLogController')
const checkoutController = new checkout(mercadopago)
const paymentRepository = require('../../repository/PaymentRepository')
class PaymentController{


    async onSuccess(data){
        try{
            
            const response = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})  
            purchase.update({idPurchaseStatus:purchaseStatus["pagamento_efetuado"].value},{where:{idPaymentInfo:response.idPaymentInfo }})
            paymentinfo.update({client_id:data.client_id,payment_id:data.payment_id, payment_type:data.payment_type, merchant_order_id:data.merchant_order_id},{where:{idPaymentInfo:response.idPaymentInfo}})
         
        }
        catch(err){
            systemLog.error("PaymentController.onSuccessPayment",err.message)
        }
    }

    async onFailure(data){
        try{
            const response = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})
            paymentinfo.update({client_id:data.client_id,payment_id:data.payment_id, payment_type:data.payment_type, merchant_order_id:data.merchant_order_id},{where:{idPaymentInfo:response.idPaymentInfo}})
            purchaseController.undoPurchase({idPurchase:response.idPurchase, idPurchaseStatus:purchaseStatus["pagamento_falhou"].value})
        }
        catch(err){
            systemLog.error("PaymentController.onFailure",err.message)
        }
    }

    async onPending(data){
        try{
            const response = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:data.preference_id}})
            paymentinfo.update({client_id:data.client_id,payment_id:data.payment_id, payment_type:data.payment_type, merchant_order_id:data.merchant_order_id},{where:{idPaymentInfo:response.idPaymentInfo}})
            purchaseController.changeStatus({idPurchase:response.idPurchase, idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value})
    
        }
        catch(err){
            systemLog.error("PaymentController.onPending",err.message)
        }
    }
    
    async onChangePaymentStatus(data){
        try{
            
            const response = await checkoutController.getPayment({url:data.resource})
            
            const purchaseInfo = await paymentRepository.getPaymentInfoByQuery({query:{payment_id:response.data.id}})
            
            if(response.data.status == "success" || response.data.status == "pending" || response.data.status == "opened" || response.data.status == "in_process" || response.data.status == "authorized"){
                return purchaseController.changeStatus({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.data.status]})
            }
            if(response.data.status == "failure" || response.data.status == "rejected" || response.data.status == "cancelled"){
                return purchaseController.undoPurchase({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.data.status]})
            }

        }
        catch(err){
            sysemLog.error('PaymentController.onChangePaymentStatus',err.message)
        }
        
        
    }
    async onMerchantOrder(data){
        try{
            const response = await checkoutController.getMerchantOrder({url:data.resource})    
            const purchaseInfo = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:response.data.preference_id}})
            if(response.data.status == "expired"){
                return purchaseController.undoPurchase({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.data.status]})
            }
            if(response.data.status == "opened" || response.data.status == "closed"){
                return purchaseController.changeStatus({idPurchase:purchaseInfo.idPurchase, idPurchaseStatus:checkoutController.mapedStatus()[response.data.status]})
            }
        }
        catch(err){
            systemLog.error("PaymentController.onMerchantOrder", err.message)
        }
    }
    

    async getPaymentOpenedLink(req, res){
        try{
            
            
            const response = await paymentRepository.getPaymentPreference_id(req.user.idUser, req.body.idPurchase)
            
            if(response == null || response.dataValues == null){
                return res.status(404).send({status:false, msg:"Pagamento em aberto não encontrado"})
            }
            
            const preferenceData = await checkoutController.getPreference({preference_id:response.dataValues.paymentinfo.preference_id})
            return res.status(200).send({data:{
                paymentUrl:preferenceData.data.init_point}
            })
        }
        catch(err){
            systemLog.error('PaymentController.getPaymentOpendLink', err.message)
            return res.status(500).send({msg:err.message})
        }
    }

}

module.exports = new PaymentController()


