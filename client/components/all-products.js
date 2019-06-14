import _ from 'loadsh'
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
import {Select, Button, Search} from 'semantic-ui-react'

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
    this.initialState = {isLoading: false, results: [], value: ''}

    this.state = this.initialState
    this.handleDesPriceReorder = this.handleDesPriceReorder.bind(this)
    this.handleIncPriceReorder = this.handleIncPriceReorder.bind(this)
    this.handleSelectByCat = this.handleSelectByCat.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
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

  handleResultSelect(evt, {result}) {
    // this.setState({value: result.name})
    console.log('Select result: ', result)
    let link = `/products/${result.id}`
    this.props.toSingleProductPage(link)
  }

  handleSearchChange = (evt, {value}) => {
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch)
      })
    }, 300)
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
        <Search
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={this.state.results}
          value={this.state.value}
          {...this.props.products}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reorderByDesP: () => dispatch(reorderByDesPrice()),
    reorderByIncP: () => dispatch(reorderByIncPrice()),
    filterByCat: category => dispatch(filterByCategory(category)),
    fetchInitialProducts: () => dispatch(fetchProducts()),
    toSingleProductPage: link => dispatch(() => ownProps.history.push(link))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
