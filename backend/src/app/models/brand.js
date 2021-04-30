const msg = require('../controllers/enum/validationMessages');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('brand', {
    idBrand: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        len:{
          args:[1,15],
          msg:msg['invalidLength'].value
        }
      },
    }
  }, {
    sequelize,
    tableName: 'brand',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idBrand" },
        ]
      },
    ]
  });
};
