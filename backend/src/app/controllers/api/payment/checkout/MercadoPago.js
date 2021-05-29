// const CheckoutInterface = require('./CheckoutInterface')
const config = require('../../../../../config/mercadoPago')
const axios = require('axios')
const purchaseStatus = require('../../../enum/purchaseStatus')
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
              
            return response.body
         }
        catch(err){
            return {status:false, err}
        }

    }
    
    async getPayment(data){
        
    
       return axios.get(data.url,{
            headers:{
                Authorization:`Bearer ${config.credentials.access_token}`
            }
        })
        .then(response => {
               
            return {status:true, data:response.data.collection}
            
        })
        .catch(err => {
            return {status:false, msg:err.message}
        })
        
    }


    async getMerchantOrder(data){
        return axios.get(data.url,{
            headers:{
                Authorization:`Bearer ${config.credentials.access_token}`
            }
        })
        .then(response => {
               
            return {status:true, data:response.data}
            
        })
        .catch(err => {
            return {status:false, msg:err.message}
        })
    }

    async getPreference(data){
        return axios.get(`https://api.mercadopago.com/checkout/preferences/${data.preference_id}`,{
            headers:{
                Authorization:`Bearer ${config.credentials.access_token}`
            }
        })
        .then(response => {
               
            return {status:true, data:response.data}
            
        })
        .catch(err => {
            return {status:false, msg:err.message}
        })
    }
   
    mapedStatus(){
        return { 
            success: purchaseStatus["compra_concluida"].value,
            cancelled: purchaseStatus["cancelado"].value,
            rejected: purchaseStatus["pagamento_falhou"].value,
            expired: purchaseStatus["pagamento_nao_efetuado"].value,
            pending: purchaseStatus["aguardando_pagamento"].value,
            opened: purchaseStatus["pagamento_em_aberto"].value,
            closed: purchaseStatus["compra_concluida"].value,
            in_process: purchaseStatus["processando_pagamento"].value,
            authorizated: purchaseStatus["pagamento_autorizado_mas_nao_concluido"].value,
        }
    }
    
    urlBase(){
        return {

        }
    }

}

module.exports = new MercadoPago()