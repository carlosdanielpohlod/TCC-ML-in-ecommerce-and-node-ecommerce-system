const purchaseStatus = require('../enum/purchaseStatus')
function formatMyPurchases(data){
    var formatedValues = []
    var purchaseDescription = ''
    data.forEach(data => {
    
        data.dataValues.purchaseitems.forEach(item => {
            purchaseDescription += `${item.stock.product.name} ${item.quantity} uni /`
        })
        console.log(data.dataValues.idPurchaseStatus)
        formatedValues.push({
            purchaseDescription,
            idPurchase:data.dataValues.idPurchase,
            createdAt:data.dataValues.createdAt,
            paymentOpened: data.purchasestatus.idPurchaseStatus == purchaseStatus["pagamento_em_aberto"].value,
            purchaseStatus: data.purchasestatus.status
        })

    })

    return formatedValues
}
module.exports = {formatMyPurchases}        