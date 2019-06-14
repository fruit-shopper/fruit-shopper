const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.user)
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})
