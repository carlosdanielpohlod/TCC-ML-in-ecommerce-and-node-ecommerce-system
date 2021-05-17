const {stock, purchase, purchaseitem} = require('../../models')
const mercadopago = require('../api/payment/checkout/MercadoPago')
const purchaseStatus = require('../enum/purchaseStatus')
const stockController = require('../product/StockController')
const checkoutController = require('../api/payment/checkout/CheckoutController')
const systemLog = require('../log/PurchaseLogController')
class PurchaseController {

    
    async store(req, res){
        try{
            const checkout = new checkoutController(mercadopago)
            const {product, paymentinfo,  address, phone, user,  productcolor, productsize} = require('../../models')
           
            const purchaseData = await purchase.findAll({
                        
                            where:{idPurchaseStatus:purchaseStatus["no_carrinho"].value},
                            attributes:['idPurchase'],
                            include: [
                                { 
                                    model:purchaseitem,
                                    attributes:['quantity'],
                                    include:[
                                        
                                        {   
                                            model:stock,
                                            include: [
                                                {
                                                    model:product,
                                                    attributes:['name','price','description','idCategory']
                                                },
                                                {
                                                    model:productcolor,
                                                    attributes:['color']
                                                },
                                                {
                                                    model:productsize,
                                                    attributes:['size']
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    model:user,
                                        attributes:['name','surname','email','cpf'],
                                        where:{idUser:req.user.idUser},
                                        include: [
                                            { 
                                                model:address,
                                                attributes:['street','number','cep'],
                                            },
                                            { 
                                                model:phone,
                                                attributes:['areaCode','number']
                                            }
                                        ]
                
                                }
                            ]
                        
            }) 
            let paymentapiinfos = null
           
            if(await stockController.toRemove(purchaseData[0].purchaseitems) === true){
                const preference = await checkout.createPaymentLink(purchaseData)


                if(preference){
                    paymentapiinfos = await paymentinfo.create({preference_id:preference.id})
                }
                else{
                    systemLog.error("Store","Não foi possivel obter a preferencia")
                    return res.status(500).send({status:false, msg:'Houve algum problema ao processar a compra, tente novamente.'})
                }


                if(paymentapiinfos){
                    
                    if(await purchase.update({idPaymentInfo:paymentapiinfos.idPaymentInfo, idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value},{where:{idPurchase:purchaseData[0].idPurchase}}) == 1){
                        return res.status(200).send({status:true, data:preference})
                    }else{
                        paymentapiinfos.destroy()
                        systemLog.error("Store","Não foi possivel atualizar o id da api na tabela purchase")
                    }
                }

                
            }
            systemLog.error("Store",`Não foi possivel criar a preferencia, user = ${req.user.idUser}`)
            return res.status(500).send({status:false, msg:'Houve algum problema ao processar a compra, tente novamente.'})
            
            
        }
        catch(err){
            systemLog.error("Store",err.message)
            return res.status(500).send({msg:'Houve algum problema ao processar a compra, tente novamente.'})
        }

    }
    
    async onSuccessPayment(data){
        // try{
            const {paymentinfo} = require('../../models')
            const response = await purchase.findOne({
                attributes:['idPurchase'],
                
                include: [
                    { 
                        model:paymentinfo,
                        attributes:['idPaymentInfo'],
                        where:{preference_id:data.preference_id}
                    }
                ]
            })
            // 
            // console.log(data.payment_id)
            purchase.update({idPurchaseStatus:purchaseStatus["pagamento_efetuado"].value},{where:{idPaymentInfo:response.dataValues["paymentinfo"].idPaymentInfo }})
            paymentinfo.update({client_id:data.client_id,payment_id:data.payment_id, payment_type:data.payment_type, merchant_order_id:data.merchant_order_id},{where:{idPaymentInfo:response.dataValues["paymentinfo"].idPaymentInfo}})
            // systemLog.log('onSuccess',JSON.stringify(response))
        // }
        // catch(err){
        //     systemLog.error("onSuccessPayment",err.message)
        // }
    }

    async onFailurePayment(data){
        const {paymentinfo} = require('../../models')
        const response = await purchase.findOne({
            attributes:['idPurchase'],
            
            include: [
                { 
                    model:paymentinfo,
                    attributes:['idPaymentInfo'],
                    where:{preference_id:data.preference_id}
                }
            ]
        })

        this.undoPurchase({idPurchase:response.idPurchase, idPurchaseStatus:purchaseStatus["pagamento_falhou"].value})

    }

    async changeStatus(data){
       
        await purchase.update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}})
        return
    }

    
    async undoPurchase(data){
        try{
            const toGiveBackProducts = await purchase.findAll({
                            
                where:{idPurchase:data.idPurchase},
                attributes:['idPurchase'],
                include: [
                    { 
                        model:purchaseitem,
                        attributes:['quantity'],
                        include:[
                            
                            {   
                                model:stock,
                                attributes:['idStock']
                            }
                        ]
                    }
                ]
            })
            
            stockController.giveBack(toGiveBackProducts[0].purchaseitems)
            if(await purchase.update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}}))
                console.log("ok")
            else
                console.log("nau")
            

            systemLog.activity("Stock.undoPurchase",`Compra ${data.idPurchase} Desfeita`)
        }
        catch(err){
            systemLog.error("StockController.undoPurchase",err.message)
        }
        
    }
}



module.exports = new PurchaseController()