const {paymentinfo, purchase} = require('../models')
const purchaseStatus = require('../controllers/enum/purchaseStatus')
const {Op} = require("sequelize")
class PaymentRepository{
    async getPaymentPreference_id(idUser, idPurchase){
        return await purchase.findOne({
            where:{[Op.and]: [{ idUser}, { idPurchase}, {idPurchaseStatus: purchaseStatus["pagamento_em_aberto"].value}]},
            include: [{
                model:paymentinfo,
                attributes:['preference_id']
            }]
        })
    }

    async getPaymentInfoByQuery(data){
        try{
            const response  = await purchase.findOne({
                attributes:['idPurchase'],
                
                include: [
                    { 
                        model:paymentinfo,
                        attributes:['idPaymentInfo'],
                        where:data.query
                    }
                ]
            })
            return {idPaymentInfo:response.dataValues["paymentinfo"].idPaymentInfo, idPurchase:response.idPurchase}
        }
        catch(err){
            // systemLog.error("PaymentController.getPaymentInfoByQuery", err.message)
        }
    }

}

module.exports = new PaymentRepository()
