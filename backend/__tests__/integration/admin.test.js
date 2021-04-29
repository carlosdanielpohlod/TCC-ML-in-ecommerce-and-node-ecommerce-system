const request = require('supertest')

const app = require('../../src/app')

describe('Admin authentication', () => {
  
    it('Shold make login and return a Token', async (done) => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        thisUser = response.body.data
        expect(thisUser).toHaveProperty('token')
        done()
    })

    it('Shold not authenticate without credentials', async (done) => {
        const response = await request(app)
                        .post('/signin')
                        .send({})
        expect(response.status).toBe(401)
        done()
    })
    
    it('Shold not authenticate deleted user', async (done) => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'deletado@seed.com', password:'12345'})
        expect(response.status).toBe(401)
        done()
    })

    it('Shold not authenticate with invalid credentials', async (done) => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.m',password:'12345'})
        expect(response.status).toBe(401)
        done()
    })

    it('Shold not validate invalid token', async (done) => {
        const response = await request(app)
                        .post('/validateToken')
                        .set('Authorization',thisUser.token)
                        
        expect(response.status).toBe(401)
        done()
    })
    it('Shold validate valid token', async (done) => {
        
        const response = await request(app)
                        .post('/validateToken')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        
        expect(response.status).toBe(200)
        done()
    })
})
describe('Admin Routes', () => {  
    it('Shold fail in the product register with not admin token', async (done) => {
        const user = await request(app)
                            .post('/signin')
                            .send({email:'user@seed.com', password:'12345'})

        const response = await request(app)
                            .post('/product')
                            .set('Authorization',`Bearer ${user.body.data.token}`)
                            .send({
                                name:"shold fail",
                                price:"4.050",
                                idProvider:1,
                                description:"admin.test.js validation, deve falhar",
                                idCategory:1,
                                idProductStatus:1,
                                idBrand:1
                        })

        expect(response.status).toBe(401)
        done()
    })

    it('Shold receive success with product register with a valid admin token', async (done) => {
        const user = await request(app)
                            .post('/signin')
                            .send({email:'admin@seed.com', password:'12345'})

        const response = await request(app)
                            .post('/product')
                            .set('Authorization',`Bearer ${user.body.data.token}`)
                            .send({
                                name:"Produto valido",
                                price:"4.050",
                                idProvider:1,
                                description:"Produto criado no teste de valid admin token",
                                idCategory:1,
                                idProductStatus:1,
                                idBrand:1
                        })

        expect(response.status).toBe(201)
        done()
    })

})