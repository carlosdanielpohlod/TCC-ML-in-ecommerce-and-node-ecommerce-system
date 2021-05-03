const jwt = require('jwt-simple')
// const httpStatus = require('../enum/httpStatus')
const {user} = require('../../models')
const bcrypt = require('bcrypt')
require('dotenv').config({path:'.env'})
class AuthController{

    
   async validateToken(req, res){

        const [scheme, token] = req.headers.authorization.split(' ')
        if(!token){
              res.status(401).send({status:false,msg:"token não informado"})
              return
        }

        if(! /^Bearer$/i.test(scheme)){
           res.status(401).send({status:false,msg:"Token mau formado"})
           return
        }
        
        const decode = jwt.decode(token, process.env.AUTHSECRET)
        if(new Date(decode.exp * 1000) < new Date()){
             res.status(401).send({status:false, msg:"Sessão expirada, entre novamente"}) 
            return
        }
        const response = await user.findOne({where:{email:decode.email}})

        
        if(!response.deletedAt)
            res.status(200).send({status:true, data:{... decode, token}})
        else 
            res.status(401).send({status:false})
        
   }

   async signin(req, res){
    //    try{
            
            if (!req.body.email || !req.body.password) 
                return res.status(401).send({status:false, msg:'Informe usuário e senha!'})
        
            const response = await user.findOne({ where:{email: req.body.email }})
            
            if (!response || response.deletedAt != null) 
                return res.status(401).send({status:false, msg:'Usuário não encontrado!'})
            
            if (!bcrypt.compareSync(req.body.password, response.password)) 
                return res.status(401).send({status:false, msg:'Email/Senha inválidos!'})

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                idUser: response.idUser,
                idUserPrivilege: response.idUserPrivilege,
                name: response.name,
                email: response.email,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)
            }
            
            res.status(200).send({status:true,data:{...payload,
                token:jwt.encode(payload, process.env.AUTHSECRET)}})
    //    }
    //    catch(err){
    //        res.status(500).send({status:false, msg:httpStatus['500'].value})
    //    }    
   }
}

module.exports = new AuthController()