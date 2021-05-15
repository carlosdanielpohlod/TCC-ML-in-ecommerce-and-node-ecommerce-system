

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
    formatRequestData(data){
        return this.implementation.formatRequestData(data)
    }
    isSuccessPaymentStatus(data){
        return this.implementation.isSuccessPaymentStatus(data)
    }

}

module.exports =  CheckoutController