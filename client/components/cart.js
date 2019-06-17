import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Header, Image, Container, List} from 'semantic-ui-react'
import {getCartProducts, removeProductFromCart} from '../store/cart'

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
      // productRemove: 0
    }
    this.handleClick = this.handleClick.bind(this)
    // this.calculateGrandTotal = this.calculateGrandTotal.bind(this)
  }
  componentDidMount() {
    // console.log('comp mounting')
    this.props.getCartProducts()
    console.log(this.props)
  }
  handleClick(event) {
    // console.log("remove button's product id", event.target.value)
    this.props.removeItem(event.target.value)
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

    return (
      <div id="cartPage">
        <div id="header">
          <Header as="h1">Your Cart</Header>
        </div>
        <Container>
          <List divided relaxed>
            {this.props.cartContents.products.map(product => (
              <List.Item key={product.id}>
                <Image
                  src={product.image}
                  size="tiny"
                  verticalalign="middle"
                  floated="left"
                  alt="image"
                />
                <List.Content>
                  <List.Header as="a">{product.name}</List.Header>
                  <List.Description floated="left">
                    {product.description}
                  </List.Description>
                  {/* <List.Description>Quantity: {product.Order_Product.quantity}</List.Description> */}
                  <List.Description>{product.description}</List.Description>
                  <List.Description verticalalign="bottom">
                    Price: ${product.Order_Product.price}.00
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <List.Content verticalalign="top">
                    Quantity: {product.Order_Product.quantity}
                  </List.Content>
                  {/* <List.Content verticalalign='top'>
                  Price: ${product.price}.00
                  </List.Content> */}
                  {/* Is this price pulled from correct place? Doublecheck with Team. */}
                  <List.Content aligned="left">
                    Subtotal: ${product.price * product.Order_Product.quantity}{' '}
                  </List.Content>
                  <List.Content verticalalign="bottom">
                    <Button
                      type="submit"
                      value={product.id}
                      // name="productRemove"
                      onClick={this.handleClick}
                    >
                      Remove from Cart
                    </Button>
                  </List.Content>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <h3>
            Your Cart Total: ${calculateGrandTotal(this.props.cartContents)}
          </h3>

          {/* this button is for testing */}
          <Link to="/checkout">
            <Button>Checkout</Button>
          </Link>
        </Container>
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

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    removeItem: productRemoveId =>
      dispatch(removeProductFromCart(productRemoveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
