const routes = require('express').Router()
const admin = require('../middlewares/admin')
// const {authenticate} = require('../middlewares/authenticateRoute')

// routes.use(authenticate)

routes.route('/product')
    .post(admin(require('../controllers/product/ProductController').store))
    .put(admin(require('../controllers/product/ProductController').update))
    .delete(admin(require('../controllers/product/ProductController').delete))

routes.route('/brand')
    .post(admin(require('../controllers/product/additionalInfos/BrandController').store))
    .put(admin(require('../controllers/product/additionalInfos/BrandController').update))
    .delete(admin(require('../controllers/product/additionalInfos/BrandController').delete))
    
routes.route('/category')
    .post(admin(require('../controllers/product/additionalInfos/CategoryController.js').store))
    .delete(admin(require('../controllers/product/additionalInfos/CategoryController.js').delete))

routes.route('/stock')
    .post(admin(require('../controllers/product/StockController.js').store))
    .put(admin(require('../controllers/product/StockController.js').update))

routes.route('/user/all')
        .get(admin(require('../controllers/user/UserController').getAll))
        
routes.route('/user/:idUser')
        .get(admin(require('../controllers/user/UserController').getById))
        
routes.route('/user/deleteOtherUser')
        .delete(admin(require('../controllers/user/UserController').deleteOtherUser))
module.exports = routes