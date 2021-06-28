const request = require('supertest')
const {productimage} = require('../../src/app/models')
const app = require('../../src/app')

describe('Product image tests', () => {
  
    it('Should get product images with sucess', async (done) => {
       
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        var response = await request(app)
                        .get('/product/image')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({idProduct:1})
                        

            
        expect(response.status).toBe(200)
        done()
    })
    
    it('Shold delete a product from database with success', async (done) =>{
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        var response = await request(app)
                        .delete('/product/image')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({key:0})
        const data = await productimage.findOne({where:{key:0}})
        expect(data).toBe(null)
        done()
    })
})