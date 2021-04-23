const {user} = require('../../../models/')
const bcrypt = require('bcrypt')
const httpStatus = require('../../enum/httpStatus')
class UserController{
    async store(req, res){
        try{
            !req.body.name ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const response = await user.create(req.body)
            response ? res.status(201).send({status:true, data:response}) : res.status(500).send({status:false, msg:httpStatus['500'].value})
        }
        catch(err){
            err.name == 'SequelizeValidationError' ?
                res.status(400).send({msg:err.errors, status:false})
            :
                res.status(500).send({msg:httpStatus['500'].value, status:false})
        }
    }
}

module.exports = new UserController()