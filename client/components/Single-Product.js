import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Grid, Image, Button, Input, Divider} from 'semantic-ui-react'
import Review from './Review'
import {setQuantityPrice} from '../store/cart'
import {Link} from 'react-router-dom'

const displayStatus = status => {
  return status ? '' : 'Currently not available'
}

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
    this.setState({
      price: this.props.product.price
    })
  }
  handleClick() {
    event.preventDefault()
    const productId = this.props.match.params.productId
    this.props.setQuantityPrice(productId, this.state)
  }

  render() {
    let status = displayStatus(this.props.product.available)
    const reviews = this.props.product.reviews
    if (reviews === undefined) {
      return <p>This product has no reviews</p>
    } else if (reviews.length === 0) {
      return <p>This product has no reviws.</p>
    } else {
      return (
        <Grid>
          <Grid.Column width={5} />
          <Grid.Column className="ui centered row" width={3}>
            <Image src={this.props.product.image} />
          </Grid.Column>
          <Grid.Column width={3}>
            <h4 className="justify-text">{this.props.product.name}</h4>

            <Divider hidden />
            <p className="justify-text">
              Description: {this.props.product.description}
            </p>
            <Divider hidden />
            <p>
              Price: $<span className="item-price">
                {this.props.product.price}.00
              </span>
            </p>
            <p>{status}</p>
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
    setQuantityPrice: (productId, quantityPrice) =>
      dispatch(setQuantityPrice(productId, quantityPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
