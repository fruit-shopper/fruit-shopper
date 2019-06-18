import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import {
  fetchOrders,
  reorderByDesTime,
  reorderByIncTime,
  filterByStatus,
  removeOrder,
  putOrder
} from '../../store/orders'
import {Select, Button, Search} from 'semantic-ui-react'

class AdminOrders extends React.Component {
  constructor(props) {
    super(props)
    this.statusOptions = [
      'created',
      'processing',
      'cancelled',
      'completed'
    ].map(status => ({
      key: status,
      text: status,
      value: status
    }))

    this.handleDesTimeReorder = this.handleDesTimeReorder.bind(this)
    this.handleIncTimeReorder = this.handleIncTimeReorder.bind(this)
    this.handleSelectByStatus = this.handleSelectByStatus.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleStatusSelect = this.handleStatusSelect.bind(this)
    this.handleView = this.handleView.bind(this)
  }

  handleDesTimeReorder() {
    this.props.reorderByDesT()
  }

  handleIncTimeReorder() {
    this.props.reorderByIncT()
  }

  handleSelectByStatus(evt) {
    this.props.filterBySt(evt.target.textContent)
  }

  handleRemove(id) {
    // NOT real remove from DB, ONLY UPDATE "available" to false
    this.props.remove(id)
  }

  handleStatusSelect(evt, orderId) {
    this.props.put({id: orderId, status: evt.target.textContent})
  }

  handleView(order) {}

  render() {
    return (
      <div id="adminOrdersPage">
        <div id="header">
          <h1>Manage Orders</h1>
        </div>
        <hr />
        <Button onClick={this.handleDesTimeReorder}>Decending Time</Button>
        <Button onClick={this.handleIncTimeReorder}>Ascending Time</Button>
        <Select
          placeholder="Select by Status"
          options={this.statusOptions}
          onChange={evt => this.handleSelectByStatus(evt)}
        />
        <hr />
        {!this.props.orders || this.props.orders.length === 0 ? (
          <div>No Orders!</div>
        ) : (
          <ul>
            {this.props.orders.map(order => (
              <li key={order.id}>
                <span className="inline-seperate">Order ID: {order.id}</span>
                <span className="inline-seperate">User ID: {order.userId}</span>
                <span className="inline-seperate">
                  Created: {order.createdAt.substring(0, 10)}
                </span>
                <span className="inline-seperate">
                  Updated: {order.updatedAt.substring(0, 10)}
                </span>
                <span> Change Status: </span>
                <Select
                  placeholder={order.status}
                  name="status"
                  options={this.statusOptions}
                  onChange={evt => this.handleStatusSelect(evt, order.id)}
                />
                <span className="inline-seperate">Delete order:</span>
                <Button
                  className="inline-seperate"
                  size="mini"
                  color="red"
                  onClick={event => this.handleRemove(order.id)}
                >
                  Remove
                </Button>
                <span className="inline-seperate">View details:</span>
                <Button
                  className="inline-seperate"
                  size="mini"
                  color="green"
                  onClick={event => this.handleView(order)}
                >
                  View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reorderByDesT: () => dispatch(reorderByDesTime()),
    reorderByIncT: () => dispatch(reorderByIncTime()),
    filterBySt: status => dispatch(filterByStatus(status)),
    remove: id => dispatch(removeOrder(id)),
    fetchInitialOrders: () => dispatch(fetchOrders()),
    put: order => dispatch(putOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
