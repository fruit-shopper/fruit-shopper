import React, {Component} from 'react'
import {connect} from 'react-redux'

class OpenOrders extends Component {
  render() {
    console.log('props in open orders ', this.props)

    return <p>Open Orders</p>
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(OpenOrders)
