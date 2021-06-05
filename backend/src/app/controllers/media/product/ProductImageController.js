const MediaController = require('../../api/media/MediaController')
const AwsS3 = require('../../api/media/AwsS3')
class ProductImageController{
    constructor(){
        mediaController = new MediaController(AwsS3)
    }
    async store(req, res){
        
    }

}
module.exports = new ProductImageController()