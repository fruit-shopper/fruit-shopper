const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'cart',
      'created',
      'processing',
      'cancelled',
      'completed'
    )
  }
})

module.exports = Order
