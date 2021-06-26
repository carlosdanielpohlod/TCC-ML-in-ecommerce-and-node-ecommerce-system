const {productimage} = require('../models')

class ProductImageRepository{
    model(){
        return productimage
    }

    async productImages(idProduct){
        return await productimage.findAll({
            where:{idProduct}
        })
    }
}

module.exports = new ProductImageRepository()