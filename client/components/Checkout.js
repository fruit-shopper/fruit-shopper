import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckoutShipping from './Checkout-Shipping'
import OrderHistorySingleOrderView from './OrderHistorySingleOrderView'

export class Checkout extends Component {
  render() {
    console.log('++++++++', this.props.cartContents)
    return (
      <div>
        <CheckoutShipping parentProps={this.props} />
        <OrderHistorySingleOrderView props={this.props.cartContents} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('in state ', state)
  return {
    cartContents: state.cart
  }
}

export default connect(mapStateToProps)(Checkout)
