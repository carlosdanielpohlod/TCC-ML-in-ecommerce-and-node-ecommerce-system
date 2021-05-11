const CheckoutInterface = require('./CheckoutInterface')
const purchaseStatus = require('../../enum/purchaseStatus')
class MercadoPago{

    constructor(){

        this.TEST_ACCESS_TOKEN = 'TEST-2708144698923654-082222-c868e5ecd71f3b64dff1a188581e6538-234991937'

        this.mercadopago = require ('mercadopago');
        this.mercadopago.configure({
            access_token: this.TEST_ACCESS_TOKEN
          });

    }
    async createPaymentLink(req, res){
        const {product, stock, address, phone, user, purchase, purchaseitem} = require('../../../models')
        const response = await purchase.findAll({
                
                    where:{idPurchaseStatus:purchaseStatus["no_carrinho"].value},
                    include: [
                        { 
                            model:purchaseitem,
                            attributes:['quantity'],
                            include:[
                                
                                {   
                                    model:stock,
                                    include: [{
                                        model:product,
                                        attributes:['name','price','description','idCategory']
                                    }]
                                }
                            ]

                        },
                        {
                            model:user,
                                attributes:['name','surname','email','cpf'],
                                where:{idUser:req.body.idUser},
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
                
                
                        // model:user,
                        // attributes:['name','surname','email','cpf'],
                        // include: [
                        //     { 
                        //         model:address,
                        //         attributes:['street','number','cep'],
                        //     },
                        //     { 
                        //         model:phone,
                        //         attributes:['areaCode','number']
                        //     }
                        // ]
                })
            
        try{
            return res.send({data:response})
        }catch(err){
            return res.status(500).send(err)
        }
    }
}

module.exports = new MercadoPago()