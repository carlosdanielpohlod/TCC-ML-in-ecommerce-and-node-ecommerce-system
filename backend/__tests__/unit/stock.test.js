const msg = require('../../src/app/controllers/enum/validationMessages')
const {stock, product, productcolor, productsize} = require('../../src/app/models/')

async function getPurchaseItems(idPurchase){
    return await purchase.findAll({
                             
         where:{idPurchase:idPurchase},
         attributes:['idPurchase'],
         include: [
             { 
                 model:purchaseitem,
                 attributes:['quantity'],
                 include:[
                     
                     {   
                         model:stock,
                         attributes:['idStock','quantity']
                     }
                 ]
             }
         ]
    })
    

 }

describe('Stock create validation', () => {
    
    it('Shold not create stock with negative quantity', async (done) => {
     try{
        var thisProduct = await product.findOne()
        var thisProductColor = await productcolor.findOne()
        var thisProductSize = await productsize.findOne()
        const stockTest = await stock.create({ 
                            idProduct:thisProduct.idProduct,
                            idProductColor:thisProductColor.idProductColor,
                            idProductSize:thisProductSize,
                            quantity:-9
                        })
        await stockTest.destroy()
        done()
     }
     catch(err){
         expect(err.message).toBe('Validation error: ' + msg['negativeStock'].value)
         done()
     }
        
    })

    it('Shold remove from stock with success', async (done) => {
        try{
            const itemsBefore = await getPurchaseItems(idPurchase = 8)

            stock.toRemove(itemsBefore[0].purchaseitems)

            
            setTimeout(async()=> {
                const itemsAfter = await getPurchaseItems(idPurchase = 8)
                const before = itemsBefore[0].purchaseitems
                const after = itemsAfter[0].purchaseitems
    
                for(let i = 0; i < before.length; i++){
                    expect(before[i].stock.quantity).toBeLessThan(after[i].stock.quantity)
                }

                done()
            }, 3000)
            
            
           
        }
        catch(err){
            console.log(err.message)
            done()
        }
    })
    

    

})
