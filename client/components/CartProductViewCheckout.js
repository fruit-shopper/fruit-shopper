import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartProducts} from '../store/cart'
// import {recordShippingAddress} from '../store/user'
import {Divider, Header, Image, Item, Button, Icon} from 'semantic-ui-react'
import CheckoutShipping from './CheckoutShipping'
import {calculateGrandTotal} from './cart'
import {updateOrderToCreated} from '../store/orders'
// import {updateOrderStatus} from './current-orders-user.js'
import {Link, withRouter} from 'react-router-dom'

class CartProductViewCheckout extends Component {
  componentDidMount() {
    this.props.getCartProducts()
  }
  //create a function to pass down to component
  //it needs to dispatch an action to:
  // write customer shipping/billing address to database
  // change order status to processing

  render() {
    console.log('Where is history ', this.props)
    if (
      !this.props.cartContents ||
      this.props.cartContents.length === 0 ||
      !this.props.cartContents.products ||
      this.props.cartContents.products.length === 0
    ) {
      return <div>There are no products in cart</div>
    }

    return (
      <div className="justify-text">
        <Link to="/products">
          <Button animated color="blue">
            <Button.Content visible>Continue Shopping</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Link>
        <Header as="h2" textAlign="center">
          Your Order.
        </Header>
        {this.props.cartContents.products.map(product => (
          <Item key={product.id}>
            <Image src={product.image} alt="image" avatar />
            <Item.Content>
              <Item.Header>{product.name}</Item.Header>
              <Item.Description className="float-right">
                Price:{' '}
                <span className="item-price-checkout">
                  ${product.Order_Product.price}.00
                </span>
                {'   '}
                Quantity:
                {product.Order_Product.quantity}
              </Item.Description>
            </Item.Content>
            <Divider hidden />
            <Divider />
          </Item>
        ))}
        <h4>
          Your Cart Total: ${calculateGrandTotal(this.props.cartContents)}
        </h4>
        <Divider hidden />
        <CheckoutShipping
          products={this.props.cartContents}
          updateStatus={this.props.updateOrderToCreated}
          history={this.props.history}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartContents: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    updateOrderToCreated: (orderId, address) =>
      dispatch(updateOrderToCreated(orderId, address))
    // updateCustomerShippingInfo: (customerId) => dipatch(updateCustomerShippingInfo)
    // updateOrderStatus: (orderId) => dispatch(updateOrderStatus)
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartProductViewCheckout)
)
