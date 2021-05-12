formatItems = function(data){
    var preFomated = []
    data[0].purchaseitems.forEach(item => {
        preFomated.push({
                id:item.stock.idStock,quantity:item.quantity,
                category_id:String(item.stock.product.idCategory),
                title:item.stock.product.name, unit_price:item.stock.product.price,
                description:`${item.stock.product.description} Tamanho: ${item.stock.productsize.size}, Cor: ${item.stock.productcolor.color}`}
        )
    })
    return preFomated
}
formatPayer = function(data){
    return {name:data[0].user.name, surname:data[0].user.surname, email:data[0].user.email,
        identification:{
            type:"CPF",
            number:data[0].user.cpf
        },
        phone:{
            area_code:data[0].user.phone.areaCode, number:Number(data[0].user.phone.number)
        }, 
        address:{
            street_name:data[0].user.address.street,
            street_number:Number(data[0].user.address.number),
            zip_code:data[0].user.address.cep
        }
    }
}
module.exports = {formatItems, formatPayer}