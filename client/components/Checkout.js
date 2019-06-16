import React, {Component} from 'react'
import CheckoutShipping from './Checkout-Shipping'

export class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutShipping parentProps={this.props} />
      </div>
    )
  }
}

export default Checkout
