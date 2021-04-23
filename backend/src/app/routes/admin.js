const routes = require('express').Router()
const createProductController = require('../controllers/product/register/CreateProductController')
const categoryController = require('../controllers/product/additionalInfos/CategoryController.js')
const stockController = require('../controllers/product/StockController.js')
const {admin} = require('../middlewares/authenticateRoute')

routes.use(admin) //verify admin

routes.route('/product')
    .post(createProductController.store)

routes.route('/category')
    .post(categoryController.store)
    
routes.route('/stock')
    .post(stockController.store)
    .put(stockController.update)

module.exports = routes