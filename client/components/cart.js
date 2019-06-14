import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Header,
  Grid,
  Image,
  Container,
  GridColumn,
  GridRow
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
          <Grid columns={3} divided>
            {this.props.cartContents[0].products.map(product => (
              <Grid.Column key={product.id}>
                <Image src={product.image} alt="image" bordered />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.Order_Product.quantity}</p>
              </Grid.Column>
            ))}
          </Grid>
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
