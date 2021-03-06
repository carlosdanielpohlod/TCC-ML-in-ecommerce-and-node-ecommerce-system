const routes = require('express').Router()
const {authenticate} = require('../middlewares/authenticateRoute')


routes.use(authenticate)

routes.route('/cart')
    .post(require('../controllers/purchase/CartController').store)
    .delete(require('../controllers/purchase/CartController').deleteItemFromCart)
    .put(require('../controllers/purchase/CartController').update)
    .get(require('../controllers/purchase/CartController').get)

routes.route('/address')
    .post(require('../controllers/user/additionalInfo/AddressController').store)
    .put(require('../controllers/user/additionalInfo/AddressController').update)
    .get(require('../controllers/user/additionalInfo/AddressController').get)
routes.route('/phone')
    .post(require('../controllers/user/additionalInfo/PhoneController').store)
    .put(require('../controllers/user/additionalInfo/PhoneController').update)

routes.route('/user')
    .put(require('../controllers/user/UserController').update)

routes.route('/user/me')
    .get(require('../controllers/user/UserController').getMe)

routes.route('/user/purchase')
    .post(require('../controllers/purchase/PurchaseController').store)
    .get(require('../controllers/purchase/PurchaseController').myPurchases)

routes.route('/user/purchase/details/:idPurchase')
    .get(require('../controllers/purchase/PurchaseController').myPurchaseDetails)

routes.route('/user/purchase/payment/opened/link')
    .get(require('../controllers/purchase/PaymentController').getPaymentOpenedLink)

routes.route('/favorite')
    .post(require('../controllers/product/FavoriteController').store)
    .delete(require('../controllers/product/FavoriteController').delete)
    .get(require('../controllers/product/FavoriteController').get)
  

routes.route('/ratings')
    .post(require('../controllers/product/RatingController').store)
    
routes.route('/ratings/purchaseitem')
    .get(require('../controllers/product/RatingController').getPurchaseItemRating)
module.exports = routes