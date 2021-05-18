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
    
    async changeStatus(data){
        try{
            if(await purchase.update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}}) != 1){
                systemLog.error("PurchaseController.changeStatus",`Status da compra ${data.idPurchase} não foi atualizado com sucesso`)
            }
        }
        catch(err){
            systemLog.error("PurchaseController.changeStatus",err.message)
        }
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
            if(await purchase.update({idPurchaseStatus:data.idPurchaseStatus}, {where:{idPurchase:data.idPurchase}}) != 1)
            { 
                sysemLog.error('PurchaseController.undoPurchase','Não foi possivel atualizar o status da compra')
            }

           
            

            systemLog.activity("Stock.undoPurchase",`Compra ${data.idPurchase} Desfeita`)
        }
        catch(err){
            systemLog.error("StockController.undoPurchase",err.message)
        }
        
    }
}



module.exports = new PurchaseController()