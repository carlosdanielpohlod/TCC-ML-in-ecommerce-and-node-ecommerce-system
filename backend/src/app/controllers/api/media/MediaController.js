class MediaController{
    constructor(implementation){
        
        this.implementation = implementation
        
    }

    async findProductImagesByPk(idProduct){
        return await this.implementation.findProductImagesByPk(idProduct)
    }
    async saveProductImages(idProduct, data){
        return await this.implementation.saveProductImages(idProduct, data)
    }
    async updateProductImage(idProduct, data){
        return await this.implementation.updateProductImage(idProduct, data)
    }
}

module.exports = MediaController