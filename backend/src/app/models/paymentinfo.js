const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const paymentinfo =  sequelize.define('paymentinfo', {
    idPaymentInfo: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    preference_id: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    payment_type: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    payment_id:{
      type: DataTypes.STRING(250),
      allowNull: true
    },
    client_id: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    merchant_order_id: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    api: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: "Mercado Pago"
    }
  }, {
    sequelize,
    tableName: 'paymentinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPaymentInfo" },
        ]
      },
    ]
  });
  paymentinfo.associate = function(models){
    paymentinfo.hasMany(models.purchase, {foreignKey: "idPaymentInfo"});
  }
  return paymentinfo
};
