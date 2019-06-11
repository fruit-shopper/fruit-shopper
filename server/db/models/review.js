const Sequelize = require('sequelize')
const db = require('../db')


const Reviews = db.define('review', {
  text: {
    type: Sequelize.STRING
  }
})

module.exports = Reviews
