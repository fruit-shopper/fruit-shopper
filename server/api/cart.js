const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

module.exports = router

//routes
//pull order by userID, where order status is cart
router.post('/:productId', async (req, res, next) => {
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
    const cartOrderId = await Order.findAll({
      where: {
        userId: req.user.id,
        status: 'cart'
      }
    })
    console.log('cart order id', cartOrderId[0].dataValues.id)
    const cartContents = await OrderProduct.findAll({
      where: {
        orderId: cartOrderId[0].dataValues.id
      }
    })
    console.log('cart contents', cartContents[0].dataValues)
    let products = []
    for (let i = 0; i < cartContents.length; i++) {
      products.push(Product.findByPk(cartContents[i].productId))
    }
    const productInfo = await Promise.all(products)
    // const cartProducts = await Product.findAll({
    //   where: {
    //     id: cartContents.
    //   }
    // })
    res.json(productInfo)
  } catch (error) {
    next(error)
  }
})
