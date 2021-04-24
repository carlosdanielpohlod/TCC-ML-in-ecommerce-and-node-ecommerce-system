const CartController = require('../controllers/purchase/CartController')
const AddressController  = require('../controllers/user/register/additionalInfo/AddressController')
const {user} = require('../middlewares/authenticateRoute')
const routes = require('express').Router()

routes.use(user)

routes.route('/cart')
    .post(CartController.store)
    
routes.route('/address')
    .post(AddressController.store)



module.exports = routes