// const CheckoutInterface = require('./CheckoutInterface')
const config = require('../../../../../config/mercadoPago')
const axios = require('axios')

class MercadoPago{

    constructor(){

        this.mercadopago = require ('mercadopago');
        this.mercadopago.configure({... config.credentials});
        
    }
    async createPaymentLink(data){
        try{
            const {formatItems, formatPayer} = require('../../../utils/mercadoPago')
            const items = formatItems(data)
            const payer = formatPayer(data)

            const response = await this.mercadopago.preferences.create({
                items, payer,  ...config.config})
                // shipments:{cost:200,mode:"not_specified"},
            return response
         }
        catch(err){
            return {status:false, err}
        }

    }

    async getPayment(data){
        return this.jsonexemplo()
    //    return axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`,{
    //         headers:{
    //             Authorization:`Bearer ${config.credentials.access_token}`
    //         }
    //     })
    //     .then(response => {
    //         if(response.status == 404){
    //             return {status:false, msg:'Compra não encontrada'}
    //         }
    //         else{
    //             return {status:true, data:this.jsonexemplo()}
    //         }
            
    //     })
    //     .catch(err => {
    //         return {status:false, msg:'Ocorreu algum erro no sistema'}
    //     })
        
    }




    createdStatus(body){
        if(body.action == this.getPurchaseStatus()["created"]){
            return true
        }else{
            return false
        }
    }
    isUpdatedPaymentStatus(body){
        if(body.action == this.getPurchaseStatus()["updated"]){
            return true
        }else{
            return false
        }
    }
    getRequestData(body){
        if(body.status == "success"){
            return {status:"success",payer:{email:body.payer.email, cpf:body.payer.identification.number, idUser:body.payer.id}, dateCreated:date_created}
        }else{
            return false
        }
    }
    getPurchaseStatus(){
        const Enum = require('enum')
        return new Enum({
            "created":"payment.created",
            "updated":"payment.updated"
        })
    }
    jsonexemplo(){
        return {
            id: 1,
            date_created: "2017-08-31T11:26:38.000Z",
            date_approved: "2017-08-31T11:26:38.000Z",
            date_last_updated: "2017-08-31T11:26:38.000Z",
            money_release_date: "2017-09-14T11:26:38.000Z",
            payment_method_id: "account_money",
            payment_type_id: "credit_card",
            status: "approved",
            status_detail: "accredited",
            currency_id: "BRL",
            description: "Pago Pizza",
            collector_id: 2,
            payer: {
              id: 123,
              email: "mercadopagocustommer@seed.com",
              identification: {
                type: "DNI",
                number: 12345678
              },
              type: "customer"
            },
            metadata: {},
            additional_info: {},
            order: {},
            transaction_amount: 250,
            transaction_amount_refunded: 0,
            coupon_amount: 0,
            transaction_details: {
              net_received_amount: 250,
              total_paid_amount: 250,
              overpaid_amount: 0,
              installment_amount: 250
            },
            installments: 1,
            card: {}
          }
    }

}

module.exports = new MercadoPago()