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
                
            return response
         }
        catch(err){
            return {status:false, err}
        }

    }
    async merchant_order(req, res){}
    async getPayment(data){
        
    
       return axios.get(data.url,{
            headers:{
                Authorization:`Bearer ${config.credentials.access_token}`
            }
        })
        .then(response => {
            if(response.status == 404){
                return {status:false, msg:'Compra não encontrada'}
            }
            else{
                return {status:true, data:response}
            }
            
        })
        .catch(err => {
            return {status:false, msg:'Ocorreu algum erro no sistema'}
        })
        
    }




    isCreatedPaymentStatus(body){
        if(body.action == "payment.created"){
            return true
        }else{
            return false
        }
    }

    isUpdatedPaymentStatus(body){
        if(body.action == "payment.updated"){
            return true
        }else{
            return false
        }
    }
    

    formatRequestData(body){
        
        if(body.status){
            return {status:this.mapedStatus()[body.status],payer:{email:body.payer.email, cpf:body.payer.identification.number, idUser:body.payer.id}, dateCreated:date_created}
        }else{
            return false
        }
    }
   
    mapedStatus(){
        return { 
            success: purchaseStatus["compra_concluida"].value,
            canceled: purchaseStatus["cancelado"].value,
            rejected: purchaseStatus["compra_rejeitada"].value,
            pending: purchaseStatus["aguardando_pagamento"].value,
            opended: purchaseStatus["aguardando_pagamento"].value
            
        }
    }
    

}

module.exports = new MercadoPago()