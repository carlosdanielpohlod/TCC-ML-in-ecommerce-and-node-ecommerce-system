const jwt = require('jwt-simple')
require('dotenv').config({path:'.env'})
existsBearer = function(scheme){
    ! /^Bearer$/i.test(scheme) ? false : true
}

admin = function(req, res, next){
    
    if(!req.headers.authorization){
        return res.status(401).send({status:false,msg:"token não informado"})
        
    }
    if(existsBearer(req.headers.authorization)){
        res.status(401).send({status:false,msg:"token incorreto"})
    }

    const [scheme, token] = req.headers.authorization.split(' ')

    const decode = jwt.decode(token, process.env.AUTHSECRET) 
    
    if(decode.idUserPrivilege == 1){
        req.body.idUser = decode.idUser
        next()
    }        
    else
        return res.status(401).send({status:false})
}

user = function(req, res, next){
    
    if(!req.headers.authorization){
        res.status(401).send({status:false,msg:"token não informado"})
        return
    }
    if(existsBearer(req.headers.authorization)){
        res.status(401).send({status:false,msg:"token incorreto"})
    }

    const [scheme, token] = req.headers.authorization.split(' ')

    const decode = jwt.decode(token, process.env.AUTHSECRET) 
    
    if(decode.idUserPrivilege){
        req.body.idUser = decode.idUser
        next()
    }
    else
        return res.status(401).send({status:false})
}

module.exports = {admin, user}