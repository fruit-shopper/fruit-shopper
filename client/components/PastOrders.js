import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPastOrdersUser} from '../store/past-orders-user'
import SingleOrderView from './SingleOrderView'

// display any past orders that user has
class PastOrders extends Component {
  componentDidMount() {
    this.props.getPastOrdersUser()
  }
  render() {
    if (!this.props.pastOrders || this.props.pastOrders.length === 0) {
      return <div>The are no past orders in your order history.</div>
    } else {
      let pastOrdersList = this.props.pastOrders
      console.log('props in past orders ', pastOrdersList)
      return (
        <div>
          <h2 className="justify-text"> Your past orders. </h2>
          {pastOrdersList.map(order => (
            <SingleOrderView order={order} key={order.id} />
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  pastOrders: state.pastOrdersUser
})

const mapDispatchToProps = dispatch => {
  return {
    getPastOrdersUser: () => dispatch(getPastOrdersUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders)
