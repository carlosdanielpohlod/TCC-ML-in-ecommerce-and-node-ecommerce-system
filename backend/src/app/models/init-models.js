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

function initModels(sequelize) {
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

  user.belongsTo(address, { as: "idAddress_address", foreignKey: "idAddress"});
  address.hasMany(user, { as: "users", foreignKey: "idAddress"});
  product.belongsTo(brand, { as: "idBrand_brand", foreignKey: "idBrand"});
  brand.hasMany(product, { as: "products", foreignKey: "idBrand"});
  category.belongsTo(category, { as: "idRootCategory_category", foreignKey: "idRootCategory"});
  category.hasMany(category, { as: "categories", foreignKey: "idRootCategory"});
  product.belongsTo(category, { as: "idCategory_category", foreignKey: "idCategory"});
  category.hasMany(product, { as: "products", foreignKey: "idCategory"});
  productsize.belongsTo(category, { as: "idCategory_category", foreignKey: "idCategory"});
  category.hasMany(productsize, { as: "productsizes", foreignKey: "idCategory"});
  user.belongsTo(phone, { as: "idPhone_phone", foreignKey: "idPhone"});
  phone.hasMany(user, { as: "users", foreignKey: "idPhone"});
  purchaseitem.belongsTo(product, { as: "idProduct_product", foreignKey: "idProduct"});
  product.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idProduct"});
  stock.belongsTo(product, { as: "idProduct_product", foreignKey: "idProduct"});
  product.hasMany(stock, { as: "stocks", foreignKey: "idProduct"});
  purchaseitem.belongsTo(productcolor, { as: "idProductColor_productcolor", foreignKey: "idProductColor"});
  productcolor.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idProductColor"});
  stock.belongsTo(productcolor, { as: "idProductColor_productcolor", foreignKey: "idProductColor"});
  productcolor.hasMany(stock, { as: "stocks", foreignKey: "idProductColor"});
  purchaseitem.belongsTo(productsize, { as: "idProductSize_productsize", foreignKey: "idProductSize"});
  productsize.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idProductSize"});
  stock.belongsTo(productsize, { as: "idProductSize_productsize", foreignKey: "idProductSize"});
  productsize.hasMany(stock, { as: "stocks", foreignKey: "idProductSize"});
  product.belongsTo(productstatus, { as: "idProductStatus_productstatus", foreignKey: "idProductStatus"});
  productstatus.hasMany(product, { as: "products", foreignKey: "idProductStatus"});
  product.belongsTo(provider, { as: "idProvider_provider", foreignKey: "idProvider"});
  provider.hasMany(product, { as: "products", foreignKey: "idProvider"});
  purchaseitem.belongsTo(purchase, { as: "idPurchase_purchase", foreignKey: "idPurchase"});
  purchase.hasMany(purchaseitem, { as: "purchaseitems", foreignKey: "idPurchase"});
  purchase.belongsTo(purchasestatus, { as: "idPurchaseStatus_purchasestatus", foreignKey: "idPurchaseStatus"});
  purchasestatus.hasMany(purchase, { as: "purchases", foreignKey: "idPurchaseStatus"});
  purchase.belongsTo(user, { as: "idUser_user", foreignKey: "idUser"});
  user.hasMany(purchase, { as: "purchases", foreignKey: "idUser"});
  user.belongsTo(userprivilege, { as: "idUserPrivilege_userprivilege", foreignKey: "idUserPrivilege"});
  userprivilege.hasMany(user, { as: "users", foreignKey: "idUserPrivilege"});

  return {
    address,
    brand,
    category,
    phone,
    product,
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
