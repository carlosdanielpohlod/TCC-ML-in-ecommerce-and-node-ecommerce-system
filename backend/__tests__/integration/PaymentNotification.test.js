const request = require('supertest')
const paymentController = require('../../src/app/controllers/purchase/PaymentController')
const paymentRepository = require('../../src/app/repository/PaymentRepository')
const {paymentinfo,purchase, purchaseitem, stock} = require('../../src/app/models/')
const app = require('../../src/app')
const purchaseStatus = require('../../src/app/controllers/enum/purchaseStatus')

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
describe('Simulate Payment notifications', () => {
  
    

    it('On aproved Payment test', async (done) => {
        
        await request(app)
                        .post('/mercadopago/payment/success')
                        .send({
                            "collection_id":"1236851520",
                            "collection_status":"success",
                            "payment_id":"1236851520",
                            "status":"success",
                            "external_reference":"null",
                            "payment_type":"credit_card",
                            "merchant_order_id":"2686727102",
                            "preference_id":"725736327-2c7a135d-746e-4b6b-8bca-68dd70185f35",
                            "site_id":"MLB",
                            "processing_mode":"aggregator",
                            "merchant_account_id":"null"
                            })
        const result = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:"725736327-2c7a135d-746e-4b6b-8bca-68dd70185f35"}})                    
        

        

        setTimeout(async function() {

            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
            
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
            
            

            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["pagamento_efetuado"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236851520")

            done()
        }, 1000)

         
    })

    it('On Reproved Payment test', async (done) => {
        
        const aux = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:"725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e"}})                    
        const itemsBefore = await getPurchaseItems(aux.idPurchase)
        await request(app)
                        .post('/mercadopago/payment/failure')
                        .send({
                            "collection_id":"1236894047",
                            "collection_status":"rejected",
                            "payment_id":"1236894047",
                            "status":"rejected",
                            "external_reference":"null",
                            "payment_type":"credit_card",
                            "merchant_order_id":"2692086271",
                            "preference_id":"725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e",
                            "site_id":"MLB",
                            "processing_mode":"aggregator",
                            "merchant_account_id":"null"
                        })
        var result = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:"725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e"}})                    
        setTimeout(async function() {
            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
            
            var itemsAfter = await getPurchaseItems(result.idPurchase)
            const before = itemsBefore[0].purchaseitems
            const after = itemsAfter[0].purchaseitems
            for(let i = 0; i < before.length; i++){
                expect(before[i].stock.quantity).toBeLessThan(after[i].stock.quantity)
            }

            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["pagamento_falhou"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236894047")
        }, 1000)
        
        done()
    })

    it('On in_process Payment test', async (done) => {
        
        await request(app)
                        .post('/mercadopago/payment/pending')
                        .send({
                            "collection_id":"1236893300",
                            "collection_status":"in_process",
                            "payment_id":"1236893300",
                            "status":"in_process",
                            "external_reference":"null",
                            "payment_type":"credit_card",
                            "merchant_order_id":"2692157851",
                            "preference_id":"725736327-6d06b429-5c3d-4615-aa78-0c0e3ccde14e",
                            "site_id":"MLB",
                            "processing_mode":"aggregator",
                            "merchant_account_id":"null"
                            })
        var result = await paymentRepository.getPaymentInfoByQuery({query:{preference_id:"725736327-6d06b429-5c3d-4615-aa78-0c0e3ccde14e"}})                    
        setTimeout(async function() {

            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
        
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
            
            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["aguardando_pagamento"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236893300")
            done()
        }, 1000);
        
    })
})

describe('Simulate generic mercadopago notifications', () => {
  
    it('payment notification (payment failure)', async (done) => {

        
        
        const itemsBefore = await getPurchaseItems(7)

        await request(app)
                        .post('/mercadopago/notification')
                        .send({
                            "resource": "https://api.mercadolibre.com/collections/notifications/14890721633",
                            "topic": "payment"
                          })

                               
        setTimeout(async function() {
            const result = await paymentRepository.getPaymentInfoByQuery({query:{payment_id:"14890721633"}})      

            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
  
            var itemsAfter = await getPurchaseItems(result.idPurchase)

            const before = itemsBefore[0].purchaseitems
            const after = itemsAfter[0].purchaseitems
            for(let i = 0; i < before.length; i++){
                expect(before[i].stock.quantity).toBeLessThan(after[i].stock.quantity)
            }

            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["pagamento_falhou"].value)
            done()
        }, 1000);

        
    })

})