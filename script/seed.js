'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Review} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Category} = require('../server/db/models')
const {OrderProduct} = require('../server/db/models')
const {CategoryProduct} = require('../server/db/models')
const faker = require('faker')

//if you add any fruits to the following array, need to increment the Product.create math.random function

const fruitTypes = [
  'Açaí',
  'Apple',
  'Akee',
  'Apricot',
  'Avocado',
  'Banana',
  'Bilberry',
  'Blackberry',
  'Blackcurrant',
  'Black sapote',
  'Blueberry',
  'Boysenberry',
  'Buddhas hand (fingered citron)',
  'Crab apples',
  'Currant',
  'Cherry',
  'Cherimoya (Custard Apple)',
  'Chico fruit',
  'Cloudberry',
  'Coconut',
  'Cranberry',
  'Cucumber',
  'Damson',
  'Date',
  'Dragonfruit (or Pitaya)',
  'Durian',
  'Elderberry',
  'Feijoa',
  'Fig',
  'Goji berry',
  'Gooseberry',
  'Grape',
  'Raisin',
  'Grapefruit',
  'Guava',
  'Honeyberry',
  'Huckleberry',
  'Jabuticaba',
  'Jackfruit',
  'Jambul',
  'Japanese plum',
  'Jostaberry',
  'Jujube',
  'Juniper berry',
  'Kiwano (horned melon)',
  'Kiwifruit',
  'Kumquat',
  'Lemon',
  'Lime',
  'Loquat',
  'Longan',
  'Lychee',
  'Mango',
  'Mangosteen',
  'Marionberry',
  'Melon',
  'Cantaloupe',
  'Honeydew',
  'Watermelon',
  'Miracle fruit',
  'Mulberry","Nectarine',
  'Nance',
  'Orange',
  'Blood orange',
  'Clementine',
  'Mandarine',
  'Tangerine',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Plantain',
  'Plum',
  'Prune (dried plum)',
  'Pineapple',
  'Pineberry',
  'Plumcot (or Pluot)',
  'Pomegranate',
  'Pomelo',
  'Purple mangosteen',
  'Quince',
  'Raspberry',
  'Salmonberry',
  'Rambutan (or Mamin Chino)',
  'Redcurrant',
  'Salal berry',
  'Salak',
  'Satsuma',
  'Soursop',
  'Star apple',
  'Star fruit',
  'Strawberry',
  'Surinam cherry',
  'Tamarillo',
  'Tamarind',
  'Ugli fruit',
  'White currant',
  'White sapote',
  'Yuzu'
]

