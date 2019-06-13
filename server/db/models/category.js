const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.ENUM(
      'tropical',
      'US-grown',
      'organic',
      'gift',
      'top pick',
      'in season'
    )
  }
})

module.exports = Category
