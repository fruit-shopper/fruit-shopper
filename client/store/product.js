import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
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

/**
 * THUNK CREATORS
 */
export const fetchProduct = productId => {
  console.log('in thunk')
  return async function(dispatch) {
    try {
      console.log('id: ', productId)
      const {data} = await axios.get(`/api/products/${productId}`)
      console.log('+++', data)
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
  console.log('Action ', action)
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    // case REMOVE_PRODUCT:
    //   return defaultUser
    default:
      return state
  }
}
