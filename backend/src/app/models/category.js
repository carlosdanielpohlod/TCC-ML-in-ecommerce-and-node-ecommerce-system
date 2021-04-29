const msg = require('../controllers/enum/validationMessages')
module.exports = function(sequelize, DataTypes) {
  const category = sequelize.define('category', {
    idCategory: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      primaryKey: true
    },
    idRootCategory: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'category',
        key: 'idCategory'
      }
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        len:{
          args:[3,15],
          msg:msg['invalidLength'].value
        }
      }
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategory" },
        ]
      },
      {
        name: "idRootCategory",
        using: "BTREE",
        fields: [
          { name: "idRootCategory" },
        ]
      },
    ]
  });
  category.associate = function(models){
    category.belongsTo(models.category, {as:'idHasRoot',foreignKey: "idRootCategory"});
    category.hasMany(models.category, {as:'idHasChildren',foreignKey: "idCategory"});
    category.hasMany(models.product, {foreignKey: "idCategory"});
    category.hasMany(models.productsize, { foreignKey: "idCategory"});
  }
  return category
};
