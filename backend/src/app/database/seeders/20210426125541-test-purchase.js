'use strict';
const purchaseStatus = require('../../controllers/enum/purchaseStatus')
module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('purchase', [{
     idUser:1,
     idPurchase:1,
     idPurchaseStatus:purchaseStatus["no_carrinho"].value
    },
    {
      idUser:4,
      idPurchase:2,
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
      
    },
    { 
      idUser:6,
      idPurchase:3,
      idPurchaseStatus:purchaseStatus["cancelado"].value
    },
    { 
      idUser:7, //compra do mercadopagocustommer@seed.com
      idPurchase:4,
      idPaymentInfo:1,
      idPurchaseStatus:purchaseStatus["no_carrinho"].value
    },
    { 
      idUser:7,
      idPurchase:5,
      idPaymentInfo:2,
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
    },
    { 
      
      idUser:7,
      idPurchase:6,
      idPaymentInfo:3,
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
    
    },
    { 
      
      idUser:7, //COMPRA REJEITADA
      idPurchase:7,
      idPaymentInfo:4,
      idPurchaseStatus:purchaseStatus["aguardando_pagamento"].value
    
    },
    { 
      
      idUser:7, //COMPRA PARA OS TESTES DO ESTOQUE
      idPurchase:8,
      idPurchaseStatus:purchaseStatus["cancelado"].value
    
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkDelete('purchase', null, {});
    
  }
};
