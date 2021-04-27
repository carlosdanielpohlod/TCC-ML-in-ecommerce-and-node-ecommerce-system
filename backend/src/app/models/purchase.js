module.exports = function(sequelize, DataTypes) {
  const purchase = sequelize.define('purchase', {
    idPurchase: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
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
    timestamps: false,
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
  
  purchase.associate = function(models) {
    purchase.hasMany(models.purchaseitem, { as: "purchaseitems", foreignKey: "idPurchase"});
    purchase.belongsTo(models.purchasestatus, { as: "idPurchaseStatus_purchasestatus", foreignKey: "idPurchaseStatus"});
    purchase.belongsTo(models.user, { as: "idUser_user", foreignKey: "idUser"});
  };
  return purchase
};
