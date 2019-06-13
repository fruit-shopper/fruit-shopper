import axios from 'axios'

//ACTION TYPES

const SET_QUANTITY_PRICE = 'SET_QUANTITY_PRICE'

//INITIAL STATE
const initialState = []

//ACTION CREATOR
const setQP = QP => ({
  type: SET_QUANTITY_PRICE,
  QP
})

/**
 * THUNK CREATORS
 */
export const setQuantityPrice = (productId, quantityPrice) => {
  return async function(dispatch) {
    try {
      const {data} = await axios.post(`/api/cart/${productId}`, quantityPrice)
      dispatch(setQP(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
//need this to show the cart
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default cartReducer
