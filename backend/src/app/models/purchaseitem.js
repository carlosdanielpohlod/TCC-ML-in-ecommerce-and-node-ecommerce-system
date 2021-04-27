
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
    idProductColor: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'productcolor',
        key: 'idProductColor'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProduct: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idProduct'
      }
    },
    idProductSize: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'productsize',
        key: 'idProductSize'
      }
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
    purchaseitem.hasOne(models.productcolor, {foreignKey:'idProductColor'})
    purchaseitem.hasOne(models.productsize, {foreignKey:'idProductSize'})
  };
  return purchaseitem
};
