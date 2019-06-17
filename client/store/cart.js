import axios from 'axios'

//ACTION TYPES

const SET_QUANTITY_PRICE = 'SET_QUANTITY_PRICE'
const GET_CART = 'GET_CART'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

//INITIAL STATE
const initialState = []

//ACTION CREATOR
const setQP = QP => ({
  type: SET_QUANTITY_PRICE,
  QP
})

const getCart = cartContents => ({
  type: GET_CART,
  cartContents
})

const removeCartItem = item => ({
  type: REMOVE_CART_ITEM,
  item
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

export const getCartProducts = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
      // console.log('this is the data', data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductFromCart = item => {
  return async function(dispatch) {
    // console.log('in delete thunk product id:', item)
    try {
      await axios.delete(`/api/cart/${item}`)
      dispatch(removeCartItem(item))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
//need this to show the cart
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartContents
    // return  {...state, products: action.cartContents}
    // case SET_QUANTITY_PRICE:
    //   return [...state, action.QP]
    case REMOVE_CART_ITEM:
      let updatedCart = state.products.filter(
        product => product.id !== Number(action.item)
      )
      return {...state, products: updatedCart}
    default:
      return state
  }
}

export default cartReducer
