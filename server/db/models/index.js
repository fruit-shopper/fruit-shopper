const User = require('./user')
const Order_Product = require('./order-product')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsToMany(Product, {through: 'Order_Product'})
Product.belongsToMany(Order, {through: 'Order_Product'})




/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order_Product,
  Order,
  Review,
  Product
}
