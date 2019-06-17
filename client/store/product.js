import axios from 'axios'
import history from '../history'

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

export const createReview = (reviewText, productId) => {
  return async dispatch => {
    console.log('1', productId)
    console.log('2', reviewText)
    try {
      const res = await axios.post(`/api/products/${productId}`, {reviewText})

      dispatch(addReview(res))
    } catch (error) {
      console.log('Error inside thunk method: ', error)
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
    //   return defaultUser

    // not sure
    case CREATE_REVIEW:
      return action.reviewText
    default:
      return state
  }
}
