import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Header,
  Image,
  Container,
  List,
  Dropdown
} from 'semantic-ui-react'
import {getCartProducts, removeProductFromCart} from '../store/cart'

const options = [
  {text: '1', value: 1},
  {text: '2', value: 2},
  {text: '3', value: 3},
  {text: '4', value: 4},
  {text: '5', value: 5},
  {text: '6', value: 6}
]
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
    console.log(this.state.currentQuantity)
    console.log('event', event)
    console.log('state', this.state)
    console.log('props', this.props)
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
                  <List.Content verticalalign="top">Quantity:</List.Content>
                  <List.Content>
                    {/* <Button
                      onClick={this.handleClickIncrement}
                      value={product.id}
                    >
                      -
                    </Button>
                    <Button>+</Button> */}

                    <Dropdown
                      onChange={this.handleChange}
                      options={options}
                      defaultValue={product.Order_Product.quantity}
                      selection
                      //need to grab the value clicked and the associated product.id
                      //value={product.Order_Product.quantity}
                      //seletedId={product.id}
                    />
                  </List.Content>
                  {/* <List.Content verticalalign='top'>
                  Price: ${product.price}.00
                  </List.Content> */}
                  {/* Is this price pulled from correct place? Doublecheck with Team. */}
                  <List.Content aligned="left">
                    Subtotal: ${product.price * product.Order_Product.quantity}{' '}
                    .00
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
            Your Cart Total: ${this.calculateGrandTotal(
              this.props.cartContents
            )}.00
          </h3>

          {/* this button is for testing */}
          <Button>
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Button>
            <Link to="/products">Keep Shopping</Link>
          </Button>
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
