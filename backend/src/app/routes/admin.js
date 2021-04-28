const routes = require('express').Router()
const admin = require('../middlewares/admin')
const {authenticate} = require('../middlewares/authenticateRoute')

routes.use(authenticate)

routes.route('/product')
    .post(admin(require('../controllers/product/register/ProductController').store))
    .delete(admin(require('../controllers/product/register/ProductController').delete))

routes.route('/category')
    .post(admin(require('../controllers/product/additionalInfos/CategoryController.js').store))
    .delete(admin(require('../controllers/product/additionalInfos/CategoryController.js').delete))
routes.route('/stock')
    .post(admin(require('../controllers/product/StockController.js').store))
    .put(admin(require('../controllers/product/StockController.js').update))

module.exports = routes