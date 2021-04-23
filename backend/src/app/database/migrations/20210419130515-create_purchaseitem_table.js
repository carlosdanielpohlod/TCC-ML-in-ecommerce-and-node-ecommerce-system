'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('purchaseitem', { 
       idPurchaseItem:{
          type:Sequelize.BIGINT.UNSIGNED,
          autoIncrement:true,
          primaryKey:true
       },
        idPurchase: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'purchase',
            key: 'idPurchase'
          }
        },
        idProductColor: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'productcolor',
            key: 'idProductColor'
          }
        },
        quantity:{
          type:Sequelize.INT,
          allowNull:false,
          default:1
        },
        idProduct: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'product',
            key: 'idProduct'
          }
        },
        
      idProductSize:{
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'productsize',
          key: 'idProductSize'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:1
      }
      
     });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('purchaseitem');
     
  }
};
