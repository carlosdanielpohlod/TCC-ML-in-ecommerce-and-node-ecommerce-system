const productStatusRepository = require('../../../repository/ProductStatusRepository')
class ProductStatus{
    getAll(){
        return productStatusRepository.model().findAll()
    }
}

module.exports = new ProductStatus()