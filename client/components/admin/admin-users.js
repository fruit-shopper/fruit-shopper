import React from 'react'
// import {Navbar} from '../components'
import {connect} from 'react-redux'
import {fetchUsers, filterByType, removeUser, putUser} from '../../store/users'
import {Select, Button, Search, Grid} from 'semantic-ui-react'

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
          <Grid columns={7} divided>
            {this.props.users.map(elem => (
              <Grid.Row key={elem.id}>
                <Grid.Column>User ID: {elem.id}</Grid.Column>
                <Grid.Column>Email: {elem.email}</Grid.Column>
                <Grid.Column>
                  Created: {elem.createdAt.substring(0, 10)}
                </Grid.Column>
                <Grid.Column>
                  Updated: {elem.updatedAt.substring(0, 10)}
                </Grid.Column>
                <Grid.Column>
                  {elem.admin ? (
                    <Button size="mini">Admin User</Button>
                  ) : (
                    <Button
                      size="mini"
                      color="green"
                      onClick={() => this.handlePromote(elem.id)}
                    >
                      Promote to Admin
                    </Button>
                  )}
                </Grid.Column>
                <Grid.Column>
                  {elem.reset ? (
                    <Button size="mini" color="orange">
                      Password Reseting needed
                    </Button>
                  ) : (
                    <Button
                      size="mini"
                      onClick={event => this.handleReset(elem.id)}
                    >
                      Mark as to be reset
                    </Button>
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Button
                    size="mini"
                    color="red"
                    onClick={event => this.handleRemove(elem.id)}
                  >
                    Remove
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
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
