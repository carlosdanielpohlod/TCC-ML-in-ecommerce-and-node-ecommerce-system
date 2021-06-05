const {favorite} = require('../models')
const {Op} = require("sequelize");
class FavoriteRepository{
    model(){
        return favorite
    }
    async productAlreadyFavorite(idProduct, idUser){
        return await favorite.findOne({
            where:{[Op.and]: [{ idUser }, { idProduct }]}
        })
    }
    async userProductFavoriteDestroy(idProduct, idUser){
        return await favorite.destroy({
            where:{[Op.and]: [{ idUser }, { idProduct }]}
        })
    }
    async findFavoriteWithPaginate(idUser, page, limit){
        const {product} = require('../models')
        return await favorite.findAll({
            attributes:['idFavorite'],
            where:{idUser},
            offset: page * limit - limit,
            limit:limit,
            include: [{ 
                model:product,
                attributes:["idProduct","name", "price", "description"]
            }]
        })

    }
}

module.exports = new FavoriteRepository()