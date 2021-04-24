const {user} = require('../../../models/')
const bcrypt = require('bcrypt')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
class UserController{
   
    async store(req, res){
        try{
            !req.body.name ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            user.usedVerify({email:req.body.email}, res)
            user.usedVerify({cpf:req.body.cpf}, res)
            req.headers.password = bcrypt.hashSync(req.body.password, 10)
            const response = await user.create(req.body)
            response ? res.status(201).send({status:true, data:response}) : res.status(500).send({status:false, msg:httpStatus['500'].value})
        }
        catch(err){
            sequelizeOrGeneric(err,res)
        }
    }
}

module.exports = new UserController()