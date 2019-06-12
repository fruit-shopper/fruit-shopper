'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Review} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Category} = require('../server/db/models')
const {OrderProduct} = require('../server/db/models')
const faker = require('faker')

const fruitTypes = [
  'orange',
  'banana',
  'strawberry',
  'watermelon',
  'pineapple',
  'mango'
]
let createArr = []
let pastOrders = []
let orderHistory = []
let categoryTypes = []
const pastReviews = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //if you add any fruits to the following array, need to increment the Product.create math.random function

  //seeds users and products
  for (let i = 1; i < 50; i++) {
    createArr.push(
      User.create({
        email: faker.internet.email(),
        name: faker.name.findName(),
        admin: faker.random.boolean(),
        password: faker.internet.password()
      })
    )

    createArr.push(
      Product.create({
        name: `${fruitTypes[Math.floor(Math.random() * 6)]}${i}`,
        price: faker.commerce.price(),
        quantity: faker.random.number(),
        description: faker.lorem.sentence()
      })
    )
  }

  const users = await Promise.all(createArr)

  //seeds past orders
  for (let i = 0; i < 5; i++) {
    pastOrders.push(
      Order.create({
        status: 'completed',
        userId: Math.floor(Math.random() * 50) + 1
      })
    )
  }
  const historicOrders = await Promise.all(pastOrders)

  //seeds order-product relation
  for (let i = 1; i < 5; i++) {
    orderHistory.push(
      OrderProduct.create({
        quantity: Math.floor(Math.random() * 10),
        price: Math.floor(Math.random() * 20),
        orderId: Math.floor(Math.random() * 3) + 1,
        productId: Math.floor(Math.random() * 50) + 1
      })
    )
  }
  const orders = await Promise.all(orderHistory)

  //seeds reviews
  for (let i = 0; i < 20; i++) {
    pastReviews.push(
      Review.create({
        text: faker.lorem.words(),
        userId: Math.floor(Math.random() * 50) + 1,
        productId: Math.floor(Math.random() * 50) + 1
      })
    )
  }
  const reviews = await Promise.all(pastReviews)

  //seeds category types - these are not random
  // categoryTypes.push(Category.create({name: 'citrus'}))
  // categoryTypes.push(Category.create({name: 'berries'}))
  // categoryTypes.push(Category.create({name: 'melons'}))
  // categoryTypes.push(Category.create({name: 'tropical'}))
  // categoryTypes.push(Category.create({name: 'US-grown'}))
  // categoryTypes.push(Category.create({name: 'organic'}))

  categoryTypes.push(
    Category.create({name: 'citrus'}),
    Category.create({name: 'berries'}),
    Category.create({name: 'melons'}),
    Category.create({name: 'tropical'}),
    Category.create({name: 'US-grown'}),
    Category.create({name: 'organic'})
  )

  const categories = await Promise.all(categoryTypes)

  console.log(
    `seeded ${users.length} users`,
    `seeded ${categories.length} users`,
    `seeded ${orders.length} users`,
    `seeded ${reviews.length} users`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
