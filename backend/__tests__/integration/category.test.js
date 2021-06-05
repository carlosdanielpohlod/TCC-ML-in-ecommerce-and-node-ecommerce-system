const request = require('supertest')

const app = require('../../src/app')

describe('Product category tests', () => {
  
    it('Shold create a category', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .post('/category')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                category:"category.test",
                                idCategory:30    //valor grande aleatorio escolhido   
                            })
        expect(response.status).toBe(201)
        done()
    })
    it('Shold create a children category', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .post('/category')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                category:"category.test",
                                idRootCategory:30    //valor grande aleatorio escolhido   
                            })
        expect(response.status).toBe(201)
        done()
    })

    it('Shold not delete a category because there has a subcategory', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .delete('/category')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                
                                idCategory:30    //valor grande aleatorio escolhido   
                            })
        expect(response.status).toBe(400)
        done()
    })

    it('Shold not delete a category because there has a product associated', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'admin@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .delete('/category')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                                
                                idCategory:1   
                            })
        expect(response.status).toBe(400)
        done()
    })

    it('Shold return a category array', async (done) => {
   

        const response = await request(app)
                        .get('/category/tree')
                        
        expect(response.body.data.tree[0].idCategory).toBe(1)
        expect(response.body.data.tree[0].children[0].idCategory).toBe(2)
        done()
    })
 })