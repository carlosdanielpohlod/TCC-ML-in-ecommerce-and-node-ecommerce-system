const {purchaseitem, stock} = require('../models')
class ProductRepository {
    async findPurchaseItemByIdProduct(idProduct){
        return await  purchaseitem.findAll({
            attributes:['idPurchaseItem'],
            include: [{
            model: stock,
            where: {idProduct: idProduct},
            attributes:[]
            }]
            
        })
    }
    
    async basicDetails(idProduct){
        const {brand, category, productsize, productcolor, product} = require('../models')
       return product.findAll({
            attributes:["idProduct","name", "price", "description"],
           include: [
            {
                model:category,
                attributes:["category"]
            },
            {
                model:brand,
                attributes:["brand"]
            },
            { 
                model:stock,
                attributes:['quantity',"idStock"],
                group:["color"],
                include:[
                    {
                        model:productsize,
                        attributes:["size"]
                    }
                    ,{
                        model:productcolor,
                        attributes:["color"]   
                    }
                ]
            }
           ]
        ,where:{idProduct:idProduct}})
    }
}

module.exports = new ProductRepository()