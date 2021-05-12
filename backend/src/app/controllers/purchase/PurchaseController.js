const {stock} = require('../../models')
const mercadopago = require('./checkoutAPI/MercadoPago')
const purchaseStatus = require('../enum/purchaseStatus')
const checkoutController = require('./checkoutAPI/CheckoutController')
class PurchaseController {

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
                        
            const data = await checkout.createPaymentLink(response)
            
            return res.status(200).send({status:true, data})
        }
        catch(err){
            return res.status(500).send({msg:'Não foi possivel processar o pagamento, por favor tente mais tarde'})
        }

    }
}

module.exports = new PurchaseController()