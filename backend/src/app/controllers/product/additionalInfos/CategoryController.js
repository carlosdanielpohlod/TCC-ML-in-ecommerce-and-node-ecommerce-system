
const {category} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
class CategoryController {
    async store(req, res){
        try{
            const data = req.body
            !data ? res.status(400).send({msg:httpStatus["400"].value, success:false}) : null
            
            const result = validate.validate({
                fields:[
                    {   
                        value:data.category,
                        rules:{
                            minLength:3,
                            maxLength:10,
                            regex:'^[a-zA-Z\s]+$'
                        }
                    }
                ]
            })
            if(!result.status){
                res.status(400).send({msg:httpStatus["400"].value,status:false, errors:result.msg})
            }else{
                
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
            }

            
        }catch(err){
            res.status(500).send({status:httpStatus["500"].value, status:false})
        }
    }
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