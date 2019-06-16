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
export {default as SingleOrderView} from './SingleOrderView'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as AdminProducts} from './admin/admin-products'
export {default as EditProduct} from './admin/edit-product'
export {default as NewProduct} from './admin/new-product'
export {default as AdminOrders} from './admin/admin-orders'
export {default as AdminUsers} from './admin/admin-users'
