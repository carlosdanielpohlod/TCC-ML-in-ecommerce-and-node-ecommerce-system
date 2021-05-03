const {phone, user} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
class PhoneController{
    async store(req, res){
// Verificações exageradas porque é area publica
        try{
            if(req.body.idPhone)
                req.body.idPhone = null

            const oldPhone = await user.findOne({where:{idUser:req.user.idUser}})
            
            if(oldPhone.idPhone){
                return res.status(400).send({status:false,msg:'Usuário já possui um telefone'})
            }else{
                phone.create(req.body)
                .then(response => {
                    user.update({idPhone:response.idPhone}, {where:{idUser:req.user.idUser}})
                    .then(resp =>{
                        resp == 1? res.status(200).send({status:true, msg:httpStatus["200"].value}) : res.send(400).send({status:false, msg:httpStatus["400"].value})
                        })
                    .catch(err => sequelizeOrGeneric(err, res))
                })
                .catch(err => sequelizeOrGeneric(err, res))
            }
        }
        catch(err){
            return sequelizeOrGeneric(err, res)
        }
    }
    async update(req, res){

        if(req.body.idPhone)
            req.body.idPhone = null

        const response = await user.findOne({where:{idUser:req.user.idUser}})
        phone.update(req.body,{where:{idPhone:response.idPhone}})
        .then(resp => {
            
            resp == 1 ? res.status(200).send({status:true, msg:httpStatus["200"].value}) : res.status(400).send({status:false, msg:httpStatus["400"].value})
            .catch(err => sequelizeOrGeneric(err, res))
        })
        .catch(err => sequelizeOrGeneric(err, res))
    }
}
module.exports = new PhoneController()