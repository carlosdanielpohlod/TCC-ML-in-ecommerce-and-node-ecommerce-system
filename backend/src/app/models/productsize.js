const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productsize', {
    idProductSize: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    idCategory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'category',
        key: 'idCategory'
      }
    }
  }, {
    sequelize,
    tableName: 'productsize',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProductSize" },
        ]
      },
      {
        name: "idCategory",
        using: "BTREE",
        fields: [
          { name: "idCategory" },
        ]
      },
    ]
  });
};
