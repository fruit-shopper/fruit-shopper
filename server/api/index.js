const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))
router.use('/past_orders_user', require('./past_orders_user'))
router.use('/current_orders_user', require('./current_orders_user'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
