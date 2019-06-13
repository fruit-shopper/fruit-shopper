import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import Products from './products'
import {
  fetchProducts,
  reorderByDesPrice,
  reorderByIncPrice,
  filterByCategory
} from '../store/products'
import {Select, Button} from 'semantic-ui-react'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.catOptions = [
      'tropical',
      'US-grown',
      'organic',
      'gift',
      'top pick',
      'in season'
    ].map(cat => ({
      key: cat,
      text: cat,
      value: cat
    }))
    this.handleDesPriceReorder = this.handleDesPriceReorder.bind(this)
    this.handleIncPriceReorder = this.handleIncPriceReorder.bind(this)
    this.handleSelectByCat = this.handleSelectByCat.bind(this)
  }
  componentDidMount() {
    this.props.fetchInitialProducts()
  }

  handleDesPriceReorder() {
    this.props.reorderByDesP()
  }

  handleIncPriceReorder() {
    this.props.reorderByIncP()
  }

  handleSelectByCat(evt) {
    this.props.filterByCat(evt.target.textContent)
  }

  render() {
    return (
      <div id="allProductsPage">
        <div id="header">
          <h1>All Products</h1>
        </div>
        {/* <Navbar /> */}
        <hr />
        <Button onClick={this.handleDesPriceReorder}>Decending Price</Button>
        <Button onClick={this.handleIncPriceReorder}>Ascending Price</Button>
        <Select
          placeholder="Select by Category"
          options={this.catOptions}
          onChange={evt => this.handleSelectByCat(evt)}
        />
        <hr />
        {!this.props.products || this.props.products.length === 0 ? (
          <div>No Products!</div>
        ) : (
          <Products displayedProducts={this.props.products} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reorderByDesP: () => dispatch(reorderByDesPrice()),
    reorderByIncP: () => dispatch(reorderByIncPrice()),
    filterByCat: category => dispatch(filterByCategory(category)),
    fetchInitialProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
