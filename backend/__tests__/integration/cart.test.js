const request = require('supertest')
const { post } = require('../../src/app')
// const {purchase, purchaseitem, user} = require('../../src/app/models')
const app = require('../../src/app')

describe('User cart tests', () => {
    

    it('Should Add a product into user cart', async (done) => {
        
       
        const authUser = await request(app)
        .post('/signin')
        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

     
        const response = await request(app)
                            .post('/cart')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    
                                    idStock:1,
                                    quantity:1
                            })

        expect(response.status).toBe(201)
        done()
    })
  
    it('Should try to update a product with negative quantity from user cart with fail', async (done) => {
        
        const authUser = await request(app)
        .post('/signin')
        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data


        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    idPurchaseItem:1,
                                    
                                    quantity:-100
                            })
        expect(response.status).toBe(400)
        done()
                            
        
       
    })

    it('should try to increment product into the cart with a quantity most long of the quantity into stock', async (done) => {
        const authUser = await request(app)
        .post('/signin')
        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

       
        const response = await request(app)
                            .put('/cart')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    idPurchaseItem:1,
                                    quantity:100
                            })
        
        expect(response.status).toBe(400)
        done()
    })
})

