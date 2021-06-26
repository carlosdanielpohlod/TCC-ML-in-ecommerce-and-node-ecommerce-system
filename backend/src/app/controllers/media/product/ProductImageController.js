const MediaController = require('../../api/media/MediaController')
const AwsS3 = require('../../api/media/AwsS3')
const productImageRepository = require('../../../repository/ProductImageRepository')
const httpStatus = require('../../enum/httpStatus')
const systemLog = require('../../log/GenericLogController')
const mediaController = new MediaController(AwsS3)

class ProductImageController{
  
    async store(req, res){
        try{
            
            if(req.file){                
                const response = await productImageRepository.model().create({key:req.file.key, url:req.file.location, idProduct:req.body.idProduct})

                return res.status(201).send({status:true, data:response, msg:httpStatus["201"].value})
            }
            else{  
                mediaController.delete(req.file.key) 
                systemLog.error('ProductImageController.store', 'Upload não realizado', req.user.idUser)
                return res.send(500).send({status:false,msg:httpStatus["500"].value})
            }
        
        }catch(err){
            systemLog.error('ProductImageController.store', err.message, req.user.idUser)
            return res.send(500).send({status:false,msg:httpStatus["500"].value})
        }
    }

    async delete(req, res){
        try {
            mediaController.delete(req.body.key)
            await productImageRepository.model().destroy({where:{key:req.body.key}})
            return res.status(200).send({status:true, msg:httpStatus['200'].value})
        } catch (err) {
            systemLog.error('ProductImageController.delete', err.message, req.user.idUser)
            return res.send(500).send({status:false,msg:httpStatus["500"].value})
        }
    }

    async get(req, res){
        // try {
             res.status(200).send({data:await productImageRepository.productImages(req.body.idProduct), status:true})
        // } catch (err) {
        //     systemLog.error('ProductImageController.store', err.message, req.user.idUser)
        //     return res.send(500).send({status:false,msg:httpStatus["500"].value})
        // }
    }

}
module.exports = new ProductImageController()