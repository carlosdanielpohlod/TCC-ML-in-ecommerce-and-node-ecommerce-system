const Enum = require('enum')
valitationMessages = new Enum ({ 
    "isAlpha":"Deve conter apenas letras",
    "isNumeric":"Deve ser númerico",
    "isFloat":"Deve ser um número com virgula",
    "max":"Informação excede o tamanho máximo",
    "min":"Informação menor que o permitido",
    "isEmail":"Formato de email inválido",
    "invalidLength":"Tamanho inválido",
    "negativeStock":"O estoque não pode ser menor que 0",
    "letterAndSpace":"Deve conter apenas letras"
})
module.exports = valitationMessages