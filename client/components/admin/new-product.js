import React from 'react'
import Navbar from '../navbar'
import {createProduct, fetchProducts} from '../../store/products'
import {connect} from 'react-redux'
import {
  Select,
  Button,
  Search,
  Image,
  Form,
  Input,
  Radio,
  TextArea
} from 'semantic-ui-react'

class NewProduct extends React.Component {
  constructor(props) {
    super(props)
    this.options = [
      {key: 'y', text: 'Yes', value: 'True'},
      {key: 'f', text: 'No', value: 'False'}
    ]
    this.productId = 0
    this.selectedCatId = 0
    this.state = {
      name: '',
      price: '',
      quantity: '',
      image: '',
      available: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = function(event, {name, value}) {
    this.setState({[name]: value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let objToReturn = Object.create(null)
    objToReturn.id = parseInt(this.productId, 10)
    objToReturn.name = this.state.name
    if (this.state.price !== '')
      objToReturn.price = parseFloat(this.state.price, 10)
    if (this.state.quantity !== '')
      objToReturn.quantity = parseInt(this.state.quantity, 10)
    if (this.state.image !== '') objToReturn.image = this.state.image
    if (this.state.available !== '') {
      if (this.state.available === 'True') objToReturn.available = true
      else objToReturn.available = false
    }
    if (this.state.description !== '')
      objToReturn.description = this.state.description
    // console.log('objToReturn: ', objToReturn)
    this.props.create(objToReturn)
    this.props.toAdminProductsPage('/manageProducts')
  }

  render() {
    let productId = this.props.match.params.productId
    this.productId = productId
    if (this.props.products.length === 0) {
      return (
        <div>
          <p>
            <h1>Loading...</h1>
          </p>
        </div>
      )
    } else {
      let {name, price, quantity, image, available, description} = this.state
      return (
        <div>
          <div>
            <h1>Create New Product</h1>
          </div>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                required
                // label="Fruit Name:"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Price (float number)"
                // label="Price:"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Quantity (integer)"
                // label="Quantity:"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.Input type="hidden" name="id" value={theProduct.id} onChange={this.handleChange} /> */}
              <Form.Input
                placeholder="Image Url"
                // label="Image Url:"
                name="image"
                value={image}
                onChange={this.handleChange}
              />
              <Select
                placeholder="Available"
                name="available"
                value={available}
                options={this.options}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field>
              <label>Description</label>
              <TextArea
                placeholder="Introduct the fruit ..."
                name="description"
                value={description}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" color="green">
              Create Product
            </Button>
          </Form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    create: product => dispatch(createProduct(product)),
    toAdminProductsPage: link => dispatch(() => ownProps.history.push(link))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)
