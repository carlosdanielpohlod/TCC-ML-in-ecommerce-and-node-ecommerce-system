const Enum = require('enum')
httpStatus = new Enum ({ 
    "201":"Cadastrado com sucesso",
    "200":"Realizado com sucesso",
    "400":"Informações incorretas",
    "401":"Informação não encontrada",
    "500":"Ocorreu um erro no sistema, tente mais tarde"
})
module.exports = httpStatus