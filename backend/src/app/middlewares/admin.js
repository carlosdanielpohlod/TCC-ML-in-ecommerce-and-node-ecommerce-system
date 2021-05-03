module.exports = (middleware) => {
    return (req, res, next) => {
        if(req.user.idUserPrivilege == 1){
             middleware(req, res, next)
        }else{
             res.status(401).send({status:false, msg:'Usuário não administrador'})
        }
    }
}