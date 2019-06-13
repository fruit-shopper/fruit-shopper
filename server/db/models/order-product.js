const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('Order_Product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validation: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validation: {
      min: 0
    }
  }
})

module.exports = OrderProduct
