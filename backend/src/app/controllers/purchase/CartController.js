const { response } = require('express')
const {purchaseitem, purchase, productcolor, productsize, stock, product} = require('../../models')
// const product = require('../../models/product')
const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
class CartController {
    async store(req, res){
        try{
            const data = req.body

            const productStock = await stock.findOne({where:{idStock:data.idStock}})
            
            let userCart = await purchase.findOne({where:{idUser:req.body.idUser, idPurchaseStatus:1}})
            
            if(!userCart){
                userCart = await purchase.create(data)
            }

            const oldPurchaseItem = await purchaseitem.findOne({where:{idPurchase:userCart.idPurchase, idStock:data.idStock}})
            if(oldPurchaseItem){
                if(productStock.quantity - oldPurchaseItem.quantity < data.quantity){
                    return res.status(400).send({msg:'Desculpe, o valor adicionado ao carrinho excede o estoque', status:false})
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
            res.status(500).send({msg:httpStatus['500'].value, status:false})
        }
    }
    async deleteItemFromCart(req, res){
        try{
        !req.body.idPurchaseItem ? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
        const userCart = await purchase.findOne({where:{idUser:req.body.idUser, idPurchaseStatus:1}})
        
        if(userCart){
            await purchaseitem.destroy({where:{idPurchaseItem:req.body.idPurchaseItem, idPurchase:userCart.idPurchase}})
            res.status(200).send({status:true,msg:'Removido do carrinho'})
        }else{
            res.status(404).send({msg:'carrinho não encontrado', status:false, data:userCart})
        }
        }catch(err){
            res.status(500).send({message:err.msg})
        }

    }
    async update(req, res){
        // try{
            !req.body.idPurchaseItem ? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            const userCart = await purchase.findOne({where:{idUser:req.body.idUser, idPurchaseStatus:1}})
            const purchaseItemUpdate = await purchaseitem.findOne({where: {idPurchase:userCart.idPurchase}})
            const itemOnStock = await stock.findOne({where:{idProduct:purchaseItemUpdate.idProduct, idProductColor:purchaseItemUpdate.idProductColor, idProductSize:purchaseItemUpdate.idProductSize}})
            console.log(itemOnStock)
            if(req.body.quantity > 0 ){
                console.log(purchaseItemUpdate.quantity + req.body.quantity, itemOnStock)
                if(purchaseItemUpdate.quantity + req.body.quantity > itemOnStock.quantity){
                    res.status(400).send({msg:`Quantidade excede o estoque (${itemOnStock.quantity})`, status:false}) 
                }
                var verb ="increment"
            }
            else{ 
                req.body.quantity  = req.body.quantity * (-1)
                if(purchaseItemUpdate.quantity - req.body.quantity < 0){
                    res.status(400).send({msg:'Você não pode comprar uma quantidade negativa de produtos', status:false})
                }
                var verb = "decrement"
            }
            const response = await purchaseItemUpdate[verb]('quantity', { by: req.body.quantity });
            res.status(200).send({status:true,msg:httpStatus[200].value, data:response})
        // }
        // catch(err){
        //     sequelizeOrGeneric(err, res)
        // }
    }
    async get(req, res){
        try{
            
            purchaseitem.findAll({
                attributes:['idPurchaseItem','quantity'],
                include: [{
                  model: purchase,
                  where: {idUser: req.body.idUser},
                  attributes:[]
                }, {
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
              }).then(response => {
                res.send(response)
              });
           
        }
        catch(err){
            res.send(err.message)
        }
          
        
    }
}

module.exports = new CartController()