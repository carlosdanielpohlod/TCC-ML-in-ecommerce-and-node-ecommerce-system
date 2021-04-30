const Enum = require('enum')
status = new Enum ({ 
    "aguardando_pagamento":"2",
    "pagamento_efetuado":"3",
    "produto_em_transito":"4"
})
module.exports = status