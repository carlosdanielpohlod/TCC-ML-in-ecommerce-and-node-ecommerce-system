

class CheckoutController {

    constructor(implementation){
        
        this.implementation = implementation
        
    }

    createPaymentLink(data){
        return this.implementation.createPaymentLink(data)   
    }
    getPayment(data){
        return this.implementation.getPayment(data)
    }
    

}

module.exports =  CheckoutController