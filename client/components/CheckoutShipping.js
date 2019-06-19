/* eslint-disable complexity */
// Helper styles for demo
// import {MoreResources, DisplayFormikState} from './helper'
import {Divider, Form, Header} from 'semantic-ui-react'
import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
// import {connect} from 'react-redux'
const states = require('./us_states')
// import CheckoutPayment from './CheckoutPayment'

let proceedToPayment = false
const CheckoutShipping = parentProps => (
  <div className="shipping-adress-form">
    <Header as="h2" textAlign="center">
      Enter Shipping address
    </Header>

    <Formik
      initialValues={{
        fullname: '',
        email: '',
        address: '',
        state: '',
        city: '',
        zip: '',
        isBilling: false
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));

          setSubmitting(false)
        }, 500)
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Email is required'),
        fullname: Yup.string().required('Full name is required'),
        address: Yup.string().required('Street address is required'),
        city: Yup.string().required('State is required'),
        zip: Yup.number().required('Zip code has to be a number value'),
        state: Yup.string('Enter a valid state')
          .oneOf(states)
          .required('Valid state is required.')
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props
        const isEnabled =
          values.email &&
          values.fullname &&
          values.address &&
          values.state &&
          values.city &&
          values.zip
        if (proceedToPayment) {
          return <p>payment</p>
        }

        function handleSubmitShipping(parentProps, props) {
          let address =
            props.values.address +
            ',' +
            props.values.city +
            ',' +
            props.values.state +
            ' ' +
            props.values.zip
          // console.log(address)
          // console.log('>>>>>>>> ',  val)
          parentProps.updateStatus(parentProps.products.id, address)
        }

        // console.log('PROPS==> ', products)
        return (
          <Form
            onSubmit={async () => {
              handleSubmit()

              await handleSubmitShipping(products, props)
              // console.log('PRODUCTS: !!!!!!!',products)
              // handleSubmitShipping(products, props)
              handleReset()
              products.history.push('/payment')
            }}
          >
            <label htmlFor="fullname" style={{display: 'block'}}>
              Full name
            </label>

            <input
              id="fullname"
              placeholder="Enter your full name"
              type="text"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.fullname && touched.fullname
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.fullname &&
              touched.fullname && (
                <div className="input-feedback">{errors.fullname}</div>
              )}

            <Divider hidden />
            <label htmlFor="address" style={{display: 'block'}}>
              Street Address
            </label>
            <input
              id="address"
              placeholder="Enter your address"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.address && touched.address
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.address &&
              touched.address && (
                <div className="input-feedback">{errors.address}</div>
              )}

            <Divider hidden />

            <label htmlFor="city" style={{display: 'block'}}>
              City
            </label>
            <input
              id="city"
              placeholder="Enter city"
              type="text"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.city && touched.city ? 'text-input error' : 'text-input'
              }
            />
            {errors.city &&
              touched.city && (
                <div className="input-feedback">{errors.city}</div>
              )}

            <Divider hidden />

            <label htmlFor="city" style={{display: 'block'}}>
              State
            </label>

            <input
              id="state"
              placeholder="Enter state"
              type="text"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.state && touched.state
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.state &&
              touched.state && (
                <div className="input-feedback">{errors.state}</div>
              )}

            <Divider hidden />
            <label htmlFor="zip" style={{display: 'block'}}>
              Zip code
            </label>
            <input
              id="zip"
              placeholder="Enter your zip code"
              type="text"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.zip && touched.zip ? 'text-input error' : 'text-input'
              }
            />
            {errors.zip &&
              touched.zip && <div className="input-feedback">{errors.zip}</div>}

            <Divider hidden />

            <label htmlFor="email" style={{display: 'block'}}>
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? 'text-input error'
                  : 'text-input'
              }
            />
            {errors.email &&
              touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}

            {/* <Divider hidden /> */}
            {/* <Form.Group>
              <input
                id="isBilling"
                type="checkbox"
                checked={values.isBilling}
                onChange={handleChange}
              />
              <Divider hidden />

              <label htmlFor="isBilling">
                Check if the same as Billing Address
              </label>
            </Form.Group> */}
            <Divider hidden />
            <Form.Group>
              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting || !isEnabled}>
                Submit
              </button>

              {/* <DisplayFormikState {...props} /> */}
            </Form.Group>
          </Form>
        )
      }}
    </Formik>
  </div>
)

// const mapDispatchToProps = dispatch => {
//   return {
//     updateOrderToCreated: (orderId)=> dispatch(updateOrderToCreated(orderId)),
//   }
// }

export default CheckoutShipping
// export default connect(null, mapDispatchToProps)(CheckoutShipping)
