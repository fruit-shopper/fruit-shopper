import axios from 'axios'

//action types
const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

//initial state
const initialState = []

//action creator
const getPastOrders = pastOrders => ({
  type: GET_PAST_ORDERS,
  pastOrders
})

//thunks

export const getPastOrdersUser = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/past_orders_user')
      dispatch(getPastOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const userPastOrdersReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return action.pastOrders
    default:
      return state
  }
}

export default userPastOrdersReducer
