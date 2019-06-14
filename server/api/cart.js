const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

module.exports = router

router.use(async (req, res, next) => {
  try {
    let order
    if (req.user) {
      order = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        }
      })
      order = order[0].dataValues
    } else if (req.session.cart) {
      //req.session.cart = 'orderId'
      order = await Order.findOne({
        where: {
          id: req.session.cart,
          status: 'cart'
        }
      })
      order = order.dataValues
    } else {
      order = await Order.create({
        status: 'cart'
      })
      order = order.dataValues
      req.session.cart = order.id
    }
    req.order = order
    console.log('order in middleware', order)
    next()
  } catch (error) {
    next(error)
  }
})

//routes
//pull order by userID, where order status is cart
//check here to see if the user is looged in or not(in the route)
router.post('/:productId', async (req, res, next) => {
  try {
    // const newCart = await Order.findOrCreate({
    //   where: {
    //     userId: req.user.id,
    //     status: 'cart'
    //   }
    // })
    const addProduct = await OrderProduct.create({
      productId: req.params.productId,
      // orderId: newCart[0].dataValues.id,
      orderId: req.order.id,
      quantity: req.body.quantity,
      price: req.body.price
    })
    res.json(addProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  console.log(req.session.cart)
  try {
    const cartContents = await Order.findAll({
      where: {
        userId: req.user.id,
        status: 'cart'
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(cartContents)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const deletedItem = await OrderProduct.destroy({
      where: {
        productId: req.body
      }
    })
    res.json(deletedItem)
  } catch (err) {
    next(err)
  }
})
