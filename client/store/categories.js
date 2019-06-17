import axios from 'axios'

// define const action type
const SET_CATEGORIES = 'SET_CATEGORIES'

//define action creator
export const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

// define thunk method
export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(setCategories(data))
    } catch (error) {
      console.log('Error inside thunk method fetchCategories: ', error)
    }
  }
}

// define initial state
const initialState = []

// define reducer
const categoryReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categoryReducer
