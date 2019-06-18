const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
module.exports = router

// Get /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: {exclude: ['password', 'salt', 'googleId', 'name']},
      include: [Review, Order]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Get /api/users/userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      attributes: {exclude: ['password', 'salt', 'googleId', 'name']},
      include: [Review, Order]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// add user
router.post('/', async (req, res, next) => {
  try {
    let user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// update user
router.put('/:userId', async (req, res, next) => {
  try {
    let theUser = await User.findByPk(req.params.userId)
    let user = await theUser.update(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// delete user
router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route under /api/users not found!')
  err.status = 404
  next(err)
})

module.exports = router
