

class CheckoutController {

    constructor(implementation){
        
        this.implementation = implementation
        
    }
    getPreference(data){
        return this.implementation.getPreference(data)
    }
    createPaymentLink(data){
        return this.implementation.createPaymentLink(data)   
    }
    getPayment(data){
        return this.implementation.getPayment(data)
    }

    getMerchantOrder(data){
        return this.implementation.getMerchantOrder(data)
    }
    mapedStatus(){
        return this.implementation.mapedStatus()
    }
    

}

module.exports =  CheckoutController