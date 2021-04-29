
const {category} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')

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
            sequelizeOrGeneric(err, res)
        }
    }

    async update(req, res){
        try{
            const response = await category.update({data}, {where:{idCategory:req.body.idCategory}})
            res.send(200).send({status:true, msg:httpStatus["200"].value, data:response})
        }
        catch(err){
            sequelizeOrGeneric(err, res)
        }
    }
    async delete(req, res){
        
        try{
            const {product} = require('../../../models')
            // const relation = await category.findOne({
            //     attributes:['idCategory'],
            //     where:{idCategory:req.body.idCategory},
            //     // as:'idHasRoot',
            //     include: [
            //         {
            //             model: product,
            //             where: {idCategory: req.body.idCategory},
            //             attributes:[]
            //         }, 
            //         {
            //             model: category,
            //             attributes:[]
            //             ,
            //             as:'idHasRoot'
            //         }
            //     ]
            // })
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

        }
    }
    // DOES NOT WORK YET
    async get(req, res){
        const categorias = await category.findAll()
        const tree = {
            categoria01:
            {
                name:"Calçado",
                subCategoria:
                [
                    {
                        name:"Tenis",
                        subcategoria01:[{
                            name:"Sport",
                            url:"localhost/sport"
                        }]
                    },
                    {
                        name:"Sapatilha",
                        url:"localhost/ortopedico"
                    }
                ]
             }
        }
        
        
        res.json(categorias)
    }
}
module.exports = new CategoryController()