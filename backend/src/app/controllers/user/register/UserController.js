const {user} = require('../../../models/')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
class UserController{
   
    async store(req, res){
        try{
            !req.body.name ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            user.usedVerify({email:req.body.email}, res)
            user.usedVerify({cpf:req.body.cpf}, res)
            req.body.password = user.passwordHash(req.body.password) 
            req.body.idUserPrivilege = 2     
            const response = await user.create(req.body)
            return res.status(201).send({status:true,msg:httpStatus['200'].value, data:response})
        }
        catch(err){
            sequelizeOrGeneric(err,res)
        }
    }

    async update(req, res){
        try{

        }
        catch(err){

        }
    }
}

module.exports = new UserController()