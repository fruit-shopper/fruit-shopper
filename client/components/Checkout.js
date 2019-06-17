import React, {Component} from 'react'
// import CheckoutShipping from './CheckoutShipping'
import CartProductViewCheckout from './CartProductViewCheckout'

export class Checkout extends Component {
  render() {
    return (
      <div>
        <CartProductViewCheckout />
        {/* <CheckoutShipping /> */}
      </div>
    )
  }
}

export default Checkout
