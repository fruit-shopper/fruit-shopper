const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '/placeholderFruit.jpg'
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }

})

module.exports = Product
