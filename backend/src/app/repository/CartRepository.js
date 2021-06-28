const {purchase, purchaseitem, stock} = require('../models')
const purchaseStatus = require('../controllers/enum/purchaseStatus')

class CartRepository{
    async getUserCart(idUser){
        return await purchase.findOne({where:{idUser, idPurchaseStatus:purchaseStatus["no_carrinho"].value}})
    }

    async removePurchaseItemFromCart(idPurchaseItem, idPurchase){
        try{
            return await purchaseitem.destroy({where:{idPurchaseItem, idPurchase}})
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    async createCart(data){
        return await purchase.create({... data, idPurchaseStatus:purchaseStatus["no_carrinho"].value})
    }

    async getUserCartPurchaseItem(idUser, idPurchaseItem){
         const response = await purchase.findOne({
            attributes:[],
            where:{idUser, idPurchaseStatus:purchaseStatus["no_carrinho"].value},
            include:[
            {
                model:purchaseitem,
                where:{idPurchaseItem},
                attributes:['quantity','idPurchaseItem'],
                include:[{ 
                    model:stock,
                    attributes:['quantity']
                }]
            }
            ]
        })
        if(response){ return response.dataValues.purchaseitems[0]}
        else{throw new Exception("Nenhum carrinho encontrado")}
        
    }

    async getAllInfosUserCart(idUser){
        const {productcolor, productsize, product, productimage} = require('../models')
        const {getAllInfosUserCartFormat}= require('../controllers/utils/responseFormat')
        const data = await purchaseitem.findAll({
            attributes:['idPurchaseItem','quantity'],
            include: 
            [
                {
                    model: purchase,
                    where: {idUser, idPurchaseStatus:purchaseStatus["no_carrinho"].value},
                    attributes:[]
                }, 
                {
                    model:stock,
                    attributes:['quantity'],
                    include:[
                        {
                            model:productcolor,
                            attributes:['color']
                        },
                        {
                            model:productsize,
                            attributes:['size']
                        }
                        ,
                        {
                            model:product,
                            attributes:['name','price'],
                            include:[
                                {
                                    model:productimage,
                                    attributes:['url','key']
                                }
                            ] 
                        }
                    ]
                }
            ]
        })

        return getAllInfosUserCartFormat(data)
    }
}

module.exports = new CartRepository()