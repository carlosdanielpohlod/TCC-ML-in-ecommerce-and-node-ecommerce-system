const request = require('supertest')
const {Op} = require("sequelize");
const app = require('../../src/app')

const {favorite} = require('../../src/app/models')
describe('Product Favorite tests', () => {
  
    it('Should favorite de product with id=13 with success', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        await request(app)
                        .post('/favorite')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               idProduct:13
                            })
                    
        // console.log(response.body.data)
        const response = await favorite.findOne({
            where:{
                [Op.and]: [{ idUser:thisUser.idUser }, { idProduct:13 }]
            }
        })
        expect(response.idProduct).toBe(13)
        done()
    })

    it('Should not create a product favorite repeated', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const response = await request(app)
                        .post('/favorite')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               idProduct:13
                            })
                    
     
        expect(response.status).toBe(400)
        done()
    })

    it('Should delete a user product favorite', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        await request(app)
                        .delete('/favorite')
                        .set('Authorization',`Bearer ${thisUser.token}`)
                        .send({
                               idProduct:13
                            })
                    
        const response = await favorite.findOne({
            where:{
                [Op.and]: [{ idUser:thisUser.idUser }, { idProduct:13 }]
            }
        })

        expect(response).toBeNull()
        done()
    })

    it('Should get the user favorite products with pagination', async (done) => {
        const authUser = await request(app)
                        .post('/signin')
                        .send({email:'mercadopagocustommer@seed.com',password:'12345'})
        var thisUser = authUser.body.data

        const page01 = await request(app)
            .get('/favorite')
            .set('Authorization',`Bearer ${thisUser.token}`)
            .send({
                page:1
            }
            
        )

        const page02 = await request(app)
            .get('/favorite')
            .set('Authorization',`Bearer ${thisUser.token}`)
            .send({
                page:2
            }
            
        )
        expect(page01.body.data[0].idFavorite).toBe(1)
        expect(page01.body.data.length).toBe(10)
        expect(page02.body.data[0].idFavorite).toBe(11)
        
        done()
    })

})