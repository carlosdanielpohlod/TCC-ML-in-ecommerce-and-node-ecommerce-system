
module.exports = function(sequelize, DataTypes) {
  const purchaseitem = sequelize.define('purchaseitem', {
    idPurchaseItem: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    idPurchase: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'purchase',
        key: 'idPurchase'
      }
    },
    idStock: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'idStock'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    
    }
  }, {
    sequelize,
    tableName: 'purchaseitem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPurchaseItem" },
        ]
      },
      {
        name: "idPurchase",
        using: "BTREE",
        fields: [
          { name: "idPurchase" },
        ]
      },
      {
        name: "idProductColor",
        using: "BTREE",
        fields: [
          { name: "idProductColor" },
        ]
      },
      {
        name: "idProduct",
        using: "BTREE",
        fields: [
          { name: "idProduct" },
        ]
      },
      {
        name: "idProductSize",
        using: "BTREE",
        fields: [
          { name: "idProductSize" },
        ]
      },
    ]
  });
  purchaseitem.associate = function(models) {
    purchaseitem.belongsTo(models.purchase, {foreignKey: 'idPurchase'})
    purchaseitem.belongsTo(models.stock, {foreignKey:'idStock'})
  };
  return purchaseitem
};
