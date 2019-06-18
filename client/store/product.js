import axios from 'axios'
import history from '../history'
import {SlowBuffer} from 'buffer'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const CREATE_REVIEW = 'CREATE_REVIEW'

// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({
  type: GET_PRODUCT,
  product
})
// const removeProduct = () => ({
//   type: REMOVE_PRODUCT
// })

export const addReview = reviewText => {
  return {
    type: CREATE_REVIEW,
    reviewText
  }
}

export const createReview = (reviewText, productId) => {
  return async dispatch => {
    console.log('1', productId)
    console.log('2', reviewText)
    try {
      const {data} = await axios.post(`/api/products/${productId}`, {
        reviewText
      })
      console.log(data)
      dispatch(addReview(data))
    } catch (error) {
      console.log('Error inside thunk method: ', error)
    }
  }
}

/**
 * THUNK CREATORS
 */
export const fetchProduct = productId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    // case REMOVE_PRODUCT:
    case CREATE_REVIEW:
      let oldReviews = state.reviews
      // oldReviews.map(item => console.log('==>',item))
      // console.log('-------->',typeof action.reviewText)
      let returnedTarget = Object.assign(oldReviews, {...action.reviewText})
      // /fix this
      // console.log('==>',  returnedTarget)
      return {...state, reviews: returnedTarget}
    default:
      return state
  }
}

// console.log(item)