const fruitInfo = [
  {
    name: 'Apple',
    description:
      'Apples are a relatively high-carbohydrate fruit and their   most significant nutrient is vitamin C.',
    image: '/img/apple.png'
  },
  {
    name: 'Avocado',
    description:
      'Avocados are extremely nutrient-dense, and they are rich in fiber, protein, vitamins, and minerals.',
    image: '/img/avocado.png'
  },
  {
    name: 'Banana',
    description:
      'Bananas are one of the most popular types of fruit in the world, and they have a very sweet taste.',
    image: '/img/banana.png'
  },
  {
    name: 'Blackberries',
    description:
      'The fruit has a sweet and succulent taste despite being relatively low in fructose compared to most types of fruit.',
    image: '/img/blackberries.png'
  },
  {
    name: 'Blueberries',
    description:
      'They are certainly rich in health-protective polyphenols, and they offer a decent selection of vitamins and minerals too.',
    image: '/img/bluberries.png'
  },
  {
    name: 'Cherry',
    description: 'The cherry is a small fruit with a sweet and juicy taste.',
    image: '/img/cherry.png'
  },
  {
    name: 'Cranberry',
    description:
      'Cranberries are a small edible berry with a bright red color. Due to their sour nature, they are usually available in their dried form and contain added sugar.',
    image: '/img/cranberries.png'
  },
  {
    name: 'Durian',
    description:
      'Known for its peculiar scent, the durian is a giant-sized tropical fruit that’s native to South-East Asia. They are one of the only fruits to contain a decent amount of carbohydrate and fat.',
    image: '/img/durian.png'
  },
  {
    name: 'Grape',
    description:
      'Grapes are one of the most prevalent types of fruit and one of the highest-sugar fruits.',
    image: '/img/grape.png'
  },
  {
    name: 'Grapefruit',
    description:
      'Grapefruit is a large citrus fruit, and it has bitter, sour, but a little bit sweet taste.',
    image: '/img/grapefruit.png'
  },
  {
    name: 'Guava',
    description:
      'guavas are an exceptional provider of vitamin C – just one small fruit supplies 209% of the RDA.',
    image: '/img/guava.png'
  },
  {
    name: 'Jackfruit',
    description: 'Jackfruit is the largest tree fruit in the world.',
    image: '/img/jackfruit.png'
  },
  {
    name: 'Kiwi',
    description:
      'Kiwifruit is a soft, green and juicy edible fruit, and it has the alternate name of ‘Chinese gooseberry’.',
    image: '/img/kiwi.png'
  },
  {
    name: 'Lemon',
    description:
      'Lemons are a famous culinary fruit and hold value for cleaning uses.',
    image: '/img/lemon.png'
  },
  {
    name: 'Lime',
    description:
      'Very close in nature to lemons, the lime is another sour citrus fruit. They both have a slight difference in flavor – lemons are slightly more tart, while limes are bitter.',
    image: '/img/lime.png'
  },
  {
    name: 'Longan',
    description:
      'Longan fruits have a soft and smooth texture inside their skin, and they are extremely juicy. The taste is very sweet.',
    image: '/img/longan.png'
  },
  {
    name: 'Lychee',
    description:
      'The lychee is a tropical fruit almost identical in nature to rambutan and longan fruit.',
    image: '/img/lychee.png'
  },
  {
    name: 'Mango',
    description:
      'Mangoes contain a stone (making them a drupe) surrounded by sweet yellow flesh; this taste is slightly sweet, soft, and tangy.',
    image: '/img/mango.png'
  },
  {
    name: 'Melon',
    description:
      'Sticking with the higher sugar fruits, melon is another sweet-tasting fleshy fruit.',
    image: '/img/melon.png'
  },
  {
    name: 'Mulberry',
    description:
      'There are many different kinds of mulberry, but there are three main varieties; black, red, and white.',
    image: '/img/mulberry.png'
  },
  {
    name: 'Orange',
    description:
      'The orange is a citrus fruit and, and has a tough outer peel that encases the soft, juicy center.',
    image: '/img/orange.png'
  },
  {
    name: 'Papaya',
    description:
      'Papayas have a striking appearance, and look like a cross between a giant pear and butternut squash. In terms of flavor, they are not dissimilar to mangoes but they are less sweet in nature. ',
    image: '/img/papaya.png'
  },
  {
    name: 'Passion Fruit',
    description:
      'Passion fruit is one of the more unique fruits, and it is about the size of a golf ball. A hard, brown outer shell surrounds a yellow, gelatinous sticky, and sweet flesh.',
    image: '/img/passionfruit.png'
  },
  {
    name: 'Pear',
    description:
      'Pears have the sweetness of an apple mixed with a kind of mild, citrus-like flavor and smell. The flesh is crunchy as you bite into it, with a large amount of water locked inside.',
    image: '/img/pear.png'
  },
  {
    name: 'Persimmon',
    description:
      'Persimmons are a commonly available fruit and the typical cultivars are native to East Asia; particularly China, Japan, and Korea.',
    image: '/img/persimmon.png'
  },
  {
    name: 'Pineapple',
    description:
      'Pineapples are a sweet and slightly sour tropical fruit originating from South America. Pineapples have a firm yellow flesh that supplies a juicy, sweet taste.',
    image: '/img/pineapple.png'
  },
  {
    name: 'Plum',
    description:
      'Plums are a small and round purple fruit that have origins in China.',
    image: '/img/plum.png'
  },
  {
    name: 'Pomegranate',
    description:
      'Pomegranates are unique in appearance and taste. Inside the pomegranate, we can find hundreds of red edible seeds (known as arils) separated into different chambers by a white stringy material called albedo.',
    image: '/img/pomegranate.png'
  },
  {
    name: 'Rambutan',
    description:
      'This fruit has a bright red outer skin that is covered in red and green spiky hairs.While the skin feels dry and leathery, the flesh inside is soft, white and round, and contains a large seed in the middle.',
    image: '/img/rambutan.png'
  },
  {
    name: 'Raspberry',
    description:
      'The raspberry has a soft flesh with a slightly sweet and juicy taste.',
    image: '/img/raspberry.png'
  },
  {
    name: 'Starfruit',
    description:
      'It is a tropical fruit that is native to South and South-East Asia, and it has a sweet and tart taste.',
    image: '/img/starfruit.png'
  },
  {
    name: 'Strawberry',
    description:
      'Strawberries are a soft and sweet-tasting fruit. In addition to their taste, strawberries actually smell sweet too',
    image: '/img/strawberry.png'
  },
  {
    name: 'Tomato',
    description:
      'Tomatoes have a thin red skin and their flesh is acidic, slightly sweet, and juicy; in fact, tomatoes have a water content of 94.5%.',
    image: '/img/tomato.png'
  },
  {
    name: 'Watermelon',
    description:
      'The origin of watermelons is Southern Africa, and it tastes sweet and juicy.',
    image: '/img/watermelon.png'
  }
]

