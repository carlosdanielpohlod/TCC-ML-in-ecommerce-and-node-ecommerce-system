const {brand} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')

class BrandController {
    async store(req, res){
        brand.create(req.body)
            .then(response => res.status(201).send({status:true, msg:httpStatus["201"].value, data:response}))
            .catch(err => sequelizeOrGeneric(err, res))
    }

    async update(req, res){
        brand.update(req.body, {where:{idBrand:req.body.idBrand}})
            .then(response =>{ 
                    response == 1? res.status(200).send({msg:httpStatus["200"].value, status:true}) : res.status(400).send({msg:httpStatus["400"], status:false})
                })
            .catch(err => sequelizeOrGeneric(err, res))
    }

    async delete(req, res){
        const {product} = require('../../../models')
        
        if(await product.findOne({where:{idBrand:req.body.idBrand}})){
            return res.status(400).send({status:false, msg:'Existem produtos associados a essa marca'})
        }
        else{
            brand.destroy({where:{idBrand:req.body.idBrand}})
            .then(response =>{ 
                    response == 1? res.status(200).send({msg:httpStatus["200"].value, status:true}) : res.status(400).send({msg:httpStatus["400"], status:false})
                })
            .catch(err => sequelizeOrGeneric(err, res))
        }
    }


   
}

module.exports = new BrandController()