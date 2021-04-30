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

routes.route('/user')
    .put(require('../controllers/user/UserController').update)
    
module.exports = routes