import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import {fetchUsers, filterByType, removeUser, putUser} from '../../store/users'
import {Select, Button, Search} from 'semantic-ui-react'

class AdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePromote = this.handlePromote.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleRemove(id) {
    this.props.remove(id)
  }

  async handlePromote(userId) {
    await this.props.put({id: userId, admin: true})
    await this.props.fetchInitialUsers()
  }

  async handleReset(userId) {
    await this.props.put({id: userId, reset: true})
    await this.props.fetchInitialUsers()
  }

  render() {
    return (
      <div id="adminUsersPage">
        <div id="header">
          <h1>Manage Users</h1>
        </div>
        <hr />

        {!this.props.users || this.props.users.length === 0 ? (
          <div>No Users!</div>
        ) : (
          <ul>
            {this.props.users.map(elem => (
              <li key={elem.id}>
                <span className="inline-seperate">User ID: {elem.id}</span>
                <span className="inline-seperate">Email: {elem.email}</span>
                <span className="inline-seperate">
                  Created: {elem.createdAt.substring(0, 10)}
                </span>
                <span className="inline-seperate">
                  Updated: {elem.updatedAt.substring(0, 10)}
                </span>
                <span className="inline-seperate">Delete user:</span>
                <Button
                  className="inline-seperate"
                  size="mini"
                  color="red"
                  onClick={event => this.handleRemove(elem.id)}
                >
                  Remove
                </Button>
                {elem.admin && (
                  <Button className="inline-seperate" size="mini">
                    Admin User
                  </Button>
                )}
                {!elem.admin && (
                  <Button
                    className="inline-seperate"
                    size="mini"
                    color="green"
                    onClick={() => this.handlePromote(elem.id)}
                  >
                    Promote to Admin
                  </Button>
                )}
                {elem.reset && (
                  <Button className="inline-seperate" size="mini">
                    Password need Reset
                  </Button>
                )}
                {!elem.reset && (
                  <Button
                    className="inline-seperate"
                    size="mini"
                    onClick={event => this.handleReset(elem.id)}
                  >
                    Mark to Reset
                  </Button>
                )}
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
    users: state.users
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterByTy: user => dispatch(filterByType(user)),
    remove: id => dispatch(removeUser(id)),
    fetchInitialUsers: () => dispatch(fetchUsers()),
    put: elem => dispatch(putUser(elem)),
    toPage: link => dispatch(ownProps.history.push(link))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
