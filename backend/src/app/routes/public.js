const routes = require('express').Router()
const authController = require('../controllers/auth/AuthController')
const UserController = require('../controllers/user/register/UserController')
routes.route('/signin')
        .post(authController.signin)

routes.route('/signup')
        .post(UserController.store)
        
routes.route('/validateToken')
        .post(authController.validateToken)
module.exports = routes