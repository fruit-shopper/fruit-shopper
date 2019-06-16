import React, {Component} from 'react'
import {Form, Dropdown, Header, Checkbox} from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'

const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index]
}))

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

const validateForm = errors => {
  let valid = true
  Object.values(errors).forEach(val => val.length > 0 && (valid = false))
  return valid
}

let sameAsBilling = false

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phonenumber: '',
      email: '',
      isBilling: true,
      errors: {
        firstname: '',
        email: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.firstname);
  //   event.preventDefault();
  // }

  // billingAdressCheckbox = () => {
  //   if (!sameAsBilling) {
  //     sameAsBilling = true
  //   } else {
  //     sameAsBilling = false
  //   }
  // }

  handleInputChange(event) {
    event.preventDefault()
    // console.log(event.target)
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    let errors = this.state.errors

    switch (name) {
      case 'firstname':
        errors.fullname = value.length < 1 ? 'First name cannot be empty' : ''
        break
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!'
        break
      default:
        break
    }

    this.setState({
      errors,
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form')
    }
  }

  render() {
    return (
      <div className="checkout-form">
        <Header textAlign="center">Enter shipping address</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="First Name"
              placeholder="First Name"
              width={6}
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              // onSubmit={this.handleSubmit}
            />
            <Form.Input
              label="Last Name"
              placeholder="Last Name"
              width={10}
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Address line 1"
              placeholder="Street address, P.O. box, company name, c/o"
              width={16}
              name="address1"
              value={this.state.address1}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Address line 2"
              placeholder="Apartment, suite, unit, building, floor, etc."
              width={16}
              name="address2"
              value={this.state.address2}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="City"
              placeholder="City"
              width={5}
              name="city"
              value={this.state.city}
              onChange={this.handleInputChange}
            />

            <label>
              <b>State</b>
            </label>
            <Dropdown
              search
              selection
              options={stateOptions}
              className="dropdown"
              name="state"
              value={this.state.state}
              placeholder="State"
              onChange={this.handleInputChange}
            />

            <Form.Input
              label="ZIP"
              placeholder="ZIP"
              width={4}
              name="zip"
              value={this.state.zip}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              label="Phone number"
              placeholder="Phone number"
              width={6}
              name="phonenumber"
              value={this.state.phonenumber}
              onChange={this.handleInputChange}
            />
            <Form.Input
              label="Email"
              placeholder="email@email.com"
              width={6}
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Checkbox
            label="Make my profile visible"
            name="isBilling"
            type="checkbox"
            checked={this.state.isBilling}
            onChange={this.handleInputChange}
          />

          <br />
          <br />
          <Form.Button primary content="Submit" />
        </Form>
      </div>
    )
  }
}

export default Checkout
