const CheckoutInterface = require('./CheckoutInterface')
const purchaseStatus = require('../../enum/purchaseStatus')
const {formatItems, formatPayer} = require('../../utils/mercadoPago')
const config = require('../../../../config/mercadoPago')
class MercadoPago{

    constructor(){

        this.mercadopago = require ('mercadopago');
        this.mercadopago.configure({... config.credentials});

    }
    async createPaymentLink(req, res){
        try{
            const {product, stock, address, phone, user, purchase, purchaseitem, productcolor, productsize} = require('../../../models')
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
                    
                    }) 
            const items = formatItems(response)
            const payer = formatPayer(response)

            const data = await this.mercadopago.preferences.create({
                items, payer,  ...config.config})
                // shipments:{cost:200,mode:"not_specified"},
                
            return res.status(200).send({status:true,data})
         }
         catch(err){
             return res.status(500).send({status:false, msg:'Não foi possivel processar o pagamento, tente mais tarde'})
        }

    }
}

module.exports = new MercadoPago()