const msg = require('../controllers/enum/validationMessages')
module.exports = function(sequelize, DataTypes) {
  const product =  sequelize.define('product', {
    idProduct: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate:{
        min(value){
          value = String(value)
          if(value.length < 3){
            throw new Error(msg['min'].value);
          }
        },
        max(value){
          value = String(value)
          if(value.length > 30){
            throw new Error(msg['max'].value);
          }
        },
        trim(value){
          if(value.trim() < 3){
            throw new Error(msg["trimError"].value);
          }
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false,
      validate:{
        isNumeric:{
          msg:msg['isNumeric'].value
        }
      }
      
    },
    idProvider: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'provider',
        key: 'idProvider'
      }
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate:{
        max(value){
          if(value.length > 700){
            throw new Error(msg['max'].value);
          }
        },
        
        trim(value){
          if(value.trim() < 1){
            throw new Error(msg["trimError"].value);
          }
        }
      }
    },
    idCategory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'category',
        key: 'idCategory'
      }
    },
    idProductStatus: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'productstatus',
        key: 'idProductStatus'
      }
    },
    idBrand: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'brand',
        key: 'idBrand'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProduct" },
        ]
      },
      {
        name: "idProvider",
        using: "BTREE",
        fields: [
          { name: "idProvider" },
        ]
      },
      {
        name: "idCategory",
        using: "BTREE",
        fields: [
          { name: "idCategory" },
        ]
      },
      {
        name: "idProductStatus",
        using: "BTREE",
        fields: [
          { name: "idProductStatus" },
        ]
      },
      {
        name: "idBrand",
        using: "BTREE",
        fields: [
          { name: "idBrand" },
        ]
      },
    ]
  });
  product.associate = function(models){
    product.belongsTo(models.brand, { foreignKey: "idBrand"});
    product.belongsTo(models.category, {foreignKey: "idCategory"});
    product.hasMany(models.stock, {onDelete: 'cascade',foreignKey: "idProduct"});
    product.belongsTo(models.productstatus, {foreignKey: "idProductStatus"});
    product.belongsTo(models.provider, {foreignKey: "idProvider"});
    product.hasMany(models.favorite, {foreignKey: "idProduct"});
    product.hasMany(models.productimage, {foreignKey: "idProduct"});
  }
  return product
};