let createArr = []
let pastOrders = []
let orderHistory = []
let categoryTypes = []
let pastReviews = []
let categoryProduct = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const codyAndMurphy = await Promise.all([
    User.create({email: 'cody@email.com', name: 'Cody', password: '123'}),
    User.create({
      email: 'murphy@email.com',
      name: 'Murphy',
      password: '123',
      admin: true
    }),
    User.create({
      email: 'tom@email.com',
      name: 'Tom',
      password: '123',
      reset: true
    })
  ])

  //seeds users and products
  for (let i = 0; i < fruitInfo.length; i++) {
    createArr.push(
      User.create({
        email: faker.internet.email(),
        name: faker.name.findName(),
        admin: faker.random.boolean(),
        password: faker.internet.password()
      })
    )
    let newName = fruitInfo[i].name
    createArr.push(
      Product.create({
        name: newName,
        price: Math.floor(Math.random() * 20),
        quantity: faker.random.number(),
        description: fruitInfo[i].description,
        image: fruitInfo[i].image
      })
    )
  }

  const usersAndProducts = await Promise.all(createArr)

  //seeds past orders
  for (let i = 0; i < 5; i++) {
    pastOrders.push(
      Order.create({
        status: 'completed',
        userId: Math.floor(Math.random() * fruitInfo.length) + 1
      })
    )
  }
  const historicOrders = await Promise.all(pastOrders)

  //seeds order-product relation
  for (let i = 1; i < 5; i++) {
    orderHistory.push(
      OrderProduct.create({
        quantity: Math.floor(Math.random() * 10),
        price: Math.floor(Math.random() * 20) + 1,
        orderId: Math.floor(Math.random() * 3) + 1,
        productId: Math.floor(Math.random() * fruitInfo.length) + 1
      })
    )
  }
  const orders = await Promise.all(orderHistory)

  //seeds reviews
  for (let i = 0; i < 100; i++) {
    pastReviews.push(
      Review.create({
        text: faker.lorem.paragraph(),
        userId: Math.floor(Math.random() * fruitInfo.length) + 1,
        productId: Math.floor(Math.random() * fruitInfo.length) + 1,
        rating: Math.floor(Math.random() * 5) + 1
      })
    )
  }
  const reviews = await Promise.all(pastReviews)

  //seeds category types - these are not random
  categoryTypes.push(
    Category.create({name: 'gift'}),
    Category.create({name: 'top pick'}),
    Category.create({name: 'in season'}),
    Category.create({name: 'tropical'}),
    Category.create({name: 'US-grown'}),
    Category.create({name: 'organic'})
  )

  const categories = await Promise.all(categoryTypes)

  for (let i = 1; i < fruitInfo.length; i++) {
    categoryProduct.push(
      CategoryProduct.create({
        productId: `${i}`,
        categoryId: Math.floor(Math.random() * 6) + 1
      })
    )
  }

  const categoryToProducts = await Promise.all(categoryProduct)

  console.log(
    `seeded ${usersAndProducts.length} users`,
    `seeded ${categories.length} categories`,
    `seeded ${orders.length} orders`,
    `seeded ${reviews.length} reviews`,
    `seeded ${categoryToProducts.length} category to product association`
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
