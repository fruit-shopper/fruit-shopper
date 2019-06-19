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
  Input
} from 'semantic-ui-react'
import {updateCartItem} from '../store/cart'

const options = [
  {text: '1', value: 1},
  {text: '2', value: 2},
  {text: '3', value: 3},
  {text: '4', value: 4},
  {text: '5', value: 5},
  {text: '6', value: 6}
]

export class SingleCartItem extends Component {
  constructor() {
    super()
    this.state = {
      selectedQuantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const product = this.props.product
    this.setState({
      selectedQuantity: this.props.product.Order_Product.quantity
    })
  }
  handleChange(event) {
    console.log('event target', event.target)
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(event) {
    event.preventDefault()
    this.props.updateCartItem(
      this.props.cartId,
      this.props.product.id,
      this.state.selectedQuantity
    )
  }
  render() {
    //console.log("props in the individual product", this.props)
    const product = this.props.product
    // console.log(this.props.product)
    // if(this.props.product === undefined){
    //   return (
    //     <div>Loading</div>
    //   )
    // }
    return (
      <div>
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
            <List.Description>
              Quantity: {product.Order_Product.quantity}
            </List.Description>
            <List.Description>{product.description}</List.Description>
            {/* <List.Description verticalalign="bottom">
              Price: ${product.Order_Product.price}.00
            </List.Description> */}
          </List.Content>
          <List.Content floated="right">
            <List.Content verticalalign="top">Quantity:</List.Content>
            <List.Content>
              <Input
                placeholder={product.Order_Product.quantity}
                name="selectedQuantity"
                value={this.state.selectedQuantity}
                onChange={this.handleChange}
              />
              <Button onClick={this.handleClick}>Update</Button>
            </List.Content>
            <List.Content verticalalign="top">
              Price: ${product.price}.00
            </List.Content>
            {/* Is this price pulled from correct place? Doublecheck with Team. */}
            <List.Content aligned="left">
              Subtotal: ${product.price * product.Order_Product.quantity} .00
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCartItem: (orderId, productId, quantity) =>
      dispatch(updateCartItem(orderId, productId, quantity))
  }
}

export default connect(null, mapDispatchToProps)(SingleCartItem)
