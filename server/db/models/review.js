const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [1, 800]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Reviews
