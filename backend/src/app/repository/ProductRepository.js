const {purchaseitem, stock, product} = require('../models')
class ProductRepository {

    model(){
        return product
    }
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
       const {brand, category, productsize, productcolor, productimage} = require('../models')
       const {formatProductBasicDetails} = require('../controllers/utils/responseFormat')
       const data = await product.findAll({
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
                model:productimage,
                attributes:["url","sort"]
            },
            { 
                model:stock,
                attributes:['quantity',"idStock"],
                group:["color"],
                include:[
                    {
                        model:productsize,
                        attributes:["size","idProductSize"]
                    }
                    ,{
                        model:productcolor,
                        attributes:["color","idProductColor"]   
                    }
                ]
            }
           ]
        ,where:{idProduct:idProduct}})
        return formatProductBasicDetails(data)
    }
}

module.exports = new ProductRepository()