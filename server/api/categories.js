const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// GET /api/categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    })
    res.json(categories)
  } catch (error) {
    next(error)
  }
})
