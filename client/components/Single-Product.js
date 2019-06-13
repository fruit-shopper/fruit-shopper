import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Grid, Image} from 'semantic-ui-react'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }

  render() {
    console.log('this.props.image:', this.props.product)
    return (
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Image src={this.props.product.image} />
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <h4>{this.props.product.name}</h4>
          <p>Description: {this.props.product.description}</p>
          <p>Price: ${this.props.product.price}</p>
        </Grid.Column>
      </Grid>
    )
  }
}

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
