const request = require('supertest')
const paymentController = require('../../src/app/controllers/purchase/PaymentController')
const {paymentinfo, purchase} = require('../../src/app/models/')
const app = require('../../src/app')
const purchaseStatus = require('../../src/app/controllers/enum/purchaseStatus')
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
        const result = await paymentController.getPaymentInfoByQuery({query:{preference_id:"725736327-2c7a135d-746e-4b6b-8bca-68dd70185f35"}})                    
        setTimeout(async function() {
            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
            
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["pagamento_efetuado"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236851520")
            done()
        }, 1000)
        
    })

    it('On Reproved Payment test', async (done) => {
        
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
        const result = await paymentController.getPaymentInfoByQuery({query:{preference_id:"725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e"}})                    
        setTimeout(async function() {
            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
            
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["pagamento_falhou"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236894047")
        }, 1000)
        
        done()
    })

    it('On Pending Payment test', async (done) => {
        
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
        const result = await paymentController.getPaymentInfoByQuery({query:{preference_id:"725736327-6d06b429-5c3d-4615-aa78-0c0e3ccde14e"}})                    
        setTimeout(async function() {
            const purchaseData = await purchase.findOne({where:{idPurchase:result.idPurchase}})
        
            const paymentData = await paymentinfo.findOne({where:{idPaymentInfo:result.idPaymentInfo}})
        
            expect(purchaseData.dataValues.idPurchaseStatus).toBe(purchaseStatus["aguardando_pagamento"].value)
            expect(paymentData.dataValues.payment_id).toBe("1236893300")
            done()
        }, 1000);
        
    })
})