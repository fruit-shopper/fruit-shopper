const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  try {
    let pastOrders = await Order.findAll({
      where: {
        userId: userId,
        status: 'completed'
      },
      include: [
        {
          model: Product
        }
      ]
    })
    pastOrders = pastOrders[0].dataValues.products
    res.json(pastOrders)
  } catch (err) {
    next(err)
  }
})
