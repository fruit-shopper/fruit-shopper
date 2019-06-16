import React, {Component} from 'react'
import CheckoutShipping from './Checkout-Shipping'
import CartProductViewCheckout from './CartProductViewCheckout'

export class Checkout extends Component {
  render() {
    return (
      <div>
        <CartProductViewCheckout />
        <CheckoutShipping parentProps={this.props} />
      </div>
    )
  }
}

export default Checkout
