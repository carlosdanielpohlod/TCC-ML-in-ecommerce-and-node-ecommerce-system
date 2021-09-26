const {rating} = require('../models')
const {Op} = require("sequelize");
class RatingRepository{
    async findOldRating(idProduct, idUser){
        const old = await rating.findOne({
            where:{
                [Op.and]: [{ idUser:idUser }, { idProduct:idProduct }]
            }
        })
        return old
    }
    async findByIdUserAndIdProduct(idUser, idProduct){
        return await rating.findOne({
            where:{
                [Op.and]: [{ idUser:idUser }, { idProduct:idProduct }]
            }, attributes:['rating']
        } )

    }
    model(){
        return rating
    }
    async meanRatingsProduct(idProduct){
        var ratings = await ratingRepository.model().findAll({where:{idProduct:idProduct},
            attributes:['rating']
        })
        var sum = 0
   
        ratings.forEach(r =>
            sum = sum + r.dataValues.rating,
        )
        return mean(sum / ratings.length)
    }
}

module.exports = new RatingRepository()