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
            throw new Error('Não foi possivel remover o item')
        }
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
        
        return response.dataValues.purchaseitems[0]
    }

    async getAllInfosUserCart(idUser){
        const {productcolor, productsize, product} = require('../models')
        return await purchaseitem.findAll({
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
                            attributes:['name','price'] 
                        }
                    ]
                }
            ]
        })
    }
}

module.exports = new CartRepository()