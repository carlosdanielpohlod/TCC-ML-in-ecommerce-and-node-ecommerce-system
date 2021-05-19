const msg = require('../../src/app/controllers/enum/validationMessages')
const {stock, product, productcolor, productsize} = require('../../src/app/models/')

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

    

    

})
