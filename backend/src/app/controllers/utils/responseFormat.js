const purchaseStatus = require('../enum/purchaseStatus')
function formatMyPurchases(data){
    var formatedValues = []
    var purchaseDescription = ''
    data.forEach(data => {
        purchaseDescription = ''
        if(data.dataValues.purchaseitems.length > 0){
           
            data.dataValues.purchaseitems.forEach(item => {
              
                purchaseDescription += `${item.stock.product.name} ${item.quantity} uni /`
                
            })
            
            formatedValues.push({
                imageUrl:data.dataValues.purchaseitems[0].stock.product.productimages[0].url,    
                purchaseDescription,
                idPurchase:data.dataValues.idPurchase,
                createdAt:data.dataValues.createdAt,
                paymentOpened: data.purchasestatus.idPurchaseStatus == purchaseStatus["pagamento_em_aberto"].value,
                purchaseStatus: data.purchasestatus.status,
                
            })
        }
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
            quantity:item.quantity,
            images:item.stock.product.productimages
        })
    })

    formatedValues.push({
        items,
        idPurchase:data.dataValues.idPurchase,
        createdAt:data.dataValues.createdAt,
        paymentOpened: data.purchasestatus.idPurchaseStatus == purchaseStatus["pagamento_em_aberto"].value ,
        purchaseStatus: data.purchasestatus.status,
        purchaseCompleted: data.purchasestatus.idPurchaseStatus == purchaseStatus["compra_concluida"] ? true : false
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

function getAllInfosUserCartFormat(data){
    formatedArray = []
    data.forEach(element => {
        formatedArray.push({
            name:element.dataValues.stock.product.name,
            price:element.dataValues.stock.product.price,
            images:element.dataValues.stock.product.productimages,
            idPurchaseItem:element.dataValues.idPurchaseItem, 
            quantity:element.dataValues.quantity,
            quantityStock:element.dataValues.stock.quantity,
            color:element.dataValues.stock.productcolor.color,
            size:element.dataValues.stock.productsize.size,
        })
    })
    return formatedArray
}

function formatProductBasicDetails(data){
    var formated = {}
    var formatedStock = []
    data.forEach(element => {
        formated = {
            idProduct:element.dataValues.idProduct,
            name:element.dataValues.name,
            description:element.dataValues.description,
            price:element.dataValues.price,
            category:element.dataValues.category.category,
            images:element.dataValues.productimages,
            idPurchaseItem:element.dataValues.idPurchaseItem,             
            stock:element.dataValues.stocks
            
        }
    })
    
    formated.stock.forEach(stock => {
        formatedStock.push({
            quantity:stock.quantity,
            idStock:stock.idStock,
            size:stock.productsize.size,
            idProductSize:stock.productsize.idProductSize,
            color:stock.productcolor.color,
            idProductColor:stock.productcolor.idProductColor
        })
    })
    formated.stock = formatedStock
    return formated
}

function formatFindFavoriteWithPaginate(data){
    var formatedArray = []
    
    data.forEach(element => {
        
        formatedArray.push({
            idFavorite:element.dataValues.idFavorite,
            idProduct:element.dataValues.product.idProduct,
            name:element.dataValues.product.name,
            price:element.dataValues.product.price,
            description:element.dataValues.product.description,
            imageUrl: element.dataValues.product.productimages.length > 0 ? element.dataValues.product.productimages[0].url : ''
        })
        
    })

    

    return formatedArray
}
module.exports = {formatFindFavoriteWithPaginate,formatProductBasicDetails,formatMyPurchases, formatMyPurchaseDetails, toTree, getAllInfosUserCartFormat}        