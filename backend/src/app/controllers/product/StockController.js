const {stock} = require('../../models')
const httpStatus = require('../enum/httpStatus')
const {sequelizeOrGeneric} = require('../utils/errorFormat')
class StockController {
    async store(req, res){
        try{
            const response = await stock.create(req.body)
            return res.status(201).send({msg:httpStatus["201"].value,status:true, data:response})   
        }catch(err){
            sequelizeOrGeneric(err, res)
        }
    }
    async update(req, res){
        try{
            const data = req.body
            !data.idProduct ? res.status(400).send({msg:httpStatus["400"].value,status:false}) : null 
            const response = await stock.update({quantity:data.quantity}, {where:{idProduct:data.idProduct, idProductSize:data.idProductSize}})
            return res.status(200).send({msg:httpStatus["200"].value,status:true, data:response})
        }
        catch(err){
            sequelizeOrGeneric(err, res)
        }
    }

    
}
module.exports = new StockController()