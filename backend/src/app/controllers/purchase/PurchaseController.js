const {paymentinfo} = require('../../models')
const mercadopago = require('../api/payment/checkout/MercadoPago')
const purchaseStatus = require('../enum/purchaseStatus')
const stockController = require('../product/StockController')
const checkoutController = require('../api/payment/checkout/CheckoutController')
const systemLog = require('../log/PurchaseLogController')
const purchaseRepository = require('../../repository/PurchaseRepository')

class PurchaseController {

    
    async store(req, res){
        try{
            const checkout = new checkoutController(mercadopago)
            
            const purchaseData = await purchaseRepository.getOldPurchaseByIdUser(req.user.idUser)
            
            let paymentapiinfos = null
           
            if(await stockController.toRemove(purchaseData[0].purchaseitems) === true){
                const preference = await checkout.createPaymentLink(purchaseData)


                if(preference){
                    paymentapiinfos = await paymentinfo.create({preference_id:preference.id})
                }
                else{
                    systemLog.error("puchaseController.store","Não foi possivel obter a preferencia",req.user.idUser)
                    return res.status(500).send({status:false, msg:'Houve algum problema ao processar a compra, tente novamente.'})
                }


                if(paymentapiinfos){
                    
                    if(await purchaseRepository.model().update({idPaymentInfo:paymentapiinfos.idPaymentInfo, idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value},{where:{idPurchase:purchaseData[0].idPurchase}}) == 1){
                        return res.status(200).send({status:true, data:preference})
                    }else{
                        paymentapiinfos.destroy()
                        systemLog.error("puchaseController.store","Não foi possivel atualizar o id da api na tabela purchase",req.user.idUser)
                    }
                }

                
            }
            systemLog.error("puchaseController.store",`Não foi possivel criar a preferencia, user = ${req.user.idUser}`,req.user.idUser)
            return res.status(500).send({status:false, msg:'Houve algum problema ao processar a compra, tente novamente.'})
        }
        catch(err){
            systemLog.error("puchaseController.store",err.message,req.user.idUser)
            return res.status(500).send({msg:'Houve algum problema ao processar a compra, tente novamente.'})
        }

    }
    
    async changeStatus(data){
        try{
            
            if(await purchaseRepository.model().update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}}) == 0){
                systemLog.error("PurchaseController.changeStatus",`Status da compra ${data.idPurchase} não foi atualizado para ${data.idPurchase} com sucesso`)
            }
        }
        catch(err){
            systemLog.error("PurchaseController.changeStatus",err.message)
            throw new Error('Status da compra não alterado')
        }
    }


    async myPurchases(req, res){
        try{
            const limit = 10
            const data = req.body || req.params || req.query
            const {formatMyPurchases} = require('../utils/responseFormat')
            const purchaseData = await purchaseRepository.getPurchasesByIdUser(req.user.idUser,limit,data.page || 1)
            const formatedValues = formatMyPurchases(purchaseData)
            return res.status(200).send({data:formatedValues, status:true, limit, page:data.page || 1})
        }
        catch(err){
            res.status(500).send({msg:httpStatus["500"].value})
            systemLog.error('purchaseController.myPurchase', err.message,req.user.idUser)
        }
    }



    async myPurchaseDetails(req, res){

        const {formatMyPurchaseDetails} = require('../utils/responseFormat')

        const data = await purchaseRepository.getPurchaseDetails(req.user.idUser, req.query.idPurchase || req.params.idPurchase)
        
        if(data == null){
            return res.status(404).send({status:false, msg:'Compra não encontrada'})    
        }
        
        
        return res.status(200).send({status:true, data})
    }


    async undoPurchase(data){
        try{
            const toGiveBackProducts = await purchaseRepository.getItemsFromPurchase(data.idPurchase)
            
            stockController.giveBack(toGiveBackProducts[0].purchaseitems)
            if(await purchaseRepository.model().update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}}) != 1)
            { 
                sysemLog.error('PurchaseController.undoPurchase','Não foi possivel atualizar o status da compra')
            }
            systemLog.activity("Stock.undoPurchase",`Compra ${data.idPurchase} Desfeita`)
        }
        catch(err){
            systemLog.error("StockController.undoPurchase",err.message)
            throw new Error("Erro ao desfazer a compra do usuário")
        }
        
    }
}



module.exports = new PurchaseController()