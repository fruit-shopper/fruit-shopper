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
      isBilling: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(event.target)
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="checkout-form">
        <Header textAlign="center">Enter shipping address</Header>
        <Form>
          <Form.Group>
            <Form.Input
              label="First Name"
              placeholder="First Name"
              width={6}
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              onSubmit={this.handleSubmit}
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
            <Form.Input label="ZIP" placeholder="ZIP" width={4} />
          </Form.Group>

          <Form.Group>
            <Form.Input
              label="Phone number"
              placeholder="Phone number"
              width={6}
              name="phonenumber"
              checked={this.state.phonenumber}
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
            label="Shipping address the same as billing"
            name="isBilling"
            // onClick={this.billingAdressCheckbox}
            value={this.state.isBilling}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <Form.Group>
            <Form.Button
              primary
              content="Submit"
              onSubmit={this.handleSubmit}
            />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Checkout
