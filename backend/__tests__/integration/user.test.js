const request = require('supertest')
const {user} = require('../../src/app/models/')
const app = require('../../src/app')

describe('User validation', () => {
  
    it('Should create an user with irregular name', async (done) => {

       const response = await request(app)
                       .post('/signup')
                       .send({
                               name:"Name01 name02",
                               surname:"Test",
                               cpf:"99999999997",	
                               email:"irregularUser@test.com",
                               password:"12345",
                               idUserPrivilege:"1"
                               
                           })
       
       
       expect(response.status).toBe(400)
       done()
   })

    it('Should create an user with idPrivilege = 2', async (done) => {

         await request(app)
                        .post('/signup')
                        .send({
                                name:"User Test",
                                surname:"Surname",
                                cpf:"99999999999",	
                                email:"newUser@test.com",
                                password:"12345",
                                idUserPrivilege:"1"
                                
                            })
        
        const newUser = await user.findOne({where:{email:"newUser@test.com"}})
        expect(newUser.idUserPrivilege).toBe(2)
        done()
    })

   

    it('Should not update an user with email already utilized by other user', async (done) => {

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
                                email:"admin@seed.com",
                                password:"12345"
                        })
        
        
        expect(response.status).toBe(400)
        
        done()
    })

    // it('Should not update an user with CPF aready been utilized by other user', async (done) => {

    //     const authUser = await request(app)
    //                     .post('/signin')
    //                     .send({email:'newUser@test.com',password:'12345'})
    //     var thisUser = authUser.body.data

    //     const response = await request(app)
    //                     .put('/user')
    //                     .set('Authorization',`Bearer ${thisUser.token}`)
    //                     .send({
    //                             name:"Invalid user",
    //                             surname:"Test",
    //                             cpf:"0000",	
    //                             email:"newUser@test.com",
    //                             password:"12345"
    //                     })
        
        
    //     expect(response.status).toBe(400)
        
    //     done()
    // })


    it('Should Update the user name to "test updated"', async (done) => {

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
   


    it('Should return all users limited by the pre definition (10)', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'admin@seed.com',password:'12345'})

        var thisUser = authUser.body.data
        const response = await request(app)
                       .get('/user/all')
                       .set('Authorization',`Bearer ${thisUser.token}`)
                       .send({
                           page:1
                       })
       
    
       expect(response.body.status).toBe(true)
       done()
   })

    it('Should not delete an user who has a purchase active', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'admin@seed.com',password:'12345'})

        var thisUser = authUser.body.data
        const response = await request(app)
                    .delete('/user/deleteOtherUser')
                    .set('Authorization',`Bearer ${thisUser.token}`)
                    .send({
                        idUserDelete:4
                    })
    

        expect(response.body.status).toBe(false)
        done()
    })

    it('Should delete an user who does not have a purchase', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'admin@seed.com',password:'12345'})

        var thisUser = authUser.body.data
        const response = await request(app)
                    .delete('/user/deleteOtherUser')
                    .set('Authorization',`Bearer ${thisUser.token}`)
                    .send({
                        idUserDelete:5
                    })
    

        expect(response.body.status).toBe(true)
        done()
    })

    it('Should delete an user who has only a canceled purchase', async (done) => {
        const authUser = await request(app)
            .post('/signin')
            .send({email:'admin@seed.com',password:'12345'})

        var thisUser = authUser.body.data
        const response = await request(app)
                    .delete('/user/deleteOtherUser')
                    .set('Authorization',`Bearer ${thisUser.token}`)
                    .send({
                        idUserDelete:6
                    })
    

        expect(response.body.status).toBe(true)
        done()
    })
})