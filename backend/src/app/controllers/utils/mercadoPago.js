formatItems = function(data){
    var preFomated = []
    data[0].purchaseitems.forEach(item => {
        preFomated.push({quantity:item.quantity, title:item.stock.product.name, price:item.stock.product.price,
                description:`${item.stock.product.description} Tamanho: ${item.stock.productsize.size}, Cor: ${item.stock.productcolor.color}`}
        )
    })
    return preFomated
}
formatPayer = function(data){
    return {name:data[0].user.name, name:data[0].user.surname, email:data[0].user.email,
        identification:{
            type:"CPF",
            number:data[0].user.cpf
        },
        phone:{
            areaCode:data[0].user.phone.areaCode, number:data[0].user.phone.number
        }, 
        address:{
            street_name:data[0].user.address.street,
            street_number:data[0].user.address.number,
            zip_code:data[0].user.address.cep
        }
    }
}
module.exports = {formatItems, formatPayer}