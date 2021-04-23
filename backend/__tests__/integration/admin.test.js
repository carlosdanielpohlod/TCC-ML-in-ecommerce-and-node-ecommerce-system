const request = require('supertest')

const app = require('../../src/app')

describe('Admin authentication', () => {
  
    it('Shold make login and return a Token', async () => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        thisUser = response.body.data
        expect(thisUser).toHaveProperty('token')
    })

    it('Shold not authenticate without credentials', async () => {
        const response = await request(app)
                        .post('/signin')
                        .send({})
        expect(response.status).toBe(401)
    })
    
    it('Shold not authenticate deleted user', async () => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'deletado@seed.com', password:'12345'})
        expect(response.status).toBe(401)
    })

    it('Shold not authenticate with invalid credentials', async () => {
        const response = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.m',password:'12345'})
        expect(response.status).toBe(401)
    })

    it('Shold not validate invalid token', async () => {
        const response = await request(app)
                        .post('/validateToken')
                        .set('Authorization',thisUser.token)
                        
        expect(response.status).toBe(401)
    })
    it('Shold validate valid token', async () => {
        
        const response = await request(app)
                        .post('/validateToken')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        
        expect(response.status).toBe(200)
    })
})
describe('Admin Routes', () => {  
    it('Shold fail in the product register with not admin token', async () => {
        const user = await request(app)
                            .post('/signin')
                            .send({email:'user@seed.com', password:'12345'})

        const response = await request(app)
                            .post('/product')
                            .set('Authorization',`Bearer ${user.body.data.token}`)
                            .send({
                                name:"sjsjs",
                                price:"4.050",
                                idProvider:1,
                                description:"Produto para teste",
                                idCategory:1,
                                idProductStatus:1,
                                idBrand:1
                        })

        expect(response.status).toBe(401)
    })

    it('Shold make success with product register with a valid admin token', async () => {
        const user = await request(app)
                            .post('/signin')
                            .send({email:'admin@seed.com', password:'12345'})

        const response = await request(app)
                            .post('/product')
                            .set('Authorization',`Bearer ${user.body.data.token}`)
                            .send({
                                name:"sjsjs",
                                price:"4.050",
                                idProvider:1,
                                description:"Produto para teste",
                                idCategory:1,
                                idProductStatus:1,
                                idBrand:1
                        })

        expect(response.status).toBe(201)
    })

})