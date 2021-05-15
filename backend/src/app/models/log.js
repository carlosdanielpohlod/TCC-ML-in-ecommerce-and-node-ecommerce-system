const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    idLog: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    log: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    idLogType: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'logtype',
        key: 'idLogType'
      }
    },
    
    createdAt:{
      type:'TIMESTAMP'
    }
  }, {
    sequelize,
    tableName: 'log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLog" },
        ]
      },
      {
        name: "idLogType",
        using: "BTREE",
        fields: [
          { name: "idLogType" },
        ]
      },
    ]
  });
};
