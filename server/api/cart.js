const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

module.exports = router

router.use(async (req, res, next) => {
  try {
    let order
    //add if the req.session.cart and the user logs in add the user id to the order in the order table
    if (req.user && req.session.cart) {
      // order = await Order.findOne({
      //   where: {
      //     userId: req.user.id,
      //     id: req.session.cart,
      //     status: 'cart'
      //   }
      // })
      const [numAffectedRows, updatedRow] = await Order.update(
        {
          userId: req.user.id
        },
        {
          where: {
            id: req.session.cart,
            status: 'cart'
          },
          returning: true,
          plain: true
        }
      )
      console.log('updatedRow', updatedRow)
      order = updatedRow.dataValues
    } else if (req.user) {
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
      console.log('session in the create new cart', req.session)
    }
    req.order = order
    //console.log('order in middleware', order)
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

router.delete('/:itemId', async (req, res, next) => {
  try {
    console.log('delete req body', req.params.itemId)
    await OrderProduct.destroy({
      where: {
        productId: req.params.itemId
      }
    })
    //res.json(deletedItem)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//edit the quantity
// router.put('/', async (req, res, next) => {
//   try {
//     const currentOrder = await OrderProduct.findOne({
//       where: {
//         productId: req.params.productId
//       }
//     })
//   } catch (error) {}
// })

router.get('/', async (req, res, next) => {
  console.log(req.session.cart)
  try {
    const cartContents = await Order.findOne({
      where: {
        // userId: req.user.id,
        // status: 'cart'
        id: req.order.id
      },
      include: [
        {
          model: Product
        }
      ]
    })
    console.log('cart from the api request', cartContents)
    res.json(cartContents)
  } catch (error) {
    next(error)
  }
})
