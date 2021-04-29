const {brand} = require('../../../models')
const httpStatus = require('../../enum/httpStatus')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')
class BrandController {
    async store(req, res){
        brand.create(req.body)
            .then(response => res.status(201).send({status:true, msg:httpStatus["201"].value, data:response}))
            .catch(err => sequelizeOrGeneric(err, res))
    }
}

module.exports = new BrandController()