const router = require('express').Router()
const stripe = require('stripe')('sk_test_Ek8qADF4HzT74o89zyDK1crM00JlDcl2Ys')
const uuid = require('uuid/v4')
const {Order} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  let status = ''
  let error
  try {
    const {product, token, orderId} = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: product.amount,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )

    await Order.update(
      {
        status: 'created'
      },
      {
        where: {
          id: orderId
        },
        returning: true,
        plain: true
      }
    )
    console.log('Charge:', {charge})
    status = 'success'
  } catch (err) {
    status = 'failure'
    next(err)
  }
  res.json({error, status})
})
