const {productStatus} = require('../models')
class ProductStatusRepository{
    model(){
        return productStatus
    }
}

module.exports = new ProductStatusRepository()