// const {stock} = require('../../models')
// class PurchaseController {

//     async reverseStore(data){
//         const reverseStock = data.reverseStock
//         for(let value in reverseStock){
//             await Model.increment('quantity', {by:value.quantity, where: {idStock:value.idStock}});
//         }

//     }
//     async store(req){
//         const data = req.body
//         const products = data.products
//         const reverseStock = {}
//         for(let product in products){
//             const result = await stock.findOne({where:{idProduct:product.idProduct}})
//             if(result.quantity < result.quantity){
//                 res.status(400).send({msg:httpStatus["400"].value, status:false})
//                 return 
//             }
//         }

//         for(let product in products){
//             const stockUpdated = await stock.update({quantity:product.quantity}, {where:{idProduct:product.idProduct, idProductSize:product.idProduct}})
//             reverseStock.push(stockUpdated)
//         }
//     }
// }