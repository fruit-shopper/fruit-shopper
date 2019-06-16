const router = require('express').Router()
const {Product, Order} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  try {
    let pastOrders = await Order.findAll({
      where: {
        userId: userId,
        status: {
          [Op.or]: ['created', 'processing']
        }
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(pastOrders)
  } catch (err) {
    next(err)
  }
})
