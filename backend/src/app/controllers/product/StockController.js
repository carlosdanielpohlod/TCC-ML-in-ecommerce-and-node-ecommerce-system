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



    
    async toRemove(data){ 
        try{
            var undoStock = []
            for(let i = 0; i < data.length; i++){
                await stock.decrement('quantity', {by:data[i].quantity, where:{idStock:data[i].stock.idStock}})
                undoStock.push({idStock:data[i].stock.idStock, quantity:data[i].quantity})
            }
            
            return true
        }catch(err){
            await this.giveBack(undoStock)
           
            return false
        }   
    }

    async giveBack(undoStock){
        try{
            undoStock.forEach(async data => {
                await stock.increment('quantity', {by:data.quantity, where:{idStock:data.idStock}})
            })
        
        }catch(err){
            
            throw new Error({msg:'Não foi possivel devolver o estoque'})
        }
    }
    
}
module.exports = new StockController()