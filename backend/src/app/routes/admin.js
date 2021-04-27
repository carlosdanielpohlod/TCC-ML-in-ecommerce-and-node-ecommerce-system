const routes = require('express').Router()
const admin = require('../middlewares/admin')
const {authenticate} = require('../middlewares/authenticateRoute')

routes.use(authenticate)

routes.route('/product')
    .post(admin(require('../controllers/product/register/ProductController').store))
    .delete(admin(require('../controllers/product/register/ProductController').dalete))

routes.route('/category')
    .post(admin(require('../controllers/product/additionalInfos/CategoryController.js').store))
    
routes.route('/stock')
    .post(admin(require('../controllers/product/StockController.js').store))
    .put(admin(require('../controllers/product/StockController.js').update))

module.exports = routes