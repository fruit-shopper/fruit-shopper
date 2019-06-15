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
  billingAdressCheckbox = () => {
    if (!sameAsBilling) {
      sameAsBilling = true
    } else {
      sameAsBilling = false
    }
  }

  render() {
    return (
      <div className="checkout-form">
        <Header textAlign="center">Enter shipping address</Header>
        <Form>
          <Form.Group>
            <Form.Input label="First Name" placeholder="First Name" width={6} />
            <Form.Input label="Last Name" placeholder="Last Name" width={10} />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Address line 1"
              placeholder="Street address, P.O. box, company name, c/o"
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Address line 2"
              placeholder="Apartment, suite, unit, building, floor, etc."
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="City"
              placeholer="City"
              width={5}
              className="margin-right"
            />

            <label>
              <b>State</b>
            </label>
            <Dropdown
              search
              selection
              options={stateOptions}
              className="dropdown"
            />
            <Form.Input label="ZIP" placeholer="ZIP" width={4} />
          </Form.Group>
          {/* <Form.Group> */}
          {/* </Form.Group> */}
          {/* <Form.Group> */}
          {/* </Form.Group> */}

          <Form.Group>
            <Form.Input
              label="Phone number"
              placeholder="Phone number"
              width={6}
            />
          </Form.Group>
        </Form>
        <Checkbox
          label="Shipping address the same as billing"
          onClick={this.billingAdressCheckbox}
        />
      </div>
    )
  }
}

export default Checkout
