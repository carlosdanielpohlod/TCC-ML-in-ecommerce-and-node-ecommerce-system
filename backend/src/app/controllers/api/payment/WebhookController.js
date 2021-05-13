const checkoutController = require('../payment/checkout/CheckoutController')
const purchaseController = require('../../purchase/PurchaseController')
class WebhookController{

    
    async onPaymentStatusChange(req, res){

        res.status(200)

        const checkout = new checkoutController(mercadopago)
        
        if(checkout.isUpdatedPaymentStatus(req.body)){

            const paymentDetails = await checkout.getPayment({id:req.body.id})
            const data = checkout.getRequestData(paymentDetails) //formatar os dados

            if(data.status == 'success' || data.status == 'pending'){
                return purchaseController.changeStatus({email:response.payer.email, status:data.status})
            }
            if(data.status == 'cenceled' || data.status == 'rejected'){
                return purchaseController.failPayment({email:response.payer.email})
            }

        }
    }
}

module.exports = new WebhookController()