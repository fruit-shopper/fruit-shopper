import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Header,
  Image,
  Container,
  List,
  Dropdown,
  Divider,
  Icon
} from 'semantic-ui-react'
import {getCartProducts, removeProductFromCart} from '../store/cart'
import SingleCartItem from './SingleCartItem'

export const calculateGrandTotal = cart => {
  let grandTotal = 0
  cart.products.map(product => {
    grandTotal += product.Order_Product.price * product.Order_Product.quantity
  })
  return grandTotal
}

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      currentQuantity: 0,
      productId: '',
      cartId: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)

    // this.calculateGrandTotal = this.calculateGrandTotal.bind(this)
  }
  async componentDidMount() {
    // console.log('comp mounting')
    await this.props.getCartProducts()
    this.setState({
      cartId: this.props.cartId
    })
  }
  handleClick(event) {
    event.preventDefault()
    // console.log("remove button's product id", event.target.value)
    this.props.removeItem(event.target.value)
  }

  handleChange(event) {
    event.preventDefault()
    // console.log(this.state.currentQuantity)
    // console.log('event', event)
    // console.log('state', this.state)
    // console.log('props', this.props)
  }
  handleClickIncrement(event) {
    event.preventDefault()
    //call the thunk here
  }
  calculateGrandTotal(cart) {
    let grandTotal = 0
    cart.products.map(product => {
      grandTotal += product.price * product.Order_Product.quantity
    })
    return grandTotal
  }
  render() {
    if (
      !this.props.cartContents ||
      this.props.cartContents.length === 0 ||
      !this.props.cartContents.products ||
      this.props.cartContents.products.length === 0
    ) {
      return <div>Your cart is empty! Time to shop!</div>
    }

    const currentCartId = this.props.cartId
    return (
      <div id="cartPage">
        <Container>
          <div className="cart-header">
            <Header as="h1">Your Cart</Header>
          </div>
          <List divided relaxed>
            {this.props.cartContents.products.map(product => (
              <SingleCartItem
                key={product.id}
                product={product}
                cartId={currentCartId}
              />
            ))}
          </List>
          <h3>
            Total: ${this.calculateGrandTotal(this.props.cartContents)}.00
          </h3>

          <div className="card-checkout-continue-shopping-buttons">
            <Link to="/products">
              <Button animated color="blue">
                <Button.Content visible>Continue Shopping</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </Link>
            <Link style={{color: 'white'}} to="/checkout">
              <Button size="massive" width={6} color="green">
                Checkout{' '}
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('in state ', state)
  return {
    cartContents: state.cart,
    cartId: state.cart.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    removeItem: productRemoveId =>
      dispatch(removeProductFromCart(productRemoveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
