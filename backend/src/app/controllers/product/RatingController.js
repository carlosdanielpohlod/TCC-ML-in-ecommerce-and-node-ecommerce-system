const {rating} = require('../../models')
const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
const systemLog = require('../log/GenericLogController')
const ratingRepository = require('../../repository/RatingRepository')
class RatingController{

    async store(req, res){
        try{
            
            const data = req.body
            data.idUser = req.user.idUser
            var old = await ratingRepository.findOldRating(data.idProduct, data.idUser)
            if(!old) {
                const newRating = await ratingRepository.model().create(data)

                if(newRating){
                    return res.status(200).send({status:true, data:newRating})
                }

            }
            else{
                old.rating = data.rating
                if(await ratingRepository.model().update(data, {where:{idRating:old.idRating}}))
                    return res.status(200).send({status:true, msg:httpStatus["200"].status})
            }
            return res.status(400).send({msg:httpStatus["400"].value, status:false})
        }catch(err){
            systemLog.error('RatingController.store', err.message, req.user.idUser)
            sequelizeOrGeneric(err, res)
        }
    }

    async getPurchaseItemRating(req, res){
        try{
            const data = req.query
            data.idUser = req.user.idUser
      
            const rating = await ratingRepository.findByIdUserAndIdProduct(data.idUser, data.idProduct)
        
            return res.status(200).send({status:true, data:rating})
        }
        catch(err){
            systemLog.error('RatingController.getPurchaseItemRating', err.message, req.user.idUser)
            return res.status(400).send({msg:httpStatus["400"].value, status:false})
        }
    }

    async get(req, res){
        const data = req.body
        const mean = await ratingRepository.meanRatingsProduct(data.idProduct)
        return res.status(200).send({status:true,data:{mean} })
    }
}

module.exports = new RatingController()
