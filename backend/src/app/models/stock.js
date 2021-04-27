
const msg = require('../controllers/enum/validationMessages');
module.exports = function(sequelize, DataTypes) {
  const stock = sequelize.define('stock', {
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
      defaultValue: 0,
      validate:{
        min:{
          args:[0],
          msg:msg['negativeStock'].value
        }
      }
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
  stock.associate = function(models){
    stock.belongsTo(models.product, {foreignKey: "idProduct"});
    stock.belongsTo(models.productcolor, {foreignKey: "idProductColor"});
    stock.belongsTo(models.productsize, {foreignKey: "idProductSize"});
    stock.hasMany(models.purchaseitem, {foreignKey: "idStock"});
  }
  return stock
  // stock.associate = function(models){
  //   stock.belongsTo(models.purchaseitem)
  // }
};
