import React from 'react'
import Navbar from '../navbar'
import {
  putProduct,
  fetchProducts,
  createProCatAssociation,
  removeProCatAssociation
} from '../../store/products'
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

class EditProduct extends React.Component {
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
    this.handleAssign = this.handleAssign.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUnassign = this.handleUnassign.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchInitialProducts()
  // }

  handleChange = function(event, {name, value}) {
    // this.props.updateName(event.target.value);
    // console.log('evt.target.name: ', name) will not show any info
    // this.setState({
    //   [event.target.name]: event.target.value,
    // }); will not work
    this.setState({[name]: value})
  }

  handleSelect = function(evt) {
    const selectedCats = this.props.categories.filter(
      elem => elem.name === evt.target.textContent
    )
    this.selectedCatId = selectedCats[0].id
  }

  handleAssign = function(productId, categoryId) {
    // console.log('productId: ', productId)
    // console.log('categoryId: ', categoryId)
    this.props.assign(productId, categoryId)
  }

  handleUnassign = function(productId, categoryId) {
    this.props.unassign(productId, categoryId)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    console.log('this.state: ', this.state)
    // const productName = evt.target.productName.value
    // const description = evt.target.description.value
    // const productId = evt.target.productId.value
    // this.props.put({id: productId, name: productName, description: description})
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
    await this.props.put(objToReturn)
    this.props.toAdminProductsPage('/manageProducts')
  }

  render() {
    // If refresh page instead of click link into the page, robots will be empty, should I fetch robts in componentDidMount()? No, should I fetch robots before mount?
    // console.log('this.props: ', this.props)
    let productId = this.props.match.params.productId
    this.productId = productId
    if (
      this.props.products.length === 0 ||
      this.props.categories.length === 0
    ) {
      // sometime there would be a second render after didMount, this branch will ensure that the second render taking over the screen
      return (
        <div>
          <p>
            <h1>Loading...</h1>
          </p>
        </div>
      )
    } else {
      let {name, price, quantity, image, available, description} = this.state
      const products = this.props.products
      const theProduct = products.find(elem => String(elem.id) === productId)
      return (
        <div>
          <div>
            <h1>Edit Product</h1>
          </div>
          <hr />
          <Image src={theProduct.image} size="small" alt="image" />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                required
                label="Fruit Name:"
                placeholder={theProduct.name}
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder={theProduct.price}
                label="Price:"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder={theProduct.quantity}
                label="Quantity:"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.Input type="hidden" name="id" value={theProduct.id} onChange={this.handleChange} /> */}
              <Form.Input
                placeholder={theProduct.image}
                label="Image Url:"
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
                placeholder={theProduct.description}
                name="description"
                value={description}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" color="green">
              Save Changes
            </Button>
          </Form>
          <hr />
          <div>This product belongs to Category:</div>
          <div>
            {theProduct.categories &&
              theProduct.categories.map(cat => (
                <span key={cat.id} className="inline-seperate">
                  {cat.name}
                  <Button
                    color="red"
                    size="tiny"
                    onClick={evt => this.handleUnassign(theProduct.id, cat.id)}
                  >
                    unassign
                  </Button>
                </span>
              ))}
          </div>
          <br />
          <hr />
          <div>Assign Categories for this products:</div>
          <Select
            placeholder="Select a Category to assign"
            options={this.props.categories.map(cat => ({
              key: cat.id,
              text: cat.name,
              value: cat.name
            }))}
            onChange={evt => this.handleSelect(evt)}
          />
          <Button
            color="green"
            size="tiny"
            onClick={evt =>
              this.handleAssign(theProduct.id, this.selectedCatId)
            }
          >
            Assign
          </Button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    categories: state.categories
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    put: product => dispatch(putProduct(product)),
    unassign: (productId, categoryId) =>
      dispatch(removeProCatAssociation(productId, categoryId)),
    assign: (productId, categoryId) =>
      dispatch(createProCatAssociation(productId, categoryId)),
    toAdminProductsPage: link => dispatch(() => ownProps.history.push(link))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
