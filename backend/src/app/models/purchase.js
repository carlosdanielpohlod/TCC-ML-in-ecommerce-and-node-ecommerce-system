const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchase', {
    idPurchase: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    idPurchaseStatus: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'purchasestatus',
        key: 'idPurchaseStatus'
      }
    }
  }, {
    sequelize,
    tableName: 'purchase',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPurchase" },
        ]
      },
      {
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "idPurchaseStatus",
        using: "BTREE",
        fields: [
          { name: "idPurchaseStatus" },
        ]
      },
    ]
  });
};
