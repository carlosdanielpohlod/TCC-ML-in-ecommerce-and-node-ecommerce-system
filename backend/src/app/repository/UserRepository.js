const { Op } = require("sequelize");
const {user, purchase} = require('../models')
const purchaseStatus = require('../controllers/enum/purchaseStatus')
class UserRepository{
    model(){
        return user
    }

    async findOneUserOpenedPurchase(idUser){
        
        return await purchase.findOne({
            where:{idUser:idUser,
                idPurchaseStatus:{
                    [Op.or]:[
                        purchaseStatus["aguardando_pagamento"].value, 
                        purchaseStatus["pagamento_efetuado"].value, 
                        purchaseStatus["produto_em_transito"].value
                    ]
                }
            }
        })
    }

    async softDelete(idUserDelete){
        return await user.update({deletedAt:(new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ')}, {where:{idUser:idUserDelete}})
    }

    async findAllWithPaginate(page, limit){
        return await user.findAll({attributes:user.basicInfosTemplate, offset:page * limit - limit, limit:limit})
    }

    async checkEmailAlreadyUtized(idUser, email){
        return await user.findOne({where:{email, idUser:{[Op.ne]:idUser}}})
    }

    async checkCpfAlreadyUtized(idUser, cpf){
        return await user.findOne({where:{cpf, idUser:{[Op.ne]:idUser}}})
    }
}

module.exports = new UserRepository()