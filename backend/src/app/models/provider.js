const msg = require('../controllers/enum/validationMessages')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('provider', {
    idProvider: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate:{
        trim(value){
          if(value.trim() < 1){
            throw new Error(msg["trimError"].value);
          }
        }
      }
    },
    cnpj: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'provider',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProvider" },
        ]
      },
    ]
  });
};
