const {stock} = require('../../models')
const mercadopago = require('../api/payment/checkout/MercadoPago')
const purchaseStatus = require('../enum/purchaseStatus')
const stockController = require('../product/StockController')

class PurchaseController {

    constructor(){
        this.checkout = new checkoutController(mercadopago)
    }
    async reverseStore(data){
        // const reverseStock = data.reverseStock
        // for(let value in reverseStock){
        //     await Model.increment('quantity', {by:value.quantity, where: {idStock:value.idStock}});
        // }

    }
    async store(req, res){
        try{
            const checkout = new checkoutController(mercadopago)
            const {product, stock, address, phone, user, purchase, purchaseitem, productcolor, productsize} = require('../../models')
            
            const response = await purchase.findAll({
                        
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
        
            
            if(await stockController.toRemove(response[0].purchaseitems) === true){
                const data = await checkout.createPaymentLink(response)
                
                return res.status(200).send({status:true, data})
            }
            else{
                return res.status(500).send({status:false, msg:'Houve algum problema ao processar a compra, tente novamente.'})
            } 
            
        }
        catch(err){
            return res.status(500).send({msg:'NHouve algum problema ao processar a compra, tente novamente.'})
        }

    }

    async changeStatus(data){
        const user = await user.findOne({where:{email:data.email}})
        const response = await purchase.update({idPurchaseStatus:purchaseStatus["aproved"].value}, {where:{idUser:user.idUser}})
        if(response == 0){
            
        }

        return
    }
    async failPayment(req, res){
        
    }
}



module.exports = new PurchaseController()