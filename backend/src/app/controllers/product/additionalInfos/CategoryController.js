
const {category} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
const systemLog = require('../../log/NotificationLogController')
class CategoryController {
    async store(req, res){
        try{
            const data = req.body
            !data ? res.status(400).send({msg:httpStatus["400"].value, success:false}) : null
                
            if(data.idRootCategory){
                const result = await category.findOne({where:{idCategory:data.idRootCategory}})
                if(result){
                    const response = await category.create({idRootCategory:data.idRootCategory, category:data.category})
                    res.status(201).send({msg:httpStatus["200"].value,status:true, data:response})
                }else{
                    res.status(400).send({msg:'Categoria pai não encontrada'.value,status:false})
                }
            }else{
                const response = await category.create(data)
                res.status(201).send({msg:httpStatus["200"].value,status:true, data:response})
            }
            
        }catch(err){
            systemLog.error('store', err.message)
            return res.send(err.message)
            // sequelizeOrGeneric(err, res)
        }
    }

    async update(req, res){
        try{
            const response = await category.update({data}, {where:{idCategory:req.body.idCategory}})
            return res.send(200).send({status:true, msg:httpStatus["200"].value, data:response})
        }
        catch(err){
            systemLog.error('CategoryController.store', err.message)
            sequelizeOrGeneric(err, res)
        }
    }
    async delete(req, res){
        
        try{
            const {product} = require('../../../models')
            const relation = await product.findOne({where:{idCategory:req.body.idCategory}})
            const subCategory = await category.findOne({where:{idRootCategory:req.body.idCategory}})
            if(subCategory != null || relation != null){
                return res.status(400).send({status:false, msg:'Você não pode deletar pois existem produtos ou subcategorias com essa categoria'})
            }else{
                await category.destroy({where:{idCategory:req.body.idCategory}})
                return res.status(200).send({status:true, msg:httpStatus["200"].value})
            }
        }
        catch(err){
            systemLog.error('CategoryController.store', err.message)
            res.send(500).send({status:false, msg:httpStatus["500"].value})
        }
    }
    

    async get(req, res){
        const {toTree} = require('../../utils/responseFormat')
        
        const array = []
        const response = await category.findAll()
        response.forEach(category => {
            array.push(category.dataValues)
        })
        return res.status(200).send({data:{tree:toTree(array)}, status:true})
        
        // .catch(err => {
        //     return res.status(500).send({msg:httpStatus["500"].value, status:false})
        // })
    }
}
module.exports = new CategoryController()