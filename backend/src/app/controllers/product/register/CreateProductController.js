const {product} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')

class CreateProductController {
    async store(req, res){
        try{       
            const data = req.body 
            !data? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            const response = await product.create(data)
            res.status(201).send({msg:httpStatus["201"].value, status:true, data:response})
            
        }
        catch(err){
            err.name == 'SequelizeValidationError' ?
                res.status(400).send({msg:err.errors, status:false})
            :
                res.status(500).send({msg:httpStatus['500'].value, status:false})
        }
    }
}
module.exports = new CreateProductController()

  
  



