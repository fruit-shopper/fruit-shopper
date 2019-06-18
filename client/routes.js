import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  OpenOrders,
  PastOrders,
  SingleProduct,
  Cart,
  AdminProducts,
  EditProduct,
  NewProduct,
  AdminOrders,
  AdminUsers,
  // AdminHome,
  Checkout,
  ResetPasswordFrom,
  Payment
} from './components'
import {me, fetchProducts, fetchCategories, fetchOrders} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // console.log('props in routes', this.props)
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {!isLoggedIn &&
          !isAdmin && (
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/products/:productId" component={SingleProduct} />
              <Route path="/products" component={AllProducts} />
              <Route path="/cart" component={Cart} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
            </Switch>
          )}
        {isLoggedIn &&
          !isAdmin && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/products/:productId" component={SingleProduct} />
              <Route path="/products" component={AllProducts} />
              <Route path="/home" component={UserHome} />
              <Route path="/open_orders_user" component={OpenOrders} />
              <Route path="/past_orders_user" component={PastOrders} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
              <Route path="/reset_password" component={ResetPasswordFrom} />
            </Switch>
          )}
        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available for admin */}
            <Route path="/products/new" component={NewProduct} />
            <Route path="/products/edit/:productId" component={EditProduct} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route path="/home" component={UserHome} />
            <Route path="/reset_password" component={ResetPasswordFrom} />
            <Route path="/open_orders_user" component={OpenOrders} />
            <Route path="/past_orders_user" component={PastOrders} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/payment" component={Payment} />
            <Route path="/manageProducts" component={AdminProducts} />
            <Route path="/manageOrders" component={AdminOrders} />
            <Route path="/manageUsers" component={AdminUsers} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // add "isAdmin" for admin
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.id && state.user.admin === true
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
      dispatch(fetchOrders())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
