import React from 'react'
import {fetchOrders} from '../../store/orders'
import {connect} from 'react-redux'
import {Divider, Header} from 'semantic-ui-react'
import OrderHistorySingleOrderView from '../OrderHistorySingleOrderView'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchInitialOrders()
  }

  render() {
    const orderId = this.props.match.params.orderId
    const theOrder = this.props.orders.find(elem => String(elem.id) === orderId)
    if (theOrder === undefined) {
      return (
        <div>
          <br />
          <br />
          <center> The Robot does not exist</center>
        </div>
      )
    } else {
      return (
        <div>
          <Header as="h3" color="brown" className="centered">
            Order detail
          </Header>
          <Divider hidden />
          <OrderHistorySingleOrderView order={theOrder} key={theOrder.id} />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchInitialOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
