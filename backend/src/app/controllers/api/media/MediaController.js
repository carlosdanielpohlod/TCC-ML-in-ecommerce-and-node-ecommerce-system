class MediaController{
    constructor(implementation){
        
        this.implementation = implementation
        
    }

    async delete(id){
        return await this.implementation.delete(id)
    }
    async saveProductImages(idProduct, data){
        return await this.implementation.saveProductImages(idProduct, data)
    }
    async updateProductImage(idProduct, data){
        return await this.implementation.updateProductImage(idProduct, data)
    }
}

module.exports = MediaController