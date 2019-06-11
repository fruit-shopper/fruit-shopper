const Sequelize = require('sequelize')
const db = require('../db')

const Cart_Product = db.define('Cart_Product', {
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

module.exports = Cart_Product

