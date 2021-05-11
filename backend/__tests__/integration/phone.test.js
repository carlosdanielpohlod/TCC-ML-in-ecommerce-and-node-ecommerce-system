const request = require('supertest')

// const {purchase, purchaseitem, user} = require('../../src/app/models')
const app = require('../../src/app')

describe('Phone tests', () => {
    it('Should create a phone number with success', async (done) => {
        
       
        const authUser = await request(app)
        .post('/signin')
        .send({email:'user@seed.com',password:'12345'})
        var thisUser = authUser.body.data

     
        const response = await request(app)
                            .post('/phone')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    
                                    areaCode:'42',
                                    number:'99915266'
                            })

        expect(response.body.data.areaCode).toBe('42')
        done()
    })

    it('Should not create a phone number without numbers', async (done) => {
        
       
        const authUser = await request(app)
        .post('/signin')
        .send({email:'user@seed.com',password:'12345'})
        var thisUser = authUser.body.data

     
        const response = await request(app)
                            .post('/phone')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    
                                    areaCode:'',
                                    number:'         '
                            })

        expect(response.status).toBe(400)
        done()
    })

    it('Should not create a phone number with a character most longer to permited', async (done) => {
        
       
        const authUser = await request(app)
        .post('/signin')
        .send({email:'user@seed.com',password:'12345'})
        var thisUser = authUser.body.data

     
        const response = await request(app)
                            .post('/phone')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    
                                    areaCode:'42',
                                    number:'1000000000000000'
                            })

        expect(response.status).toBe(400)
        done()
    })


    it('Should not create a phone number with a character most small to permited', async (done) => {
        
       
        const authUser = await request(app)
        .post('/signin')
        .send({email:'user@seed.com',password:'12345'})
        var thisUser = authUser.body.data

     
        const response = await request(app)
                            .post('/phone')
                            .set('Authorization',`Bearer ${thisUser.token}`)
                            .send({
                                    
                                    areaCode:'4',
                                    number:'9955446621'
                            })

        expect(response.status).toBe(400)
        done()
    })


})