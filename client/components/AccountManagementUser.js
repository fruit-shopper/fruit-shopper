import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class AccountManagementUser extends Component {
  render() {
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
