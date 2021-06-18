const {Op} = require("sequelize");
const {purchasestatus, product, purchase,purchaseitem, stock, productcolor, productsize, category, productimage} = require('../models')
const purchaseStatus = require('../controllers/enum/purchaseStatus')
class PurchaseRepository{

    model(){
        return purchase
    }

    async getPurchaseDetails(idUser, idPurchase){
        
        return await purchase.findOne({
                
            attributes:['idPurchase','createdAt'],
            where:{
                [Op.and]: [{ idUser:idUser }, { idPurchase:idPurchase }]
            },
            include: [
                {
                    model:purchasestatus,
                    attributes:['status','idPurchaseStatus']
                },
                {
                    model:purchaseitem,
                    attributes:['quantity'],
                    include: [
                        {
                            model:stock,
                            attributes:['idStock'],
                            include:[{
                                model:product,
                                attributes:['idProduct','name','description'],
                                include: [
                                {
                                    model:category,
                                    attributes:['category']
                                },
                                {
                                    model:productimage,
                                    attributes:["url","sort"]
                                }
                                ]
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
            }]
        })
        
    }

    async getOldPurchaseByIdUser(idUser){
        const {product, address, phone, user,  productcolor, productsize} = require('../models')
        return await purchase.findAll({
                        
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
                        where:{idUser:idUser},
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
    }
    async getPurchasesByIdUser(idUser, limit, page){
        
        return await purchase.findAll({
            order:[['createdAt', 'DESC']],
            attributes:['idPurchase','createdAt'],
            where:{idUser:idUser},
            offset: page * limit - limit,
            limit:limit,
            include: [{
                model:purchasestatus,
                attributes:['status','idPurchaseStatus']
            },{
                model:purchaseitem,
                attributes:['quantity'],
                include: [
                    {
                        model:stock,
                        attributes:['idStock'],
                        include:[{
                            model:product,
                            attributes:['name','description']
                        }]
                    
                    }
                ]
            }]
        })
        
    }

    async getItemsFromPurchase(idPurchase){
        return await purchase.findAll({
                            
            where:{idPurchase:idPurchase},
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
    }
}

module.exports = new PurchaseRepository()