import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Grid, Image, Button} from 'semantic-ui-react'
import Review from './Review'

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
    // console.log(productId)
  }

  render() {
    const reviews = this.props.product.reviews
    if (reviews === undefined) {
      return <p>This product has no reviews</p>
    } else {
      // if (reviews.length === 0) {
      //   return <p>This product has no reviws.</p>;
      // } else {
      return (
        <Grid>
          <Grid.Column width={5} />
          <Grid.Column className="ui centered row" width={3}>
            <Image src={this.props.product.image} />
          </Grid.Column>
          <Grid.Column className="ui centered row" width={3}>
            <h4>{this.props.product.name}</h4>
            <p>Description: {this.props.product.description}</p>
            <p>Price: ${this.props.product.price}</p>
            <Button color="green">Add To Cart</Button>
          </Grid.Column>
          <Grid.Column width={5} />
          <Grid.Row className="ui centered column" width={10}>
            <h3>Product Reviews: </h3>

            {reviews.map(review => <Review review={review} key={review.id} />)}
          </Grid.Row>
        </Grid>
      )
    }
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
