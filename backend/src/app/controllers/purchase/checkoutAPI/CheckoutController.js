const mercadoPagoImplementation = require('./MercadoPago')

class CheckoutController {

    constructor(implementation){
        
        this.implementation = mercadoPagoImplementation
        
    }

    createPaymentLink(data){
        return this.implementation.createPaymentLink(data)
        
    }


}

module.exports =  CheckoutController