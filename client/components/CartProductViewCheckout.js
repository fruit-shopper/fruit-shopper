import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartProducts} from '../store/cart'
import {Divider, Header, Image, Item, List} from 'semantic-ui-react'
import {calculateGrandTotal} from './cart'

class CartProductViewCheckout extends Component {
  componentDidMount() {
    this.props.getCartProducts()
  }

  render() {
    if (
      !this.props.cartContents ||
      this.props.cartContents.length === 0 ||
      !this.props.cartContents.products ||
      this.props.cartContents.products.length === 0
    ) {
      return <div>Cart is loading...</div>
    }

    return (
      <div className="justify-text">
        <Header as="h2" textAlign="center">
          Your Order.
        </Header>
        {this.props.cartContents.products.map(product => (
          <Item key={product.id}>
            <Image src={product.image} alt="image" avatar />
            <Item.Content>
              <Item.Header>{product.name}</Item.Header>
              <Item.Description className="float-right">
                Price:{' '}
                <span className="item-price-checkout">
                  ${product.Order_Product.price}.00
                </span>
                {'   '}
                Quantity:
                {product.Order_Product.quantity}
              </Item.Description>
            </Item.Content>
            <Divider hidden />
            <Divider />
          </Item>
        ))}
        <h4>
          Your Cart Total: ${calculateGrandTotal(this.props.cartContents)}
        </h4>
        <Divider hidden />
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

export default connect(mapStateToProps, mapDispatchToProps)(
  CartProductViewCheckout
)
