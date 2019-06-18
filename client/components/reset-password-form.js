import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Button, Input} from 'semantic-ui-react'
import {withRouter} from 'react-router'

/**
 * COMPONENT
 */
class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.conflict = false
    this.initialState = {
      email: '',
      password1: '',
      password2: ''
    }
    this.state = this.initialState
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const email = evt.target.email.value
    const password1 = evt.target.password1.value
    const password2 = evt.target.password2.value
    if (password1 !== password2) {
      this.conflict = true
      this.setState(this.initialState)
    }
  }

  render() {
    return (
      <div align="center">
        <form onSubmit={this.handleSubmit} name="reset-password">
          <div>
            {/* <label focus htmlFor="email"> */}
            {/* <small>Email</small> */}
            {/* </label> */}
            <Input name="email" type="text" placeholder="email" />
          </div>
          <div>
            {/* <label htmlFor="password"> */}
            {/* <small>Password</small> */}
            {/* </label> */}
            <Input
              focus
              name="password1"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            {/* <label htmlFor="password"> */}
            {/* <small>Password</small> */}
            {/* </label> */}
            <Input
              focus
              name="password2"
              type="password"
              placeholder="Retype the password"
            />
          </div>
          <div>
            <Button type="submit" color="blue" size="large">
              Reset
            </Button>
          </div>
        </form>
        <Button color="blue" size="large">
          Next time
        </Button>
        {this.conflict ? (
          <div> </div>
        ) : (
          <div>
            <Button color="blue" size="large">
              Password mismatch !
            </Button>
          </div>
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

const mapDispatch = (dispatch, ownProps) => {}

export default withRouter(connect(mapState, mapDispatch)(ResetPasswordForm))
