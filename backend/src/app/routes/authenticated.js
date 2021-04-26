const routes = require('express').Router()
const {authenticate} = require('../middlewares/authenticateRoute')
const admin = require('../middlewares/admin')
const cartController = require('../controllers/purchase/CartController')
const addressController  = require('../controllers/user/register/additionalInfo/AddressController')

routes.use(authenticate) //verify admin

routes.route('/product')
    .post(admin(require('../controllers/product/register/ProductController').store))
    .delete(admin(require('../controllers/product/register/ProductController').store))

routes.route('/category')
    .post(admin(require('../controllers/product/additionalInfos/CategoryController.js').store))
    
routes.route('/stock')
    .post(admin(require('../controllers/product/StockController.js').store))
    .put(admin(require('../controllers/product/StockController.js').update))

//  ..................................User routes....................//

routes.route('/cart')
    .post(cartController.store)
    
routes.route('/address')
    .post(admin(addressController.store))

    
module.exports = routes