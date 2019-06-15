import axios from 'axios'

//action types
const GET_CURRENT_ORDERS = 'GET_CURRENT_ORDERS'

//initial state
const initialState = []

//action creator
const getCurrentOrders = currentOrders => ({
  type: GET_CURRENT_ORDERS,
  currentOrders
})

//thunks

export const getCurrentOrdersUser = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/current_orders_user')
      dispatch(getCurrentOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const userCurrentOrdersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_ORDERS:
      return action.currentOrders
    default:
      return state
  }
}

export default userCurrentOrdersReducer
