const httpStatus = require('../enum/httpStatus')
function sequelizeOrGeneric(err, res){
    if (err.name == 'SequelizeValidationError' ){
           res.status(400).send({msg:err.errors, status:false, type:'ValidationError'})
           return 
    }
    else{

             res.status(500).send({msg:httpStatus['500'].value, status:false})
             return
    }
}

module.exports = {sequelizeOrGeneric}