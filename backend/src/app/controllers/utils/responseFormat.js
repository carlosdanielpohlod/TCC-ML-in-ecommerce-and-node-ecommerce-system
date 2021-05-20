function formatMyPurchase(data){
    var formatedValues = []
    var purchaseDescription = ''
    data.forEach(data => {
    
        data.dataValues.purchaseitems.forEach(item => {
            purchaseDescription += `${item.stock.product.name} ${item.quantity} uni /`
        })
        // console.log(data.dataValues.status)
        formatedValues.push({
            purchaseDescription,
            idPurchase:data.dataValues.idPurchase,
            createdAt:data.dataValues.createdAt,
            purchaseStatus: data.purchasestatus.status
        })

    })

    return formatedValues
}
module.exports = {formatMyPurchase}        