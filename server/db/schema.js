const {resolver} = require('graphql-sequelize')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean
} = require('graphql')
const {Product, Category} = require('./models')

// define Product type
const productType = new GraphQLObjectType({
  name: 'Product',
  description: 'A Product',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the product.'
    },
    name: {
      type: GraphQLString
    },
    price: {
      type: GraphQLFloat
    },
    quantity: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    },
    available: {
      type: GraphQLBoolean
    },
    categories: {
      type: new GraphQLList(categoryType),
      resolve: resolver(Category)
    }
  }
})

const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the category.'
    },
    name: {
      type: GraphQLEnumType
    },
    products: {
      type: new GraphQLList(productType),
      resolve: resolver(Product)
    }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      products: {
        type: new GraphQLList(productType),
        resolve: resolver(Product)
      },
      categories: {
        type: new GraphQLList(categoryType),
        resolve: resolver(Category)
      }
    }
  })
})

module.exports = schema
