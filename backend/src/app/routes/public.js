const routes = require('express').Router()


routes.route('/signin')
        .post(require('../controllers/auth/authController').signin)

routes.route('/signup')
        .post(require('../controllers/user/UserController').store)
        
routes.route('/validateToken')
        .post(require('../controllers/auth/AuthController').validateToken)
// routes.route('/category')
//         .get(CategoryController.get)

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

routes.route('/category/tree')
        .get(require('../controllers/product/additionalInfos/CategoryController').get)

routes.route('/product/image')
      .get(require('../controllers/media/product/ProductImageController').get)
module.exports = routes