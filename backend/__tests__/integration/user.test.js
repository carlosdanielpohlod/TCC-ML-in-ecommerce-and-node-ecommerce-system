const request = require('supertest')
const {user} = require('../../src/app/models/')
const app = require('../../src/app')

describe('User validation', () => {
  
    it('Shold create an user with idPrivilege = 2', async (done) => {

         await request(app)
                        .post('/signup')
                        .send({
                                name:"User",
                                surname:"Test",
                                cpf:"99999999999",	
                                email:"newUser@test.com",
                                password:"12345",
                                idUserPrivilege:"1"
                                
                            })
        
        const newUser = await user.findOne({where:{email:"newUser@test.com"}})
        expect(newUser.idUserPrivilege).toBe(2)
        done()
    })

   

    it('Shold not update an user with email already utilized by other user', async (done) => {

        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'newUser@test.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .put('/user')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                name:"Invalid user",
                                surname:"Test",
                                cpf:"99999999999",	
                                email:"admin@test.com",
                                password:"12345"
                        })
        
        
        expect(response.status).toBe(400)
        
        done()
    })

    it('Shold not update an user with CPF aready been utilized by other user', async (done) => {

        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'newUser@test.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .put('/user')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                name:"Invalid user",
                                surname:"Test",
                                cpf:"0000",	
                                email:"newUser@test.com",
                                password:"12345"
                        })
        
        
        expect(response.status).toBe(400)
        
        done()
    })


    it('Shold Update the user name to "test updated"', async (done) => {

        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'newUser@test.com',password:'12345'})
        var thisUser = authUser.body.data

        await request(app)
                        .put('/user')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                            name:"Update",
                            surname:"ByTest",
                            cpf:"99999999999",	
                            email:"newUser@test.com",
                            password:"12345",
                            idUserPrivilege:"1"
                        })
        
        const result = await user.findOne({where:{email:"newUser@test.com"}})
        expect(result.name).toBe("Update")
        
        done()
    })
})