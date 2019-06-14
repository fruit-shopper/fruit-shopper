import React, {Component} from 'react'
import {connect} from 'react-redux'

class PastOrders extends Component {
  render() {
    console.log('props in past orders ', this.props)

    return <p>past orders</p>
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PastOrders)
