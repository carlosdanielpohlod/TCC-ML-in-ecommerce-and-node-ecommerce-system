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
}

module.exports = new FavoriteRepository()