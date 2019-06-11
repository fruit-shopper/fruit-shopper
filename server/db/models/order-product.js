const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('Order_Product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validation: {
      min: 0
    }
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
    validation: {
      min: 0
    }
  }
})

module.exports = Order_Product
