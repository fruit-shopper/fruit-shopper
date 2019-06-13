const router = require('express').Router()
const {Order} = require('../db/models')

module.exports = router

//routes
//pull order by userID, where order status is cart

router.get('/', async (req, res, next) => {
  try {
    console.log(req.session)
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
