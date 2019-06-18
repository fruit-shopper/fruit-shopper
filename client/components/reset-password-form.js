import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Button, Input} from 'semantic-ui-react'
import {withRouter} from 'react-router'
import {putUser} from '../store/users'

/**
 * COMPONENT
 */
class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conflict: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // const email = evt.target.email.value
    const password1 = evt.target.password1.value
    const password2 = evt.target.password2.value
    if (password1 !== password2) {
      this.setState({conflict: true})
    } else {
      this.props.updateUser({
        id: this.props.user.id,
        password: password1
      })
      this.props.toPage('/home')
    }
  }

  handleContinue(evt) {
    this.props.toPage('/home')
  }

  render() {
    return (
      <div align="center">
        <form onSubmit={this.handleSubmit} name="reset-password">
          <div>{this.props.user.email + ', '}Please reset your password:</div>
          <div>
            {/* <label htmlFor="password"> */}
            {/* <small>Password</small> */}
            {/* </label> */}
            <Input
              name="password1"
              type="password"
              placeholder="New password"
            />
          </div>
          <div>
            {/* <label htmlFor="password"> */}
            {/* <small>Password</small> */}
            {/* </label> */}
            <Input
              name="password2"
              type="password"
              placeholder="Retype the new password"
            />
          </div>
          <div>
            <Button type="submit" color="blue" size="large">
              Reset
            </Button>
          </div>
        </form>
        <Button color="blue" size="large" onClick={this.handleContinue}>
          Continue without updating password
        </Button>
        {this.state.conflict ? (
          <div>
            <h2>Password mismatch !</h2>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateUser: user => dispatch(putUser(user)),
    toPage: link => dispatch(() => ownProps.history.push(link))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ResetPasswordForm))
