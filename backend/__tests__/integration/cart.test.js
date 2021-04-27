const request = require('supertest')
const {purchase, purchaseitem, user} = require('../../src/app/models')
const app = require('../../src/app')

describe('User cart tests', () => {
    

    it('Shold Add a product into user cart', async (done) => {
        
       
        const thisAuthUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})

         
        
        const response = await request(app)
                            .post('/cart')
                            .set('Authorization',`Bearer ${thisAuthUser.body.data.token}`)
                            .send({
                                    idProduct:2,
                                    idProductColor:1,
                                    idProductSize:1,
                                    quantity:1
                            })
        
        expect(response.body.data.quantity).toBe(1)
        done()
    })

    it('Shold update a product from user cart with success', async (done) => {
        const thisAuthUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        
        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisAuthUser.body.data.token}`)
                            .send({
                                    idProduct:2,
                                    idProductColor:1,
                                    idProductSize:1,
                                    quantity:1
                            })
        
        expect(response.body.data.quantity).toBe(2)
        done()
    })
  
    it('Shold try to update a product with negative quantity from user cart with fail', async (done) => {
        
        const thisAuthUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisAuthUser.body.data.token}`)
                            .send({
                                    idProduct:2,
                                    idProductColor:1,
                                    idProductSize:1,
                                    quantity:-10
                            })
        
        expect(response.status).toBe(400)
        done()
    })

    it('Shold decrement a product into cart with success', async (done) => {
        
        const thisAuthUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})

        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisAuthUser.body.data.token}`)
                            .send({
                                    idPurchaseItem:1,
                                    quantity:-1
                            })
        
        expect(response.status).toBe(200)
        done()
    })

    it('shold try to increment product into the cart with a quantity most long of the quantity into stock', async (done) => {
        const thisAuthUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisAuthUser.body.data.token}`)
                            .send({
                                    idProduct:2,
                                    idProductColor:1,
                                    idProductSize:1,
                                    quantity:100
                            })
        
        expect(response.status).toBe(400)
        done()
    })
})