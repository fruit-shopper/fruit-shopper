import React, {Component} from 'react'
import {connect} from 'react-redux'
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
import {getCartProducts} from '../store/cart'

export class Cart extends Component {
  componentDidMount() {
    console.log('comp mounting')
    this.props.getCartProducts()
    console.log(this.props)
  }
  render() {
    if (!this.props.cartContents || this.props.cartContents.length === 0) {
      return <div>Your cart is empty! Time to shop!</div>
    }
    return (
      <div id="allProductsPage">
        <div id="header">
          <Header as="h1">Your Cart</Header>
        </div>
        <Container>
          <List divided relaxed>
            {this.props.cartContents[0].products.map(product => (
              <List.Item key={product.id}>
                <Image
                  src={product.image}
                  size="tiny"
                  verticalAlign="middle"
                  floated="left"
                  alt="image"
                  bordered
                />
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.Order_Product.quantity}</p>
              </List.Item>
            ))}
          </List>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
