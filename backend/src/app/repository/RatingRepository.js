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
    model(){
        return rating
    }
}

module.exports = new RatingRepository()