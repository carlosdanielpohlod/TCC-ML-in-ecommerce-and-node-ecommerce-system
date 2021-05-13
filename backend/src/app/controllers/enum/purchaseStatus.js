const Enum = require('enum')
status = new Enum ({ 
    "no_carrinho":"1",
    "aguardando_pagamento":"2",
    "pagamento_efetuado":"3",
    "produto_em_transito":"4",
    "compra_concluida": '5',
    "cancelado":"6",
    "pagamento_nao_efetuado":"7"
})
module.exports = status