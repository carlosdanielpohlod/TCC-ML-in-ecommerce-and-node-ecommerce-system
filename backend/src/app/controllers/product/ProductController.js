const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
const productRepository = require('../../repository/ProductRepository')
const systemLog = require('../log/GenericLogController')
class CreateProductController {


    async store(req, res){
        try{       
            const data = req.body 
            !data? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            const response = await productRepository.model().create(data)
            return res.status(201).send({msg:httpStatus["201"].value, status:true, data:response})        
        }
        catch(err){
            systemLog.error('CreateProductController.store', err.message, req.user.idUser)
            sequelizeOrGeneric(err, res)
        }
    }
               
    async update(req, res){
        try{       
            const data = req.body 
            !data? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            const response = await productRepository.model().update(data, {where:{idProduct:req.body.idProduct}})
            res.status(201).send({msg:httpStatus["201"].value, status:true, data:response})        
        }
        catch(err){
            sequelizeOrGeneric(err, res)
        }
    }

    async delete(req, res){
        try{
            
            !req.body? res.status(400).send({msg:httpStatus["400"].value, status:false}) : null
            
            const response = await productRepository.findPurchaseItemByIdProduct(req.body.idProduct)

            if(response[0] && response[0].dataValues.idPurchaseItem){
                res.status(400).send({msg:'Não deletado, existem compras ou carrinhos que incluem esse produto', status:false}) 
                return 
            }else{
                await productRepository.model().destroy({where:{idProduct:req.body.idProduct}})
                res.status(200).send({msg:httpStatus["200"].value, status:true}) 
                return
            }
        }
        catch(err){

           return res.status(500).send({msg:httpStatus['500'].value, status:false}) 
        }
    }

    async getBasicDetailsById(req, res){
        const result = await productRepository.basicDetails(req.params.idProduct)
        return res.status(200).send({status:true, data:result})
    }
    
    
}
module.exports = new CreateProductController()

  
  



