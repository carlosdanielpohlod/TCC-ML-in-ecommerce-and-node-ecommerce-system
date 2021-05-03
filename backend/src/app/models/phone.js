const msg = require('../controllers/enum/validationMessages');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phone', {
    idPhone: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    areaCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate:{
        isNumeric:{
          msg:msg["isNumeric"].value
        },
        len:{
          args:[1,5],
          msg:msg["invalidLength"].value
        }
      }
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate:{
        isNumeric:{
          msg:msg["isNumeric"].value
        },
        len:{
          args:[7,15],
          msg:msg["invalidLength"].value
        }
      }
    }
  }, {
    sequelize,
    tableName: 'phone',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPhone" },
        ]
      },
    ]
  });
};
