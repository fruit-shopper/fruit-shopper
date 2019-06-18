import axios from 'axios'

// define const action type
const SET_ORDERS = 'SET_ORDERS'
const ADD_ORDER = 'ADD_ORDERS'
const DELETE_ORDER = 'DELETE_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REORDER_DES_TIME = 'REORDER_DES_TIME'
const REORDER_INC_TIME = 'REORDER_INC_TIME'
const FILTER_BY_STATUS = 'FILTER_BY_STATUS'

// define initial state
const initialState = []

// define action creator
export const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  }
}

export const addOrder = order => {
  return {
    type: ADD_ORDER,
    order
  }
}

export const deleteOrder = id => {
  return {
    type: DELETE_ORDER,
    id
  }
}

export const updateOrder = order => {
  return {
    type: UPDATE_ORDER,
    order
  }
}

export const reorderByDesTime = () => {
  return {
    type: REORDER_DES_TIME
  }
}

export const reorderByIncTime = () => {
  return {
    type: REORDER_INC_TIME
  }
}

export const filterBySt = status => {
  return {
    type: FILTER_BY_STATUS,
    status
  }
}

// define thunk method

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(setOrders(data))
    } catch (error) {
      console.log('Error in thunk method fetchOrders: ', error)
    }
  }
}

export const createOrder = order => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orders', order)
      dispatch(addOrder(res.data))
    } catch (error) {
      console.log('Error inside thunk method createOrder: ', error)
    }
  }
}

export const removeOrder = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${id}`)
      dispatch(deleteOrder(id))
    } catch (error) {
      console.log('Error inside thunk method removeOrder: ', error)
    }
  }
}

export const putOrder = order => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${order.id}`, order)
      const {orderWithAsso} = await axios.get(`/api/orders/${order.id}`)
      dispatch(updateOrder(orderWithAsso))
    } catch (error) {
      console.log('Error inside thunk method putOrder ', error)
    }
  }
}

export const filterByStatus = status => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(setOrders(data))
      dispatch(filterBySt(status))
    } catch (error) {
      console.log('Error inside thunk method filterByStatus: ', error)
    }
  }
}

// define reducer
const ordersReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case ADD_ORDER:
      return [...state, action.order]
    case DELETE_ORDER:
      return state.filter(elem => elem.id !== action.id)
    case UPDATE_ORDER:
      return state.map(elem => {
        if (elem.id === action.order.id) return action.order
        else return elem
      })
    case REORDER_DES_TIME:
      return (() => {
        let newState = state.slice()
        newState.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return newState
      })()
    case REORDER_INC_TIME:
      return (() => {
        let newState = state.slice()
        newState.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        return newState
      })()
    case FILTER_BY_STATUS:
      return state.filter(elem => elem.status === action.status)
    default:
      return state
  }
}

export default ordersReducer
