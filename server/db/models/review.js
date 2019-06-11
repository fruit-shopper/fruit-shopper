const Sequelize = require('sequelize')
const db = require('../db')


const Reviews = db.define('review', {
  text: {
    type: Sequelize.STRING,
    validate: {
      len: [6, 140]
    }
  }
})

module.exports = Reviews
