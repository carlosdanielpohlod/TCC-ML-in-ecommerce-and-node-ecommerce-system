

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
    isUpdatedPaymentStatus(data){
        return this.implementation.isUpdatedPaymentStatus(data)
    }
    getRequestData(body){
        return this.implementation.getRequestData(data)
    }
    isSuccessPaymentStatus(data){
        return this.implementation.isSuccessPaymentStatus(data)
    }

}

module.exports =  CheckoutController