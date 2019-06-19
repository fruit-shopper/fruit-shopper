import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
const stripePublic = process.env.STRIPE_PUBLIC_KEY
import axios from 'axios'
import {toast} from 'react-toastify'
toast.configure()

const product = {
  id: 1,
  name: 'Green Banana',
  price: 17,
  quantity: 16795,
  description:
    'Green Banana,  Quae et velit et. Blanditiis autem non quam dolorum consequuntur dignissimos enim. Nisi enim voluptas molestiae qui explicabo perspiciatis.',
  image: '/placeholderFruit.jpg',
  available: true,
  createdAt: '2019-06-18T18:28:22.003Z',
  amount: 400
}
function notify_success() {
  toast('Payment Was Successful.', {
    autoClose: 2000
  })
}
async function handleToken(token, addresses) {
  console.log({token, addresses})
  const response = await axios.post('/api/payment', {token, product})
  const {status} = response.data
  console.log('Response:', response.data)
  if (status === 'success') {
    notify_success()
    //toast("Success! Check email for details", { type: "success" });
  } else {
    toast('Something went wrong', {type: 'error'})
  }
}
export class CheckoutPayment extends Component {
  constructor() {
    super()
  }
  render() {
    console.log('Props in payment', this.props)
    let paymentTotal = this.props

    return (
      <div>
        <StripeCheckout
          stripeKey="pk_test_nqfdZ4fzJB2aBjm2oLWR2z7L00wrgPLOx5"
          token={handleToken}
          billingAddress="2024 N Clifton Ave"
          shippingAddress="2024 N Clifton Ave"
          amount="400"
          name="apple"
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
