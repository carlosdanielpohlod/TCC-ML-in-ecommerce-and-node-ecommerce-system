const CheckoutInterface = require('./CheckoutInterface')
const purchaseStatus = require('../../enum/purchaseStatus')
const {formatItems, formatPayer} = require('../../utils/mercadoPago')
const config = require('../../../../config/mercadoPago')
class MercadoPago{

    constructor(){

        this.mercadopago = require ('mercadopago');
        this.mercadopago.configure({... config.credentials});

    }
    async createPaymentLink(response){
        try{
            
            const items = formatItems(response)
            const payer = formatPayer(response)

            const data = await this.mercadopago.preferences.create({
                items, payer,  ...config.config})
                // shipments:{cost:200,mode:"not_specified"},
            console.log(data)
            return data
         }
         catch(err){
             return {status:false, err}
        }

    }
}

module.exports = new MercadoPago()