
module.exports = function(sequelize, DataTypes) {
  const productimage = sequelize.define('productimage', {
    idProductImage: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    sort: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull:true
    },
    idProduct: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idProduct'
      }
    }
  }, {
    sequelize,
    tableName: 'productimage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProductImage" },
        ]
      },
      {
        name: "idProduct",
        using: "BTREE",
        fields: [
          { name: "idProduct" },
        ]
      },
    ]
  });

  productimage.associate = function(models){
      productimage.belongsTo(models.product, {foreignKey: "idProduct"});
  }

  return productimage
};
