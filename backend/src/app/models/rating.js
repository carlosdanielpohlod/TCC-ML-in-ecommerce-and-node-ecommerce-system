const msg = require('../controllers/enum/validationMessages')
module.exports = function(sequelize, DataTypes) {
  const rating =  sequelize.define('rating', {
    idRating: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    rating: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true,
      validate:{
        isNumeric:{
          msg:msg['isNumeric'].value
        }
      }
    },
    idProduct: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idProduct'
      }
    },
    idUser: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    }
  }, {
    sequelize,
    tableName: 'rating',
    timestamps: false,
    indexes: [
      {
        using: "BTREE",
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRating" },
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
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      }
    ]
  });
  rating.associate = function(models) {
    
    rating.belongsTo(models.product, {foreignKey: "idProduct"});
    rating.belongsTo(models.user, {foreignKey: "idUser"});
    
  };
  return rating
};
