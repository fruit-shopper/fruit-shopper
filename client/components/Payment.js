import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
const stripePublic = process.env.STRIPE_PUBLIC_KEY
import axios from 'axios'

import {toast} from 'react-toastify'
toast.configure()

function calculateGrandTotal(cart) {
  let grandTotal = 0
  cart.cartContents.products.map(product => {
    grandTotal += product.Order_Product.price * product.Order_Product.quantity
  })
  return grandTotal
}
let product

function notifySuccess() {
  // toast('Payment Was Successful.', {
  //   autoClose: 2000
  // })

  toast('🦄 Payment Was Successful!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  })
}

export class CheckoutPayment extends Component {
  constructor() {
    super()
  }
  render() {
    let paymentTotal = calculateGrandTotal(this.props)
    product = {
      id: 1,
      name: 'Green Banana',
      price: 17,
      quantity: 16795,
      description:
        'Green Banana,  Quae et velit et. Blanditiis autem non quam dolorum consequuntur dignissimos enim. Nisi enim voluptas molestiae qui explicabo perspiciatis.',
      image: '/placeholderFruit.jpg',
      available: true,
      createdAt: '2019-06-18T18:28:22.003Z',
      amount: paymentTotal * 100
    }

    let orderId = this.props.cartContents.id
    async function handleToken(token, addresses) {
      console.log({token, addresses})
      const response = await axios.post('/api/payment', {
        token,
        product,
        orderId
      })
      const {status} = response.data
      console.log('Response:', response.data)
      if (status === 'success') {
        notifySuccess()
      } else {
        toast('Something went wrong', {type: 'error'})
      }
    }

    console.log('Props in payment', this.props)
    return (
      <div className="payment-page-box">
        <div className="payment-inner-box">
          <span className="total-payment-button">
            <p>Your total is: $ {paymentTotal}.00</p>
          </span>
          <StripeCheckout
            stripeKey="pk_test_nqfdZ4fzJB2aBjm2oLWR2z7L00wrgPLOx5"
            token={handleToken}
            billingAddress="2024 N Clifton Ave"
            shippingAddress="2024 N Clifton Ave"
            amount={product.amount}
            name="fruits"
          />
        </div>
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
