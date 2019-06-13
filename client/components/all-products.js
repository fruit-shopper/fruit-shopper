import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import Products from './products'
import {createProOrderAssociation, reorderByPrice} from '../store/products'

export const AllProducts = props => {
  const handlePriceReorder = function() {
    props.reorderByP()
  }

  // if this is the first assign, create an order as well as an orderId, storing in the session as an part of cart
  const handleAssign = function(productId) {
    // first, get the orderId
    // props.assign(productId, orderId)
  }

  return (
    <div id="allProductsPage">
      <div id="header">
        <h1>All Products</h1>
      </div>
      {/* <Navbar /> */}
      <hr />
      <button
        type="button"
        className="reorderButton"
        onClick={handlePriceReorder}
      >
        Order by Price
      </button>
      <hr />
      {!props.products || props.products.length === 0 ? (
        <div>No Products!</div>
      ) : (
        <Products
          displayedProducts={props.products}
          handleAssign={handleAssign}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    state: state,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reorderByP: () => dispatch(reorderByPrice()),
    assign: (productId, orderId) =>
      dispatch(createProOrderAssociation(productId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
