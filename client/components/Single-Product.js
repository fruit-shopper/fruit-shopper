import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  render() {
    console.log('---> ', this.props.product)
    return <div />
  }

  componentDidMount() {
    console.log('this.props', this.props)
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }
}

//doublecheck reducer names/structure
const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => {
  console.log('MapDispatch')
  return {
    loadProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
