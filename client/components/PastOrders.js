import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPastOrdersUser} from '../store/past-orders-user'
import OrderHistorySingleOrderView from './OrderHistorySingleOrderView'
import {Divider, Header} from 'semantic-ui-react'

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

      return (
        <div>
          <Header as="h3" color="brown" className="centered">
            Past Orders
          </Header>
          <Divider hidden />
          {pastOrdersList.map(order => (
            <OrderHistorySingleOrderView order={order} key={order.id} />
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
