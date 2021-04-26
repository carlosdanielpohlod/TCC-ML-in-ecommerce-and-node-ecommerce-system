const request = require('supertest')

const app = require('../../src/app')

describe('User cart tests', () => {
  
    it('Shold throws a fail because the product has negative stock', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        
        done()
    })

  
})