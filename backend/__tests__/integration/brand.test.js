const request = require('supertest')

const app = require('../../src/app')

const {brand} = require('../../src/app/models')
describe('Brand resgister validation', () => {
  
    it('Should create a brand with success', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .post('/brand')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               brand:"Test"
                            })
                    
        // console.log(response.body.data)
        expect(response.body.data.brand).toBe("Test")
        done()
    })

    it('Should Update the brand with id = 2', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

                await request(app)
                        .put('/brand')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               brand:"updated",
                               idBrand:"2"
                            })
                        
        const brandUpdated = await brand.findOne({where:{idBrand:2}})
        expect(brandUpdated.brand).toBe("updated")
        done()
    })

    it('Should not delete the brand with a product associated', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

             const response =   await request(app)
                        .delete('/brand')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               idBrand:1
                            })
                        
        expect(response.status).toBe(400)
        done()
    })

    it('Should not create brand with empty field', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .post('/brand')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               brand:"       "
                            })
        expect(response.status).toBe(400)
        done()
    })
    it('Shold get all brand', async (done)=>{
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .get('/brand')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        
        expect(response.status).toBe(200)
        done()
    })
})