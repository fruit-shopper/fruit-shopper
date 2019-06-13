const Sequelize = require('sequelize')
const db = require('../db')

const CategoryProduct = db.define('Category_Product')

module.exports = CategoryProduct
