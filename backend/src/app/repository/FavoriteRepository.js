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
        const {product, productimage} = require('../models')
        const {formatFindFavoriteWithPaginate} = require('../controllers/utils/responseFormat')
        const data = await favorite.findAll({
            attributes:['idFavorite'],
            where:{idUser},
            offset: page * limit - limit,
            limit:limit,
            include: [{ 
                model:product,
                attributes:["idProduct","name", "price", "description"], 
                include:[{
                    model:productimage,
                    attributes:['url'],
                    limit:1
                }]
            }]
        })
        if(data){
            return formatFindFavoriteWithPaginate(data)
        }else{
            return null
        }
        

    }
}

module.exports = new FavoriteRepository()