
const msg = require('../controllers/enum/validationMessages');
module.exports = function(sequelize, DataTypes) {
  const address = sequelize.define('address', {

    idAddress: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      // validation:{
      //   isNull:true
      // },
      allowNull: false,
      primaryKey: true
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate:{
        isNumeric:{
          msg:msg['isNumeric'].value
        },
        len:{
          args:[8,8],
          msg:msg['invalidLength'].value
        }
      }

    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        is:{
          args:[/^[ a-zA-Z á]*$/],
          msg:msg["letterAndSpace"].value
        },
        len:{
          args:[2,2],
          msg:msg['invalidLength'].value
        },
        trim(value){
          if(value.trim() < 2){
            throw new Error(msg["trimError"].value);
          }
        }
    }
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        is:{
          args:[/^[ a-zA-Z á]*$/],
          msg:msg["letterAndSpace"].value
        },
      len:{
        args:[2,30],
        msg:msg['invalidLength'].value
      },
      trim(value){
        if(value.trim() < 2){
          throw new Error(msg["trimError"].value);
        }
      }
      }
    },
    street: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
      
      len:{
        args:[2,50],
        msg:msg['invalidLength'].value
      },
      trim(value){
        if(value.trim() < 2){
          throw new Error(msg["trimError"].value);
        }
      }
    }
    },
    number: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate:{
      isNumeric:{
        msg:msg['isNumeric'].value
        
      },
      len:{
        args:[1,10],
        msg:msg['invalidLength'].value
      }
    }
    }
  }, {
    sequelize,
    tableName: 'address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAddress" },
        ]
      },
    ]
  });
  address.associate = function(models){
    address.hasMany(models.user, {foreignKey: "idAddress"});
  }
  return address
};
