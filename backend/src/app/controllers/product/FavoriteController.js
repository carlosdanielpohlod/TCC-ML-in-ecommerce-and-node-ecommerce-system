const favoriteRepository = require('../../repository/FavoriteRepository')
const httpStatus = require('../enum/httpStatus')
const systemLog = require('../log/GenericLogController')
class FavoriteController{
    async store(req, res){
        try{
            const data = req.body
            data.idUser = req.user.idUser
            if(! await favoriteRepository.productAlreadyFavorite(req.body.idProduct, req.user.idUser)){
                await favoriteRepository.model().create(data)
                return res.status(201).send({msg:httpStatus["201"].value, status:true})
            }else{
                return res.status(400).send({msg:'Já esta nos favoritos', status:false})
            }
        }catch(err){
            systemLog.error("FavoriteController.store",err.message, req.user.idUser)
            return res.status(500).send({msg:"Ocorreu algum erro ao favoritar", status:false})
        }
    }

    async delete(req, res){
        try{
            await favoriteRepository.userProductFavoriteDestroy(req.body.idProduct, req.user.idUser)
            return res.status(200).send({msg:httpStatus["200"].value, status:true})
           
        }catch(err){
            systemLog.error("FavoriteController.delete",err.message, req.user.idUser)
            return res.status(500).send({msg:"Ocorreu algum erro ao deletar", status:false})
        }
    }

    async get(req, res){
        try{
            
            const limit = 10
            const result = await favoriteRepository.findFavoriteWithPaginate(req.user.idUser, req.body.page, limit)
            return res.status(200).send({status:true, data:result, limit, page:req.body.page})
        }catch(err){
            systemLog.error("FavoriteController.get", err.message, req.user.idUser)
            return res.status(500).send({status:false, msg:httpStatus["500"].value})
        }
    }
}

module.exports = new FavoriteController()