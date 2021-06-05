const purchaseStatus = require('../enum/purchaseStatus')
function formatMyPurchases(data){
    var formatedValues = []
    var purchaseDescription = ''
    data.forEach(data => {
    
        data.dataValues.purchaseitems.forEach(item => {
            purchaseDescription += `${item.stock.product.name} ${item.quantity} uni /`
        })
        
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

function formatMyPurchaseDetails(data){
    var formatedValues = []
    var items = []
    
    data.dataValues.purchaseitems.forEach(item => {
        items.push({
            idProduct:item.stock.product.idProduct,
            name:item.stock.product.name,
            price:item.stock.product.price,
            idStock:item.stock.idStock,
            category:item.stock.product.category.category,
            size:item.stock.productsize.size,
            color:item.stock.productcolor.color,
            quantity:item.quantity
        })
    })

    formatedValues.push({
        items,
        idPurchase:data.dataValues.idPurchase,
        createdAt:data.dataValues.createdAt,
        paymentOpened: data.purchasestatus.idPurchaseStatus == purchaseStatus["pagamento_em_aberto"].value ,
        purchaseStatus: data.purchasestatus.status
    })

  

    return formatedValues
}

function toTree(categories, tree){
   
        if(!tree) tree = categories.filter(c => !c.idRootCategory)
        tree = tree.map(parentNode => {
            const isChild = node => node.idRootCategory == parentNode.idCategory
            
            parentNode.children = toTree(categories, categories.filter(isChild))
            
            return parentNode
        })
        return tree
    
}


module.exports = {formatMyPurchases, formatMyPurchaseDetails, toTree}        