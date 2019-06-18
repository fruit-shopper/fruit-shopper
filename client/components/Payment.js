import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'

function handleToken(token, addresses) {
  console.log({token, addresses})
}
export class CheckoutPayment extends Component {
  render() {
    console.log('Props in payment', this.props)
    let paymentTotal = this.props

    return (
      <div>
        <StripeCheckout
          stripeKey="pk_test_nqfdZ4fzJB2aBjm2oLWR2z7L00wrgPLOx5"
          token={handleToken}
          billingAddress=""
          shippingAddress=""
          amount=""
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
    getCartProducts: () => dispatch(getCartProducts())
  }
}

export default connect(mapStateToProps)(CheckoutPayment)
// export default CheckoutPayment
