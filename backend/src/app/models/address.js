const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    idAddress: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(8),
      allowNull: false
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
};
