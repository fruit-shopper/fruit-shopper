import React from 'react'
import Navbar from '../navbar'
import {
  putProduct,
  fetchProducts,
  createProCatAssociation,
  removeProCatAssociation
} from '../../store/products'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: 0,
      categories: [
        'tropical',
        'US-grown',
        'organic',
        'gift',
        'top pick',
        'in season'
      ]
    }
    this.handleAssign = this.handleAssign.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUnassign = this.handleUnassign.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchInitialProducts()
  // }

  handleSelect = function(evt) {
    this.setState({
      selectedCategoryId: evt.target.value
    })
  }

  handleAssign = function(productId, categoryId) {
    this.props.assign(productId, categoryId)
  }

  handleUnassign = function(productId, categoryId) {
    this.props.unassign(productId, categoryId)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const productName = evt.target.productName.value
    const description = evt.target.description.value
    const productId = evt.target.productId.value
    this.props.put({id: productId, name: productName, description: description})
  }

  render() {
    // If refresh page instead of click link into the page, robots will be empty, should I fetch robts in componentDidMount()? No, should I fetch robots before mount?
    console.log('this.props: ', this.props)
    let productId = this.props.match.params.productId
    if (this.props.products.length === 0) {
      // sometime there would be a second render after didMount, this branch will ensure that the second render taking over the screen
      return (
        <div>
          <p>
            <h1>Loading...</h1>
          </p>
        </div>
      )
    } else {
      const products = this.props.products
      const theProduct = products.find(elem => String(elem.id) === productId)
      return (
        <div id="editProductPage">
          <div id="header">
            <h1>Edit Product</h1>
          </div>
          <Navbar />
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="robotId" value={theProduct.id} />
            <label htmlFor="productName">Product Name:</label>
            <input type="text" name="productName" />
            <label htmlFor="description">Description:</label>
            <input type="number" name="description" />
            <button type="submit" className="submitButton">
              Save Changes
            </button>
          </form>
          <hr />
          <div> Categories assigned to {theProduct.name}: </div>
          <br />
          <select onChange={this.handleSelect}>
            <option value="" disabled selected>
              Select your category
            </option>
            {this.state.categories.map(cat => (
              <option className="option" key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="submitButton"
            onClick={event =>
              this.handleAssign(robotId, this.state.selectedProjectId)
            }
          >
            Assign
          </button>
          <hr />
          <Projects
            displayedProjects={theRobot.projects}
            robotId={robotId}
            handleUnassign={this.handleUnassign}
          />
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
const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    put: product => dispatch(putProduct(product)),
    unassign: (productId, categoryId) =>
      dispatch(removeProCatAssociation(productId, categoryId)),
    assign: (productId, categoryId) =>
      dispatch(createProCatAssociation(productId, categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
