const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [Product, User]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// GET /api/orders/orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [Product, User]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// add order
router.post('/', async (req, res, next) => {
  try {
    let order = await Order.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// update order
router.put('/:orderId', async (req, res, next) => {
  try {
    let theOrder = await Order.findByPk(req.params.orderId)
    let order = await theOrder.update(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// delete order
router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('API router under /api/orders not found!')
  err.status = 404
  next(err)
})

module.exports = router
