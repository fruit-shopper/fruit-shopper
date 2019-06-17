const router = require('express').Router()
const {Product, Review, Order, Category, User} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Review, Order, Category]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {model: Review, include: [{model: User, attributes: ['name']}]},
        Order,
        Category
      ]
    })
    // console.log(product.dataValues)
    res.json(product.dataValues).end()
  } catch (err) {
    next(err)
  }
})

// set association for product and category
router.post('/association/:productId/:categoryId', async (req, res, next) => {
  try {
    let theCategory = await Category.findByPk(req.params.categoryId)
    let theProduct = await Product.findByPk(req.params.productId)
    await theProduct.addCategory(theCategory)
    let productToReturn = await Product.findByPk(req.params.productId, {
      include: [Review, Order, Category]
    })
    res.json(productToReturn)
  } catch (error) {
    next(error)
  }
})

// set association for product and order(cart)
router.post('/association/:productId/:orderId', async (req, res, next) => {
  try {
    let theOrder = await Order.findByPk(req.params.orderId)
    let theProduct = await Product.findByPk(req.params.productId)
    await theProduct.addOrder(theOrder)
    let productToReturn = await Product.findByPk(req.params.productId, {
      include: [Review, Order, Category]
    })
    res.json(productToReturn)
  } catch (error) {
    next(error)
  }
})

// add product
router.post('/', async (req, res, next) => {
  try {
    let product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// update product
router.put('/:productId', async (req, res, next) => {
  try {
    let theProduct = await Product.findByPk(req.params.productId)
    let product = await theProduct.update(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// unassociate category from product
router.delete('/association/:productId/:categoryId', async (req, res, next) => {
  try {
    let theCategory = await Category.findByPk(req.params.categoryId)
    let theProduct = await Product.findByPk(req.params.productId)
    await theProduct.removeCategory(theCategory)
    let productToReturn = await Product.findByPk(req.params.productId, {
      include: [Review, Order, Category]
    })
    res.json(productToReturn)
  } catch (error) {
    next(error)
  }
})

// delete product
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route under /api/products not found!')
  err.status = 404
  next(err)
})

module.exports = router
