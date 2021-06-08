const {purchaseitem, purchase, stock} = require('../../models')
const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
const cartRepository = require('../../repository/CartRepository')
const systemLog = require('../log/GenericLogController')
class CartController {

    async store(req, res){
        try{
            const data = req.body

            data.quantity < 0 ? res.status(400).send({status:false, msg:httpStatus["400"].value}) : null

            const productStock = await stock.findOne({where:{idStock:data.idStock}})
            
            let userCart = await cartRepository.getUserCart(req.user.idUser)
            


            if(!userCart){
                userCart = await purchase.create(data)
            }

            const oldPurchaseItem = await purchaseitem.findOne({where:{idPurchase:userCart.idPurchase, idStock:data.idStock}})
            
            if(oldPurchaseItem){
                if(data.quantity + oldPurchaseItem.quantity > productStock.quantity){
                    res.status(400).send({msg:'Desculpe, o valor adicionado ao carrinho excede o estoque', status:false})
                    return
                }
            }else{
                if(productStock.quantity < data.quantity){
                    return res.status(400).send({msg:'Desculpe, o valor adicionado ao carrinho excede o estoque', status:false})
                }
            }


            if(oldPurchaseItem){
                var response = await oldPurchaseItem.increment('quantity', {by:data.quantity});
            }else{
                data.idPurchase = userCart.idPurchase
                
                var response = await purchaseitem.create(data)
            }

            res.status(201).send({status:true,data:response})
        }
        catch(err){
            systemLog.error("CartController.store", err.message, req.user.idUser)
            sequelizeOrGeneric(err, res)
        }
    }






    async deleteItemFromCart(req, res){
        try{
            !req.body.idPurchaseItem ? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            const userCart = await cartRepository.getUserCart(req.user.idUser)
            
            if(userCart){
                await cartRepository.removePurchaseItemFromCart(req.body.idPurchaseItem, userCart.idPurchase)
                res.status(200).send({status:true,msg:'Removido do carrinho'})
            }else{
                res.status(404).send({msg:'carrinho não encontrado', status:false, data:userCart})
            }
        }catch(err){
            systemLog.error("CartController.deleteItemFromCart", err.message, req.user.idUser)
            res.status(500).send({status:false,message:err.msg})
            return 

        }

    }


    async update(req, res){
        try{
            const cartItemData = await cartRepository.getUserCartPurchaseItem(req.user.idUser, req.body.idPurchaseItem)    
            
            if(!cartItemData){
                res.status(400).send({status:false, msg:httpStatus["400"].value})
                return 
            }

            if(req.body.quantity > 0 ){
               
                if(cartItemData.quantity + req.body.quantity > cartItemData.stock.quantity){
                    res.status(400).send({msg:`Quantidade excede o estoque (${cartItemData.stock.quantity})`, status:false}) 
                    return 
                }
                var verb ="increment"
            }
            else{ 
                req.body.quantity  = req.body.quantity * (-1)
                
                if(cartItemData.quantity - req.body.quantity < 0){
                   
                    res.status(400).send({msg:'Você não pode comprar uma quantidade negativa de produtos', status:false})
                    return
                }
                var verb = "decrement"
            }
            const data = await purchaseitem[verb]('quantity', { by: req.body.quantity , where:{idPurchaseItem:cartItemData.idPurchaseItem}});
            return res.status(200).send({status:true,msg:httpStatus[200].value, data})
        }
        catch(err){
            systemLog.error("CartController.update", err.message, req.user.idUser)
            sequelizeOrGeneric(err, res)
        }
    }

    async get(req, res){
        try{
            const response = await cartRepository.getAllInfosUserCart(req.user.idUser)
            return res.status(200).send({status:true,data:response})
        }
        catch(err){
            systemLog.error("CartController.get", err.message, req.user.idUser)
            sequelizeOrGeneric(err, res)
        }
            
                 
    }
}

module.exports = new CartController()