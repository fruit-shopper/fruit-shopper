/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './Single-Product'
export {default as OpenOrders} from './OpenOrders'
export {default as PastOrders} from './PastOrders'
export {
  default as OrderHistorySingleOrderView
} from './OrderHistorySingleOrderView'
export {default as OrderHistoryProduct} from './OrderHistorySingleProduct'
export {default as Checkout} from './Checkout'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
