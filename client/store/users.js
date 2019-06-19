import axios from 'axios'

// define const action type
const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'
const REORDER_DES_TIME = 'REORDER_DES_TIME'
const REORDER_INC_TIME = 'REORDER_INC_TIME'
const FILTER_BY_TYPE = 'FILTER_BY_TYPE'

// define initial state
const initialState = []

// define action creator
export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

export const addUser = user => ({
  type: ADD_USER,
  user
})

export const deleteUser = id => ({
  type: DELETE_USER,
  id
})

export const updateUser = user => ({
  type: UPDATE_USER,
  user
})

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

export const filterByTy = userType => ({
  type: FILTER_BY_TYPE,
  userType
})

// define thunk method

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.log('Error in thunk method fetchUsers: ', error)
    }
  }
}

export const createUser = user => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/users', user)
      dispatch(addUser(res.data))
    } catch (error) {
      console.log('Error in thunk method createUser: ', error)
    }
  }
}

export const removeUser = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${id}`)
      dispatch(deleteUser(id))
    } catch (error) {
      console.log('Error in thunk method removeUser: ', error)
    }
  }
}

export const putUser = user => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      const {userWithAsso} = await axios.get(`/api/users/${user.id}`)
      dispatch(updateUser(userWithAsso))
    } catch (error) {
      console.log('Error in thunk method putUser: ', error)
    }
  }
}

export const filterByType = userType => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
      dispatch(filterByTy(userType))
    } catch (error) {
      console.log('Error in thunk method filterByType: ', error)
    }
  }
}

// define reducer
const usersReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    case DELETE_USER:
      return state.filter(elem => elem.id !== action.id)
    case UPDATE_USER:
      return state.map(elem => {
        if (elem.id === action.user.id) return action.user
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
    case FILTER_BY_TYPE:
      return state.filter(elem => elem.admin === action.admin)
    default:
      return state
  }
}

export default usersReducer
