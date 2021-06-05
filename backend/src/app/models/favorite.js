
module.exports = function(sequelize, DataTypes) {
  const favorite = sequelize.define('favorite', {
    idFavorite: {
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
    idUser: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'user',
        key: 'idUser'
      }
    }
  }, {
    sequelize,
    tableName: 'favorite',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idFavorite" },
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
      },
    ]
  });

  favorite.associate = function(models){
    favorite.belongsTo(models.product, {foreignKey: "idProduct"});
    favorite.belongsTo(models.user, {foreignKey: "idUser"});
  }

  return favorite
};
