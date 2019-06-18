import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct, createReview} from '../store/product'
import {Grid, Image, Button, Input, Form, TextArea} from 'semantic-ui-react'
import Review from './Review'
import {setQuantityPrice} from '../store/cart'
import {Link} from 'react-router-dom'
import {getPastOrdersUser} from '../store/past-orders-user'

const displayStatus = status => {
  return status ? '' : 'Currently not available'
}
let madePurchase = false

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      price: 0,
      reviewText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
    this.props.getPastOrdersUser()
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

  handleReviewSubmit() {
    const productId = this.props.match.params.productId
    event.preventDefault()
    this.props.createReview(this.state.reviewText, productId)
    this.setState({
      reviewText: ''
    })
  }
  handleClick() {
    const productId = this.props.match.params.productId
    event.preventDefault()
    this.props.setQuantityPrice(productId, this.state)
  }

  render() {
    // console.log('props in single product ', this.props)
    const {isLoggedIn} = this.props
    // console.log('Single-Product', this.props)
    let status = displayStatus(this.props.product.available)
    const reviews = this.props.product.reviews
    // console.log('Props in single component ', this.props)
    if (reviews === undefined) {
      return <p>This product has no reviews!!!!!!!</p>
    } else if (reviews.length === 0) {
      return <p>This product has no reviws.</p>
    } else {
      if (isLoggedIn) {
        this.props.pastOrders.map(order => {
          order.products.map(product => {
            if (product.id === this.props.product.id) {
              madePurchase = true
            }
          })
          console.log(madePurchase)
        })
      }
      return (
        <Grid>
          <Grid.Column width={5} />
          <Grid.Column className="ui centered row" width={3}>
            <Image src={this.props.product.image} />
          </Grid.Column>
          <Grid.Column width={3}>
            <h4 className="justify-text">{this.props.product.name}</h4>

            <p className="justify-text">
              Description: {this.props.product.description}
            </p>

            <p>Price: ${this.props.product.price}</p>
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
            {madePurchase ? (
              <div className="single-product-review">
                <Form>
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Review"
                    placeholder="Your product review..."
                    value={this.state.reviewText}
                    name="reviewText"
                    onChange={this.handleChange}
                  />
                  <Button
                    className="review-button"
                    onClick={this.handleReviewSubmit}
                  >
                    Submit Review
                  </Button>
                </Form>
              </div>
            ) : null}

            <h3>Product Reviews: </h3>

            {reviews.map(review => <Review review={review} key={review.id} />)}
          </Grid.Row>
        </Grid>
      )
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  pastOrders: state.pastOrdersUser,
  product: state.product
})

const mapDispatchToProps = dispatch => {
  return {
    loadProduct: productId => dispatch(fetchProduct(productId)),
    getPastOrdersUser: () => dispatch(getPastOrdersUser()),
    createReview: (productId, reviewText) =>
      dispatch(createReview(productId, reviewText)),
    setQuantityPrice: (productId, quantityPrice) =>
      dispatch(setQuantityPrice(productId, quantityPrice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
