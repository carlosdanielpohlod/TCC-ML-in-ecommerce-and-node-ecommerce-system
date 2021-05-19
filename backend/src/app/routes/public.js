const routes = require('express').Router()
const authController = require('../controllers/auth/AuthController')
const CategoryController = require('../controllers/product/additionalInfos/CategoryController')
const UserController = require('../controllers/user/UserController')

routes.route('/signin')
        .post(authController.signin)

routes.route('/signup')
        .post(UserController.store)
        
routes.route('/validateToken')
        .post(authController.validateToken)
routes.route('/category')
        .get(CategoryController.get)

routes.route('/product/details/:idProduct')
        .patch(require('../controllers/product/ProductController').getBasicDetailsById) 

routes.route('/mercadopago/notification')
        .post(require('../controllers/api/payment/NotificationController').onNotification)
        
routes.route('/mercadopago/payment/success')
        .all(require('../controllers/api/payment/NotificationController').onSuccess)

routes.route('/mercadopago/payment/failure')
        .all(require('../controllers/api/payment/NotificationController').onFailure)

routes.route('/mercadopago/payment/pending')
        .all(require('../controllers/api/payment/NotificationController').onPending)
routes.route('/test')
        .all(async (req, res) => {
                const {purchase} = require('../../app/models')
                const data = await purchase.findOne({where:{idPurchase:1}})
                console.log(data.dataValues)
                res.send()
        })
module.exports = routes