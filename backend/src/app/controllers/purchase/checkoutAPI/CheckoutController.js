const mercadoPagoImplementation = require('./MercadoPago')

class CheckoutController {

    constructor(){
        
        // this.implementation = mercadoPagoImplementation
        
    }

    createPaymentLink(req, res){
        // res.send(this.constructor())
        const implementation = mercadoPagoImplementation
        return implementation.createPaymentLink(req, res)
    }

}

module.exports = new CheckoutController()