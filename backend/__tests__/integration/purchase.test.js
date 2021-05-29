const msg = require('../../src/app/controllers/enum/validationMessages')
const {purchase} = require('../../src/app/models/')
const request = require('supertest')
const app = require('../../src/app')

describe('Purchase validations', () => {
    it('Should return a user purchase', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        
        var thisUser = authUser.body.data
        var purchaseUser = await purchase.findOne({where:{idUser:thisUser.idUser}})
        const response = await request(app)
            .get(`/user/purchase/details/${purchaseUser.idPurchase}`)
            .set('Authorization',`Bearer ${thisUser.token}`)
        
        expect(response.status).toBe(200)
        done()
    })

    it('Should return 404 status with get purchase from other user', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        
        var thisUser = authUser.body.data
        const response = await request(app)
            .get(`/user/purchase/details/1`)
            .set('Authorization',`Bearer ${thisUser.token}`)
        
        expect(response.status).toBe(404)
        done()
    })

    it('Should return purchase items from User', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        var thisUser = authUser.body.data
        const response = await request(app)
            .get(`/user/purchase/details/9`)
            .set('Authorization',`Bearer ${thisUser.token}`)
        
        expect(response.body.status).toBe(true)
        done()
    })

    it('shold return the payment url from opened purchase', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        var thisUser = authUser.body.data
        const response = await request(app)
            .get(`/user/purchase/payment/opened/link`)
            .set('Authorization',`Bearer ${thisUser.token}`)
            .send({
                idPurchase:9
            })
        expect(response.body.data.paymentUrl).toBe("https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=725736327-23ebb00f-25be-42d8-af57-2c1aceb09e6e")
        done()
    })

    it('Shold return 404 status because the product dont have the "opened" purchase status', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        var thisUser = authUser.body.data
        const response = await request(app)
            .get(`/user/purchase/payment/opened/link`)
            .set('Authorization',`Bearer ${thisUser.token}`)
            .send({
                idPurchase:4
            })
        expect(response.status).toBe(404)
        done()
    })

    it('Shold return 404 status because the purchase is from other user', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        
        var thisUser = authUser.body.data
        const response = await request(app)
            .get(`/user/purchase/payment/opened/link`)
            .set('Authorization',`Bearer ${thisUser.token}`)
            .send({
                idPurchase:1
            })
        expect(response.status).toBe(404)
        done()
    })
})