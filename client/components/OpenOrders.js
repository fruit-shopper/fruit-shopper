import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentOrdersUser} from '../store/current-orders-user'
import OrderHistorySingleOrderView from './OrderHistorySingleOrderView'
import {Divider, Header} from 'semantic-ui-react'

// display any past orders that user has
class CurrentOrders extends Component {
  componentDidMount() {
    this.props.getCurrentOrdersUser()
  }
  render() {
    if (!this.props.currentOrders || this.props.currentOrders.length === 0) {
      return <div>The are no past orders in your order history.</div>
    } else {
      let currentOrdersList = this.props.currentOrders

      console.log(this.props)
      return (
        <div>
          <Header as="h3" color="brown" className="centered">
            Current Orders
          </Header>
          <Divider hidden />
          {currentOrdersList.map(order => (
            <OrderHistorySingleOrderView order={order} key={order.id} />
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  currentOrders: state.currentOrdersUser
})

const mapDispatchToProps = dispatch => {
  return {
    getCurrentOrdersUser: () => dispatch(getCurrentOrdersUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrders)
