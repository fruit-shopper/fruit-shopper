const router = require('express').Router()

const adminsOnly = (req, res, next) => {
  console.log('req.user in middleware', req.user.dataValues.admin)
  if (req.user.dataValues.admin) {
    next()
  } else {
    res.status(401).send('Hmmm...looks like this page is not available.')
    const err = new Error('Hmmm...looks like this page is not available.')
    err.status = 401
    return next(err)
  }
}
module.exports = adminsOnly
