import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class AccountManagementUser extends Component {
  render() {
    console.log(this.props)
    return (
      <Dropdown text="Manage my account" align="right">
        <Dropdown.Menu>
          <Dropdown.Item>
            {' '}
            <Link to="/open_orders">Open Orders</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/past_orders">Past Orders</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AccountManagementUser
