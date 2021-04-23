const CartController = require('../controllers/purchase/CartController')

const routes = require('express').Router()

routes.route('/cart')
    .post(CartController.store)

module.exports = routes