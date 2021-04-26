const {purchaseitem, purchase, stock} = require('../../models')
const httpStatus = require('../enum/httpStatus')
class CartController {
    async store(req, res){
        try{
            const data = req.body

            const productStock = await stock.findOne({where:{idProduct:data.idProductSize, idProductSize:data.idProductSize, idProductColor:data.idProductColor}})
            
            if(productStock.quantity < data.quantity){
                res.status(400).send({msg:'Desculpe, o valor adicionado ao carrinho excede o estoque', status:false})
            }

            let userCart = await purchase.findOne({where:{idUser:req.body.idUser, idPurchaseStatus:1}})
            
            if(!userCart){
                userCart = await purchase.create(data)
            }

            const oldPurchaseItem = await purchaseitem.findOne({where:{idPurchase:userCart.idPurchase, idProduct:data.idProduct,idProductColor:data.idProductColor, idProductSize:data.idProductSize}})
            
            if(oldPurchaseItem){
                var response = await oldPurchaseItem.increment('quantity', {by:data.quantity});
            }else{
                data.idPurchase = userCart.idPurchase
                var response = await purchaseitem.create(data)
            }

            res.status(200).send({status:true,data:response})
        }
        catch(err){
            res.status(500).send({msg:httpStatus['500'].value, status:false})
        }
    }
    async deleteItemFromCart(req, res){
        !req.body.idPurchaseItem ? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
        const cartOwner = await purchase.findOne({where:{idUser:req.body.idUser, idPurchaseStatus:1}})
        if(cartOwner){
            await purchaseitem.destroy({where:{idPurchaseItem:req.body.idPurchaseItem, idPurchase:cartOwner.idPurchase}})
            res.status(200).send({status:true,msg:'Removido do carrinho'})
        }else{
            res.status(500).send({msg:httpStatus['500'].value, status:false})
        }

    }
}

module.exports = new CartController()