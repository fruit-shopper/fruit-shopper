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

const options = [
  {text: '1', value: 1},
  {text: '2', value: 2},
  {text: '3', value: 3},
  {text: '4', value: 4},
  {text: '5', value: 5},
  {text: '6', value: 6}
]
const product = this.props

export class SingleCartItem extends Component {
  constructor() {
    super()
    this.state = {
      selectedQuantity: product.Order_Product.quantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log('event target', event.target)
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
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
                name="selectedQuantity"
                options={options}
                //defaultValue={product.Order_Product.quantity}
                selection
                //need to grab the value clicked and the associated product.id
                value={this.state.selectedQuantity}
                //seletedId={product.id}
              />
            </List.Content>
            {/* <List.Content verticalalign='top'>
                  Price: ${product.price}.00
                  </List.Content> */}
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

export default SingleCartItem
