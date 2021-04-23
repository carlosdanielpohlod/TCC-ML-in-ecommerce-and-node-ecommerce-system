const Enum = require('enum')
valitationMessages = new Enum ({ 
    "isAlpha":"Deve conter apenas letras",
    "isNumeric":"Deve ser um número",
    "isFloat":"Deve ser um número com virgula",
    "max":"Informação excede o tamanho máximo",
    "min":"Informação menor que o permitido",
    "isEmail":"Formato de email inválido"
})
module.exports = valitationMessages