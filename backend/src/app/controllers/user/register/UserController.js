const {user} = require('../../../models/')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
const { Op } = require("sequelize");
class UserController{
   
    async store(req, res){
        try{
            !req.body.name ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            user.usedVerify({email:req.body.email}, res)
            user.usedVerify({cpf:req.body.cpf}, res)
            req.body.password = user.passwordHash(req.body.password) 
            req.body.idUserPrivilege = 2     
            const response = await user.create(req.body)
            return res.status(201).send({status:true,msg:httpStatus['201'].value, data:response})
        }
        catch(err){
            sequelizeOrGeneric(err,res)
        }
    }

    async update(req, res){
        try{
            const data = req.body
        //    if( || user.usedVerify({cpf:req.body.cpf,idUser:{[Op.ne]:req.body.idUser}}) )
        //    {
        //        res.status(400).send('invalido')
        //    }
            
            user.usedVerify({email:req.body.email, idUser:{[Op.ne]:req.body.idUser}}, res) 
            user.usedVerify({cpf:req.body.cpf,idUser:{[Op.ne]:req.body.idUser}}, res)
            
            await user.update({
                name:data.name,
                cpf:data.cpf,
                email:data.email,
                birthday:data.birthday,
                surname:data.surname
            }, {where:{idUser:data.idUser}})

            return res.status(200).send({status:true, msg:httpStatus['200']})
        }
        catch(err){
            sequelizeOrGeneric(err,res)
        }
    }

    async getAll(req, res){
        try{
            const limitByPage = 10
            const page = req.body.page
            const result = await user.findAll({attributes:user.basicInfosTemplate, offset:req.body.page * limitByPage - limitByPage, limit:limitByPage})
            return res.status(200).send({status:true,data:result, limitByPage, page})
        }
        catch(err){
            return res.status(500).send({status:false, msg:httpStatus["500"].value})
        }
    }

    
    async getById(req, res){
      
            
        user.findOne({attributes:user.basicInfosTemplate, where:{idUser:req.params.idUser}})
        .then(response => {
            res.status(400).send({status:true, data:response})
        })
        .catch(err => res.status(500).send({status:false, msg:httpStatus['500'].value}))

    }



}

module.exports = new UserController()