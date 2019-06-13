const router = require('express').Router()
const Product = require('../db/models/product')
const Review = require('../db/models/review')
const Category = require('../db/models/category')
const Order = require('../db/models/order')

module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [Review, Order, Category]
    })

    res.json(product.dataValues).end()
  } catch (err) {
    next(err)
  }
})
