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

routes.route('/notification')
        .post(require('../controllers/purchase/PurchaseController').onPaymentStatusChange)

module.exports = routes