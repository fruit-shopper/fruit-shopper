import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Header,
  Grid,
  Image,
  Container,
  GridColumn,
  GridRow,
  List
} from 'semantic-ui-react'
import {getCartProducts, removeProductFromCart} from '../store/cart'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      productRemove: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    console.log('comp mounting')
    this.props.getCartProducts()
    console.log(this.props)
  }
  handleClick(event) {
    this.props.removeItem(event.target.value)
  }
  render() {
    if (!this.props.cartContents || this.props.cartContents.length === 0) {
      return <div>Your cart is empty! Time to shop!</div>
    }
    return (
      <div id="cartPage">
        <div id="header">
          <Header as="h1">Your Cart</Header>
        </div>
        <Container>
          <List divided relaxed="true">
            {this.props.cartContents[0].products.map(product => (
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
                    Price: ${product.price}.00
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <List.Content verticalalign="top">
                    Quantity: {product.Order_Product.quantity}
                  </List.Content>
                  {/* <List.Content verticalalign='top'>
                  Price: ${product.price}.00
                  </List.Content> */}
                  <List.Content verticalalign="bottom">
                    <Button
                      value={product.id}
                      name="productRemove"
                      onClick={this.handleClick}
                    >
                      Remove from Cart
                    </Button>
                  </List.Content>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Container>
        {/* this button is for testing */}
        <Button primary>
          <Link to="/checkout">Checkout</Link>
        </Button>
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
    getCartProducts: () => dispatch(getCartProducts()),
    removeItem: productRemove => dispatch(removeProductFromCart(productRemove))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
