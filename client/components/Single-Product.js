import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Grid, Image, Button, Input} from 'semantic-ui-react'
import Review from './Review'
import {setQuantityPrice} from '../store/cart '

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      price: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleClick() {
    event.preventDefault()
    this.props.setQuantityPrice(this.state)
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
            <Input
              placeholder="Quantity"
              value={this.state.quantity}
              name="quantity"
              onChange={this.handleChange}
            />
            <Button color="green" type="submit" onClick={this.handleClick}>
              Add To Cart
            </Button>
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
    loadProduct: productId => dispatch(fetchProduct(productId)),
    setQuantityPrice: quantityPrice => dispatch(setQuantityPrice(quantityPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
