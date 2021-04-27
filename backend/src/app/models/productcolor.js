const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const productcolor = sequelize.define('productcolor', {
    idProductColor: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productcolor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProductColor" },
        ]
      },
    ]
  });
  productcolor.associate = function(models){
    productcolor.hasMany(models.stock, {foreignKey: "idProductColor"});
  }
  return productcolor
};
