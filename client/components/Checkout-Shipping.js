/* eslint-disable complexity */
// Helper styles for demo
import {MoreResources, DisplayFormikState} from './helper'

import React from 'react'
// import { render } from 'react-dom';
import {Formik} from 'formik'
import * as Yup from 'yup'

const CheckoutShipping = () => (
  <div className="app">
    <h1>Enter Shipping address</h1>

    <Formik
      initialValues={{
        fullname: '',
        email: '',
        address: '',
        state: '',
        city: '',
        zip: ''
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
          .required('Email is Required'),
        fullname: Yup.string().required('Full name is Required'),
        address: Yup.string().required('Shipping Adress is required'),
        city: Yup.string().required('State is required'),
        zip: Yup.number('Zip code has to be a number value').required(),
        state: Yup.string('Enter a valid state')
          .oneOf([
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado ',
            'Connecticut',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
          ])
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

        return (
          // console.log(props)
          <form onSubmit={handleSubmit}>
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

            <br />
            <br />
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

            <br />
            <br />

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

            <br />
            <br />

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

            <br />
            <br />
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

            <br />
            <br />

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

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
        )
      }}
    </Formik>

    {/* <MoreResources /> */}
  </div>
)

export default CheckoutShipping
