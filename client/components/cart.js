import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Header} from 'semantic-ui-react'

export class Cart extends Component {
  render() {
    return (
      <div id="allProductsPage">
        <div id="header">
          <Header as="h1">Your Cart</Header>
        </div>
      </div>
    )
  }
}

export default Cart
//connect(mapStateToProps, mapDispatchToProps)(Cart)
