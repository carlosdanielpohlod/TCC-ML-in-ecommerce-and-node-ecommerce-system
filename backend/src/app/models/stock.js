const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    idStock: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    idProduct: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idProduct'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    idProductSize: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'productsize',
        key: 'idProductSize'
      }
    },
    idProductColor: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'productcolor',
        key: 'idProductColor'
      }
    }
  }, {
    sequelize,
    tableName: 'stock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idStock" },
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
      {
        name: "idProductColor",
        using: "BTREE",
        fields: [
          { name: "idProductColor" },
        ]
      },
    ]
  });
};
