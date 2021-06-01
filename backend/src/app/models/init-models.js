var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _brand = require("./brand");
var _category = require("./category");
var _phone = require("./phone");
var _product = require("./product");
var _productcolor = require("./productcolor");
var _productsize = require("./productsize");
var _productstatus = require("./productstatus");
var _provider = require("./provider");
var _purchase = require("./purchase");
var _purchaseitem = require("./purchaseitem");
var _purchasestatus = require("./purchasestatus");
var _sequelizemeta = require("./sequelizemeta");
var _stock = require("./stock");
var _user = require("./user");
var _userprivilege = require("./userprivilege");
var _log = require("./log");
var _logtype = require("./logtype");
var _paymentinfo = require("./paymentinfo");

function initModels(sequelize) {
  var paymentinfo = _paymentinfo(sequelize, DataTypes);
  var log = _log(sequelize, DataTypes);
  var logtype = _logtype(sequelize, DataTypes);
  var address = _address(sequelize, DataTypes);
  var brand = _brand(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var phone = _phone(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var productcolor = _productcolor(sequelize, DataTypes);
  var productsize = _productsize(sequelize, DataTypes);
  var productstatus = _productstatus(sequelize, DataTypes);
  var provider = _provider(sequelize, DataTypes);
  var purchase = _purchase(sequelize, DataTypes);
  var purchaseitem = _purchaseitem(sequelize, DataTypes);
  var purchasestatus = _purchasestatus(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var stock = _stock(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userprivilege = _userprivilege(sequelize, DataTypes);
  
 
  address.hasMany(user, { as: "users", foreignKey: "idAddress"});
  
  brand.hasMany(product, { as: "products", foreignKey: "idBrand"});
 
  // paymentinfo.hasMany(purchase, {foreignKey: "idPaymentInfo"});
  
  log.belongsTo(logtype, {foreignKey: "idLogType"});
  log.belongsTo(user, {foreignKey: "idUser"});
  logtype.hasMany(log, {foreignKey: "idLogType"});
  
 
 
  phone.hasMany(user, { as: "users", foreignKey: "idPhone"});
  
  
  
  
  
  
  
  productstatus.hasMany(product, { as: "products", foreignKey: "idProductStatus"});
  
  provider.hasMany(product, { as: "products", foreignKey: "idProvider"});
  
  
  
  purchasestatus.hasMany(purchase, { as: "purchases", foreignKey: "idPurchaseStatus"});
  
  
  
 
 
  userprivilege.hasMany(user, { as: "users", foreignKey: "idUserPrivilege"});

  // user.belongsTo(address, { as: "idAddress_address", foreignKey: "idAddress"});
  // user.belongsTo(phone, { as: "idPhone_phone", foreignKey: "idPhone"});
  // user.hasMany(purchase, { as: "purchases", foreignKey: "idUser"});
  // user.belongsTo(userprivilege, { as: "idUserPrivilege_userprivilege", foreignKey: "idUserPrivilege"});

  // category.belongsTo(category, { as: "idRootCategory_category", foreignKey: "idRootCategory"});
  // category.hasMany(category, { as: "categories", foreignKey: "idRootCategory"});
  // category.hasMany(product, { as: "products", foreignKey: "idCategory"});
  // category.hasMany(productsize, { as: "productsizes", foreignKey: "idCategory"});

// product.belongsTo(brand, { as: "idBrand_brand", foreignKey: "idBrand"});
// product.belongsTo(category, { as: "idCategory_category", foreignKey: "idCategory"});
// product.hasMany(stock, { as: "stocks", foreignKey: "idProduct"});
// product.belongsTo(productstatus, { as: "idProductStatus_productstatus", foreignKey: "idProductStatus"});
// product.belongsTo(provider, { as: "idProvider_provider", foreignKey: "idProvider"});


  // productcolor.hasMany(stock, { as: "stocks", foreignKey: "idProductColor"});

//   purchase.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idPurchase"});
// purchase.belongsTo(purchasestatus, { as: "idPurchaseStatus_purchasestatus", foreignKey: "idPurchaseStatus"});
// purchase.belongsTo(user, { as: "idUser_user", foreignKey: "idUser"});

  // stock.belongsTo(product, { as: "idProduct_product", foreignKey: "idProduct"});
  // stock.belongsTo(productcolor, { as: "idProductColor_productcolor", foreignKey: "idProductColor"});
  // stock.belongsTo(productsize, { as: "idProductSize_productsize", foreignKey: "idProductSize"});
  // stock.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idStock"});

  // purchaseitem.belongsTo(purchase, { as: "idPurchase_purchase", foreignKey: "idPurchase"});
  // purchaseitem.belongsTo(stock, { as: "idStock_stock", foreignKey: "idStock"});
  return {
    address,
    brand,
    category,
    phone,
    product,
    paymentinfo,
    productcolor,
    productsize,
    productstatus,
    provider,
    purchase,
    purchaseitem,
    purchasestatus,
    sequelizemeta,
    stock,
    user,
    userprivilege,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
