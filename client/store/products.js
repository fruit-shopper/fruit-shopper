/* eslint-disable complexity */
import axios from 'axios'

// define const action type
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REORDER_DES_PRICE = 'REORDER_DES_PRICE'
const REORDER_INC_PRICE = 'REORDER_INC_PRICE'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

// define action creator
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const reorderByDesPrice = () => {
  return {
    type: REORDER_DES_PRICE
  }
}

export const reorderByIncPrice = () => {
  return {
    type: REORDER_INC_PRICE
  }
}

// example of filterCriterion: { fuleLevel: 70, fuelType: gas}
export const filterProducts = filterCriterion => {
  return {
    type: FILTER_PRODUCTS,
    filterCriterion
  }
}

export const filterByCategory = category => {
  return {
    type: FILTER_BY_CATEGORY,
    category
  }
}

//define thunk method
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
      console.log('Result from thunk fetchProducts: ', data)
    } catch (error) {
      console.log('Error inside thunk method fetchPoducts: ', error)
    }
  }
}

export const createProduct = product => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/products', product)
      dispatch(addProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method createProducts: ', error)
    }
  }
}

export const removeProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (error) {
      console.log('Error inside thunk method removeProduct: ', error)
    }
  }
}

export const putProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      console.log('returned product by axios put: ', data)
      // api code changed by Olga, so use 'data' instead of '{ data }'
      const productWithAssociation = await axios.get(
        `/api/products/${product.id}`
      )
      console.log(
        'returned product by axios get with association: ',
        productWithAssociation
      )
      dispatch(updateProduct(productWithAssociation))
    } catch (error) {
      console.log('Error inside thunk method putProduct: ', error)
    }
  }
}

export const createProCatAssociation = (productId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/products/association/${productId}/${categoryId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method createProCatAssociation: ', error)
    }
  }
}

export const removeProCatAssociation = (productId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.delete(
        `/api/products/association/${productId}/${categoryId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log('Error inside thunk method removeProCatAssociation: ', error)
    }
  }
}

export const createProOrderAssociation = (productId, orderId) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/products/association/${productId}/${orderId}`
      )
      dispatch(updateProduct(res.data))
    } catch (error) {
      console.log(
        'Error inside thunk method createProOrderAssociation: ',
        error
      )
    }
  }
}

// define initial state
const initialState = []

// define reducer
const productReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(elem => elem.id !== action.id)
    case UPDATE_PRODUCT:
      return state.map(elem => {
        if (elem.id === action.product.id) return action.product
        else return elem
      })
    case REORDER_DES_PRICE:
      return (() => {
        let newState = state.slice()
        newState.sort((a, b) => b.price - a.price)
        return newState
      })()
    case REORDER_INC_PRICE:
      return (() => {
        let newState = state.slice()
        newState.sort((a, b) => a.price - b.price)
        return newState
      })()
    case FILTER_PRODUCTS:
      return state.filter(elem =>
        Object.keys(action.filterCriterion).every(
          key => elem[key] === action.filterCriterion[key]
        )
      )
    case FILTER_BY_CATEGORY:
      return state.filter(elem =>
        elem.categories.some(cat => cat.name === action.category)
      )
    default:
      return state
  }
}

export default productReducer
