import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import Products from './products'
import {
  createProOrderAssociation,
  reorderByDesPrice,
  reorderByIncPrice
} from '../store/products'
import {Button} from 'semantic-ui-react'

export const AllProducts = props => {
  const handleDesPriceReorder = function() {
    props.reorderByDesP()
  }

  const handleIncPriceReorder = function() {
    props.reorderByIncP()
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
      <Button onClick={handleDesPriceReorder}>Decending Price</Button>
      <Button onClick={handleIncPriceReorder}>Ascending Price</Button>
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
    reorderByDesP: () => dispatch(reorderByDesPrice()),
    reorderByIncP: () => dispatch(reorderByIncPrice()),
    assign: (productId, orderId) =>
      dispatch(createProOrderAssociation(productId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
