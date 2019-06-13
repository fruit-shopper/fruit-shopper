const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')

module.exports = router

//routes
//pull order by userID, where order status is cart
router.get('/:productId', async (req, res, next) => {
  try {
    const newCart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'cart'
      }
    })
    //console.log("new cart", newCart[0].dataValues.id)
    const addProduct = await OrderProduct.create({
      productId: req.params.productId,
      orderId: newCart[0].dataValues.id,
      quantity: req.body.quantity,
      price: req.body.price
    })
    res.json(addProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const newCart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'cart'
      }
    })

    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
