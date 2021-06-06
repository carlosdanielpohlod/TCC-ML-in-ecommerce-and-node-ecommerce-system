const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
const userRepository = require('../../repository/UserRepository')
const systemLog = require('../log/GenericLogController')
class UserController{
   
    async store(req, res){
        try{
            !req.body.name ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            let response =  await userRepository.model().findOne({where:{email:req.body.email}})
            if(response != null){
                return res.status(400).send({msg:"Email já utilizado", status:false})
            }
            
            response  = await userRepository.model().findOne({where:{cpf:req.body.cpf}})
            if(response != null){
                return res.status(400).send({msg:"CPF já utilizado", status:false})
                
            }
           
            req.body.password = userRepository.model().passwordHash(req.body.password) 
            req.body.idUserPrivilege = 2     
            response = await userRepository.model().create(req.body)
            return res.status(201).send({status:true,msg:httpStatus['201'].value, data:response})
        }
        catch(err){
            sequelizeOrGeneric(err,res)
        }
    }

    async update(req, res){
        try{
            const data = req.body
     
            let response =  await userRepository.checkEmailAlreadyUtized(req.user.idUser, req.body.email)
            if(response != null){
                return res.status(400).send({msg:"Email já utilizado", status:false})
            }       
            response  = await userRepository.checkCpfAlreadyUtized(req.user.idUser, req.body.cpf)
            
            if(response != null){
                return res.status(400).send({msg:"CPF já utilizado", status:false})
                
            }
            await userRepository.model().update({
                name:data.name,
                cpf:data.cpf,
                email:data.email,
                birthday:data.birthday,
                surname:data.surname
            }, {where:{idUser:req.user.idUser}})

            return res.status(200).send({status:true, msg:httpStatus['200']})
        }
        catch(err){
            systemLog.error("update", err.message, req.user.idUser)
            sequelizeOrGeneric(err,res)
        }
    }
    async deleteOtherUser(req, res){
        const response = await userRepository.findOneUserOpenedPurchase(req.body.idUserDelete)
        if(response){
           return res.send({msg:"Usuário possui compras pendentes na plataforma", status:false})
        }else{
          await userRepository.softDelete(req.body.idUserDelete) == 1? res.status(200).send({msg:httpStatus["200"].value, status:true}) : res.status(400).send({msg:'Não foi possivel deletar', status:false})      
        }
    }
    async getAll(req, res){
        try{
            const limitByPage = 10
            const result = await userRepository.findAllWithPaginate(req.body.page,limitByPage)
            return res.status(200).send({status:true,data:result, limitByPage, page:req.body.page})
        }
        catch(err){
            return res.status(500).send({status:false, msg:httpStatus["500"].value})
        }
    }
     async getById(req, res){
      
            
        userRepository.model().findOne({attributes:user.basicInfosTemplate, where:{idUser:req.params.idUser}})
        .then(response => {
            res.status(200).send({status:true, data:response})
        })
        .catch(err => res.status(500).send({status:false, msg:httpStatus['500'].value}))

    }



}

module.exports = new UserController()