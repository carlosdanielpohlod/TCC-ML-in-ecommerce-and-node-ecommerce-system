const {stock} = require('../../models')
const httpStatus = require('../enum/httpStatus')
class StockController {
    async store(req, res){
        try{
            const data = req.body
            if(!Number.isInteger(data.quantity) || data.quantity < 0){
                res.status(400).send({msg:'Valor deve ser inteiro e positivo', status:false})
            }else{
                const response = await stock.create(data)
                res.status(201).send({msg:httpStatus["201"].value,status:true, data:response})
            }
        }catch(err){
            res.status(501).send({status:httpStatus["500"].value, status:false})
        }
    }
    async update(req, res){
        try{
            const data = req.body
            if(!Number.isInteger(data.quantity) || data.quantity < 0){
                res.status(400).send({msg:'Valor deve ser inteiro e positivo', status:false})
            }else{
                const response = await stock.update({quantity:data.quantity}, {where:{idProduct:data.idProduct, idProductSize:data.idProduct}})
                res.status(201).send({msg:httpStatus["200"].value,status:true, data:response})
            }
        }
        catch(err){
            res.status(500).send({status:httpStatus["500"].value, status:false})
        }
    }
}
module.exports = new StockController()