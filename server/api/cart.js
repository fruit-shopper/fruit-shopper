const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

module.exports = router

router.use(async (req, res, next) => {
  try {
    let order
    //add if the req.session.cart and the user logs in add the user id to the order in the order table
    // console.log('req.session.cart in middleware', req.session.cart)
    if (req.user && req.session.cart !== undefined) {
      let oldCart = await Order.findOne({
        where: {
          status: 'cart',
          userId: req.user.id
        }
      })
      // console.log('old cart', oldCart)
      if (oldCart) {
        await OrderProduct.update(
          {
            orderId: req.session.cart
          },
          {
            where: {
              orderId: oldCart.dataValues.id
            }
          }
        )
        await Order.destroy({
          where: {
            id: oldCart.dataValues.id
          }
        })
      }

      const [numAffectedRows, updatedRow] = await Order.update(
        //const result = await Order.update(
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
      req.session.cart = undefined
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
      console.log('here', req.user)

      order = order.dataValues
    } else {
      order = await Order.create({
        status: 'cart'
      })
      console.log(order)
      order = order.dataValues
      req.session.cart = order.id
      // console.log('session in the create new cart', req.session)
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
    // console.log('Order ID in post', req.order.id)
    console.log('>>>>>>> ', req.params)
    console.log('>>>>>>>2 ', req.body)
    console.log('>>>>>>>3 ', req.order)
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
    // console.log('delete req body', req.params.itemId)
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
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    // console.log("req body in api route", req.body.quantity)
    // console.log("params in route", req.params)
    const [numAffectedRows, updatedRow] = await OrderProduct.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          productId: req.params.productId,
          orderId: req.params.orderId
        },
        returning: true,
        plain: true
      }
    )
    // console.log('response from api route', updatedRow)
    res.json(updatedRow)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  // console.log(req.session.cart)
  // console.log('order id in get request', req.order.id)
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
    // console.log('cart from the api request', cartContents)
    res.json(cartContents)
  } catch (error) {
    next(error)
  }
})
