import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Header,
  Grid,
  Image,
  Container,
  GridColumn,
  GridRow
} from 'semantic-ui-react'
import {getCartProducts} from '../store/cart'

export class Cart extends Component {
  componentDidMount() {
    console.log('comp mounting')
    this.props.getCartProducts()
    console.log(this.props)
  }
  render() {
    return (
      <div id="allProductsPage">
        <div id="header">
          <Header as="h1">Your Cart</Header>
        </div>
        <Container>
          {/* <Grid columns={3} divided>
            {this.props.cartContents.map(product => (
              <Grid.Column key={product.id}>
              <Image src={product.image} alt="image" bordered />
              <p>{product.description}</p>

              </Grid.Column>
            ))} */}
          {/* </Grid> */}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartContents: state.cartContents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: () => dispatch(getCartProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
